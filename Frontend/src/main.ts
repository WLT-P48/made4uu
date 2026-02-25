import './style.css'

interface Product {
  id: number
  name: string
  price: string
  image: string
  description: string
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Made4uu Personalized Tumbler 1200ml",
    price: "₹1,299.00",
    image: "https://made4uu.com/cdn/shop/files/Customized-Logo-Sippy-Cup-1200-ML-Outdoor-Camping-High-class-Stainless-Steel-Insulated-Coffee-Tumbler-With-Handle.jpg?v=1764414430&width=800",
    description: "Large Insulated Travel Mug with Handle."
  },
  {
    id: 2,
    name: "Made4uu Personalized Tumbler 900ml",
    price: "₹1,399.00",
    image: "https://made4uu.com/cdn/shop/files/900ml_black.jpg?v=1761899319&width=800",
    description: "Premium hydration for everyday use."
  },
  {
    id: 3,
    name: "Personalized Coffee Tumbler",
    price: "₹400.00",
    image: "https://made4uu.com/cdn/shop/files/Glass1.jpg?v=1762840694&width=800",
    description: "Stay warm with our sleek coffee travel mug."
  },
  {
    id: 4,
    name: "Stanley Personalized Tumbler 1200ml",
    price: "₹1,999.00",
    image: "https://made4uu.com/cdn/shop/files/sky_bluee.jpg?v=1761915262&width=800",
    description: "The ultimate premium travel companion."
  },
  {
    id: 5,
    name: "Customized Temperate Bottle 500ml",
    price: "₹250.00",
    image: "https://made4uu.com/cdn/shop/files/blacktemperatebottle.webp?v=1770118812&width=800",
    description: "Smart temperature display insulated bottle."
  },
  {
    id: 6,
    name: "Vacuum Flask Set with 3 Cups",
    price: "₹400.00",
    image: "https://made4uu.com/cdn/shop/files/vaccumflasksetblack.webp?v=1770118850&width=800",
    description: "Complete gift set for hot and cold drinks."
  }
]

/* ---------- RENDER PRODUCTS ---------- */

function renderProducts() {
  const container = document.querySelector('.products-grid')

  if (!container) {
    console.error("Products grid not found")
    return
  }

  container.innerHTML = PRODUCTS.map(product => `
    <div class="product-card reveal">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" />
      </div>

      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-price">${product.price}</p>
        <button class="btn btn-primary add-cart">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('')
}

/* ---------- ANIMATIONS ---------- */

function initAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
      }
    })
  })

  document.querySelectorAll('.reveal')
    .forEach(el => observer.observe(el))
}

/* ---------- BUTTON SCROLL ---------- */

function initButtons() {

  document.querySelector('.btn-primary')
    ?.addEventListener('click', e => {
      e.preventDefault()
      document.getElementById('featured-products')
        ?.scrollIntoView({ behavior: 'smooth' })
    })

  document.querySelector('.btn-outline')
    ?.addEventListener('click', e => {
      e.preventDefault()
      document.getElementById('features')
        ?.scrollIntoView({ behavior: 'smooth' })
    })
}

/* ---------- APP START ---------- */

window.addEventListener('load', () => {
  renderProducts()
  initAnimations()
  initButtons()

  console.log("MADE4UU Premium Loaded ✅")
})