import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/apiService.js';

function OrderForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiService.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleOrder = async () => {
    if (!userName) {
      alert('Please enter your name in the header.');
      return;
    }
    setLoading(true);
    try {
      await apiService.post('/orders', {
        productId,
        buyer: userName,
        orderStatus: 'Pending'
      });
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500 mt-8">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center text-red-500 mt-8">Product not found.</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">Place Order</h1>
      <div className="max-w-md mx-auto bg-white border rounded-lg p-6 shadow-md">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <p className="text-green-600 font-bold text-lg mt-2">${product.price}</p>
        <p className="text-sm text-gray-500 mt-1 mb-4">Seller: {product.seller}</p>
        <button
          onClick={handleOrder}
          className="w-full bg-indigo-500 text-white p-3 rounded-lg hover:bg-indigo-600 disabled:bg-gray-400 transition mt-3"
          disabled={loading}
        >
          {loading ? 'Placing Order...' : 'Confirm Order'}
        </button>
      </div>
    </div>
  );
}

export default OrderForm;
