import useReveal from '../hooks/useReveal'

export default function NewsletterCTA() {
  useReveal()

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <div className="reveal opacity-0 translate-y-8 transition-all duration-700 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-52 h-52 bg-white opacity-5 rounded-full -translate-y-1/3 translate-x-1/3" />
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-100 bg-white/10 px-3 py-1 rounded-full mb-4">Stay Connected</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Get Exclusive Deals &amp; New Arrivals</h2>
          <p className="text-blue-100 mb-8 text-sm">Subscribe on WhatsApp &amp; get 10% off your first order!</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
            <input
              type="tel"
              placeholder="Your WhatsApp number"
              className="flex-1 px-5 py-3 rounded-full text-sm outline-none text-gray-800 placeholder-gray-400"
            />
            <button className="px-6 py-3 rounded-full bg-white text-blue-600 font-bold text-sm hover:bg-blue-50 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap">
              Subscribe →
            </button>
          </div>
          <p className="text-blue-200 text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  )
}

