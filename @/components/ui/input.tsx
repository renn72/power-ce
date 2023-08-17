import * as React from "react"
import { NumericFormat } from 'react-number-format';

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full focus:border-white border-b border-gray-600 bg-black px-3 py-2 text-sm md:text-base text-gray-200 placeholder:text-muted-foreground focus:outline-none focus-visible:outline-none hover:border-white  disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const InputNumber = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <NumericFormat
        className={cn(
          "flex h-10 w-full rounded-md border focus:bg-gray-700 border-gray-600 bg-gray-900 px-3 py-2 text-sm text-gray-200 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
InputNumber.displayName = "Input"

export { Input, InputNumber }
