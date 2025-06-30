import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function EventsPage() {
  // This would be fetched from the database in a real app
  const events = [
    {
      id: 1,
      title: "Community Garden Workday",
      description:
        "Join us for a morning of planting, weeding, and harvesting in our community garden. All skill levels welcome!",
      date: "Saturday, Dec 14",
      time: "9:00 AM - 12:00 PM",
      location: "Northpark Community Garden",
      attendees: 24,
      maxAttendees: 30,
      image: "/placeholder.svg?height=200&width=400",
      category: "Environment",
      organizer: "Green Neighbors",
      featured: true,
    },
    {
      id: 2,
      title: "Skill Share Workshop: Basic Home Repairs",
      description:
        "Learn essential home repair skills from experienced neighbors. Bring your questions and small projects!",
      date: "Sunday, Dec 15",
      time: "2:00 PM - 5:00 PM",
      location: "Community Center - Room A",
      attendees: 18,
      maxAttendees: 20,
      image: "/placeholder.svg?height=200&width=400",
      category: "Education",
      organizer: "DIY Collective",
    },
    {
      id: 3,
      title: "Neighborhood Cleanup Day",
      description:
        "Let's work together to keep our neighborhood beautiful. Supplies provided, just bring your enthusiasm!",
      date: "Saturday, Dec 21",
      time: "8:00 AM - 11:00 AM",
      location: "Central Park Entrance",
      attendees: 45,
      maxAttendees: 60,
      image: "/placeholder.svg?height=200&width=400",
      category: "Community",
      organizer: "Clean Streets Initiative",
    },
    {
      id: 4,
      title: "Holiday Food Drive",
      description: "Help us collect non-perishable food items for local families in need this holiday season.",
      date: "Friday, Dec 20",
      time: "10:00 AM - 6:00 PM",
      location: "Multiple Drop-off Points",
      attendees: 67,
      maxAttendees: 100,
      image: "/placeholder.svg?height=200&width=400",
      category: "Charity",
      organizer: "Helping Hands Network",
    },
    {
      id: 5,
      title: "Tech Help for Seniors",
      description: "Volunteer to help senior community members with smartphones, tablets, and computers.",
      date: "Wednesday, Dec 18",
      time: "1:00 PM - 4:00 PM",
      location: "Senior Center",
      attendees: 12,
      maxAttendees: 15,
      image: "/placeholder.svg?height=200&width=400",
      category: "Education",
      organizer: "Digital Bridge",
    },
    {
      id: 6,
      title: "Community Potluck Dinner",
      description: "Bring a dish to share and meet your neighbors! A great way to build community connections.",
      date: "Thursday, Dec 19",
      time: "6:00 PM - 9:00 PM",
      location: "Community Hall",
      attendees: 89,
      maxAttendees: 120,
      image: "/placeholder.svg?height=200&width=400",
      category: "Social",
      organizer: "Neighborhood Association",
    },
  ]

  const categories = [
    { name: "All", count: events.length, color: "bg-gray-100 text-gray-800" },
    { name: "Environment", count: 1, color: "bg-green-100 text-green-800" },
    { name: "Education", count: 2, color: "bg-blue-100 text-blue-800" },
    { name: "Community", count: 1, color: "bg-purple-100 text-purple-800" },
    { name: "Charity", count: 1, color: "bg-red-100 text-red-800" },
    { name: "Social", count: 1, color: "bg-yellow-100 text-yellow-800" },
  ]

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
            <Link href="/browse" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
              Browse
            </Link>
            <Link href="/events" className="text-green-600 font-medium">
              Events
            </Link>
            <Link href="/volunteer" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
              Volunteer
            </Link>
            <Link href="/organizations" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
              Organizations
            </Link>
          </nav>
          <Button className="bg-gradient-to-r from-green-500 to-blue-500">Create Event</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Community Events
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with neighbors, learn new skills, and make a positive impact in your community
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {categories.map((category) => (
            <Badge
              key={category.name}
              variant="secondary"
              className={`${category.color} px-4 py-2 text-sm font-medium cursor-pointer hover:opacity-80 transition-opacity`}
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>

        {/* Featured Event */}
        {events
          .filter((event) => event.featured)
          .map((event) => (
            <Card
              key={event.id}
              className="mb-8 border-2 border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20"
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-48 lg:h-full object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
                  />
                </div>
                <div className="lg:w-2/3 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className="bg-green-500 text-white">Featured Event</Badge>
                    <Badge variant="outline">{event.category}</Badge>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{event.title}</h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Calendar className="w-5 h-5 mr-2 text-green-500" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Clock className="w-5 h-5 mr-2 text-blue-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <MapPin className="w-5 h-5 mr-2 text-purple-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                      <Users className="w-5 h-5 mr-2 text-orange-500" />
                      <span>
                        {event.attendees}/{event.maxAttendees} attending
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Organized by {event.organizer}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                      <Button className="bg-gradient-to-r from-green-500 to-blue-500">Join Event</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events
            .filter((event) => !event.featured)
            .map((event) => (
              <Card
                key={event.id}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
              >
                <div className="relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {event.category}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-t-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Button size="sm" variant="secondary">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-green-600 transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {event.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Users className="w-4 h-4 mr-2" />
                      {event.attendees}/{event.maxAttendees} attending
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">by {event.organizer}</span>
                    <Button size="sm" className="bg-gradient-to-r from-green-500 to-blue-500">
                      Join Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl text-white">
          <h2 className="text-3xl font-bold mb-4">Want to organize an event?</h2>
          <p className="text-xl mb-6 opacity-90">Bring your community together by creating your own event</p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
            Create Your Event
          </Button>
        </div>
      </div>
    </div>
  )
}
