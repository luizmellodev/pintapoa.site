import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcrypt"

// In a real application, you would store these in a database
// For demo purposes, we're using a hardcoded admin user with a hashed password
// The password is "adminpassword" - you should change this in a real application
const ADMIN_EMAIL = "admin@example.com"
const ADMIN_PASSWORD_HASH = "$2b$10$8OxDEuDS7HtWNWfDZ2ZD8uoFRUiAIrJIQRFUHy5RTwSYzpJUp.rdW" // hashed "adminpassword"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check if the credentials match our admin user
        if (credentials.email !== ADMIN_EMAIL) {
          return null
        }

        // Verify the password
        const isValidPassword = await compare(credentials.password, ADMIN_PASSWORD_HASH)
        if (!isValidPassword) {
          return null
        }

        // Return the user object
        return {
          id: "1",
          email: ADMIN_EMAIL,
          name: "Admin",
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-change-this-in-production",
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
