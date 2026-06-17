import { useState } from 'react'
import { X, Lock } from 'lucide-react'
import { Starfield } from './starfield'
import { BackButton } from './back-button'

// Updated friend data with all the information provided
export interface Friend {
  name: string
  color: 'pink' | 'purple' | 'gold'
  type: 'note' | 'video' | 'locked'
  content: string
}

export const FRIENDS: Friend[] = [
  {
    name: 'Risha',
    color: 'pink',
    type: 'note',
    content: 'Wishing you a happiest birthday Pravee 💌 I love you more than you think 😭 I swear I\'m very blessed to have a friend like you 😭💖 You are one of my closest friends 🧡 and you are so important to me 🫀 Every important decision I take in my life, I discuss it with you first 🙂 I hope this bond will be forever ♾️ Always be happy dey 🧿 Once again, happiest birthday 🥺💋 Love you so so much ♾️'
  },
  {
    name: 'Vidharshana',
    color: 'purple',
    type: 'video',
    content: 'https://www.image2url.com/r2/default/videos/1781276067092-23a7a978-da82-4b1f-bf33-63247cb9ff6d.mp4'
  },
  {
    name: 'Varuna',
    color: 'gold',
    type: 'video',
    content: 'https://www.image2url.com/r2/default/videos/1781276245485-f3a8387f-24cf-43ab-a774-92e8e2f2b060.mp4'
  },
  {
    name: 'Nishmitha',
    color: 'gold',
    type: 'video',
    content: 'https://cdn.imageurlgenerator.com/uploads/22a45aee-7a59-4f86-92e8-0695ba4966a7.mp4'
  },
  {
    name: 'Preethi',
    color: 'pink',
    type: 'video',
    content: 'https://www.image2url.com/r2/default/videos/1781276341262-27834e45-f8e2-4166-9d55-e7eb40ccac24.mp4'
  },
  {
    name: 'Rasika',
    color: 'purple',
    type: 'video',
    content: 'https://www.image2url.com/r2/default/videos/1781276630630-58579b25-dea7-456b-bc5e-1ce34617e91e.mp4'
  },
  {
    name: 'Thilaka',
    color: 'gold',
    type: 'video',
    content: 'https://www.image2url.com/r2/default/videos/1781276736353-c91337a7-023d-4928-ab2e-6a3f0ded417c.mp4'
  },
  {
    name: 'Harshini',
    color: 'pink',
    type: 'video',
    content: 'https://videotourl.com/videos/1781277448272-974f5303-84fd-402a-a27e-6d59c937aa31.mp4'
  },
  {
    name: 'Janani',
    color: 'purple',
    type: 'video',
    content: 'https://videotourl.com/videos/1781277305239-de3116ee-ee79-494b-808a-280face23303.mp4'
  },
  {
    name: 'Rithika & Vaishali',
    color: 'gold',
    type: 'video',
    content: 'https://cdn.imageurlgenerator.com/uploads/046fccb2-b2c1-499a-899f-ec92eaf16d96.mp4'
  },
  {
    name: 'Sai',
    color: 'gold',
    type: 'locked',
    content: ''
  },
  {
    name: 'Ritika',
    color: 'pink',
    type: 'locked',
    content: ''
  },
  {
    name: 'Sushma',
    color: 'purple',
    type: 'locked',
    content: ''
  },
  {
    name: 'Yasmin',
    color: 'gold',
    type: 'locked',
    content: ''
  },
  {
    name: 'Shashwathi',
    color: 'pink',
    type: 'locked',
    content: ''
  }
]

const COLOR_MAP = {
  pink: { c: '#ff7ab6', glow: '255,122,182' },
  purple: { c: '#9b7bff', glow: '155,123,255' },
  gold: { c: '#f7d774', glow: '247,215,116' },
}

// Points traced along a parametric heart curve so every star sits evenly
// spaced on the outline with no overlap, leaving the middle open for a title.
const HEART_POSITIONS = [
  { top: '30.1%', left: '50.4%' },
  { top: '18.2%', left: '57.9%' },
  { top: '15.3%', left: '75.4%' },
  { top: '29.8%', left: '88.5%' },
  { top: '50.4%', left: '83.6%' },
  { top: '68.6%', left: '66.1%' },
  { top: '83.4%', left: '52.6%' },
  { top: '90.0%', left: '50.0%' },
  { top: '83.4%', left: '47.4%' },
  { top: '68.6%', left: '33.9%' },
  { top: '50.4%', left: '16.4%' },
  { top: '29.8%', left: '11.5%' },
  { top: '15.3%', left: '24.6%' },
  { top: '18.2%', left: '42.1%' },
  { top: '30.1%', left: '49.6%' },
]

export function Echoes({ onBack }: { onBack: () => void }) {
  const [active, setActive] = useState<Friend | null>(null)

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden px-4 py-20">
      <Starfield density={0.6} dust={false} />
      <BackButton onClick={onBack} />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h1 className="mb-1 text-2xl tracking-[0.3em] sm:text-3xl" style={{ fontFamily: 'var(--font-cinzel)', color: '#f5ecd8', textShadow: '0 0 18px rgba(247,215,116,0.5)' }}>
          ECHOES
        </h1>
        <p className="mb-2 text-sm italic" style={{ color: 'rgba(245,236,216,0.5)' }}>
          The people who love you, scattered across your sky.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-6 h-[68svh] w-full max-w-2xl">
        {/* Center title sitting inside the heart shape */}
        <div
          className="absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 px-6 text-center"
          style={{ width: '46%' }}
        >
          <p
            className="text-sm italic leading-snug sm:text-base"
            style={{
              fontFamily: 'var(--font-cinzel)',
              letterSpacing: '0.08em',
              color: 'rgba(245,236,216,0.75)',
              textShadow: '0 0 16px rgba(247,215,116,0.35)',
            }}
          >
            From some people<br />who are special<br />to you
          </p>
        </div>

        {FRIENDS.map((friend, i) => {
          const pos = HEART_POSITIONS[i % HEART_POSITIONS.length]
          const { c, glow } = COLOR_MAP[friend.color]
          const locked = friend.type === 'locked'
          return (
            <button
              key={friend.name}
              onClick={() => !locked && setActive(friend)}
              disabled={locked}
              aria-label={locked ? `${friend.name} — coming soon` : `Open message from ${friend.name}`}
              className="group absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
              style={{ top: pos.top, left: pos.left }}
            >
              <span
                className="animate-float rounded-full transition-transform group-hover:scale-150"
                style={{
                  width: locked ? 12 : 18,
                  height: locked ? 12 : 18,
                  background: locked ? '#5a5a72' : c,
                  boxShadow: locked ? '0 0 8px 2px rgba(90,90,114,0.5)' : `0 0 20px 6px rgba(${glow},0.8)`,
                  animationDelay: `${i * 0.4}s`,
                  display: 'block',
                }}
              />
              <span style={{ fontFamily: 'var(--font-cinzel)', fontSize: 10, letterSpacing: '0.18em', color: locked ? 'rgba(245,236,216,0.4)' : c }}>
                {friend.name}
              </span>
              {locked && (
                <span className="flex items-center gap-1 text-[10px] italic" style={{ color: 'rgba(245,236,216,0.35)' }}>
                  <Lock className="size-3" /> Coming soon ✦
                </span>
              )}
            </button>
          )
        })}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={() => setActive(null)}
        >
          <div
            className="glass animate-scale-in relative max-h-[80svh] w-full max-w-lg overflow-y-auto rounded-3xl p-8 opacity-0 no-scrollbar"
            style={{ boxShadow: `0 0 60px rgba(${COLOR_MAP[active.color].glow},0.4)` }}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={() => setActive(null)} aria-label="Close" className="absolute right-4 top-4" style={{ color: 'rgba(245,236,216,0.6)' }}>
              <X className="size-5" />
            </button>
            <h2 className="mb-5 text-center text-xl tracking-[0.2em]" style={{ fontFamily: 'var(--font-cinzel)', color: COLOR_MAP[active.color].c }}>
              {active.name}
            </h2>

            {active.type === 'note' && (
              <p className="text-center text-lg italic leading-relaxed" style={{ color: 'rgba(245,236,216,0.9)' }}>
                {active.content}
              </p>
            )}

            {active.type === 'video' && (
              <video src={active.content} controls playsInline className="w-full rounded-2xl" style={{ maxHeight: '60svh' }}>
                Your browser does not support the video tag.
              </video>
            )}

            {/* Special section for Vidharshana - shows both video and letter */}
            {active.name === 'Vidharshana' && (
              <div className="mt-6 border-t pt-6" style={{ borderColor: 'rgba(155,123,255,0.3)' }}>
                <p className="text-center text-lg italic leading-relaxed" style={{ color: 'rgba(245,236,216,0.9)' }}>
                  Happiest birthday Mayiluh 🎀💋😭 Seven years... can you believe it? From sharing the smallest details of our lives to standing by each other through every high and low, you've been one of the most precious parts of my journey 🫶🏻 You are not just my best friend; you are my home 🌍 my safe place, my biggest supporter 💌 Distance may have kept us apart physically, but it has never weakened our bond 💎 Thank you for all the laughter, the endless conversations, the comfort during difficult times 🤌🏻 You deserve every beautiful thing life has to offer. I love you endlessly. Forever yours, your Mayiluh 😉💕
                </p>
              </div>
            )}
            {active.name === 'Nishmitha' && (
              <div className="mt-6 border-t pt-6" style={{ borderColor: 'rgba(155,123,255,0.3)' }}>
                <p className="text-center text-lg italic leading-relaxed" style={{ color: 'rgba(245,236,216,0.9)' }}>
                  Happy 18th Birthday to the most beautiful soul I know! 🎂💗 Today marks a special chapter in your life, and I feel so lucky to be a part of it. Even though we've spent time apart and haven't always had countless memories together, the bond we share means more to me than words can express. You are not just my best friend, you are my sister by heart and u will always be my first kid. 😘💯The love, care, and kindness you show always touch my heart. Watching you brings so much happiness because you have such a pure and genuine soul. You are one of the very few people who truly matter to me, and I will always cherish you. As you step into adulthood, I hope your life is filled with endless happiness, success, love, and beautiful moments. Thank you for being exactly who you are. No matter where life takes us, you'll always have a special place in my heart. Happy 18th birthday, my forever sister! 💕✨
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
