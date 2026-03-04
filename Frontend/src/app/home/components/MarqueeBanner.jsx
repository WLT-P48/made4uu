import { MARQUEE_ITEMS } from '../data/constants'

export default function MarqueeBanner() {
  return (
    <div className="bg-gray-900 py-3 overflow-hidden">
      <div className="flex animate-marquee-mobile whitespace-nowrap md:animate-marquee">
        {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-6 text-xs font-bold tracking-widest uppercase text-gray-400">
            {item}
            <span className="opacity-30 text-[8px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

