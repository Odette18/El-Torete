"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Hamburguesa Delicia",
      category: "principales",
      price: 12.99,
      description: "Carne jugosa con queso",
      status: "activo",
    },
    {
      id: 2,
      name: "Pizza Suprema",
      category: "principales",
      price: 18.99,
      description: "Pizza con pepperoni",
      status: "activo",
    },
    {
      id: 3,
      name: "Alitas BBQ",
      category: "entradas",
      price: 8.99,
      description: "Alitas con salsa barbacoa",
      status: "activo",
    },
    { id: 4, name: "Cheesecake", category: "postres", price: 6.99, description: "Pastel de queso", status: "inactivo" },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  })

  const categories = [
    { value: "entradas", label: "Entradas" },
    { value: "principales", label: "Principales" },
    { value: "postres", label: "Postres" },
    { value: "bebidas", label: "Bebidas" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      // Editar item existente
      setMenuItems(
        menuItems.map((item) =>
          item.id === editingItem.id ? { ...item, ...formData, price: Number.parseFloat(formData.price) } : item,
        ),
      )
    } else {
      // Agregar nuevo item
      const newItem = {
        id: Date.now(),
        ...formData,
        price: Number.parseFloat(formData.price),
        status: "activo",
      }
      setMenuItems([...menuItems, newItem])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ name: "", category: "", price: "", description: "" })
    setEditingItem(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      description: item.description,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
  }

  const toggleStatus = (id: number) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, status: item.status === "activo" ? "inactivo" : "activo" } : item,
      ),
    )
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Header */}
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
              <h1 className="text-2xl font-bold text-[#1F2937]">Gestión de Menú</h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Plato
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Editar Plato" : "Agregar Nuevo Plato"}</DialogTitle>
                  <DialogDescription>
                    {editingItem ? "Modifica los datos del plato" : "Completa la información del nuevo plato"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre del Plato</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Categoría</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="price">Precio ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
            <CardTitle>Lista de Platos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{categories.find((cat) => cat.value === item.category)?.label}</Badge>
                    </TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>
                      <Badge
                        variant={item.status === "activo" ? "default" : "secondary"}
                        className={item.status === "activo" ? "bg-green-500" : "bg-gray-500"}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toggleStatus(item.id)}>
                          {item.status === "activo" ? "Desactivar" : "Activar"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(item.id)}
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
