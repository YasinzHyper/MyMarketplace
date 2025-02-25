import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from '../services/apiService.js';
import ResponsiveOverlayCard from './ResponsiveOverlayCard.jsx';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiService.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiService.delete(`/products/${id}`);
        setProducts(products.filter((p) => p.id !== id));
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product.');
      }
    }
  };

  const filteredProducts = products.filter((p) =>
    (p.name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Browse Products
        </h1>
        <p className="text-gray-600">
          Find items you love or list items you have!
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ResponsiveOverlayCard
              key={product.id}
              product={product}
              userName={userName}
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      {userName && (
        <div className="flex justify-center mt-8">
          <Link
            to="/add-product"
            className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
          >
            + Add Product
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProductList;
