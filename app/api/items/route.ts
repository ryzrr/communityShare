import { type NextRequest, NextResponse } from "next/server"
import { getItems } from "@/lib/db-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      categoryId: searchParams.get("category") || undefined,
      city: searchParams.get("city") || undefined,
      availability: searchParams.get("availability") || undefined,
      search: searchParams.get("search") || undefined,
    }

    const items = await getItems(filters)

    return NextResponse.json({
      success: true,
      data: items,
      count: items.length,
    })
  } catch (error) {
    console.error("Error fetching items:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch items" }, { status: 500 })
  }
}
