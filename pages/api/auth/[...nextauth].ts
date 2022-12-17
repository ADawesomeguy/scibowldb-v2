import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { githubId, githubSecret } from "../../../util/env"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: githubId,
            clientSecret: githubSecret,
        }),
        // ...add more providers here
    ],
}

export default NextAuth(authOptions)