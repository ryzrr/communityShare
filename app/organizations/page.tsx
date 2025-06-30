import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Building2, Users, Calendar, MapPin, ArrowRight, CheckCircle, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function OrganizationsPage() {
  // Sample organizations data - in a real app, this would come from the database
  const organizations = [
    {
      id: "org_1",
      name: "Green Portland Initiative",
      description:
        "A community-focused environmental organization dedicated to creating a more sustainable Portland through education, action, and advocacy.",
      logo: "/placeholder.svg?height=100&width=100",
      city: "Portland",
      state: "OR",
      verified: true,
      activeOpportunities: 5,
      categories: ["Environmental", "Education"],
    },
    {
      id: "org_2",
      name: "Portland Education Alliance",
      description:
        "Supporting educational excellence and equity in Portland schools through tutoring, mentoring, and resource provision.",
      logo: "/placeholder.svg?height=100&width=100",
      city: "Portland",
      state: "OR",
      verified: true,
      activeOpportunities: 3,
      categories: ["Education", "Youth"],
    },
    {
      id: "org_3",
      name: "Helping Hands Network",
      description:
        "A volunteer-driven organization focused on addressing food insecurity and supporting vulnerable populations in our community.",
      logo: "/placeholder.svg?height=100&width=100",
      city: "Portland",
      state: "OR",
      verified: true,
      activeOpportunities: 2,
      categories: ["Food", "Community"],
    },
    {
      id: "org_4",
      name: "Digital Inclusion Network",
      description:
        "Bridging the digital divide by providing technology education and support to underserved communities.",
      logo: "/placeholder.svg?height=100&width=100",
      city: "Portland",
      state: "OR",
      verified: false,
      activeOpportunities: 1,
      categories: ["Technology", "Education"],
    },
    {
      id: "org_5",
      name: "Habitat for Humanity Portland",
      description:
        "Building homes, communities, and hope by bringing people together to create affordable housing solutions.",
      logo: "/placeholder.svg?height=100&width=100",
      city: "Portland",
      state: "OR",
      verified: true,
      activeOpportunities: 4,
      categories: ["Construction", "Housing"],
    },
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
            <Link href="/events" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
              Events
            </Link>
            <Link href="/volunteer" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
              Volunteer
            </Link>
            <Link href="/organizations" className="text-green-600 font-medium">
              Organizations
            </Link>
          </nav>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/organizations/login">Organization Login</Link>
            </Button>
            <Button className="bg-gradient-to-r from-green-500 to-blue-500" asChild>
              <Link href="/organizations/register">Register Organization</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Partner Organizations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover organizations making a difference in your community and find volunteer opportunities that match
            your interests.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for organizations by name, mission, or location..."
            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
          />
        </div>

        {/* Organizations List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {organizations.map((org) => (
            <Card key={org.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
                  <div className="w-24 h-24 relative">
                    <Image src={org.logo || "/placeholder.svg"} alt={org.name} fill className="object-contain" />
                  </div>
                </div>
                <div className="md:w-3/4 p-6">
                  <div className="flex items-center mb-2">
                    <h3 className="text-xl font-bold mr-2">{org.name}</h3>
                    {org.verified && (
                      <Badge className="bg-blue-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{org.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {org.categories.map((category) => (
                      <Badge key={category} variant="outline">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-1" />
                        {org.city}, {org.state}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {org.activeOpportunities} opportunities
                      </div>
                    </div>
                    <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500" asChild>
                      <Link href={`/organizations/${org.id}`}>
                        View
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Represent an Organization?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join CommunityShare to post volunteer opportunities and connect with passionate community members.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-blue-600" asChild>
                <Link href="/organizations/login">
                  <Building2 className="w-5 h-5 mr-2" />
                  Organization Login
                </Link>
              </Button>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50" asChild>
                <Link href="/organizations/register">
                  <Users className="w-5 h-5 mr-2" />
                  Register Your Organization
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
