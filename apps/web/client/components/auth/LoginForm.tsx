import { useState } from 'react'
import { signIn } from 'next-auth/react'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (res?.error) {
      setError('Invalid email or password')
    } else if (res?.ok) {
      window.location.href = '/'
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={email}
        placeholder="email"
        className="mb-3 w-full"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="password"
        className="mb-4 w-full"
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="mb-2 text-red-500">{error}</p>}
      <button
        type="submit"
        className="w-full rounded-md bg-purple-600 py-2 font-semibold text-white hover:bg-purple-700"
      >
        Login
      </button>
    </form>
  )
}
