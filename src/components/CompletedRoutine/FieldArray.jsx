import { useFieldArray } from "react-hook-form";

const FieldArray = ({ control, register, errors }) => {
  const { fields, remove } = useFieldArray({
    control,
    name: "exercises",
  });

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
                <div class="relative">
                  <input
                    type="text"
                    id={`name${index}`}
                    {...register(`exercises[${index}].exercise.name`)}
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    readOnly
                  />
                  <label
                    for={`name${index}`}
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Name
                  </label>
                </div>
                <div class="relative">
                  <input
                    type="text"
                    id={`weight${index}`}
                    {...register(`exercises[${index}].weight`)}
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    for={`weight${index}`}
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Weight
                  </label>
                </div>
                <div class="relative">
                  <input
                    type="text"
                    id={`reps${index}`}
                    {...register(`exercises[${index}].numberOfReps`)}
                    class="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    for={`reps${index}`}
                    class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    reps
                  </label>
                </div>

                <button
                  className="bg-red-500 border-black border-2 hover:bg-white active:scale-95 text-gray-800 hover:text-red-500 hover:border-red-500 duration-200 font-semibold px-2 rounded shadow"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Remove
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
