"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  MapPin,
  Clock,
  Calendar,
  Users,
  Leaf,
  GraduationCap,
  Hammer,
  Utensils,
  Baby,
  Stethoscope,
  BookOpen,
  Music,
  Palette,
  Globe,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    dateOfBirth: "",
    emergencyContact: "",
    emergencyPhone: "",
    availability: {
      weekdays: false,
      weekends: false,
      mornings: false,
      afternoons: false,
      evenings: false,
    },
    interests: [] as string[],
    skills: [] as string[],
    experience: "",
    transportation: "",
    languages: [] as string[],
    commitment: "",
    motivation: "",
    backgroundCheck: false,
    newsletter: false,
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const volunteerCategories = [
    { id: "environment", name: "Environmental", icon: Leaf, color: "bg-green-100 text-green-800" },
    { id: "education", name: "Education & Tutoring", icon: GraduationCap, color: "bg-blue-100 text-blue-800" },
    { id: "construction", name: "Construction & Repair", icon: Hammer, color: "bg-orange-100 text-orange-800" },
    { id: "food", name: "Food & Nutrition", icon: Utensils, color: "bg-red-100 text-red-800" },
    { id: "childcare", name: "Childcare & Youth", icon: Baby, color: "bg-pink-100 text-pink-800" },
    { id: "healthcare", name: "Healthcare & Wellness", icon: Stethoscope, color: "bg-purple-100 text-purple-800" },
    { id: "literacy", name: "Literacy & Reading", icon: BookOpen, color: "bg-indigo-100 text-indigo-800" },
    { id: "arts", name: "Arts & Culture", icon: Palette, color: "bg-yellow-100 text-yellow-800" },
    { id: "music", name: "Music & Performance", icon: Music, color: "bg-cyan-100 text-cyan-800" },
    { id: "community", name: "Community Outreach", icon: Globe, color: "bg-teal-100 text-teal-800" },
    { id: "safety", name: "Safety & Emergency", icon: Shield, color: "bg-gray-100 text-gray-800" },
  ]

  const skills = [
    "Teaching",
    "Mentoring",
    "Public Speaking",
    "Writing",
    "Photography",
    "Video Editing",
    "Web Development",
    "Graphic Design",
    "Social Media",
    "Event Planning",
    "Fundraising",
    "Carpentry",
    "Plumbing",
    "Electrical Work",
    "Gardening",
    "Cooking",
    "First Aid",
    "CPR Certified",
    "Childcare",
    "Elder Care",
    "Translation",
    "Administrative",
    "Data Entry",
    "Customer Service",
    "Sales",
    "Marketing",
    "Accounting",
    "Legal",
  ]

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Chinese",
    "Japanese",
    "Korean",
    "Arabic",
    "Hindi",
    "Russian",
    "Dutch",
    "Swedish",
    "Other",
  ]

  const suggestedActivities = [
    {
      id: 1,
      title: "Community Garden Cleanup",
      organization: "Green Portland Initiative",
      type: "Environmental",
      date: "This Saturday",
      time: "9:00 AM - 1:00 PM",
      location: "Laurelhurst Park",
      volunteers: 15,
      maxVolunteers: 25,
      description: "Help maintain our community garden by weeding, planting, and general cleanup.",
      skills: ["Gardening", "Physical Labor"],
      commitment: "One-time",
      image: "/placeholder.svg?height=200&width=300",
      match: 95,
    },
    {
      id: 2,
      title: "Math Tutoring Program",
      organization: "Portland Education Alliance",
      type: "Education",
      date: "Ongoing - Tuesdays",
      time: "4:00 PM - 6:00 PM",
      location: "Roosevelt High School",
      volunteers: 8,
      maxVolunteers: 12,
      description: "Provide one-on-one math tutoring for high school students.",
      skills: ["Teaching", "Mathematics"],
      commitment: "Weekly",
      image: "/placeholder.svg?height=200&width=300",
      match: 88,
    },
    {
      id: 3,
      title: "Food Bank Sorting",
      organization: "Oregon Food Bank",
      type: "Food & Nutrition",
      date: "Next Wednesday",
      time: "10:00 AM - 2:00 PM",
      location: "SE Portland Warehouse",
      volunteers: 22,
      maxVolunteers: 30,
      description: "Sort and package food donations for distribution to families in need.",
      skills: ["Organization", "Physical Labor"],
      commitment: "One-time",
      image: "/placeholder.svg?height=200&width=300",
      match: 82,
    },
    {
      id: 4,
      title: "Senior Technology Help",
      organization: "Digital Inclusion Network",
      type: "Education",
      date: "Every Friday",
      time: "2:00 PM - 4:00 PM",
      location: "Multnomah Community Center",
      volunteers: 6,
      maxVolunteers: 10,
      description: "Help seniors learn to use smartphones, tablets, and computers.",
      skills: ["Teaching", "Technology", "Patience"],
      commitment: "Weekly",
      image: "/placeholder.svg?height=200&width=300",
      match: 90,
    },
    {
      id: 5,
      title: "Habitat for Humanity Build",
      organization: "Habitat for Humanity Portland",
      type: "Construction",
      date: "Next Saturday",
      time: "8:00 AM - 4:00 PM",
      location: "SE Portland Build Site",
      volunteers: 18,
      maxVolunteers: 20,
      description: "Help build affordable housing for local families. No experience required.",
      skills: ["Construction", "Physical Labor", "Teamwork"],
      commitment: "One-time",
      image: "/placeholder.svg?height=200&width=300",
      match: 75,
    },
    {
      id: 6,
      title: "Reading Buddies Program",
      organization: "Portland Public Library",
      type: "Literacy",
      date: "Ongoing - Thursdays",
      time: "3:30 PM - 5:00 PM",
      location: "Central Library",
      volunteers: 12,
      maxVolunteers: 20,
      description: "Read with elementary school children to improve their literacy skills.",
      skills: ["Reading", "Childcare", "Patience"],
      commitment: "Weekly",
      image: "/placeholder.svg?height=200&width=300",
      match: 85,
    },
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAvailabilityChange = (field: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        [field]: checked,
      },
    }))
  }

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter((item) => item !== value),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuggestions(true)
    // Here you would typically send the data to your API
    console.log("Form submitted:", formData)
  }

  const getMatchedActivities = () => {
    return suggestedActivities
      .filter((activity) => {
        // Simple matching logic based on interests
        return formData.interests.some(
          (interest) =>
            activity.type.toLowerCase().includes(interest.toLowerCase()) ||
            activity.skills.some((skill) => formData.skills.includes(skill)),
        )
      })
      .sort((a, b) => b.match - a.match)
  }

  if (showSuggestions) {
    const matchedActivities = getMatchedActivities()

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
              <Link href="/volunteer" className="text-green-600 font-medium">
                Volunteer
              </Link>
              <Link href="/organizations" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
                Organizations
              </Link>
            </nav>
            <Button variant="outline" onClick={() => setShowSuggestions(false)}>
              Edit Preferences
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Success Message */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Thank You, {formData.name}!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Based on your preferences, we've found {matchedActivities.length} volunteer opportunities that match your
              interests and availability.
            </p>
          </div>

          {/* Matched Activities */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">🎯 Perfect Matches for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedActivities.slice(0, 3).map((activity) => (
                <Card
                  key={activity.id}
                  className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-green-200"
                >
                  <div className="relative">
                    <Image
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 text-white">{activity.match}% Match</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{activity.type}</Badge>
                      <Badge variant="secondary">{activity.commitment}</Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{activity.organization}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{activity.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {activity.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        {activity.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        {activity.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="w-4 h-4 mr-2" />
                        {activity.volunteers}/{activity.maxVolunteers} volunteers
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {activity.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Suggestions */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Other Opportunities You Might Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedActivities.slice(3).map((activity) => (
                <Card key={activity.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="relative">
                    <Image
                      src={activity.image || "/placeholder.svg"}
                      alt={activity.title}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {activity.match}% Match
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{activity.type}</Badge>
                      <Badge variant="secondary">{activity.commitment}</Badge>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{activity.organization}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{activity.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {activity.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-4 h-4 mr-2" />
                        {activity.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        {activity.location}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
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
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/browse" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
              Browse
            </Link>
            <Link href="/events" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
              Events
            </Link>
            <Link href="/volunteer" className="text-green-600 font-medium">
              Volunteer
            </Link>
            <Link href="/organizations" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
              Organizations
            </Link>
          </nav>
          <Button className="bg-gradient-to-r from-green-500 to-blue-500">Join Community</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Make a Difference in Your Community
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join thousands of volunteers making a positive impact. Tell us about yourself and we'll match you with the
            perfect opportunities.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step ? "bg-green-500 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 4 && <div className={`w-12 h-1 mx-2 ${currentStep > step ? "bg-green-500" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">
              {currentStep === 1 && "Personal Information"}
              {currentStep === 2 && "Availability & Preferences"}
              {currentStep === 3 && "Skills & Experience"}
              {currentStep === 4 && "Final Details"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Let's start with some basic information about you"}
              {currentStep === 2 && "When are you available and what interests you?"}
              {currentStep === 3 && "What skills and experience do you bring?"}
              {currentStep === 4 && "Just a few more details to complete your profile"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      placeholder="Street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Availability & Preferences */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">When are you available? *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                      {Object.entries({
                        weekdays: "Weekdays",
                        weekends: "Weekends",
                        mornings: "Mornings",
                        afternoons: "Afternoons",
                        evenings: "Evenings",
                      }).map(([key, label]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox
                            id={key}
                            checked={formData.availability[key as keyof typeof formData.availability]}
                            onCheckedChange={(checked) => handleAvailabilityChange(key, checked as boolean)}
                          />
                          <Label htmlFor={key}>{label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">What type of volunteer work interests you? *</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                      {volunteerCategories.map((category) => {
                        const Icon = category.icon
                        return (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={category.id}
                              checked={formData.interests.includes(category.id)}
                              onCheckedChange={(checked) =>
                                handleArrayChange("interests", category.id, checked as boolean)
                              }
                            />
                            <Label htmlFor={category.id} className="flex items-center space-x-2 cursor-pointer">
                              <Icon className="w-4 h-4" />
                              <span>{category.name}</span>
                            </Label>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="commitment">How often would you like to volunteer?</Label>
                    <Select
                      value={formData.commitment}
                      onValueChange={(value) => handleInputChange("commitment", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your preferred commitment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one-time">One-time events</SelectItem>
                        <SelectItem value="weekly">Weekly commitment</SelectItem>
                        <SelectItem value="bi-weekly">Bi-weekly commitment</SelectItem>
                        <SelectItem value="monthly">Monthly commitment</SelectItem>
                        <SelectItem value="flexible">Flexible schedule</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="transportation">Do you have reliable transportation?</Label>
                    <Select
                      value={formData.transportation}
                      onValueChange={(value) => handleInputChange("transportation", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select transportation method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="car">Personal vehicle</SelectItem>
                        <SelectItem value="public">Public transportation</SelectItem>
                        <SelectItem value="bike">Bicycle</SelectItem>
                        <SelectItem value="walk">Walking distance only</SelectItem>
                        <SelectItem value="ride">Need ride assistance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Step 3: Skills & Experience */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">What skills do you have? (Select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3 max-h-64 overflow-y-auto">
                      {skills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={skill}
                            checked={formData.skills.includes(skill)}
                            onCheckedChange={(checked) => handleArrayChange("skills", skill, checked as boolean)}
                          />
                          <Label htmlFor={skill} className="text-sm">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Languages you speak</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
                      {languages.map((language) => (
                        <div key={language} className="flex items-center space-x-2">
                          <Checkbox
                            id={language}
                            checked={formData.languages.includes(language)}
                            onCheckedChange={(checked) => handleArrayChange("languages", language, checked as boolean)}
                          />
                          <Label htmlFor={language} className="text-sm">
                            {language}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="experience">Previous volunteer experience (optional)</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                      placeholder="Tell us about any previous volunteer work, relevant experience, or why you want to volunteer..."
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Final Details */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="motivation">What motivates you to volunteer?</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => handleInputChange("motivation", e.target.value)}
                      placeholder="Share what drives your passion for helping others and making a difference..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="backgroundCheck"
                        checked={formData.backgroundCheck}
                        onCheckedChange={(checked) => handleInputChange("backgroundCheck", checked)}
                      />
                      <Label htmlFor="backgroundCheck" className="text-sm">
                        I consent to a background check if required for certain volunteer positions
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newsletter"
                        checked={formData.newsletter}
                        onCheckedChange={(checked) => handleInputChange("newsletter", checked)}
                      />
                      <Label htmlFor="newsletter" className="text-sm">
                        I'd like to receive updates about volunteer opportunities and community events
                      </Label>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">What happens next?</h3>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• We'll match you with volunteer opportunities based on your preferences</li>
                      <li>• You'll receive personalized recommendations via email</li>
                      <li>• Organizations may contact you directly for suitable positions</li>
                      <li>• You can update your preferences anytime in your profile</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>

                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                    className="bg-gradient-to-r from-green-500 to-blue-500"
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="bg-gradient-to-r from-green-500 to-blue-500">
                    Find My Opportunities
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
