import { useState } from 'react';

interface Friend {
  name: string;
  emoji: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  wish: string;
  videoUrl?: string;
  isVideo?: boolean;
  tag: string;
}

const friends: Friend[] = [
  {
    name: 'Nishmitha',
    emoji: '🌺',
    color: '#ff69b4',
    bgGradient: 'linear-gradient(145deg, rgba(255,105,180,0.18), rgba(0,0,0,0.6))',
    borderColor: 'rgba(255,105,180,0.4)',
    tag: 'Your Sunshine ☀️',
    wish: `🌺 Happy Birthday Pravena!! 🎂✨

Wishing you an absolutely magical day filled with all the love, laughter, and joy you so richly deserve! You are one of the most beautiful souls I know — inside and out.

Your kindness, your energy, your smile — everything about you is just so special 💖 You have this rare ability to make everyone around you feel genuinely seen and loved. That is not a small thing — that is everything.

May this year bring you everything your heart desires and so much more. You deserve every happiness coming your way — every dream, every adventure, every beautiful surprise!

I am so grateful to have you in my life. Stay exactly as wonderful as you are! 🎉

Love you so much! Stay blessed, stay amazing! 🌟💕`,
  },
  {
    name: 'Vidharshana',
    emoji: '💫',
    color: '#da70d6',
    bgGradient: 'linear-gradient(145deg, rgba(218,112,214,0.18), rgba(0,0,0,0.6))',
    borderColor: 'rgba(218,112,214,0.4)',
    tag: 'Forever Friend 💜',
    wish: `✨ Dear Pravena! Happy Birthday! 🎂

On this beautiful day, I want you to know how truly special you are. Your presence in my life has made everything brighter and more beautiful.

You have a way of making everyone around you feel seen and loved 🥺💕 Whether it is through a simple message or a moment shared together, you always know exactly how to make someone feel they matter.

Wishing you a year ahead that is as incredible as you are — full of adventures, achievements, and moments that take your breath away! 💫 May every single day of this new year of your life be filled with all the goodness you put into the world.

Happy Birthday to one of the most genuine and wonderful people I know! 🌟

Love you always! 💜`,
  },
  {
    name: 'Sai',
    emoji: '⭐',
    color: '#9b59b6',
    bgGradient: 'linear-gradient(145deg, rgba(155,89,182,0.18), rgba(0,0,0,0.6))',
    borderColor: 'rgba(155,89,182,0.4)',
    tag: 'My Bestie 👑',
    wish: `🎊 HAPPY BIRTHDAY PRAVENA! 🎊

Ayyy my girl! You have been such an amazing friend and I am SO happy to celebrate you today! 🎉

You are literally one of the funniest, most caring, most real people I know and I genuinely feel so lucky to call you my friend 💖 You have this energy that just makes every room feel alive. Wherever you are, that is where all the fun is.

This year better be YOUR year because you deserve everything good coming to you! All the success, all the happiness, all the love — it is all yours bestie! 🌟

No matter what comes your way, just know I am always in your corner. Through the wins, through the chaos, through everything — I am here cheering the loudest for you!

Keep shining bright because the world needs your light! Happy Birthday queen! 👑💕`,
  },
  {
    name: 'Rithika',
    emoji: '🌙',
    color: '#e91e8c',
    bgGradient: 'linear-gradient(145deg, rgba(233,30,140,0.18), rgba(0,0,0,0.6))',
    borderColor: 'rgba(233,30,140,0.4)',
    tag: 'Cherished Always 💌',
    wish: `💌 Happy Birthday Pravena! 🎂

I cannot believe how fast time flies! It feels like just yesterday we were getting to know each other and now look at us 🥺

You have become someone so incredibly important to me and I am grateful every day for your friendship 💕 You are the kind of person who makes life better just by being in it. Your warmth, your laughter, your presence — you make the ordinary feel extraordinary ✨

What I love most about you is how you care — genuinely and deeply. You never do things halfway. Whether it is a friendship, a dream, or a random conversation at midnight — you give everything your whole heart.

Here is to you and everything wonderful heading your way! Have the most beautiful birthday, my darling! 

Love you loads 💖🌸`,
  },
  {
    name: 'Risha',
    emoji: '💌',
    color: '#ff4d94',
    bgGradient: 'linear-gradient(145deg, rgba(255,77,148,0.18), rgba(0,0,0,0.6))',
    borderColor: 'rgba(255,77,148,0.4)',
    tag: 'Soul Sister 🫀',
    wish: `🥺Wishing you a happiest birthday pravee....💌I love you more than u think😭I swear im very blessed to have a friend like you deyyy😭💖maybe nama ippo schl days la pesuna alavu frequent ah pesurathu illa nalum...you are one of my closest friend 🧡 and nee ennaku avaloo important 🫀enatha nee solra neraiya vishayam na kekala nalum😅en life la na edukura ella important decision unta discuss pani tha edupae🙂‍↔️🙂‍↔️enaku nee avalo important...❤️madam tha ena maranthutinga pola oru phn ah kanam onu kanam...😤neraiya puthu frnds vanthutanga madam ku pathukurae pathukurae ithula thaniya call la pesikuraee😤...I hope this bond will be foreverrrrr♾️and I want to be🥺💘...epavum happy ah irru dey🧿enjoy ur day💌🫂once again happiest birthday kudikariiiii!!!🥺💋loveeeee youuu soooo muchhh♾️💋🫂💌`,
  },
  {
    name: 'Varuna',
    emoji: '🎬',
    color: '#8e44ad',
    bgGradient: 'linear-gradient(145deg, rgba(142,68,173,0.18), rgba(0,0,0,0.6))',
    borderColor: 'rgba(142,68,173,0.4)',
    tag: 'Video Wish 🎥',
    isVideo: true,
    videoUrl: 'https://videotourl.com/videos/1780457065392-40883e1e-00a1-44b3-8ef3-9d4c86e5e1b6.mp4',
    wish: `💕 Happy Birthday Pravena! 🎉

Sending you all my love and warmth on your extra special day! You deserve every bit of happiness that comes your way today and always.

You are someone who makes the world a genuinely better place just by being in it — and I want you to know that is not something many people can say about themselves. You are rare, and you are wonderful.

Wishing you a birthday as bright and as beautiful as you are! ✨

Here is to you, to all your dreams, and to everything magical this year has in store. Happy Birthday! 🌟`,
  },
];

interface ModalProps { friend: Friend; onClose: () => void }

function FriendModal({ friend, onClose }: ModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backdropFilter: 'blur(16px)', background: 'rgba(0,0,0,0.85)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl overflow-hidden flex flex-col"
        style={{
          background: friend.bgGradient,
          border: `1px solid ${friend.borderColor}`,
          boxShadow: `0 0 60px ${friend.color}40, 0 -10px 40px rgba(0,0,0,0.8)`,
          animation: 'modalSlide 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          backdropFilter: 'blur(20px)',
          maxHeight: '90dvh',
        }}
      >
        {/* Drag handle */}
        <div className="sm:hidden flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div
          className="flex items-center justify-between p-4 pb-3 flex-shrink-0"
          style={{ borderBottom: `1px solid ${friend.borderColor}` }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${friend.color}22`, border: `1px solid ${friend.borderColor}` }}
            >
              {friend.emoji}
            </div>
            <div>
              <h3 className="text-white font-bold text-base leading-tight">{friend.name}</h3>
              <p className="text-xs font-medium" style={{ color: friend.color }}>{friend.tag}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
          >✕</button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4">
          {/* Video */}
          {friend.isVideo && friend.videoUrl && (
            <div
              className="mb-4 rounded-2xl overflow-hidden"
              style={{ boxShadow: `0 0 20px ${friend.color}40` }}
            >
              <video
                src={friend.videoUrl}
                controls
                playsInline
                preload="metadata"
                className="w-full rounded-2xl block"
                style={{ maxHeight: 260, background: '#000' }}
              />
            </div>
          )}

          {/* Wish text */}
          <div
            className="rounded-2xl p-4 text-sm leading-loose whitespace-pre-line"
            style={{
              background: 'rgba(0,0,0,0.35)',
              color: '#f8d7e8',
              fontFamily: 'Georgia, serif',
              lineHeight: 1.9,
            }}
          >
            {friend.wish}
          </div>

          {/* Footer sparkle */}
          <div className="text-center pt-4 pb-2">
            <span className="text-2xl">💕</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalSlide {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media(min-width:640px) {
          @keyframes modalSlide {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
        }
      `}</style>
    </div>
  );
}

export default function VoicesPlanet({ onClose }: { onClose: () => void }) {
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex flex-col overflow-y-auto"
        style={{ background: 'linear-gradient(135deg, #040010 0%, #0e001e 50%, #08000f 100%)' }}
      >
        {/* Starfield */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: Math.random() < 0.7 ? 2 : 3,
                height: Math.random() < 0.7 ? 2 : 3,
                background: Math.random() < 0.3 ? '#ffb6c1' : 'white',
                opacity: Math.random() * 0.5 + 0.1,
                animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-lg mx-auto w-full px-4 py-6 flex flex-col gap-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="text-3xl"
                style={{ filter: 'drop-shadow(0 0 12px #ff69b4)' }}
              >🎤</span>
              <div>
                <h2 className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                  Voices from the Stars
                </h2>
                <p className="text-pink-300 text-xs">Birthday wishes from your favorite people</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >✕</button>
          </div>

          {/* Intro */}
          <div
            className="text-center p-4 rounded-2xl"
            style={{ background: 'rgba(255,105,180,0.08)', border: '1px solid rgba(255,105,180,0.25)' }}
          >
            <p className="text-pink-100 text-sm leading-relaxed">
              Your favorite people traveled across galaxies to wish you a magical birthday. 
              Tap each card to open their message 💕
            </p>
          </div>

          {/* Friends grid */}
          <div className="grid grid-cols-2 gap-3">
            {friends.map(friend => (
              <button
                key={friend.name}
                onClick={() => setSelectedFriend(friend)}
                className="relative flex flex-col items-center gap-2.5 py-5 px-3 rounded-2xl overflow-hidden transition-all duration-200 active:scale-95 text-center"
                style={{
                  background: friend.bgGradient,
                  border: `1px solid ${friend.borderColor}`,
                  boxShadow: `0 0 15px ${friend.color}15`,
                }}
              >
                {/* Top glow */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 rounded-full pointer-events-none"
                  style={{ background: friend.color, opacity: 0.08, filter: 'blur(12px)', transform: 'translate(30%, -30%)' }}
                />

                {/* Avatar */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: `${friend.color}18`, border: `1px solid ${friend.borderColor}` }}
                >
                  {friend.emoji}
                </div>

                {/* Name & tag */}
                <div>
                  <p className="text-white font-bold text-sm leading-tight">{friend.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: `${friend.color}` }}>{friend.tag}</p>
                </div>

                {/* CTA */}
                <div
                  className="text-xs px-3 py-1 rounded-full font-semibold"
                  style={{ background: `${friend.color}20`, color: friend.color, border: `1px solid ${friend.borderColor}` }}
                >
                  {friend.isVideo ? '📹 Open Video' : '💌 Read Wish'}
                </div>
              </button>
            ))}
          </div>

          {/* Closing note */}
          <div
            className="text-center p-5 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(255,105,180,0.08), rgba(155,89,182,0.08))',
              border: '1px solid rgba(255,105,180,0.2)',
            }}
          >
            <p className="text-2xl mb-2">💌</p>
            <p className="text-white font-bold text-sm mb-1.5" style={{ fontFamily: 'Georgia, serif' }}>
              To Pravena, with all our love
            </p>
            <p className="text-pink-300/70 text-xs leading-relaxed">
              You are loved more than words could ever fully capture. 
              Every single person here is grateful and lucky to know you. 
              Happy Birthday, beautiful! 🎂✨
            </p>
          </div>
        </div>
      </div>

      {selectedFriend && (
        <FriendModal friend={selectedFriend} onClose={() => setSelectedFriend(null)} />
      )}

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(0.8); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
      `}</style>
    </>
  );
}
