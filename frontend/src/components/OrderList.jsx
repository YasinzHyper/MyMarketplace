import { useState, useEffect } from 'react';
import apiService from '../services/apiService.js';

function OrderList() {
  const [placedOrders, setPlacedOrders] = useState([]);
  const [receivedOrders, setReceivedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userName) {
        setLoading(false);
        return;
      }
      try {
        const placedResponse = await apiService.get(`/orders?buyer=${userName}`);
        setPlacedOrders(placedResponse.data);
        const receivedResponse = await apiService.get(`/orders?seller=${userName}`);
        setReceivedOrders(receivedResponse.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [userName]);

  if (!userName) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-gray-500">Please enter your name in the header to view orders.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">My Orders</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Placed Orders */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Placed Orders</h2>
            {placedOrders.length === 0 ? (
              <p className="text-gray-500">No placed orders yet.</p>
            ) : (
              <div className="space-y-4">
                {placedOrders.map((order) => (
                  <div key={order.id} className="border bg-white rounded-lg p-4 shadow-sm">
                    <p className="mb-1">
                      <strong>Order ID:</strong> {order.id}
                    </p>
                    <p className="mb-1">
                      <strong>Product ID:</strong> {order.productId}
                    </p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <span
                        className={`inline-block px-2 py-1 rounded text-sm ${
                          order.orderStatus === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Received Orders */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Received Orders</h2>
            {receivedOrders.length === 0 ? (
              <p className="text-gray-500">No received orders yet.</p>
            ) : (
              <div className="space-y-4">
                {receivedOrders.map((order) => (
                  <div key={order.id} className="border bg-white rounded-lg p-4 shadow-sm">
                    <p className="mb-1">
                      <strong>Order ID:</strong> {order.id}
                    </p>
                    <p className="mb-1">
                      <strong>Product ID:</strong> {order.productId}
                    </p>
                    <p className="mb-1">
                      <strong>Buyer:</strong> {order.buyer}
                    </p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <span
                        className={`inline-block px-2 py-1 rounded text-sm ${
                          order.orderStatus === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default OrderList;
