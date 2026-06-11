export type PlanetId =
  | 'aura'
  | 'cosmos'
  | 'chronicles'
  | 'echoes'
  | 'oracle'
  | 'eternity'
  | 'serendipity'
  | 'void'

export type Planet = {
  id: PlanetId
  name: string
  desc: string
  color: string
  glow: string
}

export const PLANETS: Planet[] = [
  { id: 'aura', name: 'AURA', desc: 'Her Photos', color: '#9b7bff', glow: '155,123,255' },
  { id: 'cosmos', name: 'COSMOS', desc: 'Our Photos', color: '#ff7ab6', glow: '255,122,182' },
  { id: 'chronicles', name: 'CHRONICLES', desc: 'Our Story', color: '#f7d774', glow: '247,215,116' },
  { id: 'echoes', name: 'ECHOES', desc: 'Friends', color: '#ffffff', glow: '255,255,255' },
  { id: 'oracle', name: 'ORACLE', desc: 'Daily Message', color: '#f7d774', glow: '247,215,116' },
  { id: 'eternity', name: 'ETERNITY', desc: 'Our Time', color: '#9b7bff', glow: '155,123,255' },
  { id: 'serendipity', name: 'SERENDIPITY', desc: '18 Reasons', color: '#f7d774', glow: '247,215,116' },
  { id: 'void', name: 'VOID', desc: '', color: '#1a1a28', glow: '60,60,90' },
]

export const SUN_IMAGE =
  'https://i.postimg.cc/k5B5K2LB/Whats-App-Image-2026-05-28-at-7-15-28-AM.jpg'

export const AURA_PHOTOS = [
  {
    src: 'https://i.postimg.cc/d0L0rhgV/Whats-App-Image-2026-05-28-at-7-14-49-AM.jpg',
    caption:
      'My favourite childhood picture of you. Even then, before I ever knew you existed, you were already my favourite.',
  },
  {
    src: 'https://i.postimg.cc/q7z7yNWt/Whats-App-Image-2026-05-28-at-7-15-21-AM.jpg',
    caption:
      "Just a picture. But I've looked at this one more times than I'll ever tell you. You don't even know that.",
  },
  {
    src: 'https://i.postimg.cc/k5B5K2LB/Whats-App-Image-2026-05-28-at-7-15-28-AM.jpg',
    caption:
      "One of my absolute favourites. I don't know what you were thinking about when this was taken. But whatever it was — it made you look like this. And I never want to stop looking at you like this.",
  },
  {
    src: 'https://i.postimg.cc/N050mKZL/Whats-App-Image-2026-05-28-at-7-15-37-AM.jpg',
    caption:
      'A picture. Just a picture. And yet somehow it manages to hold everything I love about you in one frame.',
  },
  {
    src: 'https://i.postimg.cc/25V5h1g1/Whats-App-Image-2026-05-28-at-7-15-47-AM.jpg',
    caption:
      "You look like a child here. And I mean that as the most beautiful thing. There's a softness to you in this photo that I hope you never lose.",
  },
  {
    src: 'https://i.postimg.cc/yNkNcD23/Whats-App-Image-2026-05-28-at-7-16-03-AM.jpg',
    caption:
      "The saree. I don't have the right words for what happened to me when I first saw this. I just know something shifted. Something that never shifted back.",
  },
  {
    src: 'https://i.postimg.cc/Xvpvdrty/Whats-App-Image-2026-05-28-at-7-16-17-AM.jpg',
    caption:
      'The first picture you sent after getting your first phone. I remember that message. I remember what I felt. You had no idea what that moment meant to me.',
  },
  {
    src: 'https://i.postimg.cc/q7z7yNW3/Whats-App-Image-2026-05-28-at-7-17-34-AM.jpg',
    caption:
      'Another saree — this time for your college festival. You wore it like you were born for it. You probably were.',
  },
  {
    src: 'https://i.postimg.cc/VNdNtxk6/Whats-App-Image-2026-05-28-at-7-17-43-AM.jpg',
    caption:
      'This top is special to me for a reason you already know — I chose it for you. Seeing you wear something I picked out felt like a small act of love made visible.',
  },
  {
    src: 'https://i.postimg.cc/cJrJwvPY/Whats-App-Image-2026-05-28-at-7-17-51-AM.jpg',
    caption:
      'The cutest picture of you. Taken in college. You look genuinely happy here — not performing happiness, just actually in it. This is my favourite version of you.',
  },
]

export const COSMOS_PHOTOS = [
  {
    src: 'https://i.postimg.cc/63qC76fk/Whats-App-Image-2026-05-28-at-7-32-04-AM.jpg',
    caption:
      "Our very first date. I was nervous the entire time. You probably didn't notice — which is its own kind of magic. I think about this day more than I let on.",
  },
  {
    src: 'https://i.postimg.cc/G2tvB3jR/Whats-App-Image-2026-05-28-at-7-32-15-AM.jpg',
    caption:
      'Your birthday. We went on a small quick date — and it was everything. Being with you on your birthday felt like the best gift I could receive.',
  },
  {
    src: 'https://i.postimg.cc/B6b28ZC4/Whats-App-Image-2026-05-28-at-7-32-23-AM.jpg',
    caption:
      'Our last meetup — which happened to be on my birthday. That you spent it with me is something I carry with me quietly every day.',
  },
  {
    src: 'https://i.postimg.cc/wvMDtxk6/Whats-App-Image-2026-05-28-at-7-32-34-AM.jpg',
    caption:
      'Same day — my birthday. Another moment from a day that already felt like too much gift for one person. And yet here you were, giving more.',
  },
  {
    src: 'https://i.postimg.cc/0Qj765Cx/Whats-App-Image-2026-05-28-at-7-33-49-AM.jpg',
    caption:
      "This is an AI-generated image — but the pose, the feeling in it — it's personal. The way you look at me with everything in your eyes while I'm just doing something ordinary. That look. I live for that look.",
  },
]

export const COMIC_PAGES = [
  'https://i.postimg.cc/5N39FTkW/1.png',
  'https://i.postimg.cc/FzvmYVjB/2.png',
  'https://i.postimg.cc/C1kSMQqp/3.png',
  'https://i.postimg.cc/pTzRV6n4/4.png',
  'https://i.postimg.cc/NMmBGzHh/5.png',
  'https://i.postimg.cc/BbC3HPpL/6.png',
  'https://i.postimg.cc/y6hsw2Kq/7.png',
  'https://i.postimg.cc/h48cHNnc/8.png',
  'https://i.postimg.cc/zDw894NX/9.png',
  'https://i.postimg.cc/bNzp8LYb/11.png',
  'https://i.postimg.cc/659twz6f/12.png',
  'https://i.postimg.cc/9FWCV1XB/13.png',
  'https://i.postimg.cc/X7V43xNQ/14.png',
  'https://i.postimg.cc/gkYmd4cC/15.png',
  'https://i.postimg.cc/9FJVfTzK/16.png',
  'https://i.postimg.cc/15JPz64L/17.png',
  'https://i.postimg.cc/xTtYdHcV/18.png',
]

export type Friend = {
  name: string
  color: 'pink' | 'purple' | 'gold'
  type: 'note' | 'video' | 'locked'
  content?: string
}

export const FRIENDS: Friend[] = [
  {
    name: 'RISHA',
    color: 'pink',
    type: 'note',
    content:
      "Wishing you a happiest birthday Pravee 💌 I love you more than you think 😭 I swear I'm very blessed to have a friend like you 😭💖 You are one of my closest friends 🧡 and you are so important to me 🫀 Every important decision I take in my life, I discuss it with you first 🙂 I hope this bond will be forever ♾️ Always be happy dey 🧿 Once again, happiest birthday 🥺💋 Love you so so much ♾️",
  },
  {
    name: 'VIDHARSHANA',
    color: 'purple',
    type: 'note',
    content:
      "Happiest birthday Mayiluh 🎀💋😭 Seven years... can you believe it? From sharing the smallest details of our lives to standing by each other through every high and low, you've been one of the most precious parts of my journey 🫶🏻 You are not just my best friend; you are my home 🌍 my safe place, my biggest supporter 💌 Distance may have kept us apart physically, but it has never weakened our bond 💎 Thank you for all the laughter, the endless conversations, the comfort during difficult times 🤌🏻 You deserve every beautiful thing life has to offer. I love you endlessly. Forever yours, your Mayiluh 😉💕",
  },
  {
    name: 'VARUNA',
    color: 'gold',
    type: 'video',
    content:
      'https://www.image2url.com/r2/default/videos/1780910851269-e52bf821-ddc4-436c-83d4-771ac6698bb3.mp4',
  },
  {
    name: 'THILAKA',
    color: 'pink',
    type: 'video',
    content:
      'https://www.image2url.com/r2/default/videos/1780910794535-6054371e-951f-4f2a-9ce9-e7adb982019d.mp4',
  },
  {
    name: 'RASIKA',
    color: 'purple',
    type: 'video',
    content:
      'https://www.image2url.com/r2/default/videos/1780910775201-924c2b27-e34e-41a4-b377-b6710eec99b2.mp4',
  },
  { name: 'SAI', color: 'gold', type: 'locked' },
  { name: 'RITHIKA', color: 'pink', type: 'locked' },
  { name: 'NISHMITHA', color: 'purple', type: 'locked' },
  { name: 'PREETHI', color: 'gold', type: 'locked' },
  { name: 'HARSHINI', color: 'pink', type: 'locked' },
]

export const ORACLE_MESSAGES = [
  "Happy Birthday, Pravena — Sara. You made it to 18. The universe has been building toward this moment since before either of us existed. The world has absolutely no idea what's coming.",
  'I hope your day is as bright and wonderful as your smile. Go conquer the world today, my love.',
  "Friendly reminder: Don't forget to hydrate, don't forget to smile, and don't forget that someone is completely head-over-heels in love with you today.",
  "If you're reading this, it means you've successfully made it to another beautiful day. I'm so incredibly proud of the woman you are becoming.",
  'Waking up and knowing you are mine makes every morning feel like a holiday. Have an amazing day, my favourite human.',
  'Just in case no one told you yet today: you look perfect, your laugh is magical, and you are absolute perfection.',
  "Seven days of being 18. You're somehow already more you than you were last week.",
  "Sending you a massive digital hug to kickstart your morning. I'll be thinking about you all day long.",
  'Out of all the billions of people on this planet, my heart chose you. And it keeps choosing you, every single second of every single day.',
  'I still get butterflies when I see your name pop up on my phone. Some things never change.',
  "If I could rewrite the laws of physics, I'd make the distance between us always equal to zero. Missing you extra today.",
  'You are my favourite thought. Whenever my mind wanders, it always finds its way back to you.',
  'Just thinking about your laugh right now and it completely fixed my mood. Thank you for just being you.',
  'Two weeks. I wonder what made you smile today. I hope something did.',
  "You're not just my love — you're my peace. Whenever life gets too loud, thinking of you brings me right back to calm.",
  'My love for you is like the universe — endlessly expanding and completely full of stars.',
  "Congratulations! You've officially been awarded the title of Cutest Person on Earth for the 10,000th day in a row.",
  'I love you more than late-night snacks, sleeping in on weekends, and your favourite song combined.',
  "Stop being so cute, it's highly distracting and I have things to do today. Just kidding, never stop.",
  "If we were in a horror movie, I'd totally sacrifice myself so you could escape. If that's not true love, I don't know what is.",
  'Just a daily check-in: Are you still the finest, smartest, most incredible girl in the world? Yep, checks out.',
  "I'd gladly share my last slice of pizza with you. If you know me, you know that means you are royalty.",
  "You're pretty much the only person I don't find annoying after a few hours. In fact, I never want you to leave.",
  "You're the cheese to my macaroni, the peanut butter to my jelly. Now I'm just hungry, but you get the point.",
  'Take a deep breath. You can handle whatever today throws at you. I believe in you more than anything.',
  "You are so incredibly smart and talented. Don't ever let a bad day make you doubt how amazing you are.",
  "You are a force of nature. Go show the world what you're made of today.",
  "If you're feeling overwhelmed today, just remember: we are a team. You never have to carry the weight alone.",
  "Your ambition and drive inspire me every single day. I'm so lucky to walk beside someone so brilliant.",
  "A month. You've come back here a whole month. I knew you would. You always were curious.",
  "Don't stress over what you can't control. Just do your best, and remember that I'm always in your corner.",
  "You've got a heart of gold and a mind of steel. There is literally nothing you can't achieve.",
  "I can't wait for the days when we don't have to say goodbye anymore. Just goodnight and good morning.",
  "Every day we spend together is just a preview of the beautiful lifetime we're going to build.",
  'I love building our future with you. Thank you for being the perfect partner.',
  "I can't wait to grow old with you, still holding your hand just like I do now.",
  'Thank you for making my present so beautiful and giving me a future worth looking forward to.',
  'No matter where life takes us, my hand will always be right here for you to hold.',
  'We are writing a beautiful story together, and today is just another perfect page.',
  "Of all the adventures I've ever dreamed of, spending my life with you is the one I can't wait for most. Have a beautiful day, Sara.",
]

export const ENVELOPES = [
  {
    title: 'The Spark That Changed Everything',
    content:
      'When I first met you, I had no idea how completely you would rewrite my world. You walked into my life like a sudden burst of light, and nothing has been the same since. From that very first day, my heart chose you. This is where our story began, and I never want it to end.',
  },
  {
    title: 'My Safe Harbor',
    content:
      'In a world that can be so loud, chaotic, and unpredictable, you are my absolute peace. Just sitting next to you after a long day makes the rest of the world melt away. You feel like home to me, and I want to spend the rest of my life coming home to no one but you.',
  },
  {
    title: 'The Music of Your Laugh',
    content:
      "Your laugh is my absolute favourite sound in the entire universe. It's a melody that can brighten my darkest days and make the best days even sweeter. It is the sound I want to wake up to and the last thing I want to hear before I sleep for the rest of my life.",
  },
  {
    title: 'My Absolute Best Friend',
    content:
      "Before anything else, you are my best friend. You know all my flaws, all my quirks, and all my secrets, and you love me all the same. There is no one else I'd rather team up with, conquer the world with, and share my life with.",
  },
  {
    title: 'Better Because of You',
    content:
      "Loving you has made me a better, kinder, and stronger person. You inspire me every single day just by being exactly who you are. I love who I am when I'm with you, and I want to spend a lifetime growing, learning, and evolving right alongside you.",
  },
  {
    title: 'A Million Little Things',
    content:
      "I love the way your eyes crinkle when you're genuinely happy. I love the way your hand fits perfectly in mine, and the way you look at me when you think I'm not paying attention. It's a million beautiful little moments like these that made me realize I can't live without you.",
  },
  {
    title: 'Through Every Season',
    content:
      "My love for you isn't conditional on the days being perfect. I love you through the highs, the lows, the messy morning coffees, and the quiet evenings. I want to weather every single storm of life with you as my anchor and my partner.",
  },
  {
    title: 'Stepping Into 18',
    content:
      'Today you turn 18, stepping into a beautiful new world of independence, choices, and dreams. As you start this incredible new chapter of adulthood, there is nothing I want more than to walk it by your side — protecting you, supporting you, and cheering you on.',
  },
  {
    title: 'Our Own Secret Language',
    content:
      'No one makes me laugh the way you do. We have a connection that is entirely our own — made of inside jokes, shared glances across crowded rooms, and memories that only we understand. I want a lifetime of laughing until our stomachs hurt.',
  },
  {
    title: 'The Horizon of My Future',
    content:
      'When I close my eyes and imagine my life ten, twenty, or fifty years from now, everything else is a blur — but you are perfectly in focus. I see us buying a home, traveling the world, and growing beautifully old together. You are my entire future.',
  },
  {
    title: 'The Missing Piece',
    content:
      "I used to think that true love only existed in movies and books, like a fairy tale meant for someone else. Then you came along and showed me how real, deep, and beautifully messy it actually is. You were the piece of my life I didn't even know was missing.",
  },
  {
    title: 'Absolute Certainty',
    content:
      "If there is one thing I am completely, unshakeably sure of in this universe, it is my love for you. I don't have a single doubt, a single hesitation, or a single reservation. I am all in, heart and soul, for the rest of my days.",
  },
  {
    title: 'My Favourite View',
    content:
      'I could look at a million beautiful sunsets, towering mountains, or oceans, but my favourite view will always be you looking back at me. You possess a magic that completely captivates me, and I am so deeply in love with you.',
  },
  {
    title: 'A Debt of Gratitude',
    content:
      'Thank you for being you. Thank you for your kindness, your patience, your warmth, and the beautiful way you care for my heart. You are the greatest gift I have ever received, especially on this day when the world celebrates your birth.',
  },
  {
    title: 'The Grandest Adventure',
    content:
      "Life with you is an incredible adventure. Whether we are traveling somewhere brand new or just driving around with no destination at all, everything is exciting when I'm with you. I want to explore the whole world and create a lifetime of adventures by your side.",
  },
  {
    title: 'Your Eternal Champion',
    content:
      'I promise to always be your biggest fan, your loudest cheerleader, and your softest place to land. When the world is tough, I will be your shield. When you succeed, I will celebrate you louder than anyone else. Let me love you and protect you forever.',
  },
  {
    title: 'Written in the Stars',
    content:
      'I truly believe that the universe brought us together for a reason. Out of billions of people on this planet, our paths crossed, and our hearts aligned perfectly. It feels like our story was written in the stars long before we ever met.',
  },
  {
    title: 'The Final Chapter',
    content:
      "My Dearest Love,\n\nYou've opened all 18 envelopes, read through the fragments of my heart, and seen just a glimpse of how deeply, purely, and irrevocably I love you. Each envelope represents a reason, a memory, and a promise — but honestly, 18 envelopes could never hold the depth of what I feel for you.\n\nToday is your 18th birthday. It is a milestone day that celebrates the incredible woman you have become and the bright, beautiful future ahead of you. You are stepping into adulthood today, and as you stand on the edge of this new chapter, I want to give you a promise that will never fade, never break, and never change: I will love you, cherish you, and stand by you through everything this life brings.\n\nI don't just want to be a part of your past, and I don't just want to enjoy your present. I want to build a lifetime with you. I want the quiet Tuesday mornings, the chaotic adventures, the shared dreams, and the comfort of knowing that no matter what happens out there, I get to come home to you.\n\nThere is only one thing left to do. On this milestone birthday, give me the greatest gift I could ever possibly ask for in this life.\n\nLook up from your screen, look into my eyes, and answer the final question:\n\nWill you marry me?",
  },
]

export const VOID_LINES = [
  'You found it.',
  'I knew you would.',
  "This place wasn't on any map.",
  'It was never meant to be easy to find.',
  'Some things worth having take time.',
  'You always were worth the time.',
]

export const VOID_PHOTO =
  'https://i.postimg.cc/k5B5K2LB/Whats-App-Image-2026-05-28-at-7-15-28-AM.jpg'

export const RELATIONSHIP_START = new Date('2022-12-19T00:00:00')
