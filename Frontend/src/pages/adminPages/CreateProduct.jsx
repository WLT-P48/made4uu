import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Loader from "../../components/common/Loader";
import productService from "../../services/product.service";

const API_URL = "http://localhost:5000/api";  




export default function CreateProduct() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);   // loader test
  const [uploadingImages, setUploadingImages] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);
  const [fetchingCategories, setFetchingCategories] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    categoryId: "",
    price: "",
    discountPrice: "",
    stock: 0,
    attributes: {
      color: "",
      size: "",
    },
    isActive: true,
  });

  // loader only for test (2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);

      if (Array.isArray(response.data)) {
        setCategories(response.data);
      }

    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setFetchingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    if (name.startsWith("attributes.")) {

      const attrKey = name.split(".")[1];

      setFormData((prev) => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [attrKey]: value,
        },
      }));

    } else if (type === "checkbox") {

      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));

    } else {

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const productData = {
        title: formData.title,
        description: formData.description,
        categoryId: formData.categoryId,
        price: Number(formData.price),
        discountPrice: formData.discountPrice
          ? Number(formData.discountPrice)
          : null,
        stock: Number(formData.stock),
        attributes: {
          color: formData.attributes.color || null,
          size: formData.attributes.size || null,
        },
        isActive: formData.isActive,
        images: [],
      };

      const response = await axios.post(`${API_URL}/products`, productData);

      if (response.data) {

        const productId = response.data._id;

        setSuccessMessage("Product saved successfully!");

        if (selectedImages.length > 0) {

          setUploadingImages(true);

          const formDataObj = new FormData();

          selectedImages.forEach((img) => {
            formDataObj.append("images", img.file);
          });

          await productService.uploadImages(productId, formDataObj);
        }

        setTimeout(() => {
          navigate("/admin/products");
        }, 1500);

      }

    } catch (err) {

      setError(
        err.response?.data?.message || err.message || "An error occurred"
      );

      setSuccessMessage("");

    } finally {

      setLoading(false);
      setUploadingImages(false);

    }
  };

   //Loader test
  if (loading) {
   return <Loader />;
  }

  return (
    <div className="max-w-3xl mx-auto relative">

      <div className="bg-white rounded-lg shadow-sm p-6">

        <h1 className="text-2xl font-bold mb-6">Create New Product</h1>

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

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Your form fields */}

       /*   <button
            type="submit"
            disabled={loading || uploadingImages}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Create Product
          </button>

        </form>

      </div>
    </div>
  );
}