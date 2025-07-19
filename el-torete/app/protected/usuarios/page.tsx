"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ArrowLeft, User, Shield } from "lucide-react"
import Link from "next/link"

export default function AdminUsuariosPage() {
  const [usuarios, setUsuarios] = useState([
    {
      id: 1,
      name: "Admin Principal",
      email: "admin@restaurante.com",
      role: "admin",
      status: "activo",
      lastLogin: "2024-01-15",
    },
    {
      id: 2,
      name: "Manager Norte",
      email: "manager.norte@restaurante.com",
      role: "manager",
      status: "activo",
      lastLogin: "2024-01-14",
    },
    {
      id: 3,
      name: "Staff Centro",
      email: "staff.centro@restaurante.com",
      role: "staff",
      status: "inactivo",
      lastLogin: "2024-01-10",
    },
  ])

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  })

  const roles = [
    { value: "admin", label: "Administrador" },
    { value: "manager", label: "Manager" },
    { value: "staff", label: "Staff" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingItem) {
      setUsuarios(
        usuarios.map((item) =>
          item.id === editingItem.id
            ? { ...item, name: formData.name, email: formData.email, role: formData.role }
            : item,
        ),
      )
    } else {
      const newItem = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: "activo",
        lastLogin: "Nunca",
      }
      setUsuarios([...usuarios, newItem])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ name: "", email: "", role: "", password: "" })
    setEditingItem(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      email: item.email,
      role: item.role,
      password: "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setUsuarios(usuarios.filter((item) => item.id !== id))
  }

  const toggleStatus = (id: number) => {
    setUsuarios(
      usuarios.map((item) =>
        item.id === id ? { ...item, status: item.status === "activo" ? "inactivo" : "activo" } : item,
      ),
    )
  }

  const getRoleIcon = (role: string) => {
    return role === "admin" ? <Shield className="h-4 w-4" /> : <User className="h-4 w-4" />
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500"
      case "manager":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
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
              <h1 className="text-2xl font-bold text-[#1F2937]">Gestión de Usuarios</h1>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Usuario
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Editar Usuario" : "Agregar Nuevo Usuario"}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="role">Rol</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            {role.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {!editingItem && (
                    <div>
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                    </div>
                  )}
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
            <CardTitle>Lista de Usuarios</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead>Último Acceso</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usuarios.map((usuario) => (
                  <TableRow key={usuario.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium">{usuario.name}</div>
                          <div className="text-sm text-gray-500">{usuario.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getRoleBadgeColor(usuario.role)} text-white`}>
                        {getRoleIcon(usuario.role)}
                        <span className="ml-1">{roles.find((role) => role.value === usuario.role)?.label}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>{usuario.lastLogin}</TableCell>
                    <TableCell>
                      <Badge
                        variant={usuario.status === "activo" ? "default" : "secondary"}
                        className={usuario.status === "activo" ? "bg-green-500" : "bg-gray-500"}
                      >
                        {usuario.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEdit(usuario)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toggleStatus(usuario.id)}>
                          {usuario.status === "activo" ? "Desactivar" : "Activar"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(usuario.id)}
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
