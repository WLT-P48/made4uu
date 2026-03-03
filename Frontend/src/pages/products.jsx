import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import productService from "../services/product.service";
import categoryService from "../services/category.service";

const Products = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [likedProducts, setLikedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      fetchProducts();
    } else {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // Transform backend data to match ProductCard component expectations
  const transformProduct = (product) => {
    return {
      id: product._id,
      name: product.title,
      img: product.images && product.images.length > 0 ? product.images[0].url : '/placeholder.jpg',
      // Current price = original price - discount amount
      price: product.discountPrice && product.discountPrice > 0
        ? product.price - product.discountPrice
        : product.price,
      oldPrice: product.price,
      rating: product.rating || 0,
      reviews: product.reviewCount || 0,
    };
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const result = await productService.getAll();
      if (result.success) {
        // Backend returns { total, page, limit, products } - extract products array
        const transformedProducts = (result.data.products || []).map(transformProduct);
        setProducts(transformedProducts);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductsByCategory = async (categoryId) => {
    try {
      setLoading(true);
      const result = await productService.getByCategory(categoryId);
      if (result.success) {
        // Backend returns array directly
        const transformedProducts = (result.data || []).map(transformProduct);
        setProducts(transformedProducts);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const result = await categoryService.getAll();
      if (result.success) {
        setCategories(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch categories");
    }
  };

  const toggleLike = (id) => {
    if (likedProducts.includes(id)) {
      setLikedProducts(likedProducts.filter((item) => item !== id));
    } else {
      setLikedProducts([...likedProducts, id]);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-16 md:py-16 lg:px-20 lg:py-20">

      {/* 🔍 SEARCH BAR */}
      <div className="flex justify-center mb-6 md:mb-12">
        <div className="relative w-full max-w-2xl">

          <span className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search mugs, bottles, gifts..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowDropdown(true);
            }}
            className="w-full pl-10 md:pl-14 pr-12 py-3 md:py-4 rounded-full bg-gray-50 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 transition text-sm md:text-base"
          />

          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setShowDropdown(false);
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            >
              ✕
            </button>
          )}

          {/* Dropdown suggestions ONLY when typing */}
          {showDropdown && searchQuery.length > 0 && (
            <div className="absolute top-full mt-3 w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50">

              {filteredProducts.length > 0 ? (
                filteredProducts.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                      setSearchQuery("");
                      setShowDropdown(false);
                    }}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 p-2">
                  No results found
                </p>
              )}

            </div>
          )}

        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-12 justify-center">
        {["All", "Trending", "Bottles", "Mugs", "Gift Combos"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition duration-300 ${
              selectedCategory === cat
                ? "bg-black text-white shadow-lg"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-black hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

{/* PRODUCT GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            likedProducts={likedProducts}
            toggleLike={toggleLike}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-500 text-lg mt-16">
          😔 No products found
        </div>
      )}
    </div>
  );
};

export default Products;
