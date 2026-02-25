import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-white rounded-2xl shadow-sm 
                 hover:shadow-2xl hover:-translate-y-2 
                 transition-all duration-500 
                 cursor-pointer overflow-hidden"
    >
      {/* Image Section */}
      <div className="relative bg-[#F6F4F2] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-64 object-contain 
                     transition-transform duration-700 
                     group-hover:scale-110"
        />

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-black/0 
                        group-hover:bg-black/5 
                        transition duration-500"></div>
      </div>

      {/* Content Section */}
      <div className="p-6 text-center">

        {/* Title */}
        <h3 className="text-lg font-medium text-gray-800 mb-2 
                       group-hover:text-black transition">
          {product.title}
        </h3>

        {/* Divider */}
        <div className="w-10 h-[2px] bg-gray-200 mx-auto mb-3 
                        group-hover:w-16 transition-all duration-300"></div>

        {/* Price */}
        <p className="text-red-500 font-semibold text-lg">
          ₹{product.price}
        </p>

        {/* Rating */}
        <div className="text-yellow-500 text-sm mt-2">
          ⭐ {product.rating} ({product.reviewCount})
        </div>

      </div>
    </div>
  );
};

export default ProductCard;