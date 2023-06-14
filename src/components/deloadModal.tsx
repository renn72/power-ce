
import { Fragment, useState } from "react";
import { useAtom } from "jotai";

import { Dialog, Transition } from '@headlessui/react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { toast } from "react-hot-toast";

import { deloadModalIsOpenAtom } from "~/store/store";

const rpe = [
  [100.00, 95.00, 92.00, 88.00, 85.00,],
  [95.00, 92.00, 88.00, 85.00, 83.00,],
  [92.00, 88.00, 85.00, 83.00, 80.00,],
  [88.00, 85.00, 83.00, 80.00, 78.00,],
  [85.00, 83.00, 80.00, 78.00, 76.00,],
  [83.00, 80.00, 78.00, 76.00, 74.00,],
  [80.00, 78.00, 76.00, 74.00, 72.00,],
  [78.00, 76.00, 74.00, 72.00, 70.00,],
  [76.00, 74.00, 72.00, 70.00, 68.00,],
  [74.00, 72.00, 70.00, 68.00, 65.00,],
]

const Table = () => {
  return (
    <div>
      <p>
        When -	Every 3 - 7 Weeks
      </p>
      <p>
        How -	Intensity by 80-90% and Reduce volume by 60-70% of previous week
      </p>
      <p>
        Example -	5 x 8 @ 140kg or 70% of 200kg = 40 total reps (Normal training week)
      </p>
      <p>
        Or
      </p>
      <p>
        3 x 8 @ 120kg or 85% of 140kg = 24 total reps (Deload Week)
      </p>
      <p>
        MRV (Maximum recoverable Volume) RANGES
      </p>
      <p>
        PHASE	SETS/WEEK	SQUATS	BENCH	DEADLIFT
      </p>
      <p>
        Hypertrophy - 	8 - 20	10 - 16	14 - 20	6 - 12
      </p>
      <p>
        Strength -	4 - 16	6 - 12	8 - 16	4 - 8
      </p>
      <p>
        Peak -	2 - 8	3 - 6	4 - 8	1 - 5
      </p>
    </div>
  )
}

const DealoadModal = () => {
  const [isOpen, setIsOpen] = useAtom(deloadModalIsOpenAtom);

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }
  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Deload Guide
                </Dialog.Title>
                <div className="mt-2 flex justify-center">
                  <Table />
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DealoadModal
