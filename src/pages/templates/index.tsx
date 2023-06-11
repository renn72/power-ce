import { type NextPage } from "next";
import React, { Fragment, useState } from "react";


import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import Navbar from "~/components/navbar";
import Footer from "~/components/footer";
import Form from "./form";

const templates = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]


const Templates: NextPage = () => {
  const [squat, setSquat] = useState<number>(200);
  const [deadlift, setDeadlift] = useState<number>(200);
  const [bench, setBench] = useState<number>(100);

  const [name, setName] = useState<string>("");
  const [template, setTemplate] = useState(templates[0]);


  return (
    <>
      <div className="h-full flex flex-col bg-gray-600">

        <header className="bg-white shadow-xl">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Templates</h1>
          </div>
        </header>
        <main >
          <div className="flex flex-col border border-black">
            <div className="mx-auto max-w-7xl border py-6 sm:px-6 lg:px-8">
              <div className="flex gap-6 justify-center">
                <div className="bg-gray-200 rounded-lg p-2 flex flex-col">
                  <label className="text-center" htmlFor="squat">Squat</label>
                  <input className="bg-gray-200 rounded-lg p-2 w-24 text-center"
                    type="number"
                    id="squat"
                    placeholder="Squat"
                    value={squat}
                    onChange={(e) => setSquat(parseInt(e.target.value))}
                  />
                </div>
                <div className="bg-gray-200 rounded-lg p-2 flex flex-col">
                  <label className="text-center" htmlFor="deadlift">Deadlift</label>
                  <input className="bg-gray-200 rounded-lg p-2 w-24 text-center"
                    type="number"
                    id="deadlift"
                    placeholder="Deadlift"
                    value={deadlift}
                    onChange={(e) => setDeadlift(parseInt(e.target.value))}
                  />
                </div>
                <div className="bg-gray-200 rounded-lg p-2 flex flex-col">
                  <label className="text-center" htmlFor="squat">Bench</label>
                  <input className="bg-gray-200 rounded-lg p-2 w-24 text-center"
                    type="number"
                    id="bench"
                    placeholder="Bench"
                    value={bench}
                    onChange={(e) => setBench(parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-7xl border py-6 sm:px-6 lg:px-8">

              <div className="flex gap-6 justify-center">

                <div>
                  <button className="bg-gray-200 rounded-lg p-2">New Template</button>
                </div>

                <div className="w-64 flex flex-col justify-center">
                  <Listbox value={template} onChange={setTemplate}>
                    <div className="relative mt-1">
                      <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                        <span className="block truncate">{template?.name}</span>
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
                          {templates.map((temp, Idx) => (
                            <Listbox.Option
                              key={Idx}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                }`
                              }
                              value={temp}
                            >
                              {({ selected }) => (
                                <>
                                  <span
                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                      }`}
                                  >
                                    {temp.name}
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
              <Form />

            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Templates;
