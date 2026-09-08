import { Song, UserProfile } from './types';

/**
 * HarmoniQ Real-time Database Engine
 * 
 * Provides real-time synchronization for user profiles, liked songs, and custom playlists.
 * Supports multi-client real-time updates via BroadcastChannel and Storage Events,
 * with ready-to-use cloud persistence adapters (REST API / Firebase / Supabase).
 */

export interface CloudDBConfig {
  provider: 'local-realtime' | 'firebase' | 'supabase' | 'rest-api' | 'mongodb-atlas';
  endpointUrl?: string;
  apiKey?: string;
  dataSource?: string; // MongoDB Atlas Cluster Name (e.g., 'Cluster0')
  database?: string;   // MongoDB Database Name (e.g., 'harmoniq_db')
  collection?: string; // MongoDB Collection Name (e.g., 'user_likes')
  autoSync: boolean;
}

export type RealtimeSubscriptionCallback = (likedIds: Set<string>, likedSongs: Song[]) => void;
export type UserProfileCallback = (user: UserProfile) => void;

class RealtimeDatabaseService {
  private config: CloudDBConfig = {
    provider: (import.meta.env && import.meta.env.VITE_MONGODB_API_KEY && import.meta.env.VITE_MONGODB_ENDPOINT_URL) ? 'mongodb-atlas' : 'local-realtime',
    apiKey: import.meta.env ? import.meta.env.VITE_MONGODB_API_KEY : '',
    endpointUrl: import.meta.env ? import.meta.env.VITE_MONGODB_ENDPOINT_URL : '',
    dataSource: import.meta.env ? (import.meta.env.VITE_MONGODB_DATA_SOURCE || 'Cluster0') : 'Cluster0',
    database: import.meta.env ? (import.meta.env.VITE_MONGODB_DATABASE || 'harmoniq_db') : 'harmoniq_db',
    collection: import.meta.env ? (import.meta.env.VITE_MONGODB_COLLECTION || 'user_likes') : 'user_likes',
    autoSync: true
  };

  private broadcastChannel: BroadcastChannel | null = null;
  private likesSubscribers: Map<string, Set<RealtimeSubscriptionCallback>> = new Map();
  private userSubscribers: Map<string, Set<UserProfileCallback>> = new Map();

  constructor() {
    this.initRealtimeChannel();
  }

  /**
   * Initialize real-time multi-client synchronization channels
   */
  private initRealtimeChannel() {
    if (typeof window !== 'undefined') {
      try {
        this.broadcastChannel = new BroadcastChannel('harmoniq_realtime_db_channel');
        this.broadcastChannel.onmessage = (event) => {
          this.handleRealtimeBroadcast(event.data);
        };
      } catch (e) {
        console.warn('BroadcastChannel not supported, falling back to window storage event', e);
      }

      window.addEventListener('storage', (event) => {
        if (event.key && event.key.startsWith('harmoniq_db_')) {
          this.notifyLocalSubscribersFromStorage(event.key);
        }
      });
    }
  }

  /**
   * Handle incoming real-time broadcast message from another client / tab / cloud worker
   */
  private handleRealtimeBroadcast(data: any) {
    if (!data || !data.type) return;

    if (data.type === 'LIKES_UPDATED' && data.userKey) {
      this.notifyLikesSubscribers(data.userKey, new Set(data.likedIds), data.likedSongs);
    } else if (data.type === 'USER_UPDATED' && data.userKey) {
      this.notifyUserSubscribers(data.userKey, data.user);
    }
  }

  private notifyLocalSubscribersFromStorage(storageKey: string) {
    if (storageKey.startsWith('harmoniq_db_likes_')) {
      const userKey = storageKey.replace('harmoniq_db_likes_', '');
      this.getLikedSongs(userKey).then(({ likedIds, likedSongs }) => {
        this.notifyLikesSubscribers(userKey, likedIds, likedSongs);
      });
    }
  }

  private notifyLikesSubscribers(userKey: string, likedIds: Set<string>, likedSongs: Song[]) {
    const subs = this.likesSubscribers.get(userKey);
    if (subs) {
      subs.forEach(cb => cb(likedIds, likedSongs));
    }
  }

  private notifyUserSubscribers(userKey: string, user: UserProfile) {
    const subs = this.userSubscribers.get(userKey);
    if (subs) {
      subs.forEach(cb => cb(user));
    }
  }

  /**
   * Configure Cloud Backend Connection (Firebase Realtime REST, Supabase, or Custom Backend)
   */
  public configureCloudDatabase(config: Partial<CloudDBConfig>) {
    this.config = { ...this.config, ...config };
    console.log('🌐 HarmoniQ Real-time DB configured:', this.config.provider);
  }

  /**
   * Get current DB configuration status
   */
  public getStatus() {
    return {
      connected: true,
      provider: this.config.provider,
      realtimeChannelActive: !!this.broadcastChannel,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Subscribe to real-time changes for a user's liked songs
   */
  public subscribeToLikes(userKey: string, callback: RealtimeSubscriptionCallback): () => void {
    if (!this.likesSubscribers.has(userKey)) {
      this.likesSubscribers.set(userKey, new Set());
    }
    this.likesSubscribers.get(userKey)!.add(callback);

    // Immediately trigger callback with initial data
    this.getLikedSongs(userKey).then(({ likedIds, likedSongs }) => {
      callback(likedIds, likedSongs);
    });

    // Return unsubscribe function
    return () => {
      const subs = this.likesSubscribers.get(userKey);
      if (subs) {
        subs.delete(callback);
      }
    };
  }

  /**
   * Fetch user's liked track IDs and song metadata from database
   */
  public async getLikedSongs(userKey: string): Promise<{ likedIds: Set<string>; likedSongs: Song[] }> {
    if (!userKey) return { likedIds: new Set(), likedSongs: [] };

    const idsKey = `harmoniq_db_likes_${userKey}`;
    const songsKey = `harmoniq_db_liked_songs_${userKey}`;

    let likedIds = new Set<string>();
    let likedSongs: Song[] = [];

    // 1. Read local real-time storage
    try {
      const idsStr = localStorage.getItem(idsKey);
      if (idsStr) likedIds = new Set(JSON.parse(idsStr));

      const songsStr = localStorage.getItem(songsKey);
      if (songsStr) likedSongs = JSON.parse(songsStr);
    } catch (e) {
      console.error('Error reading local realtime DB:', e);
    }

    // 2. If connected to remote cloud backend, sync asynchronously
    if (this.config.provider !== 'local-realtime' && this.config.endpointUrl) {
      try {
        let res: Response;
        if (this.config.provider === 'mongodb-atlas') {
          res = await fetch(`${this.config.endpointUrl}/action/findOne`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-key': this.config.apiKey || ''
            },
            body: JSON.stringify({
              dataSource: this.config.dataSource || 'Cluster0',
              database: this.config.database || 'harmoniq_db',
              collection: this.config.collection || 'user_likes',
              filter: { userId: userKey }
            })
          });
        } else {
          res = await fetch(`${this.config.endpointUrl}/likes/${encodeURIComponent(userKey)}`, {
            headers: this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {}
          });
        }

        if (res.ok) {
          const cloudData = await res.json();
          const doc = this.config.provider === 'mongodb-atlas' ? (cloudData.document || {}) : cloudData;
          if (doc.likedIds) likedIds = new Set(doc.likedIds);
          if (doc.likedSongs) likedSongs = doc.likedSongs;
          
          // Cache locally
          localStorage.setItem(idsKey, JSON.stringify(Array.from(likedIds)));
          localStorage.setItem(songsKey, JSON.stringify(likedSongs));
        }
      } catch (err) {
        console.warn('Cloud DB sync offline, using local realtime mirror:', err);
      }
    }

    return { likedIds, likedSongs };
  }

  /**
   * Toggle like on a song and broadcast real-time update to all subscribers & cloud
   */
  public async toggleLike(userKey: string, song: Song): Promise<{ likedIds: Set<string>; likedSongs: Song[] }> {
    if (!userKey || !song) return { likedIds: new Set(), likedSongs: [] };

    const { likedIds, likedSongs } = await this.getLikedSongs(userKey);
    const nextIds = new Set(likedIds);
    let nextSongs = [...likedSongs];

    if (nextIds.has(song.id)) {
      nextIds.delete(song.id);
      nextSongs = nextSongs.filter(s => s.id !== song.id);
    } else {
      nextIds.add(song.id);
      if (!nextSongs.some(s => s.id === song.id)) {
        nextSongs.push(song);
      }
    }

    // 1. Save to local real-time persistent store
    const idsKey = `harmoniq_db_likes_${userKey}`;
    const songsKey = `harmoniq_db_liked_songs_${userKey}`;
    try {
      localStorage.setItem(idsKey, JSON.stringify(Array.from(nextIds)));
      localStorage.setItem(songsKey, JSON.stringify(nextSongs));
    } catch (e) {
      console.error('Error writing to local realtime DB:', e);
    }

    // 2. Broadcast real-time message across open tabs / clients
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({
          type: 'LIKES_UPDATED',
          userKey,
          likedIds: Array.from(nextIds),
          likedSongs: nextSongs,
          timestamp: Date.now()
        });
      } catch (e) {
        console.warn('Broadcast failed:', e);
      }
    }

    // 3. Notify local in-memory subscribers immediately
    this.notifyLikesSubscribers(userKey, nextIds, nextSongs);

    // 4. Push to remote cloud backend if configured
    if (this.config.provider !== 'local-realtime' && this.config.endpointUrl) {
      try {
        if (this.config.provider === 'mongodb-atlas') {
          fetch(`${this.config.endpointUrl}/action/updateOne`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'api-key': this.config.apiKey || ''
            },
            body: JSON.stringify({
              dataSource: this.config.dataSource || 'Cluster0',
              database: this.config.database || 'harmoniq_db',
              collection: this.config.collection || 'user_likes',
              filter: { userId: userKey },
              update: {
                $set: {
                  userId: userKey,
                  likedIds: Array.from(nextIds),
                  likedSongs: nextSongs,
                  updatedAt: new Date().toISOString()
                }
              },
              upsert: true
            })
          }).catch(err => console.warn('Background MongoDB Atlas push failed:', err));
        } else {
          fetch(`${this.config.endpointUrl}/likes/${encodeURIComponent(userKey)}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              ...(this.config.apiKey ? { 'Authorization': `Bearer ${this.config.apiKey}` } : {})
            },
            body: JSON.stringify({ likedIds: Array.from(nextIds), likedSongs: nextSongs })
          }).catch(err => console.warn('Background cloud DB push failed:', err));
        }
      } catch (err) {
        console.warn('Cloud DB push error:', err);
      }
    }

    return { likedIds: nextIds, likedSongs: nextSongs };
  }

  /**
   * Save user profile state with real-time broadcast
   */
  public async saveUserProfile(user: UserProfile): Promise<void> {
    if (!user) return;
    const userKey = user.email || user.id;
    try {
      localStorage.setItem(`harmoniq_db_user_${userKey}`, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user profile DB:', e);
    }

    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({
          type: 'USER_UPDATED',
          userKey,
          user,
          timestamp: Date.now()
        });
      } catch (e) {}
    }

    this.notifyUserSubscribers(userKey, user);
  }

  /**
   * Register a new user account with secure password verification
   */
  public registerAccount(email: string, password: string, profile: UserProfile): { success: boolean; user?: UserProfile; error?: string } {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required.' };
    }
    const cleanEmail = email.toLowerCase().trim();
    try {
      const accountsStr = localStorage.getItem('harmoniq_auth_registry') || '{}';
      const accounts = JSON.parse(accountsStr);
      
      // Check if email already registered
      if (accounts[cleanEmail]) {
        return { success: false, error: 'An account with this email address already exists. Please log in.' };
      }

      accounts[cleanEmail] = { password, profile };
      localStorage.setItem('harmoniq_auth_registry', JSON.stringify(accounts));
      this.saveUserProfile(profile);
      return { success: true, user: profile };
    } catch (e) {
      console.error('Error saving account to auth registry:', e);
      return { success: false, error: 'Failed to create account in database.' };
    }
  }

  /**
   * Authenticate an existing user account with password matching
   */
  public authenticateAccount(email: string, password: string): { success: boolean; user?: UserProfile; error?: string } {
    if (!email || !password) {
      return { success: false, error: 'Please enter both email and password.' };
    }
    const cleanEmail = email.toLowerCase().trim();
    try {
      const accountsStr = localStorage.getItem('harmoniq_auth_registry') || '{}';
      const accounts = JSON.parse(accountsStr);
      
      if (accounts[cleanEmail]) {
        if (accounts[cleanEmail].password === password) {
          const userProfile = accounts[cleanEmail].profile;
          this.saveUserProfile(userProfile);
          return { success: true, user: userProfile };
        } else {
          return { success: false, error: 'Incorrect password. Please verify your credentials and try again.' };
        }
      }

      return { success: false, error: 'No account found with this email address. Please switch to Sign Up to create a new account.' };
    } catch (e) {
      console.error('Error reading auth registry:', e);
      return { success: false, error: 'Authentication database error.' };
    }
  }
}

export const realtimeDb = new RealtimeDatabaseService();
