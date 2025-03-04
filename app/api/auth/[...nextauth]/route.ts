import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

const NEXTAUTH_SECRET = 'WILa8wOhnXPI9T5N1NyF4I5FfRq7RU2vNBkriUaMvXE=';
// function toFormData(obj) {
//     const formBody = [];
//     for (const property in obj) {
//         const encodedKey = encodeURIComponent(property);
//         const encodedValue = encodeURIComponent(obj[property]);
//         formBody.push(`${encodedKey}=${encodedValue}`);
//     }
//     return formBody.join("&");
// }

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text", name: "username" },
                password: { label: "password", type: "password", name: "password" },
            },
            async authorize(credentials, req) {
                const data = {
                    username: credentials.username,
                    password: credentials.password,
                };
                try {
                    const res = await fetch("http://app:8080/login", {
                        method: 'POST',
                        body: JSON.stringify(data),
                        cache: 'no-cache',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    const resData = await res.json();
                    if (res.ok && resData) {
                        return {
                            id: resData.id,
                            access_token: resData.access_token,
                            is_admin: resData.is_admin,
                            employeeid: resData.employeeid,
                        }
                    } else {
                        console.error('Authorization failed:', resData);
                        return null;
                    }
                }
                catch (error) {
                    console.error('Authorization failed:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: 'http://localhost:3001/sign-in',
    },
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({
            token,
            user,
            account,
            profile,
            trigger,
            isNewUser,
            session,
        }: { token: any, user: User, account: any, profile: any, trigger: any, isNewUser: any, session: Session }) {
            if (user) {
                token.access_token = user.access_token;
                token.is_admin = user.is_admin;
                token.employeeid = user.employeeid
            }
            return token;
        },
        async session({ session, token }) {
            session.is_admin = token?.is_admin
            session.token = token?.access_token
            session.employeeid = token?.employeeid
            console.log(session);
            return { ...session, ...token };
        },
        redirect({ url, baseUrl }) {
            return 'http://localhost:3002/leave-request';
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };