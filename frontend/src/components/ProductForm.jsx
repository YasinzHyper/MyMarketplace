import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService.js';

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    seller: localStorage.getItem('userName') || ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await apiService.get(`/products/${id}`);
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product.seller) {
      alert('Please enter your name in the header.');
      return;
    }
    setLoading(true);
    try {
      if (id) {
        await apiService.put(`/products/${id}`, product);
        alert('Product updated successfully!');
      } else {
        await apiService.post('/products', product);
        alert('Product added successfully!');
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">
        {id ? 'Edit Product' : 'Add Product'}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md border"
      >
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            min="0"
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Image URL
          </label>
          <input
            type="url"
            name="imageUrl"
            value={product.imageUrl}
            onChange={handleChange}
            className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 transition disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Saving...' : (id ? 'Update Product' : 'Add Product')}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
