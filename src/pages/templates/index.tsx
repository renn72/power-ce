import { type NextPage } from "next";
import React from "react";

import { useAtom } from "jotai";

import Form2 from "./form2";
import RPEModal from "~/components/rpeModal";
import RmModal from "~/components/rmModal";

import { squatAtom, deadliftAtom, benchAtom, rmModalIsOpenAtom, rpeModalIsOpenAtom, deloadModalIsOpenAtom } from "~/store/store";
import DealoadModal from "~/components/deloadModal";

import { api } from '~/utils/api'

const Templates: NextPage = () => {
  const [squat, setSquat] = useAtom(squatAtom);
  const [deadlift, setDeadlift] = useAtom(deadliftAtom);
  const [bench, setBench] = useAtom(benchAtom);

  const [, setRmModalIsOpen] = useAtom(rmModalIsOpenAtom);
  const [, setRpeModalIsOpen] = useAtom(rpeModalIsOpenAtom);
  const [, setDeloadModalIsOpen] = useAtom(deloadModalIsOpenAtom);


  const { data : blocksData, isLoading : blocksLoading } = api.blocks.getAll.useQuery();

  if (blocksLoading)
    return (
      <div className="flex grow">
        loading
      </div>
    );

  if (!blocksData) return <div>Something went wrong</div>;

  return (
    <>
      <div className="h-full flex flex-col bg-gray-600">

        <header className="bg-white shadow-xl">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-xl md:text-3xl font-bold tracking-tight text-gray-900 flex items-center">Templates</h1>
            <div className="flex gap-2 text-sm md:text-lg font-bold">
              <button
                className="bg-transparent hover:bg-gray-800 bg-gray-800 font-semibold hover:text-white w-10 h-10 md:w-12 md:h-12 border-2 border-gray-800 hover:border-transparent rounded-full"
                onClick={() => setRpeModalIsOpen(true)}
              >
                RPE
              </button>
              <button
                className="bg-transparent hover:bg-gray-800 bg-gray-800 font-semibold hover:text-white w-10 h-10 md:w-12 md:h-12 border-2 border-gray-800 hover:border-transparent rounded-full"
                onClick={() => setRmModalIsOpen(true)}
              >
                RM
              </button>
              <button
                className="bg-transparent hover:bg-gray-800 bg-gray-800 font-semibold hover:text-white w-10 h-10 md:w-12 md:h-12 border-2 border-gray-800 hover:border-transparent rounded-full"
                onClick={() => setDeloadModalIsOpen(true)}
              >
                Del
              </button>
            </div>
          </div>
        </header>
        <main className="text-sm sm:text-base">
          <RPEModal />
          <RmModal />
          <DealoadModal />
          <div className="flex flex-col">
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
              <div className="flex gap-2 md:gap-6 justify-center">
                <div className="bg-white rounded-lg p-2 flex flex-col">
                  <label className="text-center" htmlFor="squat">Squat</label>
                  <input className="bg-white rounded-lg w-20 text-center"
                    type="number"
                    id="squat"
                    placeholder="Squat"
                    value={squat}
                    onChange={(e) => setSquat(parseInt(e.target.value))}
                  />
                </div>
                <div className="bg-white rounded-lg p-2 flex flex-col">
                  <label className="text-center" htmlFor="deadlift">Deadlift</label>
                  <input className="bg-white rounded-lg w-20 text-center"
                    type="number"
                    id="deadlift"
                    placeholder="Deadlift"
                    value={deadlift}
                    onChange={(e) => setDeadlift(parseInt(e.target.value))}
                  />
                </div>
                <div className="bg-white rounded-lg p-2 flex flex-col">
                  <label className="text-center" htmlFor="squat">Bench</label>
                  <input className="bg-white rounded-lg w-20 text-center"
                    type="number"
                    id="bench"
                    placeholder="Bench"
                    value={bench}
                    onChange={(e) => setBench(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">

              <Form2 />

            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Templates;
