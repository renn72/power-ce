import { type NextPage } from "next";
// import { api } from "~/utils/api";


import Navbar from "~/components/navbar";
import Footer from "~/components/footer";

const Templates: NextPage = () => {
  // const { isLoaded: userLoaded, isSignedIn } = useUser();

  return (
    <>
      <div className="h-screen flex flex-col bg-gray-600">
        <Navbar />

        <header className="bg-white shadow-xl">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Templates
            </h1>
          </div>
        </header>
        <main className="grow">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">


          </div>
        </main>
        <Footer/>
      </div>
    </>
  );
};

export default Templates;
