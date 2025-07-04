"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ArrowLeft, MapPin } from "lucide-react"
import Link from "next/link"

export default function AdminUbicacionesPage() {
  const [ubicaciones, setUbicaciones] = useState([
    {
      id: 1,
      name: "Sucursal Centro",
      address: "Av. Principal 123, Centro Histórico",
      phone: "+1 (555) 123-4567",
      hours: "Lun-Dom: 11:00 AM - 10:00 PM",
      features: "Estacionamiento, Terraza, WiFi Gratis, Delivery",
      status: "activo",
    },
    {
      id: 2,
      name: "Sucursal Norte",
      address: "Blvd. Norte 456, Plaza Comercial",
      phone: "+1 (555) 234-5678",
      hours: "Lun-Dom: 12:00 PM - 11:00 PM",
      features: "Drive Thru, Área de Juegos, WiFi Gratis, Delivery",
      status: "activo",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    hours: "",
    features: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      setUbicaciones(ubicaciones.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item)))
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
        status: "activo",
      }
      setUbicaciones([...ubicaciones, newItem])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ name: "", address: "", phone: "", hours: "", features: "" })
    setEditingItem(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      address: item.address,
      phone: item.phone,
      hours: item.hours,
      features: item.features,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setUbicaciones(ubicaciones.filter((item) => item.id !== id))
  }

  const toggleStatus = (id: number) => {
    setUbicaciones(
      ubicaciones.map((item) =>
        item.id === id ? { ...item, status: item.status === "activo" ? "inactivo" : "activo" } : item,
      ),
    )
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/protected">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Link>
              </Button>
              <h1 className="text-2xl font-bold text-[#1F2937]">Gestión de Ubicaciones</h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Ubicación
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Editar Ubicación" : "Agregar Nueva Ubicación"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre de la Sucursal</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Dirección</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="hours">Horarios</Label>
                    <Input
                      id="hours"
                      value={formData.hours}
                      onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                      placeholder="Ej: Lun-Dom: 11:00 AM - 10:00 PM"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="features">Servicios (separados por coma)</Label>
                    <Textarea
                      id="features"
                      value={formData.features}
                      onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                      placeholder="Ej: Estacionamiento, WiFi Gratis, Delivery"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90">
                      {editingItem ? "Actualizar" : "Agregar"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Lista de Ubicaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Dirección</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ubicaciones.map((ubicacion) => (
                  <TableRow key={ubicacion.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">{ubicacion.name}</div>
                          <div className="text-sm text-gray-500">{ubicacion.hours}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="text-sm">{ubicacion.address}</div>
                        <div className="text-xs text-gray-500 mt-1">{ubicacion.features}</div>
                      </div>
                    </TableCell>
                    <TableCell>{ubicacion.phone}</TableCell>
                    <TableCell>
                      <Badge
                        variant={ubicacion.status === "activo" ? "default" : "secondary"}
                        className={ubicacion.status === "activo" ? "bg-green-500" : "bg-gray-500"}
                      >
                        {ubicacion.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(ubicacion)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toggleStatus(ubicacion.id)}>
                          {ubicacion.status === "activo" ? "Desactivar" : "Activar"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(ubicacion.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
