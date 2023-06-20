import { type NextPage } from "next";
// import { api } from "~/utils/api";



const Home: NextPage = () => {
  // const { isLoaded: userLoaded, isSignedIn } = useUser();

  return (
    <>
      <div className="h-full flex flex-col bg-gray-600 ">

        <header className="bg-white shadow-xl">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          </div>
        </header>
        <main >
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">



          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
