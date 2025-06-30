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
import { Separator } from "@/components/ui/separator"
import { Heart, Upload, ArrowRight, Save, X, Info, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateOpportunityPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    responsibilities: "",
    benefits: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    isRecurring: false,
    recurrencePattern: "",
    location: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    isRemote: false,
    minAge: "",
    maxSpots: "",
    skills: [] as string[],
    categories: [] as string[],
    images: [] as File[],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const volunteerCategories = [
    { id: "environment", name: "Environmental" },
    { id: "education", name: "Education & Tutoring" },
    { id: "construction", name: "Construction & Repair" },
    { id: "food", name: "Food & Nutrition" },
    { id: "childcare", name: "Childcare & Youth" },
    { id: "healthcare", name: "Healthcare & Wellness" },
    { id: "literacy", name: "Literacy & Reading" },
    { id: "arts", name: "Arts & Culture" },
    { id: "music", name: "Music & Performance" },
    { id: "community", name: "Community Outreach" },
    { id: "safety", name: "Safety & Emergency" },
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

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
      }))
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your API
      console.log("Form submitted:", { ...formData, isDraft })

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
            <Link href="/organizations/dashboard" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
              Dashboard
            </Link>
            <Link href="/organizations/opportunities" className="text-blue-600 font-medium">
              Opportunities
            </Link>
            <Link href="/organizations/settings" className="text-gray-600 hover:text-gray-900 dark:text-gray-300">
              Settings
            </Link>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Volunteer Opportunity
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Share details about your volunteer opportunity to connect with passionate community members.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && <div className={`w-12 h-1 mx-2 ${currentStep > step ? "bg-blue-500" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">
              {currentStep === 1 && "Basic Information"}
              {currentStep === 2 && "Details & Requirements"}
              {currentStep === 3 && "Categories & Images"}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Start with the essential information about your opportunity"}
              {currentStep === 2 && "Provide more details about what volunteers can expect"}
              {currentStep === 3 && "Categorize your opportunity and add images"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Opportunity Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="e.g., Community Garden Cleanup"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Provide a detailed description of the volunteer opportunity..."
                      required
                      rows={5}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date *</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange("startDate", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={formData.startTime}
                        onChange={(e) => handleInputChange("startTime", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange("endDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => handleInputChange("endTime", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isRecurring"
                      checked={formData.isRecurring}
                      onCheckedChange={(checked) => handleInputChange("isRecurring", checked)}
                    />
                    <Label htmlFor="isRecurring">This is a recurring opportunity</Label>
                  </div>

                  {formData.isRecurring && (
                    <div>
                      <Label htmlFor="recurrencePattern">Recurrence Pattern</Label>
                      <Select
                        value={formData.recurrencePattern}
                        onValueChange={(value) => handleInputChange("recurrencePattern", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select recurrence pattern" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isRemote"
                      checked={formData.isRemote}
                      onCheckedChange={(checked) => handleInputChange("isRemote", checked)}
                    />
                    <Label htmlFor="isRemote">This is a remote/virtual opportunity</Label>
                  </div>

                  {!formData.isRemote && (
                    <>
                      <div>
                        <Label htmlFor="location">Location Name *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange("location", e.target.value)}
                          placeholder="e.g., Community Center, Park Name"
                          required={!formData.isRemote}
                        />
                      </div>

                      <div>
                        <Label htmlFor="address">Street Address</Label>
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
                            required={!formData.isRemote}
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={formData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            required={!formData.isRemote}
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
                    </>
                  )}
                </div>
              )}

              {/* Step 2: Details & Requirements */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="responsibilities">Volunteer Responsibilities</Label>
                    <Textarea
                      id="responsibilities"
                      value={formData.responsibilities}
                      onChange={(e) => handleInputChange("responsibilities", e.target.value)}
                      placeholder="Describe what volunteers will be doing..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="requirements">Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => handleInputChange("requirements", e.target.value)}
                      placeholder="List any requirements or qualifications needed..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="benefits">Benefits</Label>
                    <Textarea
                      id="benefits"
                      value={formData.benefits}
                      onChange={(e) => handleInputChange("benefits", e.target.value)}
                      placeholder="What will volunteers gain from this experience?"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="minAge">Minimum Age</Label>
                      <Input
                        id="minAge"
                        type="number"
                        value={formData.minAge}
                        onChange={(e) => handleInputChange("minAge", e.target.value)}
                        placeholder="e.g., 16"
                      />
                    </div>
                    <div>
                      <Label htmlFor="maxSpots">Maximum Volunteers</Label>
                      <Input
                        id="maxSpots"
                        type="number"
                        value={formData.maxSpots}
                        onChange={(e) => handleInputChange("maxSpots", e.target.value)}
                        placeholder="e.g., 25"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Preferred Skills (optional)</Label>
                    <p className="text-sm text-gray-500 mb-3">
                      Select skills that would be helpful for this opportunity
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-64 overflow-y-auto">
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
                </div>
              )}

              {/* Step 3: Categories & Images */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium">Categories *</Label>
                    <p className="text-sm text-gray-500 mb-3">Select categories that best describe this opportunity</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {volunteerCategories.map((category) => (
                        <div key={category.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={category.id}
                            checked={formData.categories.includes(category.id)}
                            onCheckedChange={(checked) =>
                              handleArrayChange("categories", category.id, checked as boolean)
                            }
                          />
                          <Label htmlFor={category.id} className="text-sm">
                            {category.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-base font-medium">Images</Label>
                    <p className="text-sm text-gray-500 mb-3">Add photos to make your opportunity more appealing</p>

                    {/* Image Upload */}
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        Drag and drop images here, or click to select
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <Button type="button" variant="outline" asChild>
                        <label htmlFor="image-upload" className="cursor-pointer">
                          Select Images
                        </label>
                      </Button>
                    </div>

                    {/* Image Preview */}
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={URL.createObjectURL(image) || "/placeholder.svg"}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-1">
                          Publishing Your Opportunity
                        </h3>
                        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                          <li>• Your opportunity will be visible to all CommunityShare users</li>
                          <li>• Volunteers can apply directly through the platform</li>
                          <li>• You'll receive notifications when someone applies</li>
                          <li>• You can edit or deactivate the opportunity at any time</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep === 1 ? (
                  <Button type="button" variant="outline" asChild>
                    <Link href="/organizations/dashboard">Cancel</Link>
                  </Button>
                ) : (
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                    Back
                  </Button>
                )}

                <div className="flex space-x-2">
                  {currentStep === 3 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={(e) => handleSubmit(e, true)}
                      disabled={isSubmitting}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save as Draft
                    </Button>
                  )}

                  {currentStep < 3 ? (
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(currentStep + 1)}
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
                      {isSubmitting ? "Publishing..." : "Publish Opportunity"}
                      {!isSubmitting && <CheckCircle className="w-4 h-4 ml-2" />}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
