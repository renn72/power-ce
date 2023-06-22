import { FingerPrintIcon } from '@heroicons/react/24/outline'

const Footer = () => {
  return (
    <div className="bg-gray-800 p-2 md:p-4 flex justify-end">
      <FingerPrintIcon className="h-6 w-6 md:h-8 md:w-8 text-indigo-300" aria-hidden="true" />
    </div>
  )
}

export default Footer
