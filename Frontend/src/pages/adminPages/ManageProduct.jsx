import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../../services/product.service";
import ProductForm from "../../components/admin/ProductForm";
import { Trash2, Edit3, Eye, Search, Plus, ChevronDown } from "lucide-react";

export default function ManageProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const pageSize = 10;

  // Debounce search
  const searchTimeoutRef = useRef(null);

  const fetchProducts = async (page = currentPage, isSearch = false, reset = false) => {
    setLoading(page === 1);
    try {
      let result;
      const params = { page, limit: pageSize, isActive: true };

      if (isSearch && searchTerm.trim()) {
        result = await productService.search(searchTerm, params);
      } else {
        result = await productService.getAll(params);
      }

      if (result.success) {
        const newProducts = result.data.products || [];
        setTotalProducts(result.data.total || 0);
        setHasMore(newProducts.length === pageSize);

        if (reset || isSearch) {
          setProducts(newProducts);
          if (isSearch) {
            setSearchResults(newProducts);
          }
        } else {
          setProducts(prev => [...prev, ...newProducts]);
          if (isSearch) {
            setSearchResults(prev => [...prev, ...newProducts]);
          }
        }
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    setIsSearching(true);
    setCurrentPage(1);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(async () => {
      if (term.trim()) {
        await fetchProducts(1, true, true);
      } else {
        await fetchProducts(1, false, true);
      }
      setIsSearching(false);
    }, 500);
  }, []);

  const loadMore = async () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await fetchProducts(nextPage, !!searchTerm, false);
  };

  const handleDelete = async (id) => {
    if (deletingId === id) return;
    setDeletingId(id);
    const result = await productService.delete(id);
    if (result.success) {
      setProducts(products.filter(p => p._id !== id));
      setTotalProducts(prev => Math.max(0, prev - 1));
    } else {
      setError(result.error);
    }
    setDeletingId(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    setEditingProduct(null);
    // Refresh current page
    fetchProducts(currentPage, !!searchTerm, true);
  };

  const displayProducts = isSearching ? searchResults : products;

  useEffect(() => {
    fetchProducts(1, false, true);
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-600">
            {totalProducts > 0 
              ? `${totalProducts.toLocaleString()} total products` 
              : 'No products'
            }
            {isSearching && ` • Searching "${searchTerm}"`}
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/products/create")}
          className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 flex items-center gap-2 self-start sm:self-end"
        >
          <Plus size={20} />
          Add New Product
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            disabled={loading}
          />
          {isSearching && (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
          )}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {loading && products.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayProducts.map((product) => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={product.images?.[0]?.url || '/placeholder.jpg'}
                          alt={product.title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.categoryId?.name || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-900">₹{product.price}</span>
                        {product.discountPrice && (
                          <span className="text-sm text-gray-400 line-through ml-1">₹{product.discountPrice}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 10 ? 'bg-green-100 text-green-800' : 
                          product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => window.open(`/product/${product._id}`, '_blank')}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                          title="View Product"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="Edit"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          disabled={deletingId === product._id}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                          {deletingId === product._id && (
                            <span className="ml-1 animate-spin">...</span>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {displayProducts.length === 0 && !loading && (
              <div className="text-center py-12">
                <Search className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  {searchTerm ? 'No search results' : 'No products found'}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm 
                    ? `Try different keywords` 
                    : 'Get started by creating your first product.'
                  }
                </p>
              </div>
            )}

            {hasMore && !isSearching && (
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2 mx-auto"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Loading...
                    </>
                  ) : (
                    <>
                      <ChevronDown size={16} className="rotate-180" />
                      Load More Products
                    </>
                  )}
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Showing {products.length} of {totalProducts.toLocaleString()}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] w-full overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Edit Product</h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingProduct(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <ProductForm
              initialData={editingProduct}
              mode="edit"
              productId={editingProduct?._id}
              onSuccess={handleEditSuccess}
              onCancel={() => {
                setShowEditModal(false);
                setEditingProduct(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
