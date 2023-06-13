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

import { rmModalIsOpenAtom } from "~/store/store";

const rpe = [
[100.00,	95.00,	92.00,	88.00,	85.00,],
[95.00,	92.00,	88.00,	85.00,	83.00,],
[92.00,	88.00,	85.00,	83.00,	80.00,],
[88.00,	85.00,	83.00,	80.00,	78.00,],
[85.00,	83.00,	80.00,	78.00,	76.00,],
[83.00,	80.00,	78.00,	76.00,	74.00,],
[80.00,	78.00,	76.00,	74.00,	72.00,],
[78.00,	76.00,	74.00,	72.00,	70.00,],
[76.00,	74.00,	72.00,	70.00,	68.00,],
[74.00,	72.00,	70.00,	68.00,	65.00,],
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
      header: '1',
      cell: info => info.getValue() == 100 ? 100 : info.getValue().toFixed(1),
    },
    {
      accessorKey: '1',
      header: '2',
      cell: info => info.getValue() == 100 ? 100 : info.getValue().toFixed(1),
    },
    {
      accessorKey: '2',
      header: '3',
      cell: info => info.getValue() == 100 ? 100 : info.getValue().toFixed(1),
    },
    {
      accessorKey: '3',
      header: '4',
      cell: info => info.getValue() == 100 ? 100 : info.getValue().toFixed(1),
    },
    {
      accessorKey: '4',
      header: '5',
      cell: info => info.getValue() == 100 ? 100 : info.getValue().toFixed(1),
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
              className="left-16 relative"
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
              <span className="px-1 py-2 text-s text-left block">
                {+row.id + 1}
              </span>
              {row.getVisibleCells().map(cell => (
                <td
                  className="px-1 py-2 text-s font-bold text-center text-gray-900 hover:bg-gray-300 cursor-pointer"
                  key={cell.id}
                  onClick={() => copyText(cell.getValue())}
                >
                  <span
                    className=""
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}%
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

const RmModal = () => {
  const [isOpen, setIsOpen] = useAtom(rmModalIsOpenAtom);

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
                  Percentage guide, Sets/Reps
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

export default RmModal
