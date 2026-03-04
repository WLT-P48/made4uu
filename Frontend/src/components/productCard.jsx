import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
const navigate = useNavigate();

if (!product) return null;

const discount =
product?.oldPrice && product?.oldPrice > product?.price
? Math.round(
((product.oldPrice - product.price) / product.oldPrice) * 100
)
: 0;

return (
<div
onClick={() => navigate(`/product/${product.id}`)}
className="group relative bg-[#f3f3f3] rounded-3xl p-6
shadow-md hover:shadow-2xl
hover:-translate-y-2 transition duration-500
cursor-pointer overflow-hidden"
>
{/* Product ID */} <p className="text-xs text-gray-400 text-right mb-2">
id: {product?.id} </p>


  {/* Image Section */}
  <div className="flex justify-center relative">
    <img
      src={product?.img || product?.images?.[0]}
      alt={product?.name || product?.title}
      className="h-44 object-contain transition duration-500 
                 group-hover:scale-110"
    />

    {/* Floating Icons */}
    <div className="absolute right-0 top-6 flex flex-col gap-2 
                    opacity-0 group-hover:opacity-100 
                    transition duration-300">

      <button
        className="bg-blue-500 text-white w-9 h-9 
                   rounded-full shadow flex items-center 
                   justify-center hover:scale-110 transition"
      >
        ⚖
      </button>

      <button
        className="bg-gray-800 text-white w-9 h-9 
                   rounded-full shadow flex items-center 
                   justify-center hover:scale-110 transition"
      >
        ♡
      </button>

    </div>
  </div>

  {/* Title */}
  <h3 className="text-lg font-semibold text-gray-800 mt-4">
    {product?.name || product?.title}
  </h3>

  {/* Rating */}
  <div className="flex items-center text-sm text-yellow-500 mt-1">
    ⭐ {product?.rating}
    <span className="text-gray-500 ml-2">
      ({product?.reviews || product?.reviewCount})
    </span>
  </div>

  {/* Old Price */}
  {product?.oldPrice && (
    <div className="flex items-center gap-2 mt-4 text-gray-400 line-through text-sm">
      ₹{product.oldPrice}

      {discount > 0 && (
        <span className="text-blue-500 text-xs font-medium">
          -{discount}%
        </span>
      )}
    </div>
  )}

  {/* Bottom Section */}
  <div className="flex items-center justify-between mt-2">

    <p className="text-2xl font-bold text-gray-800">
      ₹{product?.price}
    </p>

    <button
      className="bg-blue-500 hover:bg-blue-600 text-white 
                 w-12 h-12 rounded-xl flex items-center 
                 justify-center shadow-md transition duration-300 
                 hover:scale-110"
    >
      🛒
    </button>

  </div>
</div>


);
};

export default ProductCard;
