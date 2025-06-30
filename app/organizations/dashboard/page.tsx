"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  Calendar,
  Clock,
  MapPin,
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock data for the dashboard
const organizationData = {
  id: "org_1",
  name: "Green Portland Initiative",
  logo: "/placeholder.svg?height=100&width=100",
  coverImage: "/placeholder.svg?height=300&width=1200",
  verified: true,
  city: "Portland",
  state: "OR",
  stats: {
    activeOpportunities: 5,
    totalVolunteers: 87,
    pendingApplications: 12,
    completedOpportunities: 23,
  },
  notifications: [
    {
      id: "notif_1",
      type: "application",
      message: "New volunteer application from Sarah Johnson",
      time: "2 hours ago",
    },
    {
      id: "notif_2",
      type: "message",
      message: "Message from David Kim regarding Community Garden Cleanup",
      time: "5 hours ago",
    },
    {
      id: "notif_3",
      type: "system",
      message: "Your organization has been verified! You now have a verified badge.",
      time: "1 day ago",
    },
  ],
}

const opportunities = [
  {
    id: "opp_1",
    title: "Community Garden Cleanup",
    status: "ACTIVE",
    startDate: "2024-06-15",
    location: "Laurelhurst Park",
    volunteers: {
      applied: 15,
      approved: 12,
      needed: 25,
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "opp_2",
    title: "Tree Planting Event",
    status: "ACTIVE",
    startDate: "2024-06-22",
    location: "Forest Park",
    volunteers: {
      applied: 8,
      approved: 8,
      needed: 20,
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "opp_3",
    title: "Environmental Education Workshop",
    status: "DRAFT",
    startDate: "2024-07-05",
    location: "Community Center",
    volunteers: {
      applied: 0,
      approved: 0,
      needed: 5,
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "opp_4",
    title: "River Cleanup Project",
    status: "COMPLETED",
    startDate: "2024-05-20",
    location: "Willamette River",
    volunteers: {
      applied: 32,
      approved: 30,
      needed: 30,
    },
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "opp_5",
    title: "Sustainable Living Workshop",
    status: "CANCELLED",
    startDate: "2024-06-10",
    location: "Portland Library",
    volunteers: {
      applied: 12,
      approved: 0,
      needed: 15,
    },
    image: "/placeholder.svg?height=200&width=300",
  },
]

const applications = [
  {
    id: "app_1",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    opportunity: "Community Garden Cleanup",
    appliedDate: "2024-06-10",
    status: "PENDING",
    message: "I have experience with gardening and would love to help with this project!",
  },
  {
    id: "app_2",
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    opportunity: "Community Garden Cleanup",
    appliedDate: "2024-06-09",
    status: "APPROVED",
    message: "I'm passionate about community gardens and have volunteered for similar projects before.",
  },
  {
    id: "app_3",
    user: {
      name: "Jessica Williams",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    opportunity: "Tree Planting Event",
    appliedDate: "2024-06-11",
    status: "PENDING",
    message: "I'd like to help with the tree planting event. I have my own gardening tools I can bring.",
  },
  {
    id: "app_4",
    user: {
      name: "Robert Garcia",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    opportunity: "Tree Planting Event",
    appliedDate: "2024-06-08",
    status: "REJECTED",
    message: "I'm interested in helping with this event. I have weekends free.",
  },
]

export default function OrganizationDashboardPage() {
  const [activeTab, setActiveTab] = useState("opportunities")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge className="bg-green-500">Active</Badge>
      case "DRAFT":
        return <Badge variant="outline">Draft</Badge>
      case "COMPLETED":
        return <Badge variant="secondary">Completed</Badge>
      case "CANCELLED":
        return <Badge variant="destructive">Cancelled</Badge>
      case "FILLED":
        return <Badge className="bg-blue-500">Filled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getApplicationStatusBadge = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <Badge className="bg-green-500">Approved</Badge>
      case "PENDING":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Pending
          </Badge>
        )
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>
      case "WAITLISTED":
        return <Badge variant="secondary">Waitlisted</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getApplicationStatusIcon = (status: string) => {
    switch (status) {
      case "APPROVED":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "PENDING":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />
      case "REJECTED":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return null
    }
  }

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
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
              <span className="sr-only">Notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Organization Header */}
      <div className="relative">
        <div className="h-48 w-full bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
          {organizationData.coverImage && (
            <Image
              src={organizationData.coverImage || "/placeholder.svg"}
              alt={organizationData.name}
              fill
              className="object-cover opacity-50"
            />
          )}
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end space-y-4 md:space-y-0 md:space-x-4 -mt-16 md:-mt-12 relative z-10">
            <div className="w-24 h-24 rounded-xl border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800 overflow-hidden shadow-lg">
              {organizationData.logo && (
                <Image
                  src={organizationData.logo || "/placeholder.svg"}
                  alt={organizationData.name}
                  width={96}
                  height={96}
                />
              )}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{organizationData.name}</h1>
                {organizationData.verified && (
                  <Badge className="ml-2 bg-blue-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {organizationData.city}, {organizationData.state}
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href="/organizations/settings">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500" asChild>
                <Link href="/organizations/opportunities/create">
                  <Plus className="w-4 h-4 mr-2" />
                  New Opportunity
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Opportunities</p>
                <h3 className="text-2xl font-bold">{organizationData.stats.activeOpportunities}</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Volunteers</p>
                <h3 className="text-2xl font-bold">{organizationData.stats.totalVolunteers}</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending Applications</p>
                <h3 className="text-2xl font-bold">{organizationData.stats.pendingApplications}</h3>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                <h3 className="text-2xl font-bold">{organizationData.stats.completedOpportunities}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="opportunities" onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Volunteer Opportunities</h2>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500" asChild>
                <Link href="/organizations/opportunities/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="overflow-hidden">
                  <div className="relative h-40">
                    <Image
                      src={opportunity.image || "/placeholder.svg"}
                      alt={opportunity.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">{getStatusBadge(opportunity.status)}</div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{opportunity.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(opportunity.startDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        {opportunity.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        {opportunity.volunteers.approved}/{opportunity.volunteers.needed} volunteers
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/organizations/opportunities/${opportunity.id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link href={`/organizations/opportunities/${opportunity.id}/edit`}>
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-none text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Volunteer Applications</h2>
              <div className="flex space-x-2">
                <Button variant="outline">Filter</Button>
                <Button variant="outline">Export</Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Volunteer</th>
                        <th className="text-left p-4">Opportunity</th>
                        <th className="text-left p-4">Applied</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((application) => (
                        <tr key={application.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full overflow-hidden">
                                <Image
                                  src={application.user.avatar || "/placeholder.svg"}
                                  alt={application.user.name}
                                  width={40}
                                  height={40}
                                />
                              </div>
                              <span className="font-medium">{application.user.name}</span>
                            </div>
                          </td>
                          <td className="p-4">{application.opportunity}</td>
                          <td className="p-4">{new Date(application.appliedDate).toLocaleDateString()}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              {getApplicationStatusIcon(application.status)}
                              {getApplicationStatusBadge(application.status)}
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              {application.status === "PENDING" && (
                                <>
                                  <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                    Approve
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  >
                                    Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Analytics & Impact</h2>
              <Button variant="outline">Export Report</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Volunteer Engagement</CardTitle>
                  <CardDescription>Applications and participation over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                    <BarChart3 className="w-16 h-16 text-gray-400" />
                    <span className="ml-2 text-gray-500">Chart visualization would appear here</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Impact Metrics</CardTitle>
                  <CardDescription>Measuring your organization's community impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Volunteer Hours Contributed</h4>
                      <div className="flex items-end space-x-2">
                        <span className="text-3xl font-bold">487</span>
                        <span className="text-sm text-green-600">+12% from last month</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Community Members Reached</h4>
                      <div className="flex items-end space-x-2">
                        <span className="text-3xl font-bold">1,250</span>
                        <span className="text-sm text-green-600">+8% from last month</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Environmental Impact</h4>
                      <div className="flex items-end space-x-2">
                        <span className="text-3xl font-bold">350</span>
                        <span className="text-xs text-gray-500">lbs of waste collected</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
