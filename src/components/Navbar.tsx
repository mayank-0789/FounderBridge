import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"

export const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleNavigation = (path: string) => {
    setIsDropdownOpen(false)
    navigate(path)
  }

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="text-2xl font-extrabold text-primary tracking-tight">
            FounderBridge
          </Link>
          <div className="flex gap-4 items-center">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Login
            </Button>
            <div className="relative" ref={dropdownRef}>
              <Button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                variant="default"
              >
                Sign Up
              </Button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white border rounded-md shadow-lg py-2">
                  <button
                    onClick={() => handleNavigation('/auth/recruiter')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                  >
                    I'm looking for candidates
                  </button>
                  <button
                    onClick={() => handleNavigation('/auth/developer')}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                  >
                    I'm looking for a job
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
