export type EventStatus = "waiting" | "active" | "see-you-soon" | "ended"

export interface EventLocation {
  id: string
  name: string
  address: string
  date: string
  time: string
  imageUrl?: string
  coordinates?: string // Optional now
}

// Add NextAuth types
import "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name?: string
    }
  }

  interface User {
    id: string
    email: string
    name?: string
  }
}
