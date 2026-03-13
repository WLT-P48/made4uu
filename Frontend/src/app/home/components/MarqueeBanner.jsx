import { MARQUEE_ITEMS } from '../data/constants'

// ── Enhanced items with icons and accent colors ────────────
const MARQUEE_ENHANCED = [
  { text: 'Personalized Tumblers', icon: '✦', accent: '#6366f1' },
  { text: 'Custom Gift Sets',      icon: '🎁', accent: '#f59e0b' },
  { text: 'Stanley Collection',    icon: '⚡', accent: '#3b82f6' },
  { text: 'Free Engraving',        icon: '🎨', accent: '#8b5cf6' },
  { text: 'Pune Delivery',         icon: '🚚', accent: '#10b981' },
  { text: 'Gifts With Love',       icon: '❤️', accent: '#ef4444' },
  { text: 'Premium Quality',       icon: '🏆', accent: '#f59e0b' },
  { text: '500+ Happy Customers',  icon: '⭐', accent: '#eab308' },
  { text: 'Laser Precision',       icon: '✨', accent: '#a855f7' },
  { text: 'Made in India',         icon: '🇮🇳', accent: '#f97316' },
]

// Second row — reversed for visual effect
const MARQUEE_ROW2 = [
  { text: 'Eco Friendly',          icon: '🌿', accent: '#22c55e' },
  { text: 'Vacuum Insulated',      icon: '🧊', accent: '#06b6d4' },
  { text: 'Gift Ready Packaging',  icon: '📦', accent: '#f59e0b' },
  { text: 'Ships Across India',    icon: '✈️', accent: '#3b82f6' },
  { text: 'Wedding Gifts',         icon: '💍', accent: '#ec4899' },
  { text: 'Corporate Orders',      icon: '🏢', accent: '#6366f1' },
  { text: 'Birthday Specials',     icon: '🎂', accent: '#f97316' },
  { text: 'Same Day Dispatch',     icon: '⚡', accent: '#eab308' },
  { text: 'Stainless Steel',       icon: '💎', accent: '#8b5cf6' },
  { text: '100% Customizable',     icon: '🎯', accent: '#10b981' },
]

function MarqueeRow({ items, reverse = false, speed = '35s' }) {
  const doubled = [...items, ...items, ...items]

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <div
        className="flex"
        style={{
          animation: `${reverse ? 'marqueeReverse' : 'marqueeForward'} ${speed} linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="group inline-flex items-center gap-2.5 px-5 py-0.5 cursor-default select-none"
          >
            {/* Icon */}
            <span
              className="text-sm transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12 inline-block"
              style={{ filter: 'drop-shadow(0 0 4px currentColor)' }}
            >
              {item.icon}
            </span>

            {/* Text */}
            <span
              className="text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-300"
              style={{
                color: '#9ca3af',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = item.accent
                e.currentTarget.style.textShadow = `0 0 12px ${item.accent}60`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#9ca3af'
                e.currentTarget.style.textShadow = 'none'
              }}
            >
              {item.text}
            </span>

            {/* Separator dot */}
            <span
              className="text-[7px] opacity-25 transition-all duration-300 group-hover:opacity-70"
              style={{ color: item.accent }}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function MarqueeBanner() {
  return (
    <div className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #0f172a 100%)',
        borderTop: '1px solid rgba(99,102,241,0.15)',
        borderBottom: '1px solid rgba(99,102,241,0.15)',
      }}
    >
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.5),rgba(168,85,247,0.4),transparent)' }} />

      {/* Background grid shimmer */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

      {/* Glow blob left */}
      <div className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-32 h-16 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#6366f1,transparent)' }} />
      {/* Glow blob right */}
      <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-32 h-16 rounded-full blur-2xl opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(circle,#8b5cf6,transparent)' }} />

      {/* Row 1 — forward */}
      <div className="py-2.5">
        <MarqueeRow items={MARQUEE_ENHANCED} reverse={false} speed="40s" />
      </div>

      {/* Divider line between rows */}
      <div className="mx-auto w-[90%] h-px opacity-10"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)' }} />

      {/* Row 2 — reverse direction */}
      <div className="py-2.5">
        <MarqueeRow items={MARQUEE_ROW2} reverse={true} speed="32s" />
      </div>

      {/* Left fade edge */}
      <div className="absolute inset-y-0 left-0 w-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg,#0f172a,transparent)' }} />
      {/* Right fade edge */}
      <div className="absolute inset-y-0 right-0 w-20 pointer-events-none z-10"
        style={{ background: 'linear-gradient(270deg,#0f172a,transparent)' }} />

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.4),rgba(168,85,247,0.3),transparent)' }} />

      <style>{`
        @keyframes marqueeForward {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marqueeReverse {
          0%   { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  )
}