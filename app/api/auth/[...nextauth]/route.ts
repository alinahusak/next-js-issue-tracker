import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
   
  ],
});

export { handler as GET, handler as POST }