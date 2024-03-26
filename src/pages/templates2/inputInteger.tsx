import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const InputInteger = ({
  registerValue,
  placeholder,
  label = null,
}: {
  registerValue: string
  placeholder: string
  defaultValue: number
  label: string | null
}) => {
  const { register } = useFormContext()
  return (
    <div className='flex items-center'>
      {label && (
        <Label
          className='absolute text-gray-400'
        >
          {label}:
        </Label>
      )}
      <Input
        type='number'
        className={cn(label ? 'pl-12' : '')}
        {...register(registerValue, { valueAsNumber: true })}
        placeholder={placeholder}
      />
    </div>
  )
}

export default InputInteger
