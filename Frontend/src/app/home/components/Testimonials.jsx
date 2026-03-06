import { TESTIMONIALS } from '../data/constants'
import useReveal from '../hooks/useReveal'

export default function Testimonials() {
  useReveal()

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal opacity-0 translate-y-8 transition-all duration-700">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">Reviews</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">What Our Customers Say</h2>
          <p className="text-gray-400 max-w-md mx-auto">Real people, real stories.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="reveal opacity-0 translate-y-8 transition-all duration-700 bg-white border border-gray-100 rounded-2xl p-6 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-amber-400 tracking-wider mb-4">★★★★★</div>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {t.initial}
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-800">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

