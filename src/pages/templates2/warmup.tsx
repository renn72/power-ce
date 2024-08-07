import { useFormContext, Controller } from 'react-hook-form'

import { api } from '~/utils/api'

import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { Listbox, Transition } from '@headlessui/react'
import { type PrismaBlock } from '~/store/types'
import { cn } from '@/lib/utils'

import { Fragment } from 'react'

import { useAtomValue } from 'jotai'
import { isProgramAtom, isEditProgramAtom } from './form'

const Warmup = ({ weekIdx, dayIdx }: { weekIdx: number; dayIdx: number }) => {
  const formMethods = useFormContext<PrismaBlock>()
  const { control, watch, getValues } = formMethods
  const utils = api.useUtils()
  const warmups = utils.warmups.getAll.getData()
  const isRest: boolean = watch(`week.${weekIdx}.day.${dayIdx}.isRestDay`)
  const warmupTemplateId = watch(
    `week.${weekIdx}.day.${dayIdx}.warmupTemplateId`,
  )

  const isProgram = useAtomValue(isProgramAtom)
  const isEditProgram = useAtomValue(isEditProgramAtom)
  const isEnabled = !isProgram ? true : isEditProgram

  return (
    <div className={`flex items-center gap-2 ${isRest ? 'hidden' : ''}`}>
      {isEnabled ? (
        <Controller
          control={control}
          name={`week.${weekIdx}.day.${dayIdx}.warmupTemplateId`}
          defaultValue=''
          render={({ field: { onChange, value } }) => (
            <Listbox
              value={value as string}
              onChange={(e) => {
                onChange(e)
                console.log(e)
              }}
            >
              <div className='relative h-full w-52  overflow-visible text-xs sm:text-base'>
                <div className='flex items-center gap-4'>
                  <Listbox.Button className='relative h-10 max-h-min min-h-[40px] w-full cursor-pointer border-b border-gray-600 py-2 pl-3 pr-10 text-left hover:border-gray-200 focus:outline-none '>
                    <span
                      className={cn(
                        'flex items-center truncate capitalize tracking-tighter',
                        value ? '' : 'text-gray-600',
                      )}
                    >
                      {warmups?.find((warmup) => warmup.id === value)?.name ||
                        'Warmup'}
                    </span>
                    <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                      <ChevronUpDownIcon
                        className='h-5 w-5 text-gray-400'
                        aria-hidden='true'
                      />
                    </span>
                  </Listbox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <Listbox.Options className='max-h-160 absolute z-30 mt-1 w-full overflow-auto border border-gray-600 bg-black py-1 '>
                    {warmups?.map((warmup, Idx) => (
                      <Listbox.Option
                        key={Idx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? 'bg-amber-100 text-amber-900'
                              : 'text-gray-200'
                          }`
                        }
                        value={warmup.id}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate capitalize ${
                                selected ? 'font-bold' : 'font-semibold'
                              }`}
                            >
                              {warmup.name}
                            </span>
                            {selected ? (
                              <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600'>
                                <CheckIcon
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
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
          )}
        />
      ) : (
        <div className='flex gap-2 text-lg'>
          <div className='text-gray-400'>Warmup:</div>
          <div >
            {warmups?.find((warmup) => warmup.id === warmupTemplateId)?.name ||
              ''}
          </div>
        </div>
      )}

      {isEnabled && (
        <XMarkIcon
          className='h-6 w-6 shrink-0 cursor-pointer text-gray-400 hover:text-white'
          onClick={() =>
            formMethods.setValue(
              `week.${weekIdx}.day.${dayIdx}.warmupTemplateId`,
              '',
            )
          }
        />
      )}
    </div>
  )
}

export default Warmup
