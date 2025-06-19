'use client'
import { useState } from 'react'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  function handleLogin() {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="flex h-16 items-center justify-between">
        <div>
          <a href="/">Logo</a>
        </div>
        <div>
          {isLoggedIn ? (
            <button
              className="w-20 rounded bg-gray-500 px-4 py-2 text-white"
              onClick={handleLogin}
            >
              Logout
            </button>
          ) : (
            <button
              className="w-20 rounded bg-blue-500 px-4 py-2 text-white"
              onClick={handleLogin}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
