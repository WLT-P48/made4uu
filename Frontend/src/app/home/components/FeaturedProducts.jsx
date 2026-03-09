import ProductCard from '../../../components/product/ProductCard'
import useReveal from '../hooks/useReveal'

export default function FeaturedProducts({ products, loading }) {
  useReveal()

  return (
    <section id="featured-products" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 reveal opacity-0 translate-y-8 transition-all duration-700">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">Best Sellers</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Our Best-Selling Gifts</h2>
          <p className="text-gray-400 max-w-md mx-auto">Curated with love, designed for you.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10">
          {loading ? (
            <div className="col-span-full text-center py-10">Loading products...</div>
          ) : (
            products.slice(0, 4).map((product, i) => (
              <div key={product.id} style={{ transitionDelay: `${(i % 3) * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-10 reveal opacity-0 translate-y-8 transition-all duration-700">
          <a
            href="https://made4uu.com/collections/all"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
          >
            View All Products →
          </a>
        </div>
      </div>
    </section>
  )
}

