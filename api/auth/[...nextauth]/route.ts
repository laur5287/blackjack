import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from '@/lib/prisma'
import { session } from '@/lib/auth'
import { NextAuthOptions } from 'next-auth'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt'
	},
	providers: [
		GoogleProvider({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
		}),
		// ...add more providers here
	],
	callbacks: {
		async signIn({ account, profile }) {
			if (!profile?.email) {
				throw new Error('No profile')
			}

			await prisma.user.upsert({
				where: {
					email: profile.email,
				},
				create: {
					email: profile.email,
					name: profile.name,
				},
				update: {
					name: profile.name,
				},
			})
			return true
		},
		session,
		async jwt({ token, user, account, profile }) {
			if (profile) {
				const user = await prisma.user.findUnique({
					where: {
						email: profile.email,
					},
				})
				if (!user) {
					throw new Error('No user found')
				}
				token.id = user.id
			}
			return token
		},
	}
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }