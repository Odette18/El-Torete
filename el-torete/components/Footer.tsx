import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#1F2937] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información de la empresa */}
          <div>
            <h3 className="text-xl font-bold mb-4">El Torete Burger</h3>
            <p className="text-gray-300 mb-4">
              Las mejores hamburguesas y papas fritas de la ciudad. Ingredientes frescos, sabores únicos y la calidad
              que nos caracteriza.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-secondary" />
                <span className="text-gray-300">Av. Principal 123, Ciudad</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-secondary" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-secondary" />
                <span className="text-gray-300">info@eltoreteburger.com</span>
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div>
            <h3 className="text-xl font-bold mb-4">Horarios</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Lunes - Viernes:</span>
                <span>11:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sábados:</span>
                <span>12:00 PM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Domingos:</span>
                <span>12:00 PM - 9:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2024 El Torete Burger. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
