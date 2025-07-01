'use client'

import { useLoginModalStore } from '../../stores/useLoginModalStore'

export default function LoginModal() {
  const { isOpen, closeModal } = useLoginModalStore()

  if (!isOpen) return null

  return (
    <div
      className="z-modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-80 rounded-lg bg-white p-6">
        <button
          type="button"
          className="absolute right-3 top-3"
          onClick={closeModal}
        >
          ✕
        </button>
        <h2 className="mb-4 text-xl font-semibold">Login</h2>
        <form>
          <input type="text" placeholder="email" className="mb-3 w-full" />
          <input
            type="password"
            placeholder="password"
            className="mb-4 w-full"
          />
        </form>
        <button
          type="submit"
          className="w-full rounded-md bg-purple-600 py-2 font-semibold text-white hover:bg-purple-700"
        >
          Login
        </button>
      </div>
    </div>
  )
}
