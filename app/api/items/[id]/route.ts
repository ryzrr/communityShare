import { type NextRequest, NextResponse } from "next/server"
import { getItemById } from "@/lib/db-utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const item = await getItemById(params.id)

    if (!item) {
      return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: item,
    })
  } catch (error) {
    console.error("Error fetching item:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch item" }, { status: 500 })
  }
}
