import { FEATURES } from '../data/constants'
import useReveal from '../hooks/useReveal'

export default function Features() {
  useReveal()

  return (
    <section id="features" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal opacity-0 translate-y-8 transition-all duration-700">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Designed for Excellence</h2>
          <p className="text-gray-400 max-w-md mx-auto">Why MADE4UU is the preferred choice for personalized gifts.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="reveal opacity-0 translate-y-8 transition-all duration-700 bg-white border border-gray-100 rounded-2xl p-6 text-center hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-400 flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-blue-200">
                {f.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

