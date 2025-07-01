import LoginModal from "../components/auth/LoginModal"
import Navbar from "../components/layout/Navbar"
import "./global.css"

export const metadata = {
  title: "hello pop poll",
  description: "poll!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <LoginModal />
      </body>
    </html>
  )
}
