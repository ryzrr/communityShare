import { type NextRequest, NextResponse } from "next/server"
import { getServices } from "@/lib/db-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      categoryId: searchParams.get("category") || undefined,
      city: searchParams.get("city") || undefined,
      search: searchParams.get("search") || undefined,
    }

    const services = await getServices(filters)

    return NextResponse.json({
      success: true,
      data: services,
      count: services.length,
    })
  } catch (error) {
    console.error("Error fetching services:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch services" }, { status: 500 })
  }
}
