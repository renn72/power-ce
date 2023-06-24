import { useEffect } from "react";
import { type NextPage } from "next";
import { useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";
import OneRMCard from "~/components/oneRMCard";



const Home: NextPage = () => {
  const { data: userPrograms, isLoading: userProgramsLoading } = api.userPrograms.getAll.useQuery();
  const { data: programsData, isLoading: programsLoading } = api.blocks.getAllPrograms.useQuery();
  const ctx = api.useContext()
  const { user } = useUser();

  if (!user) return <div>Login</div>

  const programs = userPrograms?.filter((program) => program.userId === user.id)
  if (programs?.length === 0) {
    console.log('no programs')
  }

  if (userProgramsLoading && userProgramsLoading) return <div>loading</div>;

  return (
    <>
      <div className="h-full flex flex-col bg-gray-600 ">
        <header className="bg-white shadow-xl">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main >
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 border-2">
            <OneRMCard />

            <div className="flex flex-col gap-2">
              <div className="text-gray-900">
                <h2 className="text-xl font-bold text-gray-200">Active Programs</h2>
                {
                  programs &&
                  programs
                    .filter((program) => program.isProgramActive === true)
                      .map((program) => (
                        <div key={program.id}>
                          <div>{programsData?.filter((pd) => pd.id === program.programId)[0]?.name}</div>
                        </div>
                      ))
                }
              </div>
              <div className="text-gray-900">
                <h2 className="text-xl font-bold text-gray-200">Inactive Programs</h2>
                {
                  programs &&
                  programs
                    .filter((program) => !program.isProgramActive)
                      .map((program) => (
                        <div key={program.id}>
                          <div>{programsData?.filter((pd) => pd.id === program.programId)[0]?.name}</div>
                        </div>
                      ))
                }
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Home;
