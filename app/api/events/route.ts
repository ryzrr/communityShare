import { type NextRequest, NextResponse } from "next/server"
import { getEvents } from "@/lib/db-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const filters = {
      city: searchParams.get("city") || undefined,
      search: searchParams.get("search") || undefined,
      upcoming: searchParams.get("upcoming") === "true",
    }

    const events = await getEvents(filters)

    return NextResponse.json({
      success: true,
      data: events,
      count: events.length,
    })
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch events" }, { status: 500 })
  }
}
