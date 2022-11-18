import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";

const FieldArray = ({
  control,
  register,
  setValue,
  getValues,
  exercisesStats,
}) => {
  const { fields, remove, replace } = useFieldArray({
    control,
    name: "exercises",
  });

  useEffect(() => {
    replace(exercisesStats);
  }, [exercisesStats, replace]);

  const handleIncrement = async (e) => {
    const oldValue = getValues(`exercises[${e.target.value}]`);
    setValue(
      `exercises[${e.target.value}].weight`,
      Number(oldValue.weight) + 2.5
    );
  };

  return (
    <>
      <ul>
        {fields.map((item, index) => {
          return (
            <li
              key={item.id}
              className="mb-4 shadow-md bg-white p-2 border-2 border-black w-full min-w-[55vw]"
            >
              <div className="mb-2">
                <label>{`Exercise ${index + 1} : `}</label>
              </div>
              <div className="flex justify-between mb-1">
                <div className="relative">
                  <input
                    type="text"
                    id={`name${index}`}
                    {...register(`exercises[${index}].exercise.name`)}
                    defaultValue={item.exercise.name}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  />
                  <label
                    for={`name${index}`}
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id={`weight${index}`}
                    {...register(`exercises[${index}].weight`)}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    defaultValue={item.weight}
                  />
                  <label
                    for={`weight${index}`}
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Weight
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id={`reps${index}`}
                    {...register(`exercises[${index}].numberOfReps`)}
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    defaultValue={item.reps || item.numberOfReps}
                  />
                  <label
                    for={`reps${index}`}
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    reps
                  </label>
                </div>

                <button
                  className="bg-red-500 border-black border-2 hover:bg-white active:scale-95 text-gray-800 hover:text-red-500 hover:border-red-500 duration-200 font-semibold px-2 rounded shadow"
                  type="button"
                  value={index}
                  onClick={(item) => handleIncrement(item)}
                >
                  increment
                </button>

                <button
                  className="bg-red-500 border-black border-2 hover:bg-white active:scale-95 text-gray-800 hover:text-red-500 hover:border-red-500 duration-200 font-semibold px-2 rounded shadow"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove
                </button>
              </div>
              <div>
                <button
                  className="bg-slate-800 border-black border-2 hover:bg-white active:scale-95 text-white hover:text-slate-800 hover:border-slate-800 duration-200 font-semibold px-2 rounded shadow"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Calc Plates
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default FieldArray;
