import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  secret: process.env.AUTH_SECRET,
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      // name: "Credentials",
      // type: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        // username: { label: "Username", type: "text" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "post",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        // console.log(res);
        const user = await res.json();
        if (user.code === 200) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    // ...add more providers here
  ],
  session: {
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 24 * 60 * 60, // 1day
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ baseUrl }: { baseUrl: string }) {
      return baseUrl;
    },
  },
};
export default NextAuth(authOptions);
