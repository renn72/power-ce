import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type Exercise = {
  name: string,
  onerm: number,
  sets: number,
  reps: number,
}

type Day = {
  name: string,
  exercise: Exercise[],
};

const size = [0, 1]

const Form = () => {
  const { register, handleSubmit, watch, reset, getValues, formState: { errors } } = useForm<Day>({
    defaultValues: {
      name: "",
      exercise: [
        {
          name: "Squat",
          onerm: 76,
          sets: 5,
          reps: 5,
        }
      ]
    }

  });
  const [exerciseID, setExerciseID] = useState<number[]>(Object.keys(getValues().exercise).map((i) => parseInt(i)));

  const onSubmit: SubmitHandler<Day> = (data) => {
    console.log("submit", data);
    reset()
  }

  const onAddExercise = () => {
    console.log("add exercise")
    setExerciseID([...exerciseID, exerciseID.length])
  }

  return (
    <div className="mt-8">
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>

        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6 pr-6 border rounded-l-md">
            <span className="text-gray-500 sm:text-sm">
              Name
            </span>
          </div>
          <input className="block w-full rounded-md border-0 py-1.5 pl-24 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue=""
            {...register("name")}
          />
        </div>
        {exerciseID.map((i) => (
          <div key={i} className="flex gap-6">
            <input defaultValue="" {...register(`exercise.${i}.name`)} />
            <input type="number" defaultValue={76} {...register(`exercise.${i}.onerm`, {valueAsNumber: true, validate: (value) => value > 0,})} />
            <input type="number" defaultValue="" {...register(`exercise.${i}.sets`, {valueAsNumber: true, validate: (value) => value > 0,})} />
            <input type="number" defaultValue="" {...register(`exercise.${i}.reps`, {valueAsNumber: true, validate: (value) => value > 0,})} />
          </div>
        ))}

        <div>
          <button type="button" onClick={() => onAddExercise()}>Add</button>
        </div>

        <input type="submit" />
      </form>
    </div>
  );
}

export default Form;
