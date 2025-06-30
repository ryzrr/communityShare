import { type NextRequest, NextResponse } from "next/server"
import { searchAll } from "@/lib/db-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const query = searchParams.get("q")
    if (!query) {
      return NextResponse.json({ success: false, error: "Search query is required" }, { status: 400 })
    }

    const filters = {
      city: searchParams.get("city") || undefined,
      categoryId: searchParams.get("category") || undefined,
    }

    const results = await searchAll(query, filters)

    return NextResponse.json({
      success: true,
      data: results,
    })
  } catch (error) {
    console.error("Error searching:", error)
    return NextResponse.json({ success: false, error: "Search failed" }, { status: 500 })
  }
}
