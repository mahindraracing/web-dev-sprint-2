import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, X, Home, Info, Calendar, TvMinimalPlayIcon } from 'lucide-react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef(null)
  const location = useLocation()

  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Contact', path: '/contact', icon: Info },
    { name: 'Admin', path: '/admin', icon: Calendar },
    { name: 'Stream', path: '/stream', icon: TvMinimalPlayIcon },
  ]

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuRef])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-red-600 bg-white shadow-md">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#E10600" />
              <path d="M2 17L12 22L22 17" stroke="#E10600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="#E10600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-bold text-red-600 text-sm md:text-base">Mahindra Racing</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`transition-colors hover:text-red-600 ${
                location.pathname === item.path ? 'text-red-600' : 'text-gray-700'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <div className="hidden md:block">
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
              Live Race
            </Button>
          </div>
          <nav className="flex items-center md:hidden">
            <Button
              variant="ghost"
              className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-5 w-5 text-red-600" />
              ) : (
                <Menu className="h-5 w-5 text-red-600" />
              )}
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </nav>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden" ref={menuRef}>
          <Card className="absolute left-4 right-4 mt-2 overflow-hidden">
            <CardContent className="p-0">
              <nav className="grid grid-flow-row auto-rows-max text-sm">
                {menuItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    className={`flex w-full items-center p-3 text-sm font-medium hover:bg-red-50 ${
                      location.pathname === item.path ? 'bg-red-50 text-red-600' : 'text-gray-700'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="mr-2 h-4 w-4 text-red-600" />
                    {item.name}
                  </Link>
                ))}
                <Button className="m-3 bg-red-600 text-white hover:bg-red-700">
                  Live Race
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>
      )}
    </header>
  )
}