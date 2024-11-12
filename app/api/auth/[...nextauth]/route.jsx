import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from "@next-auth/prisma-adapter"


const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',  // Use JWT sessions
  },
  callbacks: {
    jwt: async ({ token, account, profile }) => {
      // This will only run when a new token is created
      if (account && profile) {
        token.id = profile.id || profile.sub  // Use Google profile's id (sub for OAuth)
        token.name = profile.name             // Store user's name
        token.email = profile.email           // Store user's email
        token.picture = profile.picture       // Store user's profile picture
      }
      return token
    },
    session: async ({ session, token }) => {
      // This will be invoked to add extra properties to the session object
      if (session.user) {
        session.user.id = token.id           // Attach user id from token
        session.user.name = token.name       // Attach user's name
        session.user.email = token.email     // Attach user's email
        session.user.picture = token.picture // Attach profile picture
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

