"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Heart, Building2, Upload, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function OrganizationRegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    mission: "",
    description: "",
    taxId: "",
    foundedYear: "",
    size: "",
    type: "",
    logo: null as File | null,
    coverImage: null as File | null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileChange = (field: string, files: FileList | null) => {
    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [field]: files[0],
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your API
      console.log("Form submitted:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to the organization dashboard
      router.push("/organizations/dashboard")
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
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
            Register Your Organization
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Join CommunityShare to post volunteer opportunities and connect with passionate community members ready to
            support your cause.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= s ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {s}
                </div>
                {s < 2 && <div className={`w-12 h-1 mx-2 ${step > s ? "bg-blue-500" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">{step === 1 ? "Organization Information" : "Additional Details"}</CardTitle>
            <CardDescription>
              {step === 1 ? "Tell us about your organization" : "A few more details to complete your profile"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Basic Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Organization Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://www.example.org"
                    />
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

                  <div>
                    <Label htmlFor="mission">Mission Statement *</Label>
                    <Textarea
                      id="mission"
                      value={formData.mission}
                      onChange={(e) => handleInputChange("mission", e.target.value)}
                      placeholder="Describe your organization's mission and goals..."
                      required
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Organization Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Tell us more about your organization, its history, and the communities you serve..."
                      required
                      rows={5}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Additional Details */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="taxId">Tax ID / EIN (for verification)</Label>
                    <Input
                      id="taxId"
                      value={formData.taxId}
                      onChange={(e) => handleInputChange("taxId", e.target.value)}
                      placeholder="e.g., 12-3456789"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      For US-based nonprofits. This helps us verify your organization's status.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="foundedYear">Year Founded</Label>
                      <Input
                        id="foundedYear"
                        type="number"
                        value={formData.foundedYear}
                        onChange={(e) => handleInputChange("foundedYear", e.target.value)}
                        placeholder="e.g., 1995"
                      />
                    </div>
                    <div>
                      <Label htmlFor="size">Organization Size</Label>
                      <Select value={formData.size} onValueChange={(value) => handleInputChange("size", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SMALL">Small (1-10 staff)</SelectItem>
                          <SelectItem value="MEDIUM">Medium (11-50 staff)</SelectItem>
                          <SelectItem value="LARGE">Large (50+ staff)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="type">Organization Type</Label>
                      <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NONPROFIT">Nonprofit / 501(c)(3)</SelectItem>
                          <SelectItem value="GOVERNMENT">Government Agency</SelectItem>
                          <SelectItem value="EDUCATION">Educational Institution</SelectItem>
                          <SelectItem value="RELIGIOUS">Religious Organization</SelectItem>
                          <SelectItem value="COMMUNITY">Community Group</SelectItem>
                          <SelectItem value="OTHER">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="logo">Organization Logo</Label>
                      <div className="mt-1 flex items-center">
                        <div className="w-16 h-16 rounded-md border border-gray-300 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                          {formData.logo ? (
                            <img
                              src={URL.createObjectURL(formData.logo) || "/placeholder.svg"}
                              alt="Logo preview"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Building2 className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <label
                          htmlFor="logo-upload"
                          className="ml-5 bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                        >
                          <Upload className="w-4 h-4 inline-block mr-1" />
                          Upload
                        </label>
                        <input
                          id="logo-upload"
                          name="logo-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => handleFileChange("logo", e.target.files)}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Recommended size: 400x400px. Max 2MB.</p>
                    </div>

                    <div>
                      <Label htmlFor="coverImage">Cover Image</Label>
                      <div className="mt-1 flex flex-col">
                        <div className="w-full h-32 rounded-md border border-gray-300 flex items-center justify-center bg-gray-100 dark:bg-gray-800 overflow-hidden">
                          {formData.coverImage ? (
                            <img
                              src={URL.createObjectURL(formData.coverImage) || "/placeholder.svg"}
                              alt="Cover image preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Upload className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <label
                          htmlFor="cover-upload"
                          className="mt-2 self-start bg-white dark:bg-gray-700 py-2 px-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
                        >
                          <Upload className="w-4 h-4 inline-block mr-1" />
                          Upload Cover Image
                        </label>
                        <input
                          id="cover-upload"
                          name="cover-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => handleFileChange("coverImage", e.target.files)}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Recommended size: 1200x400px. Max 5MB.</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-6">
                    <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">What happens next?</h3>
                    <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                      <li>• Your organization profile will be created immediately</li>
                      <li>• You can start posting volunteer opportunities right away</li>
                      <li>• Our team will review your organization for verification (typically 1-2 business days)</li>
                      <li>• Verified organizations receive a badge and higher visibility in search results</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {step === 1 ? (
                  <Button type="button" variant="outline" asChild>
                    <Link href="/">Cancel</Link>
                  </Button>
                ) : (
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                )}

                {step === 1 ? (
                  <Button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-purple-500"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Complete Registration"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
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
