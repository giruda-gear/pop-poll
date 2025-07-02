'use client'

import { useLoginModalStore } from '../../stores/useLoginModalStore'
import { XMarkIcon } from '@heroicons/react/20/solid'
import LoginForm from './LoginForm'

export default function LoginModal() {
  const { isOpen, closeModal } = useLoginModalStore()

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-modal flex items-center justify-center bg-black bg-opacity-30"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative w-80 rounded-md bg-white p-6">
        <button
          onClick={closeModal}
          className="absolute right-0 top-0 rounded-md p-2 hover:bg-gray-200"
        >
          <XMarkIcon className="h-5 w-5 text-gray-700" />
        </button>

        <h2 className="mb-4 text-xl font-semibold">Login</h2>
        <LoginForm />
      </div>
    </div>
  )
}
