import ProductCard from "../components/productCard";
import img1 from "../assets/images/coffee-mug.jpg";
import img2 from "../assets/images/steel-bottle.jpg";
import img3 from "../assets/images/gift-combo.jpg";
import img4 from "../assets/images/digital-mala.png";
import img5 from "../assets/images/Ceramic-Flower-Vase.jpg";
import img6 from "../assets/images/flower-pot.jpg";
import img7 from "../assets/images/wooden-sofa.jpg";
import img8 from "../assets/images/Modern-Table-Lamp.jpg";

const Products = () => {

  const products = [
    {
      id: 1,
      title: "Soma Slim XS Wood Top",
      description:
        "This amazing screen pot is hand-crafted with a solid strong and upper wood frame.",
      price: 699,
      rating: 4.2,
      reviewCount: 24,
      stock: 5,
      images: [img1],
    },
    {
      id: 2,
      title: "Sculpture Coffee Table",
      description:
        "A triumph of minimalist design that combines natural and man made materials.",
      price: 503,
      rating: 4.5,
      reviewCount: 18,
      stock: 8,
      images: [img2],
    },
    {
      id: 3,
      title: "Tuber Large",
      description:
        "A simple post-modern design that works well with a variety of styles.",
      price: 113,
      rating: 4.8,
      reviewCount: 42,
      stock: 3,
      images: [img3],
    },
    {
      id: 4,
      title: "Soma L All Stone",
      description:
        "Experience modern art with this beautiful mid-century table.",
      price: 237,
      rating: 4.0,
      reviewCount: 12,
      stock: 0,
      images: [img4],
    },
    {
      id: 5,
      title: "Ceramic Flower Vase",
      description:
        "Elegant handcrafted ceramic vase perfect for modern interiors.",
      price: 189,
      rating: 4.3,
      reviewCount: 9,
      stock: 7,
      images: [img5],
    },
    {
      id: 6,
      title: "Minimal Flower Pot",
      description:
        "Compact minimalist flower pot for small decorative plants.",
      price: 79,
      rating: 4.1,
      reviewCount: 6,
      stock: 8,
      images: [img6],
    },
    {
      id: 7,
      title: "Modern Wooden Sofa",
      description:
        "Premium wooden sofa with a sleek and elegant modern look.",
      price: 899,
      rating: 4.6,
      reviewCount: 15,
      stock: 2,
      images: [img7],
    },
    {
      id: 8,
      title: "Modern Table Lamp",
      description:
        "Soft ambient lighting lamp ideal for bedrooms and living rooms.",
      price: 149,
      rating: 4.4,
      reviewCount: 11,
      stock: 4,
      images: [img8],
    },
  ];

  return (
    <div className="bg-white min-h-screen py-20 px-6 md:px-20">

      {/* Heading */}
      <div className="text-center mb-14">
        <p className="uppercase text-sm tracking-widest text-gray-400 mb-2">
          Products
        </p>
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          Our Products
        </h2>
        <p className="text-gray-500">
          Have a good setup for your minimalist home
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex justify-center gap-8 text-sm text-gray-500 mb-14">
        <span className="text-black font-medium border-b-2 border-black pb-1 cursor-pointer">
          All Product
        </span>
        <span className="hover:text-black cursor-pointer">Living room</span>
        <span className="hover:text-black cursor-pointer">Office</span>
        <span className="hover:text-black cursor-pointer">Decor</span>
        <span className="hover:text-black cursor-pointer">Kitchen</span>
        <span className="hover:text-black cursor-pointer">Bath</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;