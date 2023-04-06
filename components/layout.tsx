import Navbar from './navbar'
import Footer from './footer'
import 'tailwindcss/tailwind.css'

export default function Layout({ children }) {
    return (
        <div>
            <div className="bg-brown h-screen">
                <Navbar />
                <main>{children}</main>
            </div>
            <Footer />
        </div>
    )
}