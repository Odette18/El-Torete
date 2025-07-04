
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"

export default async function MenuPage() {
  const supabase = await createClient()

  // Obtener categorías y items del menú
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("display_order")

  const { data: menuItems } = await supabase
    .from("menu_items")
    .select(`
      *,
      categories (
        name,
        slug
      )
    `)
    .eq("is_available", true)
    .order("display_order")

  // Agrupar items por categoría
  const itemsByCategory =
    menuItems?.reduce(
      (acc, item) => {
        const categorySlug = item.categories?.slug || "otros"
        if (!acc[categorySlug]) {
          acc[categorySlug] = []
        }
        acc[categorySlug].push(item)
        return acc
      },
      {} as Record<string, typeof menuItems>,
    ) || {}

  const renderMenuItems = (items: typeof menuItems) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items?.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-secondary/20">
          <div className="aspect-video bg-gray-200">
            <img
              src={item.image_url || "/placeholder.svg?height=150&width=200"}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="p-6 bg-secondary/5">
            <h3 className="text-xl font-bold text-[#1F2937] mb-2">{item.name}</h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            {item.ingredients && item.ingredients.length > 0 && (
              <p className="text-sm text-gray-500 mb-3">
                <strong>Ingredientes:</strong> {item.ingredients.join(", ")}
              </p>
            )}
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-primary">${item.price}</span>
              <Button className="bg-primary hover:bg-primary/90">Agregar</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section
        className="relative text-white py-20 min-h-[400px] flex items-center"
        style={{
          backgroundImage: "url('/images/hero-burgers.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nuestro Menú</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Descubre todas nuestras deliciosas hamburguesas y acompañamientos preparados con ingredientes frescos
          </p>
        </div>
      </section>

      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue={categories?.[0]?.slug || "hamburguesas"} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              {categories?.map((category) => (
                <TabsTrigger key={category.id} value={category.slug}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories?.map((category) => (
              <TabsContent key={category.id} value={category.slug} className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1F2937] mb-6">{category.name}</h2>
                {renderMenuItems(itemsByCategory[category.slug] || [])}
              </TabsContent>
            ))}
          </Tabs>

        </div>
      </div>
    </div>
  )
}
