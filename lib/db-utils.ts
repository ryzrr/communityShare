import { supabase } from './prisma'

// User utilities
export async function getUserById(id: string) {
  const { data, error } = await supabase.from('user').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase.from('user').select('*').eq('email', email).single()
  if (error) throw error
  return data
}

export async function createUser(data: {
  email: string
  username: string
  name?: string
  bio?: string
  city?: string
  state?: string
}) {
  const { data, error } = await supabase.from('user').insert([
    {
      email: data.email,
      username: data.username,
      name: data.name,
      bio: data.bio,
      city: data.city,
      state: data.state,
    }
  ]).returning('*')
  if (error) throw error
  return data
}

// Item utilities
export async function getItems(filters?: {
  categoryId?: string
  city?: string
  availability?: string
  search?: string
  userId?: string
}) {
  const where: any = {}

  if (filters?.categoryId && filters.categoryId !== "all") {
    where.categoryId = filters.categoryId
  }

  if (filters?.city && filters.city !== "all") {
    where.city = {
      contains: filters.city,
      mode: "insensitive",
    }
  }

  if (filters?.availability && filters.availability !== "all") {
    where.availability = filters.availability.toUpperCase()
  }

  if (filters?.search) {
    where.OR = [
      {
        title: {
          contains: filters.search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: filters.search,
          mode: "insensitive",
        },
      },
    ]
  }

  if (filters?.userId) {
    where.userId = filters.userId
  }

  const { data, error } = await supabase.from('item').select('*').eq('where', where)
  if (error) throw error
  return data
}

export async function getItemById(id: string) {
  const { data, error } = await supabase.from('item').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function createItem(data: {
  title: string
  description: string
  condition: string
  type: string
  userId: string
  categoryId: string
  images?: string[]
  price?: number
  city?: string
  state?: string
}) {
  const { data, error } = await supabase.from('item').insert([
    {
      title: data.title,
      description: data.description,
      condition: data.condition,
      type: data.type,
      userId: data.userId,
      categoryId: data.categoryId,
      images: data.images,
      price: data.price,
      city: data.city,
      state: data.state,
    }
  ]).returning('*')
  if (error) throw error
  return data
}

// Service utilities
export async function getServices(filters?: {
  categoryId?: string
  city?: string
  search?: string
  userId?: string
}) {
  const where: any = {}

  if (filters?.categoryId && filters.categoryId !== "all") {
    where.categoryId = filters.categoryId
  }

  if (filters?.city && filters.city !== "all") {
    where.city = {
      contains: filters.city,
      mode: "insensitive",
    }
  }

  if (filters?.search) {
    where.OR = [
      {
        title: {
          contains: filters.search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: filters.search,
          mode: "insensitive",
        },
      },
    ]
  }

  if (filters?.userId) {
    where.userId = filters.userId
  }

  const { data, error } = await supabase.from('service').select('*').eq('where', where)
  if (error) throw error
  return data
}

// Event utilities
export async function getEvents(filters?: {
  city?: string
  search?: string
  organizerId?: string
  upcoming?: boolean
}) {
  const where: any = {}

  if (filters?.city && filters.city !== "all") {
    where.city = {
      contains: filters.city,
      mode: "insensitive",
    }
  }

  if (filters?.search) {
    where.OR = [
      {
        title: {
          contains: filters.search,
          mode: "insensitive",
        },
      },
      {
        description: {
          contains: filters.search,
          mode: "insensitive",
        },
      },
    ]
  }

  if (filters?.organizerId) {
    where.organizerId = filters.organizerId
  }

  if (filters?.upcoming) {
    where.startDate = {
      gte: new Date(),
    }
  }

  const { data, error } = await supabase.from('event').select('*').eq('where', where)
  if (error) throw error
  return data
}

export async function getEventById(id: string) {
  const { data, error } = await supabase.from('event').select('*').eq('id', id).single()
  if (error) throw error
  return data
}

// Category utilities
export async function getCategories() {
  const { data, error } = await supabase.from('category').select('*')
  if (error) throw error
  return data
}

// Review utilities
export async function createReview(data: {
  rating: number
  comment?: string
  authorId: string
  targetId: string
  itemId?: string
  serviceId?: string
  eventId?: string
  bookingId?: string
}) {
  const { data, error } = await supabase.from('review').insert([
    {
      rating: data.rating,
      comment: data.comment,
      authorId: data.authorId,
      targetId: data.targetId,
      itemId: data.itemId,
      serviceId: data.serviceId,
      eventId: data.eventId,
      bookingId: data.bookingId,
    }
  ]).returning('*')
  if (error) throw error

  // Update target user's rating
  await updateUserRating(data.targetId)

  return data
}

async function updateUserRating(userId: string) {
  const { data, error } = await supabase.from('review').select('*').eq('targetId', userId)
  if (error) throw error

  if (data.length > 0) {
    const averageRating = data.reduce((sum, review) => sum + review.rating, 0) / data.length

    const { error } = await supabase.from('user').update({
      rating: averageRating,
      totalRatings: data.length,
    }).eq('id', userId)
    if (error) throw error
  }
}

// Booking utilities
export async function createBooking(data: {
  startDate: Date
  endDate: Date
  message?: string
  userId: string
  itemId?: string
  serviceId?: string
}) {
  const { data, error } = await supabase.from('booking').insert([
    {
      startDate: data.startDate,
      endDate: data.endDate,
      message: data.message,
      userId: data.userId,
      itemId: data.itemId,
      serviceId: data.serviceId,
    }
  ]).returning('*')
  if (error) throw error
  return data
}

export async function getBookingsByUser(userId: string) {
  const { data, error } = await supabase.from('booking').select('*').eq('userId', userId).order('createdAt', { ascending: false })
  if (error) throw error
  return data
}

// Favorite utilities
export async function toggleFavorite(userId: string, itemId?: string, serviceId?: string) {
  const { data, error } = await supabase.from('favorite').select('*').eq('userId', userId).eq('itemId', itemId).eq('serviceId', serviceId).single()
  if (error) throw error

  if (data) {
    const { error } = await supabase.from('favorite').delete().eq('id', data.id)
    if (error) throw error
    return false // Removed from favorites
  } else {
    const { data } = await supabase.from('favorite').insert([
      {
        userId,
        itemId,
        serviceId,
      }
    ]).returning('*')
    if (error) throw error
    return true // Added to favorites
  }
}

// Search utilities
export async function searchAll(
  query: string,
  filters?: {
    city?: string
    categoryId?: string
  },
) {
  const [items, services, events] = await Promise.all([
    getItems({ search: query, ...filters }),
    getServices({ search: query, ...filters }),
    getEvents({ search: query, ...filters }),
  ])

  return {
    items,
    services,
    events,
    total: items.length + services.length + events.length,
  }
}
