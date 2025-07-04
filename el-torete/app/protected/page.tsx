import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Menu, Tag, MapPin, BarChart3, DollarSign } from "lucide-react"
import Link from "next/link"
import { LogoutButton } from "@/components/logout-button"

export default function AdminDashboard() {
  const stats = [
    {
      title: "Ventas del Día",
      value: "$2,450",
      change: "+12%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Hamburguesas Vendidas",
      value: "156",
      change: "+23",
      icon: BarChart3,
      color: "text-blue-600",
    },
    {
      title: "Platos en Menú",
      value: "32",
      change: "+2",
      icon: Menu,
      color: "text-purple-600",
    },
    {
      title: "Promociones Activas",
      value: "4",
      change: "+1",
      icon: Tag,
      color: "text-orange-600",
    },
  ]

  const quickActions = [
    {
      title: "Gestionar Menú",
      description: "Agregar, editar o eliminar platos del menú",
      href: "/protected/menu",
      icon: Menu,
      color: "bg-primary",
    },
    {
      title: "Promociones",
      description: "Crear y gestionar ofertas especiales",
      href: "/protected/promociones",
      icon: Tag,
      color: "bg-secondary",
    },
    {
      title: "Ubicaciones",
      description: "Administrar sucursales y ubicaciones",
      href: "/protected/ubicaciones",
      icon: MapPin,
      color: "bg-[#1F2937]",
    },
    {
      title: "Usuarios",
      description: "Gestionar cuentas de administradores",
      href: "/protected/usuarios",
      icon: Users,
      color: "bg-green-600",
    },
  ]

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#1F2937]">Panel de Administración - El Torete Burger</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/">Ver Sitio Web</Link>
              </Button>
                <LogoutButton />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-[#1F2937]">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change} vs ayer</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[#1F2937] mb-6">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link href={action.href}>
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nuevo plato agregado al menú</p>
                  <p className="text-xs text-gray-500">Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Promoción actualizada</p>
                  <p className="text-xs text-gray-500">Hace 4 horas</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nueva ubicación agregada</p>
                  <p className="text-xs text-gray-500">Hace 1 día</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
