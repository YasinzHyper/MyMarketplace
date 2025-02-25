import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Header() {
  const [nameInput, setNameInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setNameInput(storedName);
    }
  }, []);

  const handleNameChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleSaveName = () => {
    localStorage.setItem('userName', nameInput);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow z-10">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">

        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
            Marketplace
          </Link>
        </div>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
            Products
          </Link>
          <Link to="/orders" className="text-gray-600 hover:text-indigo-600 transition-colors">
            My Orders
          </Link>
          <Link to="/add-product" className="text-gray-600 hover:text-indigo-600 transition-colors">
            Add Product
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <input
            type="text"
            value={nameInput}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            onClick={handleSaveName}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors text-sm"
          >
            Save
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-600 focus:outline-none">
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-gray-50">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">

            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={nameInput}
                onChange={handleNameChange}
                placeholder="Enter your name"
                className="border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                onClick={handleSaveName}
                className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors text-sm"
              >
                Save
              </button>
            </div>

            <Link onClick={() => setMobileMenuOpen(false)} to="/" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
              Products
            </Link>
            <Link onClick={() => setMobileMenuOpen(false)} to="/orders" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
              My Orders
            </Link>
            <Link onClick={() => setMobileMenuOpen(false)} to="/add-product" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
              Add Product
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
