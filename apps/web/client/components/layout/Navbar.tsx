'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useLoginModalStore } from '../../stores/useLoginModalStore'
import { useSession } from 'next-auth/react'

export default function Navbar() {
  const openModal = useLoginModalStore((state) => state.openModal)
  const { data: session, status } = useSession()

  return (
    <nav className="bg-white shadow-md">
      <div className="flex h-16 items-center justify-between">
        <Link href="/" aria-label="Go to homepage">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={200}
            height={105}
            className="max-h-12 w-auto p-1"
          />
        </Link>
        <div>
          {session ? (
            <button
              className="w-20 rounded bg-gray-500 px-4 py-2 font-semibold text-white"
            >
              Logout
            </button>
          ) : (
            <button
              className="w-20 rounded bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700"
              onClick={openModal}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
