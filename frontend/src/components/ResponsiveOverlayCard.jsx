import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ResponsiveOverlayCard({ product, userName, onDelete }) {
  const [supportsHover, setSupportsHover] = useState(true);

  useEffect(() => {
    const mql = window.matchMedia('(any-hover: hover)');
    setSupportsHover(mql.matches);

  }, []);

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => setIsOverlayVisible(!isOverlayVisible);

  const handleDeleteClick = () => {
    if (onDelete) onDelete(product.id);
  };

  return (
    <div className="bg-white border rounded-lg p-4 sm:p-5 shadow-md hover:shadow-lg transition flex flex-col">

      <div
        className={`
          relative w-full h-36 sm:h-48 overflow-hidden rounded-md mb-4 
          group
          ${!supportsHover ? 'cursor-pointer' : ''} 
          /* If no hover, we show a pointer to indicate "tap me" */
        `}
        onClick={!supportsHover ? toggleOverlay : undefined}
      >

        <img
          src={product.imageUrl}
          alt={product.name}
          className="
            w-full 
            h-full 
            object-cover
            transition-transform 
            duration-500 
            group-hover:scale-110 
          "
        />

        <div
          className={`
            absolute inset-0 
            bg-black bg-opacity-60 
            flex flex-col items-center justify-center 
            p-4 text-center 
            text-white
            transition-opacity duration-300
            opacity-0
            group-hover:opacity-100
            ${isOverlayVisible ? 'opacity-100' : ''}
          `}
        >
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <p className="text-sm mb-2 line-clamp-2">{product.description}</p>
          <p className="text-green-300 font-bold mb-2">${product.price}</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-3">Seller: {product.seller}</p>
      <div className="mt-auto flex space-x-2">
        <Link
          to={`/place-order/${product.id}`}
          className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 text-sm"
        >
          Buy Now
        </Link>
        {userName === product.seller && (
          <>
            <Link
              to={`/edit-product/${product.id}`}
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 text-sm"
            >
              Edit
            </Link>
            <button
              onClick={handleDeleteClick}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 text-sm"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ResponsiveOverlayCard;
