import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2, Search, Trash2, AlertTriangle } from "lucide-react";

const API_URL = "http://localhost:5000/api";

export default function DeleteProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [products, setProducts] = useState([]);
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Load all products initially
  useEffect(() => {
    const fetchProducts = async () => {
      setFetchingProducts(true);
      try {
        const response = await axios.get(`${API_URL}/products`);
        // Backend returns { total, page, limit, products } - access products array
        setProducts(response.data.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products");
      } finally {
        setFetchingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  // Search products
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // Reset to all products
      try {
        const response = await axios.get(`${API_URL}/products`);
        // Backend returns { total, page, limit, products } - access products array
        setProducts(response.data.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
      return;
    }
    
    setFetchingProducts(true);
    setError("");
    
    try {
      const response = await axios.get(`${API_URL}/products`, {
        params: { search: searchQuery }
      });
      // Backend returns { total, page, limit, products } - access products array
      setProducts(response.data.products || []);
    } catch (err) {
      setError("Failed to search products");
      setProducts([]);
    } finally {
      setFetchingProducts(false);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    if (!selectedProduct) return;
    
    setLoading(true);
    setError("");
    
    try {
      await axios.delete(`${API_URL}/products/${selectedProduct._id}`);
      setSuccessMessage("Product deleted successfully!");
      
      // Remove from the list
      setProducts(prev => prev.filter(p => p._id !== selectedProduct._id));
      setSelectedProduct(null);
      setShowConfirmDelete(false);
      
      // Redirect after showing success
      setTimeout(() => {
        navigate("/admin/products");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-red-600">Delete Product</h1>
        </div>

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!selectedProduct ? (
          /* Product Selection */
          <div>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search products by name..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <button
                onClick={handleSearch}
                disabled={fetchingProducts}
                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Search size={16} />
                Search
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg max-h-[500px] overflow-y-auto">
              {fetchingProducts ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="animate-spin" size={24} />
                  <span className="ml-2">Loading products...</span>
                </div>
              ) : products.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No products found. Try a different search.
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <div className="flex items-center gap-4">
                        {product.images && product.images[0] && (
                          <img
                            src={product.images[0].url}
                            alt={product.title}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div>
                          <h3 className="font-medium">{product.title}</h3>
                          <p className="text-sm text-gray-500">
                            ${product.price} • {product.categoryId?.name || "Uncategorized"} • Stock: {product.stock || 0}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : showConfirmDelete ? (
          /* Confirmation Dialog */
          <div className="text-center py-8">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle size={40} className="text-red-600" />
              </div>
            </div>
            
            <h2 className="text-xl font-bold mb-2">Delete Product?</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="font-semibold">"{selectedProduct.title}"</span>? 
              This action cannot be undone.
            </p>

            {selectedProduct.images && selectedProduct.images[0] && (
              <div className="flex justify-center mb-6">
                <img
                  src={selectedProduct.images[0].url}
                  alt={selectedProduct.title}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setShowConfirmDelete(false)}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={20} />
                    Delete Product
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Selected Product Review */
          <div>
            <div className="mb-6">
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-sm text-gray-500 hover:text-gray-700 mb-4"
              >
                ← Back to product list
              </button>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Product to Delete</h2>
                
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{selectedProduct.title}</h3>
                    <p className="text-gray-600 mt-1">{selectedProduct.description?.substring(0, 150)}...</p>
                    <div className="flex flex-wrap gap-2 sm:gap-4 mt-3 text-sm">
                      <span className="font-medium">Price: ${selectedProduct.price}</span>
                      <span className="font-medium">Stock: {selectedProduct.stock || 0}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${selectedProduct.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {selectedProduct.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  {selectedProduct.images && selectedProduct.images[0] && (
                    <img
                      src={selectedProduct.images[0].url}
                      alt={selectedProduct.title}
                      className="w-24 h-24 object-cover rounded-lg mt-4 sm:mt-0"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full sm:flex-1 px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="w-full sm:flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 flex items-center justify-center gap-2"
              >
                <Trash2 size={20} />
                Delete This Product
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
