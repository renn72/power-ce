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

import { rpeModalIsOpenAtom } from "~/store/store";

const rpe = [
  [10, 100.00, 95.50, 92.20, 89.20, 86.30, 83.70, 81.10, 78.60, 76.20, 73.90, 70.70, 68.00,],
  [9.5, 97.80, 93.90, 90.70, 87.80, 85.00, 82.40, 79.90, 77.40, 75.10, 72.30, 69.40, 66.70,],
  [9, 95.50, 92.20, 89.20, 86.30, 83.70, 81.10, 78.60, 76.20, 73.90, 70.70, 68.00, 65.30,],
  [8.5, 93.90, 90.70, 87.80, 85.00, 82.40, 79.90, 77.40, 75.10, 72.30, 69.40, 66.70, 64.00,],
  [8, 92.90, 89.20, 86.30, 83.70, 81.10, 78.60, 76.20, 73.90, 70.70, 68.00, 65.30, 62.60,],
  [7.5, 90.70, 87.80, 85.00, 82.40, 79.90, 77.40, 75.10, 72.30, 69.40, 66.70, 64.00, 61.30,],
  [7, 89.20, 86.30, 83.70, 81.10, 78.60, 76.20, 73.90, 70.70, 68.00, 65.30, 62.60, 59.90,],
  [6.5, 87.80, 85.00, 82.40, 79.90, 77.40, 75.10, 72.30, 69.40, 66.70, 64.00, 61.30, 58.60,],
  [6, 86.30, 83.70, 81.10, 78.60, 76.20, 73.90, 70.70, 68.00, 65.30, 62.60, 59.90, 57.40,],
]

const Table = () => {
  const columnHelper = createColumnHelper<number[][]>()

  // const columns = [
  //   columnHelper.accessor(0, {
  //     Header: () => '1',
  //     cell: info => info.getValue(),
  //   }),
  //   columnHelper.accessor(1, {
  //     Header: () => '1',
  //     cell: info => info.getValue(),
  //   }),
  // ]

  const columns = [
    {
      accessorKey: '0',
      header: '',
      cell: info => info.getValue(),
    },
    {
      accessorKey: '1',
      header: '1',
      cell: info => info.getValue() == 100 ? '100%' : `${info.getValue().toFixed(1)}%`,
    },
    {
      accessorKey: '2',
      header: '2',
      cell: info => `${info.getValue().toFixed(1)}%`,
    },
    {
      accessorKey: '3',
      header: '3',
      cell: info => `${info.getValue().toFixed(1)}%`,
    },
    {
      accessorKey: '4',
      header: '4',
      cell: info => `${info.getValue().toFixed(1)}%`,
    },
    {
      accessorKey: '5',
      header: '5',
      cell: info => `${info.getValue().toFixed(1)}%`,
    },
    {
      accessorKey: '6',
      header: '6',
      cell: info => `${info.getValue().toFixed(1)}%`,
    },
    {
      accessorKey: '7',
      header: '7',
      cell: info => `${info.getValue().toFixed(1)}%`,
    },
    {
      accessorKey: '8',
      header: '8',
      cell: info => `${info.getValue().toFixed(1)}%`,
    },
    {
      accessorKey: '9',
      header: '9',
      cell: info => `${info.getValue().toFixed(1)}%`,
    },
    {
      accessorKey: '10',
      header: '10',
      cell: info => `${info.getValue().toFixed(1)}%`,
    },
    {
      accessorKey: '11',
      header: '11',
      cell: info => `${info.getValue().toFixed(1)}%`,
    },
    {
      accessorKey: '12',
      header: '12',
      cell: info => `${info.getValue().toFixed(1)}%`,
    },
  ]

  const [data, setData] = useState(() => [...rpe])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const copyText = (str) => {
    if (typeof str === 'number' ) {
      void navigator.clipboard.writeText(str.toString())
      toast.success('Copied to clipboard')
    }
  }

  return (
    <div className="p-2">
      <table>
        <thead >
          {table.getHeaderGroups().map(headerGroup => (
            <tr 
              key={headerGroup.id}
            >
              {headerGroup.headers.map(header => (
                <th
                  className="px-7 py-2 text-s font-bold text-center text-gray-500 uppercase "
                  key={header.id}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr
              className="border-b border-gray-200 hover:bg-gray-100"
              key={row.id}
            >
              {row.getVisibleCells().map((cell,idx) => (
                <td
                  className={`px-1 py-2 text-s ${idx === 0 ? `font-medium text-gray-600` : `font-bold text-gray-900 `} text-center hover:bg-gray-300 cursor-pointer`}
                  key={cell.id}
                  onClick={() => copyText(cell.getValue())}
                >
                  <span
                    className=""
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="h-4" />
    </div>)
}

const RPEModal = () => {
  const [isOpen, setIsOpen] = useAtom(rpeModalIsOpenAtom);

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
              <Dialog.Panel className="w-full max-w-6xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
                >
                  RPE Chart
                  <button onClick={() => closeModal()}>X</button>
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

export default RPEModal
