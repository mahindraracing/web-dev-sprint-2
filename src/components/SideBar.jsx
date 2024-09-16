import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, Home, Mail, Settings, PlayCircle, TvMinimalPlayIcon } from 'lucide-react';

const menuItems = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Stream', path: '/stream', icon: TvMinimalPlayIcon },
  { name: 'Contact', path: '/contact', icon: Mail },
  { name: 'Admin', path: '/admin', icon: Settings },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-white text-gray-800 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <Menu className="h-6 w-6" />
      </button>
    );
  }

  return (
    <aside className="fixed top-0 left-0 h-full w-72 bg-white text-gray-800 shadow-2xl p-6 z-40 overflow-y-auto transition-all duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-8">
        <Link to="/" className="flex items-center space-x-3">
          <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#E10600" />
            <path d="M2 17L12 22L22 17" stroke="#E10600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="#E10600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-bold text-gray-800 text-lg">Mahindra Racing</span>
        </Link>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700 transition-colors duration-200">
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              location.pathname === item.path
                ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-600 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className={`h-5 w-5 mr-3 ${location.pathname === item.path ? 'text-red-500' : 'text-gray-400'}`} />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      <button className="mt-8 w-full p-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg shadow-md hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center space-x-2">
        <PlayCircle className="h-5 w-5" />
        <span className="font-medium">Live Race</span>
      </button>
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">© 2024 Mahindra Racing. All rights reserved.</p>
      </div>
    </aside>
  );
}