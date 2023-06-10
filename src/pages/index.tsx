import { SignIn, SignedIn, SignedOut, UserButton, SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Link from "next/link";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  return (
    <>
      <main className="flex h-screen justify-center bg-gray-800">
        <div className="w-full md:max-w-6xl border-slate-400 border-x">
          <div className="flex border-b border-slate-400 p-8 justify-end w-full gap-6 ">
            <SignedIn>
              {/* Mount the UserButton component */}
              <UserButton />
            </SignedIn>
            <SignedOut>
              {/* Signed out users get sign in button */}
              <SignInButton />
            </SignedOut>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
