export { default } from "next-auth/middleware";
const NEXTAUTH_SECRET='WILa8wOhnXPI9T5N1NyF4I5FfRq7RU2vNBkriUaMvXE='
export const config = {
  matcher: ["/settings"],
};