"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, MapPin, Clock, Star, Heart, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  // This would be fetched from the database in a real app
  const categories = [
    { value: "all", label: "All Categories" },
    { value: "cat_tools", label: "Tools & Equipment" },
    { value: "cat_electronics", label: "Electronics" },
    { value: "cat_books", label: "Books & Media" },
    { value: "cat_clothing", label: "Clothing" },
    { value: "cat_furniture", label: "Furniture" },
    { value: "cat_sports", label: "Sports & Recreation" },
    { value: "cat_skills", label: "Skills & Services" },
    { value: "cat_education", label: "Education" },
  ]

  const locations = [
    { value: "all", label: "All Areas" },
    { value: "downtown", label: "Downtown" },
    { value: "westside", label: "Westside" },
    { value: "northpark", label: "Northpark" },
    { value: "central", label: "Central" },
    { value: "eastside", label: "Eastside" },
  ]

  // This would be fetched from the database in a real app
  const items = [
    {
      id: "item_1",
      title: "Professional Camera Kit",
      description: "Canon DSLR with multiple lenses, perfect for photography enthusiasts",
      category: "Electronics",
      location: "Portland",
      distance: "0.5 miles",
      time: "2 hours ago",
      image: "/placeholder.svg?height=200&width=300",
      user: "Alex Chen",
      rating: 4.9,
      reviews: 23,
      type: "lend",
      price: "Free",
      availability: "Available",
    },
    {
      id: 2,
      title: "Guitar Lessons",
      description: "Beginner to intermediate guitar lessons, 15 years experience",
      category: "Skills",
      location: "Westside",
      distance: "1.2 miles",
      time: "4 hours ago",
      image: "/placeholder.svg?height=200&width=300",
      user: "Maria Santos",
      rating: 5.0,
      reviews: 45,
      type: "service",
      price: "$25/hour",
      availability: "Available",
    },
    {
      id: 3,
      title: "Power Drill Set",
      description: "Complete cordless drill set with bits and carrying case",
      category: "Tools",
      location: "Northpark",
      distance: "2.1 miles",
      time: "6 hours ago",
      image: "/placeholder.svg?height=200&width=300",
      user: "David Kim",
      rating: 4.8,
      reviews: 12,
      type: "lend",
      price: "Free",
      availability: "Available",
    },
    {
      id: 4,
      title: "Organic Vegetables",
      description: "Fresh vegetables from my garden - tomatoes, lettuce, herbs",
      category: "Food",
      location: "Central",
      distance: "0.8 miles",
      time: "1 day ago",
      image: "/placeholder.svg?height=200&width=300",
      user: "Sarah Johnson",
      rating: 4.9,
      reviews: 34,
      type: "share",
      price: "Free",
      availability: "Available",
    },
    {
      id: 5,
      title: "Math Tutoring",
      description: "High school and college level math tutoring, flexible schedule",
      category: "Education",
      location: "Eastside",
      distance: "3.2 miles",
      time: "1 day ago",
      image: "/placeholder.svg?height=200&width=300",
      user: "James Wilson",
      rating: 4.9,
      reviews: 67,
      type: "service",
      price: "$30/hour",
      availability: "Available",
    },
    {
      id: 6,
      title: "Vintage Books Collection",
      description: "Classic literature and rare books available for borrowing",
      category: "Books",
      location: "Downtown",
      distance: "0.7 miles",
      time: "2 days ago",
      image: "/placeholder.svg?height=200&width=300",
      user: "Emma Davis",
      rating: 4.7,
      reviews: 18,
      type: "lend",
      price: "Free",
      availability: "Available",
    },
  ]

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory =
      selectedCategory === "all" || item.category.toLowerCase().includes(selectedCategory.toLowerCase())
    const matchesLocation =
      selectedLocation === "all" || item.location.toLowerCase().includes(selectedLocation.toLowerCase())

    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              CommunityShare
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/browse" className="text-green-600 font-medium">
              Browse
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
              Events
            </Link>
            <Link href="/volunteer" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
              Volunteer
            </Link>
            <Link href="/organizations" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
              Organizations
            </Link>
          </nav>
          <Button className="bg-gradient-to-r from-green-500 to-blue-500">Share Item</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search for items, services, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.value} value={location.value}>
                    {location.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="lg:w-auto">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
              <TabsTrigger value="electronics">Electronics</TabsTrigger>
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="food">Food</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {filteredItems.length} items available near you
          </h1>
          <Select defaultValue="recent">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="distance">Closest First</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
            >
              <div className="relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-2 left-2">
                  <Badge
                    variant={item.type === "service" ? "default" : item.type === "lend" ? "secondary" : "outline"}
                    className="bg-white/90 text-gray-800"
                  >
                    {item.type === "service" ? "Service" : item.type === "lend" ? "Lend" : "Share"}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-500 text-white">{item.availability}</Badge>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    <Button size="sm" variant="secondary">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg group-hover:text-green-600 transition-colors">{item.title}</h3>
                  <span className="text-lg font-bold text-green-600">{item.price}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{item.description}</p>

                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  {item.location} • {item.distance}
                  <Clock className="w-4 h-4 ml-3 mr-1" />
                  {item.time}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-2 flex items-center justify-center text-white text-sm font-medium">
                      {item.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{item.user}</div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Star className="w-3 h-3 text-yellow-400 mr-1" />
                        {item.rating} ({item.reviews} reviews)
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-500">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Items
          </Button>
        </div>
      </div>
    </div>
  )
}
