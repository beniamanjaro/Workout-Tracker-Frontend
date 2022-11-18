import { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import NestedFieldArray from "./NestedFieldArray";

const FieldArray = ({
  control,
  register,
  setValue,
  getValues,
  options,
  errors,
  timesPerWeek,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "routines",
  });
  console.log(errors);

  const renderRoutines = () => {
    let obj = [];
    for (let i = 0; i < timesPerWeek; i++) {
      obj.push({ name: "" });
    }
    append(obj);
  };

  useEffect(() => {
    if (fields.length === 0) {
      renderRoutines();
    }
  }, []);

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
                <label>{`Routine ${index + 1} : `}</label>
              </div>
              <div className="flex justify-between mb-1">
                <div className="relative">
                  <input
                    type="text"
                    id={`name${index}`}
                    {...register(`routines[${index}].name`)}
                    className={
                      errors?.routines && errors?.routines[index]?.name
                        ? "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-red-600 appearance-none-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                        : "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    }
                    placeholder=" "
                  />
                  <label
                    for={`name${index}`}
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Name
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    id={`dayOrderNumber${index}`}
                    {...register(`routines[${index}].dayOrderNumber`)}
                    className={
                      errors?.routines &&
                      errors?.routines[index]?.dayOrderNumber
                        ? "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-red-600 appearance-none-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
                        : "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    }
                    placeholder=" "
                    defaultValue={item.dayOrderNumber || index + 1}
                  />
                  <label
                    for={`dayOrderNumber${index}`}
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    dayOrderNumber
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
              <NestedFieldArray
                nestIndex={index}
                {...{ control, register, errors }}
                options={options}
              />
            </li>
          );
        })}
      </ul>

      <section>
        <button
          className="bg-white hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          type="button"
          disabled={fields.length < 6 ? false : true}
          onClick={() => {
            append({ name: "" });
          }}
        >
          Add Routine
        </button>
      </section>
    </>
  );
};

export default FieldArray;
