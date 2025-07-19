"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ArrowLeft, Percent } from "lucide-react"
import Link from "next/link"

export default function AdminPromocionesPage() {
  const [promociones, setPromociones] = useState([
    {
      id: 1,
      title: "2x1 en Hamburguesas",
      discount: "50",
      type: "weekly",
      description: "Todos los martes y jueves",
      validUntil: "2024-12-31",
      status: "activo",
    },
    {
      id: 2,
      title: "Combo Familiar",
      discount: "25",
      type: "combo",
      description: "Pizza + bebidas + postre",
      validUntil: "2024-12-31",
      status: "activo",
    },
    {
      id: 3,
      title: "Happy Hour",
      discount: "50",
      type: "happy-hour",
      description: "Descuento en bebidas",
      validUntil: "2024-12-31",
      status: "activo",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: "",
    discount: "",
    type: "",
    description: "",
    validUntil: "",
  })

  const promoTypes = [
    { value: "weekly", label: "Semanal" },
    { value: "combo", label: "Combo" },
    { value: "happy-hour", label: "Happy Hour" },
    { value: "daily", label: "Diario" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      setPromociones(promociones.map((item) => (item.id === editingItem.id ? { ...item, ...formData } : item)))
    } else {
      const newItem = {
        id: Date.now(),
        ...formData,
        status: "activo",
      }
      setPromociones([...promociones, newItem])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ title: "", discount: "", type: "", description: "", validUntil: "" })
    setEditingItem(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      discount: item.discount,
      type: item.type,
      description: item.description,
      validUntil: item.validUntil,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setPromociones(promociones.filter((item) => item.id !== id))
  }

  const toggleStatus = (id: number) => {
    setPromociones(
      promociones.map((item) =>
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
              <h1 className="text-2xl font-bold text-[#1F2937]">Gestión de Promociones</h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Promoción
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Editar Promoción" : "Agregar Nueva Promoción"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="discount">Descuento (%)</Label>
                    <Input
                      id="discount"
                      type="number"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Tipo</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {promoTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                  <div>
                    <Label htmlFor="validUntil">Válido hasta</Label>
                    <Input
                      id="validUntil"
                      type="date"
                      value={formData.validUntil}
                      onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
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
            <CardTitle>Lista de Promociones</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Descuento</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Válido hasta</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {promociones.map((promo) => (
                  <TableRow key={promo.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{promo.title}</div>
                        <div className="text-sm text-gray-500">{promo.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-secondary text-white">
                        <Percent className="h-3 w-3 mr-1" />
                        {promo.discount}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{promoTypes.find((type) => type.value === promo.type)?.label}</Badge>
                    </TableCell>
                    <TableCell>{promo.validUntil}</TableCell>
                    <TableCell>
                      <Badge
                        variant={promo.status === "activo" ? "default" : "secondary"}
                        className={promo.status === "activo" ? "bg-green-500" : "bg-gray-500"}
                      >
                        {promo.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(promo)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toggleStatus(promo.id)}>
                          {promo.status === "activo" ? "Desactivar" : "Activar"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(promo.id)}
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
