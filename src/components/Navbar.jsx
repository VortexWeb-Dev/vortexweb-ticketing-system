import React from 'react'
import DarkModeToggle from './DarkModeToggle'
import { Search, Bell } from 'lucide-react'
const Navbar = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center justify-between">
            <div className="flex items-center w-1/2">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="Search tickets..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search
                  size={18}
                  className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <DarkModeToggle/>
              <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 relative">
                <Bell size={20} />
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-medium">
                  JD
                </div>
              </div>
            </div>
          </header>
  )
}

export default Navbar