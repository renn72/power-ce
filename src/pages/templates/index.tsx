import { type NextPage } from "next";
import React, { Fragment, useState } from "react";

import { useAtom } from "jotai";

import { Listbox, Transition, Dialog } from '@headlessui/react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline'

import Form from "./form";
import Form2 from "./form2";
import RPEModal from "~/components/rpeModal";
import RmModal from "~/components/rmModal";

import { squatAtom, deadliftAtom, benchAtom, rmModalIsOpenAtom, rpeModalIsOpenAtom, deloadModalIsOpenAtom } from "~/store/store";
import DealoadModal from "~/components/deloadModal";

import { api } from '~/utils/api'

const templates = [
  { id: 1, name: 'block-1', },
  { id: 2, name: 'block-2', },
]

const Templates: NextPage = () => {
  const [squat, setSquat] = useAtom(squatAtom);
  const [deadlift, setDeadlift] = useAtom(deadliftAtom);
  const [bench, setBench] = useAtom(benchAtom);

  const [rmModalIsOpen, setRmModalIsOpen] = useAtom(rmModalIsOpenAtom);
  const [rpeModalIsOpen, setRpeModalIsOpen] = useAtom(rpeModalIsOpenAtom);
  const [deloadModalIsOpen, setDeloadModalIsOpen] = useAtom(deloadModalIsOpenAtom);

  const [template, setTemplate] = useState('');

  const { data : blocksData, isLoading : blocksLoading } = api.blocks.getAll.useQuery();
  const blocksTitle = blocksData?.map((block) => block.name)

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
                className="bg-transparent hover:bg-gray-800 bg-gray-800 font-semibold hover:text-white w-10 h-10 md:w-12 md:h-12 border border-2 border-gray-800 hover:border-transparent rounded-full"
                onClick={() => setRpeModalIsOpen(true)}
              >
                RPE
              </button>
              <button
                className="bg-transparent hover:bg-gray-800 bg-gray-800 font-semibold hover:text-white w-10 h-10 md:w-12 md:h-12 border border-2 border-gray-800 hover:border-transparent rounded-full"
                onClick={() => setRmModalIsOpen(true)}
              >
                RM
              </button>
              <button
                className="bg-transparent hover:bg-gray-800 bg-gray-800 font-semibold hover:text-white w-10 h-10 md:w-12 md:h-12 border border-2 border-gray-800 hover:border-transparent rounded-full"
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

              <div className="flex gap-6 justify-center items-center text-sm sm:text-base">

                <div>
                  <button className="rounded-lg p-2 bg-gray-400 text-gray-600" disabled>New Template</button>
                </div>

                <div className="w-44  sm:w-52 flex flex-col justify-center">
                  <Listbox value={template} onChange={setTemplate}>
                    <div className="relative z-10">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white max-h-min h-10 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
                        <span className="block truncate">{template}</span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {blocksTitle?.map((template, Idx) => (
                            <Listbox.Option
                              key={Idx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                              }
                              value={template}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                      }`}
                                  >
                                    {template}
                                  </span>
                                  {selected ? (
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                  ) : null}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  </Listbox>
                </div>

              </div>
              <Form2 />

            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Templates;
