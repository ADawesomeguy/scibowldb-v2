import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord"
import { githubId, githubSecret, discordId, discordSecret, mongoUri } from "../../../util/env"
import * as db from '../../../util/db'
import User from "../../../models/user"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: githubId,
            clientSecret: githubSecret,
        }),
        DiscordProvider({
            clientId: discordId,
            clientSecret: discordSecret,
        })
        // ...add more providers here
    ],
    callbacks: {
        // @ts-ignore
        async signIn({ user, account, profile, email, credentials }) {
            console.time('connect');
            db.connect(mongoUri);
            console.timeEnd('connect');
            if (await User.countDocuments({ _id: user.email }) > 0) return true;
            const userToSave = new User({
                _id: user.email,
                role: "USER",
            });
            userToSave.save();
            db.disconnect();
            return true;
        },
    },
}

// @ts-ignore
export default NextAuth(authOptions)
