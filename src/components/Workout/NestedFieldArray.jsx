import { useFieldArray } from "react-hook-form";
import Select from "react-select";
import { Controller } from "react-hook-form";
import { useEffect } from "react";

const NestedFieldArray = ({
  nestIndex,
  control,
  register,
  options,
  errors,
}) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `routines[${nestIndex}].exercises`,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({
        name: "",
        sets: "",
      });
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {fields.map((item, k) => {
        return (
          <div
            className="flex flex-col md:flex-row max-w-5xl justify-center items-center m-1"
            key={item.id}
            style={{ marginLeft: 20 }}
          >
            <label className="mr-2">{`Exercise ${k + 1} : `}</label>
            <div className="flex gap-2 justify-center items-center">
              <Controller
                control={control}
                defaultValue={options.map((c) => c.value)}
                name={`routines[${nestIndex}].exercises[${k}].name`}
                render={({ field: { onChange, value, ref } }) => (
                  <Select
                    className={
                      errors?.routines &&
                      errors?.routines[nestIndex]?.exercises &&
                      errors?.routines[nestIndex]?.exercises[k]?.name
                        ? "whitespace-nowrap w-[20vw] border-red-500 border rounded-lg outline-none"
                        : "whitespace-nowrap w-[20vw] border-black border rounded-lg outline-none"
                    }
                    inputRef={ref}
                    value={options.filter((c) => value === c.value)}
                    onChange={(val) => onChange(val.value)}
                    options={options}
                  />
                )}
              />

              <div className="relative z-0">
                <input
                  type="text"
                  className={
                    errors?.routines &&
                    errors?.routines[nestIndex]?.exercises &&
                    errors?.routines[nestIndex]?.exercises[k]?.sets
                      ? "block py-2.5 px-0 md:min-w-[20vw] w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-red-300 appearance-none focus:outline-none focus:ring-0 focus:border-red-600 peer"
                      : "block py-2.5 px-0 md:min-w-[20vw] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  }
                  placeholder=" "
                  {...register(`routines[${nestIndex}].exercises[${k}].sets`)}
                  defaultValue={item.sets}
                />
                {errors?.routines &&
                errors?.routines[nestIndex]?.exercises &&
                errors?.routines[nestIndex]?.exercises[k]?.sets ? (
                  <p role="alert">The Field is required</p>
                ) : (
                  ""
                )}
                <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Sets
                </label>
              </div>
              <button
                className="bg-white border-black border-2 whitespace-nowrap hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 rounded shadow"
                type="button"
                onClick={() => remove(k)}
              >
                Delete Exercise
              </button>
            </div>
          </div>
        );
      })}

      <button
        className="bg-green-600 border-black border-2 whitespace-nowrap hover:bg-gray-100 active:scale-95 mt-4 text-gray-800 font-semibold py-2 px-4 rounded shadow"
        type="button"
        onClick={() =>
          append({
            name: "",
            sets: "",
          })
        }
      >
        Add Exercise
      </button>

      <hr />
    </div>
  );
};

export default NestedFieldArray;
