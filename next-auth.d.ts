import "next-auth";
import { DefaultUser } from "next-auth";

declare module "next-auth" {
    interface User extends DefaultUser {
        access_token: string;
        is_admin: boolean;
        employeeid: string;
    }

    interface Session extends DefaultSession {
        user: User;
        token: User.access_token;
        is_admin: User.is_admin;
        expires_in: string;
        employeeid: User.employeeid;
        error: string;
    }
}