import { useParams } from "react-router-dom";
import img1 from "../assets/images/coffee-mug.jpg";
import img2 from "../assets/images/steel-bottle.jpg";
import img3 from "../assets/images/gift-combo.jpg";
import img4 from "../assets/images/digital-mala.png";
import img5 from "../assets/images/Ceramic-Flower-Vase.jpg";
import img6 from "../assets/images/flower-pot.jpg";
import img7 from "../assets/images/wooden-sofa.jpg";
import img8 from "../assets/images/Modern-Table-Lamp.jpg";

const ProductDetails = () => {
  const { id } = useParams();

  const products = [
    {
      id: 1,
      title: "Coffee Mug",
      description: "Hand-crafted ceramic mug with premium finish.",
      price: 699,
      discountPrice: 599,
      images: [img1],
      stock: 5,
      attributes: ["Ceramic", "Handmade"],
      rating: 4,
      reviewCount: 97,
      isActive: true,
    },
    {
      id: 2,
      title: "Steel Bottle",
      description: "Premium stainless steel bottle.",
      price: 799,
      discountPrice: 699,
      images: [img2],
      stock: 10,
      attributes: ["Steel", "Leakproof"],
      rating: 5,
      reviewCount: 120,
      isActive: true,
    },
    {
      id: 3,
      title: "Gift Combo",
      description: "Luxury gift combo pack.",
      price: 1139,
      discountPrice: 999,
      images: [img3],
      stock: 3,
      attributes: ["Premium", "Gift Pack"],
      rating: 4,
      reviewCount: 75,
      isActive: true,
    },
    {
      id: 4,
      title: "Digital Mala",
      description: "Spiritual digital counter mala.",
      price: 2370,
      discountPrice: 1999,
      images: [img4],
      stock: 0,
      attributes: ["Spiritual", "Digital"],
      rating: 4,
      reviewCount: 52,
      isActive: true,
    },
    {
      id: 5,
      title: "Ceramic Vase",
      description: "Elegant decorative ceramic vase.",
      price: 189,
      discountPrice: 159,
      images: [img5],
      stock: 6,
      attributes: ["Decor", "Modern"],
      rating: 4,
      reviewCount: 33,
      isActive: true,
    },
    {
      id: 6,
      title: "Flower Pot",
      description: "Minimal indoor flower pot.",
      price: 79,
      discountPrice: 69,
      images: [img6],
      stock: 15,
      attributes: ["Indoor", "Lightweight"],
      rating: 5,
      reviewCount: 44,
      isActive: true,
    },
    {
      id: 7,
      title: "Wooden Sofa",
      description: "Premium wooden sofa with modern design.",
      price: 899,
      discountPrice: 799,
      images: [img7],
      stock: 2,
      attributes: ["Furniture", "Luxury"],
      rating: 4,
      reviewCount: 28,
      isActive: true,
    },
    {
      id: 8,
      title: "Modern Lamp",
      description: "Soft ambient lighting lamp.",
      price: 149,
      discountPrice: 129,
      images: [img8],
      stock: 8,
      attributes: ["Lighting", "Bedroom"],
      rating: 5,
      reviewCount: 61,
      isActive: true,
    },
  ];

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <div className="p-10">Product Not Found</div>;

  const {
    title,
    description,
    price,
    discountPrice,
    images,
    stock,
    attributes,
    rating,
    reviewCount,
    isActive,
  } = product;

  const discountPercent = Math.round(
    ((price - discountPrice) / price) * 100
  );

  if (!isActive) return null;

  return (
    <div className="min-h-screen flex items-center justify-center 
                bg-gradient-to-br from-[#E6ECF5] to-[#D8E1ED] p-6">

  <div className="group bg-white/90 backdrop-blur-md 
                  rounded-3xl shadow-xl w-[380px] p-6 relative
                  transition-all duration-500 
                  hover:-translate-y-3 hover:shadow-2xl">

    {/* ID */}
    <p className="text-xs text-gray-400 text-right mb-2">
      id: {id}
    </p>

    {/* Image */}
    <div className="relative flex justify-center mb-6 overflow-hidden rounded-2xl">
      <img
        src={images[0]}
        alt={title}
        className="h-64 object-contain 
                   transition-transform duration-700 
                   group-hover:scale-110"
      />
    </div>

    {/* Title */}
    <h2 className="text-xl font-semibold mb-2 tracking-wide">
      {title}
    </h2>

    {/* Rating */}
    <div className="flex items-center gap-2 text-sm mb-3">
      <div className="text-black">
        {"★".repeat(rating)}
        {"☆".repeat(5 - rating)}
      </div>
      <span className="text-gray-500">{reviewCount}</span>
    </div>

    {/* Old Price */}
    <div className="flex items-center gap-2 text-sm text-gray-400 line-through">
      ₹{price}
      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
        -{Math.round(((price - discountPrice) / price) * 100)}%
      </span>
    </div>

    {/* New Price + Cart */}
    <div className="flex justify-between items-center mt-2">
      <h3 className="text-2xl font-bold 
                     transition-transform duration-300 
                     group-hover:scale-110">
        ₹{discountPrice}
      </h3>

      <button
        className="bg-gradient-to-r from-blue-600 to-blue-500 
                   hover:from-blue-700 hover:to-blue-600
                   text-white p-3 rounded-xl shadow-lg
                   transition-all duration-300 
                   hover:scale-110"
      >
        🛒
      </button>
    </div>

    {/* Description */}
    <p className="mt-4 text-gray-600 text-sm leading-relaxed">
      {description}
    </p>

    {/* Stock */}
    <p className={`mt-3 text-sm font-medium 
                  ${stock > 0 ? "text-green-600" : "text-red-500"}`}>
      {stock > 0 ? "In Stock" : "Out of Stock"}
    </p>

    {/* Attributes */}
    <div className="mt-3 flex flex-wrap gap-2">
      {attributes.map((attr, index) => (
        <span
          key={index}
          className="bg-gray-100 px-3 py-1 text-xs rounded-full
                     transition-all duration-300
                     hover:bg-gray-900 hover:text-white cursor-default"
        >
          {attr}
        </span>
      ))}
    </div>

  </div>
</div>
  );
};

export default ProductDetails;