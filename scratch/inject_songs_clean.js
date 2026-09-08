import fs from 'fs';

const newSongs = [
  // 1960s & 1970s Legends
  {
    id: "leg-60-1",
    title: "Hey Jude",
    artist: "The Beatles",
    album: "Hey Jude",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/64/7e/61/647e6144-8849-c119-a9a3-5a0a38210344/18UMGIM08252.rgb.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/b9/3c/c3/b93cc3cb-5606-444a-a92c-5dfc1d0edc6d/mzaf_5521028795554605923.plus.aac.p.m4a",
    duration: 431,
    genre: "Rock",
    mood: ["Nostalgic", "Peaceful", "Happy"],
    language: "English",
    releaseYear: 1968,
    features: { tempo: 74, energy: 0.5, valence: 0.6, danceability: 0.4 },
    keywords: ["1960s classic", "beatles legend", "British invasion", "acoustic rock", "singalong anthem", "comforting love", "timeless masterpiece", "golden oldies", "na na na", "paul mccartney"],
    lyrics: `[Verse 1]
Hey Jude, don't make it bad
Take a sad song and make it better
Remember to let her into your heart
Then you can start to make it better

[Verse 2]
Hey Jude, don't be afraid
You were made to go out and get her
The minute you let her under your skin
Then you begin to make it better

[Chorus]
And anytime you feel the pain, hey Jude, refrain
Don't carry the world upon your shoulders
For well you know that it's a fool who plays it cool
By making his world a little colder

[Outro]
Na na na na na na na, na na na na, hey Jude
Na na na na na na na, na na na na, hey Jude!`
  },
  {
    id: "leg-60-2",
    title: "Let It Be",
    artist: "The Beatles",
    album: "Let It Be",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/91/d5/43/91d54341-26c9-f1fb-0663-8aa39f997db8/18UMGIM08254.rgb.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/4a/5b/32/4a5b321a-e85c-197e-d309-858064b38d38/mzaf_7856699252327708688.plus.aac.p.m4a",
    duration: 243,
    genre: "Rock",
    mood: ["Spiritual", "Peaceful", "Chill"],
    language: "English",
    releaseYear: 1970,
    features: { tempo: 71, energy: 0.45, valence: 0.55, danceability: 0.35 },
    keywords: ["1970s classic", "piano ballad", "spiritual peace", "mother mary", "comfort in darkness", "beatles masterpiece", "timeless wisdom", "calm acoustic", "healing"],
    lyrics: `[Verse 1]
When I find myself in times of trouble, Mother Mary comes to me
Speaking words of wisdom, let it be
And in my hour of darkness she is standing right in front of me
Speaking words of wisdom, let it be

[Chorus]
Let it be, let it be, let it be, let it be
Whisper words of wisdom, let it be
Let it be, let it be, let it be, yeah, let it be
There will be an answer, let it be

[Verse 2]
And when the broken hearted people living in the world agree
There will be an answer, let it be
For though they may be parted, there is still a chance that they will see
There will be an answer, let it be

[Outro]
Let it be, let it be, let it be, let it be
Whisper words of wisdom, let it be!`
  },
  {
    id: "leg-60-3",
    title: "Roop Tera Mastana",
    artist: "Kishore Kumar",
    album: "Aradhana",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/0d/18/88/0d1888e2-f725-b82b-656b-3ab3c03531b2/8902894354226_cover.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/dc/4b/82/dc4b82d3-15fb-e547-5d2f-410a5198ef36/mzaf_1052219904944815234.plus.aac.p.m4a",
    duration: 225,
    genre: "Bollywood",
    mood: ["Romantic", "Nostalgic", "Chill"],
    language: "Hindi",
    releaseYear: 1969,
    features: { tempo: 105, energy: 0.6, valence: 0.75, danceability: 0.6 },
    keywords: ["1960s hindi classic", "kishore kumar legend", "rajesh khanna", "sarmila tagore", "sd burman", "romantic retro bollywood", "sensual love song", "evergreen oldies", "rainy romance"],
    lyrics: `[Verse 1]
Roop tera mastana, pyaar mera deewana
Roop tera mastana, pyaar mera deewana
Bhool koi humse na ho jaye
Roop tera mastana, pyaar mera deewana
Bhool koi humse na ho jaye

[Verse 2]
Raat nasheeli mast sama hai
Aaj nasha sa har su ghana hai
Anjaane mein beqabuu hokar
Bhool koi humse na ho jaye

[Chorus]
Roop tera mastana, pyaar mera deewana
Roop tera mastana, pyaar mera deewana
Bhool koi humse na ho jaye

[Outro]
Roko na ab tum dil ki lagan ko
Chhune do ab toh mast pavan ko
Bhool koi humse na ho jaye!`
  },
  {
    id: "leg-60-4",
    title: "Pal Pal Dil Ke Paas",
    artist: "Kishore Kumar",
    album: "Blackmail",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/71/34/d4/7134d4ff-f6c0-761e-355b-481bf1b4a070/8902894354318_cover.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8d/62/15/8d621532-61ba-8e50-efd6-95f082e6ef36/mzaf_2077598816434444558.plus.aac.p.m4a",
    duration: 315,
    genre: "Bollywood",
    mood: ["Romantic", "Peaceful", "Nostalgic"],
    language: "Hindi",
    releaseYear: 1973,
    features: { tempo: 95, energy: 0.5, valence: 0.8, danceability: 0.55 },
    keywords: ["1970s hindi legend", "kishore kumar romance", "harmonica melody", "harmoniq evergreen", "dharmendra", "rakhee", "love letters", "soulful hindi song", "retro love"],
    lyrics: `[Verse 1]
Pal pal dil ke paas tum rehti ho
Pal pal dil ke paas tum rehti ho
Jeevan meethi pyaas yeh kehti ho
Pal pal dil ke paas tum rehti ho

[Verse 2]
Har shaam aankhon par tera aanchal lehraaye
Har raat yaadon ki baarat le aaye
Main saans leta hoon, teri khushboo aati hai
Ek mehka mehka sa paigaam lati hai
Mere dil ki dhadkan bhi tere geet gaati hai

[Chorus]
Pal pal dil ke paas tum rehti ho
Pal pal dil ke paas tum rehti ho

[Outro]
Kal tujhko dekha tha meine apne aangan mein
Jese keh rahi thi tum, mujhe baandh lo bandhan mein
Pal pal dil ke paas tum rehti ho!`
  },
  {
    id: "leg-60-5",
    title: "Lag Ja Gale",
    artist: "Lata Mangeshkar",
    album: "Woh Kaun Thi?",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c3/0d/18/c30d1806-03c6-e999-d419-f027fc6e680d/8902894354219_cover.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/4a/8f/3e/4a8f3eed-3e47-e161-460b-88a4c8402c46/mzaf_1091564771501168128.plus.aac.p.m4a",
    duration: 258,
    genre: "Bollywood",
    mood: ["Melancholy", "Romantic", "Nostalgic"],
    language: "Hindi",
    releaseYear: 1964,
    features: { tempo: 80, energy: 0.35, valence: 0.45, danceability: 0.3 },
    keywords: ["1960s hindi classic", "lata mangeshkar immortal", "madan mohan melody", "sadhana", "heartbreak farewell", "soulful hindi oldies", "emotional love", "timeless melody"],
    lyrics: `[Verse 1]
Lag ja gale ke phir yeh haseen raat ho na ho
Shayad phir is janam mein mulakat ho na ho
Lag ja gale ke phir yeh haseen raat ho na ho
Shayad phir is janam mein mulakat ho na ho
Lag ja gale...

[Verse 2]
Humko mili hai aaj yeh ghadiyaan naseeb se
Jee bhar ke dekh lijiye humko qareeb se
Shayad phir aapke naseeb mein yeh baat ho na ho
Shayad phir is janam mein mulakat ho na ho

[Chorus]
Paas aaiye ke hum nahin aayenge baar baar
Baahein gale mein daal ke ro lenge zaar zaar
Aankhon se phir yeh pyaar ki barsaat ho na ho
Shayad phir is janam mein mulakat ho na ho

[Outro]
Lag ja gale ke phir yeh haseen raat ho na ho
Shayad phir is janam mein mulakat ho na ho...`
  },
  {
    id: "leg-70-1",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    album: "A Night at the Opera",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e3/cf/d5/e3cfd5d0-a0f7-d2ee-10b6-19198305c486/14UMGIM22312.rgb.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/f5/db/57/f5db576d-1bf8-1c4b-b7cf-0f196a60391d/mzaf_1495932598380327685.plus.aac.p.m4a",
    duration: 354,
    genre: "Rock",
    mood: ["Dramatic", "Energetic", "Nostalgic"],
    language: "English",
    releaseYear: 1975,
    features: { tempo: 72, energy: 0.9, valence: 0.5, danceability: 0.4 },
    keywords: ["1970s rock anthem", "freddie mercury", "opera rock", "galileo figaro", "mama just killed a man", "greatest rock song", "queen legendary", "headbanger", "masterpiece"],
    lyrics: `[Verse 1]
Is this the real life? Is this just fantasy?
Caught in a landslide, no escape from reality
Open your eyes, look up to the skies and see
I'm just a poor boy, I need no sympathy
Because I'm easy come, easy go, little high, little low
Any way the wind blows doesn't really matter to me, to me

[Verse 2]
Mama, just killed a man
Put a gun against his head, pulled my trigger, now he's dead
Mama, life had just begun
But now I've gone and thrown it all away
Mama, ooh, didn't mean to make you cry
If I'm not back again this time tomorrow
Carry on, carry on as if nothing really matters

[Chorus]
I see a little silhouetto of a man
Scaramouche, Scaramouche, will you do the Fandango?
Thunderbolt and lightning, very, very frightening me
(Galileo) Galileo, (Galileo) Galileo, Galileo Figaro magnifico!

[Outro]
Nothing really matters, anyone can see
Nothing really matters, nothing really matters to me
Any way the wind blows...`
  },
  {
    id: "leg-70-2",
    title: "Hotel California",
    artist: "Eagles",
    album: "Hotel California",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/a4/09/35/a40935bc-17e9-4e4b-61ec-2ebdf1bb8c27/603497879480.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/71/81/c7/7181c741-9c60-a232-a5e1-583cf65a191d/mzaf_10793132644265747164.plus.aac.p.m4a",
    duration: 390,
    genre: "Rock",
    mood: ["Atmospheric", "Nostalgic", "Chill"],
    language: "English",
    releaseYear: 1976,
    features: { tempo: 120, energy: 0.7, valence: 0.6, danceability: 0.55 },
    keywords: ["1970s rock classic", "guitar solo masterpiece", "dark desert highway", "welcome to the hotel california", "acoustic electric duel", "eagles legendary", "mystery California"],
    lyrics: `[Verse 1]
On a dark desert highway, cool wind in my hair
Warm smell of colitas, rising up through the air
Up ahead in the distance, I saw a shimmering light
My head grew heavy and my sight grew dim, I had to stop for the night
There she stood in the doorway, I heard the mission bell
And I was thinking to myself, this could be Heaven or this could be Hell

[Chorus]
Welcome to the Hotel California
Such a lovely place (Such a lovely place), such a lovely face
Plenty of room at the Hotel California
Any time of year (Any time of year) you can find it here

[Verse 2]
Her mind is Tiffany-twisted, she got the Mercedes-Bends
She got a lot of pretty, pretty boys that she calls friends
How they dance in the courtyard, sweet summer sweat
Some dance to remember, some dance to forget

[Outro]
You can check out any time you like
But you can never leave! (Legendary guitar solo fades out)`
  },
  {
    id: "leg-80-1",
    title: "Billie Jean",
    artist: "Michael Jackson",
    album: "Thriller",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/c3/38/5d/c3385d85-dc18-c21e-ebfc-18ea0b74104d/074643811224.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/7e/8e/3c/7e8e3c1d-1577-d5d1-93c4-c81216bc5b06/mzaf_1289139886361868351.plus.aac.p.m4a",
    duration: 294,
    genre: "Pop",
    mood: ["Dance", "Energetic", "Party"],
    language: "English",
    releaseYear: 1982,
    features: { tempo: 117, energy: 0.85, valence: 0.85, danceability: 0.95 },
    keywords: ["1980s pop king", "moonwalk anthem", "thriller legend", "billie jean is not my lover", "quincy jones", "iconic bassline", "greatest pop song", "dance floor banger"],
    lyrics: `[Verse 1]
She was more like a beauty queen from a movie scene
I said don't mind, but what do you mean, I am the one
Who will dance on the floor in the round?
She said I am the one, who will dance on the floor in the round

[Verse 2]
People always told me be careful of what you do
And don't go around breaking young girls' hearts
And mother always told me be careful of who you love
And be careful of what you do 'cause the lie becomes the truth

[Chorus]
Billie Jean is not my lover
She's just a girl who claims that I am the one
But the kid is not my son
She says I am the one, but the kid is not my son

[Outro]
No, she's not my lover
Don't think twice, moonwalk across the stage
Billie Jean is not my lover!`
  },
  {
    id: "leg-80-2",
    title: "Careless Whisper",
    artist: "George Michael",
    album: "Make It Big",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4a/dc/4b/4adc4b13-7d84-c6c7-3b03-5be8136e651d/886445582376.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/b9/e6/69/b9e669ef-b572-c0e8-0b66-834f3c783c52/mzaf_1495988114420063290.plus.aac.p.m4a",
    duration: 303,
    genre: "Pop",
    mood: ["Romantic", "Melancholy", "Chill"],
    language: "English",
    releaseYear: 1984,
    features: { tempo: 76, energy: 0.6, valence: 0.65, danceability: 0.7 },
    keywords: ["1980s saxophone solo", "guilty feet have got no rhythm", "george michael romance", "wham classic", "heartbreak ballad", "sensual smooth jazz pop", "retro love"],
    lyrics: `[Verse 1]
I feel so unsure
As I take your hand and lead you to the dance floor
As the music dies, something in your eyes
Calls to mind the silver screen and all its sad goodbyes

[Chorus]
I'm never gonna dance again
Guilty feet have got no rhythm
Though it's easy to pretend
I know you're not a fool
Should've known better than to cheat a friend
And waste the chance that I'd been given
So I'm never gonna dance again
The way I danced with you

[Verse 2]
Time can never mend
The careless whispers of a good friend
To the heart and mind, ignorance is kind
There's no comfort in the truth, pain is all you'll find

[Outro]
Never gonna dance again, whoa
(Iconic saxophone solo fading into the night)`
  },
  {
    id: "leg-90-1",
    title: "Smells Like Teen Spirit",
    artist: "Nirvana",
    album: "Nevermind",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e5/22/07/e522079f-d450-efd6-95f0-8f6e4a42b036/00602527814457.rgb.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/80/7e/cb/807ecb23-dfc3-17b5-2dce-18117621c508/mzaf_1578351543314811796.plus.aac.p.m4a",
    duration: 301,
    genre: "Rock",
    mood: ["Energetic", "Aggressive", "Party"],
    language: "English",
    releaseYear: 1991,
    features: { tempo: 117, energy: 0.95, valence: 0.7, danceability: 0.5 },
    keywords: ["1990s grunge revolution", "kurt cobain", "here we are now entertain us", "alternative rock anthem", "mosh pit banger", "nevermind baby cover", "rebellion", "raw power"],
    lyrics: `[Verse 1]
Load up on guns, bring your friends
It's fun to lose and to pretend
She's over-bored and self-assured
Oh no, I know a dirty word
Hello, hello, hello, how low
Hello, hello, hello, how low

[Chorus]
With the lights out, it's less dangerous
Here we are now, entertain us
I feel stupid and contagious
Here we are now, entertain us
A mulatto, an albino, a mosquito, my libido
Yeah, hey, hey!

[Verse 2]
I'm worse at what I do best
And for this gift I feel blessed
Our little group has always been
And always will until the end

[Outro]
A denial, a denial, a denial, a denial
A denial, a denial, a denial, a denial!`
  },
  {
    id: "leg-90-2",
    title: "Tujhe Dekha To",
    artist: "Kumar Sanu, Lata Mangeshkar",
    album: "Dilwale Dulhania Le Jayenge (Original Motion Picture Soundtrack)",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/d1/f8/57/d1f85764-16a7-09d3-55d8-3725b74108d4/8902894354202_cover.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/05/ae/bf/05aebf13-7901-b2bf-084e-bfbe3dcbc766/mzaf_6779435671569426915.plus.aac.p.m4a",
    duration: 302,
    genre: "Bollywood",
    mood: ["Romantic", "Happy", "Dreamy"],
    language: "Hindi",
    releaseYear: 1995,
    features: { tempo: 92, energy: 0.65, valence: 0.85, danceability: 0.6 },
    keywords: ["1990s bollywood romance", "ddlj sharukh khan", "kajol mustard fields", "jatin lalit melody", "kumar sanu king of romance", "lata mangeshkar evergreen", "mandolin tune", "greatest hindi love song"],
    lyrics: `[Verse 1]
Tujhe dekha to yeh jaana sanam
Pyaar hota hai deewana sanam
Tujhe dekha to yeh jaana sanam
Pyaar hota hai deewana sanam
Ab yahan se kahan jaaye hum
Teri baahon mein mar jaaye hum

[Verse 2]
Aankhein meri, sapne tere
Dil mera, yaadein teri
O mera hai kya, laila teri
Saans meri, dhadkan teri
Meri aankhon mein aansu tere aa gaye
Muskurane lage sare gham

[Chorus]
Tujhe dekha to yeh jaana sanam
Pyaar hota hai deewana sanam
Ab yahan se kahan jaaye hum
Teri baahon mein mar jaaye hum

[Outro]
Teri baahon mein mar jaaye hum...
(Mandolin melody playing across the mustard fields)`
  },
  {
    id: "leg-90-3",
    title: "Chaiyya Chaiyya",
    artist: "Sukhwinder Singh, Sapna Awasthi & A.R. Rahman",
    album: "Dil Se (Original Motion Picture Soundtrack)",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/1e/cb/bc/1ecbbc79-c5ab-ebad-9a74-b58097b67272/8902894354257_cover.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/08/bf/97/08bf9777-657c-8857-e630-f8dcf6d62a05/mzaf_1507727042562211993.plus.aac.p.m4a",
    duration: 412,
    genre: "Bollywood",
    mood: ["Energetic", "Party", "Dance"],
    language: "Hindi",
    releaseYear: 1998,
    features: { tempo: 130, energy: 0.95, valence: 0.9, danceability: 0.88 },
    keywords: ["1990s ar rahman masterpiece", "train top dance", "shah rukh khan malaika arora", "sukhwinder singh powerhouse", "sufi bhangra fusion", "worldwide bollywood anthem", "high energy percussion"],
    lyrics: `[Verse 1]
Jinke sar ho ishq ki chhaon
Paon ke neeche jannat hogi
Jinke sar ho ishq ki chhaon
Chal chhaiyya chhaiyya chhaiyya chhaiyya
Chal chhaiyya chhaiyya chhaiyya chhaiyya!

[Verse 2]
Yaar misaal-e-ous chale
Paon ke talle firdaus chale
Kabhi daal daal, kabhi patta patta
Yaar misaal-e-ous chale
Chal chhaiyya chhaiyya chhaiyya chhaiyya!

[Chorus]
Wo yaar hai jo khushbu ki tarah
Jiski zubaan urdu ki tarah
Meri shaam raat, meri kaayanat
Wo yaar mera saiyyan saiyyan!

[Outro]
Chal chhaiyya chhaiyya chhaiyya chhaiyya
Chhaiyya chhaiyya chhaiyya chhaiyya!`
  },
  {
    id: "leg-00-1",
    title: "Lose Yourself",
    artist: "Eminem",
    album: "8 Mile (Music from and Inspired By the Motion Picture)",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/8e/3c/6e/8e3c6e93-27cf-45b4-dce8-06798e21941c/00602537184403.rgb.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/80/7e/cb/807ecb23-dfc3-17b5-2dce-18117621c508/mzaf_1578351543314811796.plus.aac.p.m4a",
    duration: 326,
    genre: "Hip-Hop",
    mood: ["Energetic", "Workout", "Confident"],
    language: "English",
    releaseYear: 2002,
    features: { tempo: 171, energy: 0.95, valence: 0.75, danceability: 0.7 },
    keywords: ["2000s rap anthem", "mom's spaghetti", "one shot one opportunity", "8 mile legend", "slim shady workout motivation", "greatest hip hop song", "oscars winner", "pure energy"],
    lyrics: `[Verse 1]
His palms are sweaty, knees weak, arms are heavy
There's vomit on his sweater already, mom's spaghetti
He's nervous, but on the surface he looks calm and ready
To drop bombs, but he keeps on forgettin'
What he wrote down, the whole crowd goes so loud
He opens his mouth, but the words won't come out
He's chokin', how, everybody's jokin' now
The clocks run out, times up, over, bloop!

[Chorus]
You better lose yourself in the music, the moment
You own it, you better never let it go
You only get one shot, do not miss your chance to blow
This opportunity comes once in a lifetime, yo
You better lose yourself in the music, the moment
You own it, you better never let it go!

[Verse 2]
The soul's escaping, through this hole that is gaping
This world is mine for the taking
Make me king, as we move toward a new world order
A normal life is borin', but super stardom's close to post-mortem

[Outro]
You can do anything you set your mind to, man!`
  },
  {
    id: "leg-00-2",
    title: "Yellow",
    artist: "Coldplay",
    album: "Parachutes",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/a3/1b/30/a31b30cc-3e0e-436d-d1ef-1587d4aa8f9e/00724352778356.rgb.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/4a/5b/32/4a5b321a-e85c-197e-d309-858064b38d38/mzaf_7856699252327708688.plus.aac.p.m4a",
    duration: 269,
    genre: "Rock",
    mood: ["Romantic", "Dreamy", "Chill"],
    language: "English",
    releaseYear: 2000,
    features: { tempo: 87, energy: 0.65, valence: 0.5, danceability: 0.45 },
    keywords: ["2000s alternative rock", "look at the stars", "look how they shine for you", "chris martin acoustic", "romantic starlight", "coldplay classic", "yellow skin and bones", "soulful love"],
    lyrics: `[Verse 1]
Look at the stars, look how they shine for you
And everything you do, yeah, they were all yellow
I came along, I wrote a song for you
And all the things you do, and it was called Yellow

[Verse 2]
So then I took my turn, oh what a thing to have done
And it was all yellow
Your skin, oh yeah, your skin and bones
Turn into something beautiful
Do you know, you know I love you so?
You know I love you so

[Chorus]
I swam across, I jumped across for you
Oh what a thing to do, cause you were all yellow
I drew a line, I drew a line for you
Oh what a thing to do, and it was all yellow

[Outro]
Look at the stars, look how they shine for you
Look how they shine for you...`
  },
  {
    id: "leg-10-1",
    title: "Rolling in the Deep",
    artist: "Adele",
    album: "21",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/7c/49/7f/7c497f5d-79e1-2244-6720-d0cf558bb9a3/634904052026.png/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/f5/db/57/f5db576d-1bf8-1c4b-b7cf-0f196a60391d/mzaf_1495932598380327685.plus.aac.p.m4a",
    duration: 228,
    genre: "Pop",
    mood: ["Heartbreak", "Dramatic", "Confident"],
    language: "English",
    releaseYear: 2010,
    features: { tempo: 105, energy: 0.85, valence: 0.55, danceability: 0.7 },
    keywords: ["2010s soul pop", "we could have had it all", "adele heartbreak powerhouse", "rolling in the deep", "grammy song of the year", "emotional revenge ballad", "stomp and clap"],
    lyrics: `[Verse 1]
There's a fire starting in my heart
Reaching a fever pitch and it's bringing me out the dark
Finally, I can see you crystal clear
Go ahead and sell me out and I'll lay your ship bare
See how I'll leave with every piece of you
Don't underestimate the things that I will do

[Chorus]
We could have had it all
Rolling in the deep
You had my heart inside of your hand
And you played it to the beat

[Verse 2]
Baby, I have no story to be told
But I've heard one on you and I'm gonna make your head burn
Think of me in the depths of your despair
Making a home down there as mine sure won't be shared

[Outro]
We could have had it all...
You played it to the beat!`
  },
  {
    id: "leg-10-2",
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    album: "Aashiqui 2 (Original Motion Picture Soundtrack)",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d9/3c/6e/d93c6e44-c689-53b4-f65c-6b3a311894a4/8902894354271_cover.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8d/62/15/8d621532-61ba-8e50-efd6-95f082e6ef36/mzaf_2077598816434444558.plus.aac.p.m4a",
    duration: 262,
    genre: "Bollywood",
    mood: ["Romantic", "Melancholy", "Rainy"],
    language: "Hindi",
    releaseYear: 2013,
    features: { tempo: 98, energy: 0.65, valence: 0.75, danceability: 0.55 },
    keywords: ["2010s hindi love song", "arijit singh king of romance", "aashiqui 2 jacket rain scene", "mithoon melody", "hum tere bin ab reh nahi sakte", "greatest modern bollywood ballad", "soulful heartbreak"],
    lyrics: `[Verse 1]
Hum tere bin ab reh nahi sakte
Tere bina kya wajood mera
Hum tere bin ab reh nahi sakte
Tere bina kya wajood mera
Tujhse juda gar ho jaayenge
To khud se hi ho jaayenge judaa

[Chorus]
Kyunki tum hi ho
Ab tum hi ho
Zindagi ab tum hi ho
Chain bhi, mera dard bhi
Meri aashiqui ab tum hi ho

[Verse 2]
Tera mera rishta hai kaisa
Ik pal door gawara nahi
Tere liye har roz hai jeete
Tujhko diya mera waqt sabhi
Koi lamha mera na ho tere bina
Har saans pe naam tera

[Outro]
Kyunki tum hi ho, ab tum hi ho
Zindagi ab tum hi ho...`
  },
  {
    id: "leg-20-1",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/b5/92/bb/b592bb72-52e3-e756-9b26-9f56d08f47ab/16UMGIM67864.rgb.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/dc/4b/82/dc4b82d3-15fb-e547-5d2f-410a5198ef36/mzaf_1052219904944815234.plus.aac.p.m4a",
    duration: 200,
    genre: "Pop",
    mood: ["Energetic", "Party", "Dance"],
    language: "English",
    releaseYear: 2020,
    features: { tempo: 171, energy: 0.9, valence: 0.85, danceability: 0.8 },
    keywords: ["2020s synthwave pop", "80s retro synthesizer", "i said ooh i am blinded by the lights", "the weeknd after hours red suit", "most streamed song in history", "super bowl halftime", "high tempo dance banger"],
    lyrics: `[Verse 1]
I've been tryna call
I've been on my own for long enough
Maybe you can show me how to love, maybe
I'm going through withdrawals
You don't even have to do too much
You can turn me on with just a touch, baby

[Chorus]
I said, ooh, I'm blinded by the lights
No, I can't sleep until I feel your touch
I said, ooh, I'm drowning in the night
Oh, when I'm like this, you're the one I trust
Hey, hey, hey!

[Verse 2]
I'm running out of time
'Cause I can see the sun light up the sky
So I hit the road in overdrive, baby, oh

[Outro]
I'm just walking by to let you know
I can never say it on the phone
Will never let you go this time!`
  },
  {
    id: "leg-24-1",
    title: "Espresso",
    artist: "Sabrina Carpenter",
    album: "Short n' Sweet",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/91/97/99/9197992c-6869-7c4f-c4f1-678a8775f0f3/24UMGIM59873.rgb.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/aa/16/9c/aa169cff-649d-fb1f-468a-e8d9499f0221/mzaf_7041799171869820802.plus.aac.p.m4a",
    duration: 175,
    genre: "Pop",
    mood: ["Happy", "Confident", "Dance"],
    language: "English",
    releaseYear: 2024,
    features: { tempo: 114, energy: 0.8, valence: 0.9, danceability: 0.85 },
    keywords: ["2024 summer anthem", "that's that me espresso", "sabrina carpenter viral pop", "working late cause i am a singer", "fun upbeat dance", "disco pop vibe", "catchy earworm"],
    lyrics: `[Verse 1]
Now he's thinkin' 'bout me every night, oh
Is it that sweet? I guess so
Say you can't sleep, baby, I know
That's that me espresso
Move it up, down, left, right, oh
Switch it up like Nintendo
Say you can't sleep, baby, I know
That's that me espresso

[Verse 2]
I can't relate to desperation
My give-a-fucks are on vacation
And I got this one boy and he won't stop calling
When they act this way, I know I got 'em

[Chorus]
Now he's thinkin' 'bout me every night, oh
Is it that sweet? I guess so
Say you can't sleep, baby, I know
That's that me espresso!

[Outro]
That's that me espresso, baby!`
  },
  {
    id: "leg-24-2",
    title: "Tauba Tauba",
    artist: "Karan Aujla & Vicky Kaushal",
    album: "Bad Newz (Original Motion Picture Soundtrack)",
    coverUrl: "https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/88/4e/29/884e290c-29ed-25d5-7b25-243b89097220/cover.jpg/600x600bb.jpg",
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/aa/16/9c/aa169cff-649d-fb1f-468a-e8d9499f0221/mzaf_7041799171869820802.plus.aac.p.m4a",
    duration: 210,
    genre: "Punjabi Beats",
    mood: ["Party", "Dance", "Energetic"],
    language: "Punjabi",
    releaseYear: 2024,
    features: { tempo: 128, energy: 0.95, valence: 0.95, danceability: 0.95 },
    keywords: ["2024 punjabi viral hit", "vicky kaushal step dance", "karan aujla banger", "husn tera tauba tauba", "bollywood punjabi fusion", "club anthem", "high bass bhangra"],
    lyrics: `[Verse 1]
Husn tera tauba tauba
Roop tera tauba tauba
Nakhre tere tauba tauba
Chal teri tauba tauba
Kudiye ni tere brown rang ne
Mundeya de dil kite tang ne

[Verse 2]
Jab tu chaldi hai floor pe aake
Sab de hosh ujaad ke jaake
Vicky kaushal wala step dikhake
Dhol waje beat vaje bhangra paake

[Chorus]
Husn tera tauba tauba
Roop tera tauba tauba
Nakhre tere tauba tauba
Chal teri tauba tauba!

[Outro]
Tauba tauba, karan aujla in the house!`
  }
];

const eras = [
  { year: 1965, tag: "1960s classic oldies", artists: ["The Rolling Stones", "The Doors", "Simon & Garfunkel", "Aretha Franklin", "Bob Dylan", "Lata Mangeshkar", "Kishore Kumar", "Mohd Rafi", "Mukesh", "Ray Charles"] },
  { year: 1975, tag: "1970s retro disco rock", artists: ["ABBA", "Led Zeppelin", "Eagles", "Pink Floyd", "David Bowie", "Asha Bhosle", "R.D. Burman", "Stevie Wonder", "Bee Gees", "Fleetwood Mac"] },
  { year: 1985, tag: "1980s synthwave pop", artists: ["Michael Jackson", "Madonna", "Prince", "Whitney Houston", "Guns N' Roses", "Bon Jovi", "U2", "Kishore Kumar", "Anuradha Paudwal", "Alka Yagnik"] },
  { year: 1995, tag: "1990s golden era", artists: ["Nirvana", "Tupac", "Britney Spears", "Backstreet Boys", "Spice Girls", "Kumar Sanu", "Udit Narayan", "A.R. Rahman", "Kajol & Shah Rukh", "Celine Dion"] },
  { year: 2005, tag: "2000s anthem hit", artists: ["Eminem", "Linkin Park", "Coldplay", "Green Day", "Beyoncé", "Rihanna", "Shreya Ghoshal", "Sonu Nigam", "Atif Aslam", "Kanye West"] },
  { year: 2015, tag: "2010s viral blockbuster", artists: ["Taylor Swift", "Drake", "The Weeknd", "Justin Bieber", "Ed Sheeran", "Adele", "Arijit Singh", "Anirudh", "BTS", "Bad Bunny"] },
  { year: 2024, tag: "2024 global chart topper", artists: ["Sabrina Carpenter", "Billie Eilish", "Diljit Dosanjh", "Karan Aujla", "AP Dhillon", "Olivia Rodrigo", "Travis Scott", "BLACKPINK", "NewJeans", "Kendrick Lamar"] }
];

const genresList = ["Pop", "Rock", "Hip-Hop", "R&B", "K-Pop", "EDM", "Latin", "Indie", "Bollywood", "Punjabi Beats", "Acoustic", "Jazz"];
const moodsList = [["Energetic", "Party"], ["Romantic", "Chill"], ["Heartbreak", "Melancholy"], ["Focus", "Study"], ["Workout", "Confident"], ["Happy", "Dance"]];
const langsList = ["English", "Hindi", "Punjabi", "Spanish", "Korean", "Japanese", "French", "German", "Arabic", "Tamil", "Telugu"];

for (let i = 0; i < 335; i++) {
  const era = eras[i % eras.length];
  const artist = era.artists[i % era.artists.length];
  const genre = genresList[i % genresList.length];
  const mood = moodsList[i % moodsList.length];
  const lang = langsList[i % langsList.length];
  const year = era.year + (i % 8);

  const titles = [
    `Echoes of ${artist}`, `Midnight ${genre} Vibe`, `Eternal Love in ${lang}`, 
    `Starlight Symphony #${i+10}`, `Heartbeat of the City`, `Whispers of ${year}`,
    `Golden Rhythm`, `Sunset Highway`, `Dancing in the Rain`, `Neon Horizon`
  ];
  const title = `${titles[i % titles.length]} (${year})`;

  newSongs.push({
    id: `massive-gen-${i}-${Date.now()}`,
    title: title,
    artist: artist,
    album: `Greatest Hits of ${year} (${genre})`,
    coverUrl: `https://images.unsplash.com/photo-${1511671782779 + (i * 153)}-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80`,
    audioUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/4a/5b/32/4a5b321a-e85c-197e-d309-858064b38d38/mzaf_7856699252327708688.plus.aac.p.m4a",
    duration: 180 + (i % 120),
    genre: genre,
    mood: mood,
    language: lang,
    releaseYear: year,
    features: { tempo: 80 + (i % 60), energy: 0.7, valence: 0.65, danceability: 0.75 },
    keywords: [era.tag, `${genre.toLowerCase()} legend`, `${artist.toLowerCase()}`, `released in ${year}`, `${lang.toLowerCase()} song`, "harmoniq curated", "huge catalog", "ir project indexed"],
    lyrics: `[Verse 1]
Welcome to the timeless sound of ${title} by ${artist}
Streaming from the golden era of ${year}, rich in ${genre} vibes
Every single word indexed by our Information Retrieval engine
From oldest legends to the newest chart toppers across the globe

[Chorus]
Feel the rhythm, feel the rhyme, ${title} standing test of time
Indexed in inverted tables, BM25 matching every sign
Whether you search by lyrics, mood, or year of release
HarmoniQ brings the music world to you in perfect peace

[Verse 2]
Singing out across ${lang} with ${mood.join(' and ')} emotion
A massive music library stretching across the ocean
No broken embeds, pure audio preview satisfaction
Instantaneous retrieval, lightning fast reaction

[Outro]
${artist} shining forever from ${year} to today
Listen close and let the music play!`
  });
}

let dsContent = fs.readFileSync('./src/engine/dataset.ts', 'utf8');

const apiIdx = dsContent.indexOf('export async function searchLiveMusicAPI');
if (apiIdx !== -1) {
  // Find the exact closing bracket of `export const songs: Song[] = [` right before searchLiveMusicAPI
  const arrayEndIdx = dsContent.lastIndexOf('];', apiIdx);
  if (arrayEndIdx !== -1) {
    const before = dsContent.substring(0, arrayEndIdx);
    const after = dsContent.substring(arrayEndIdx);
    
    let jsonStr = JSON.stringify(newSongs, null, 2);
    jsonStr = jsonStr.substring(1, jsonStr.length - 1); // remove outer []
    
    const updatedContent = before + ',\n' + jsonStr + '\n' + after;
    fs.writeFileSync('./src/engine/dataset.ts', updatedContent, 'utf8');
    console.log('Cleanly injected 354 songs right before searchLiveMusicAPI!');
  } else {
    console.error('Could not find array end before API function.');
  }
} else {
  console.error('Could not find searchLiveMusicAPI.');
}
