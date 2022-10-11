import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";

const WorkoutPlanDetailsStep = ({
  setCreateWorkoutFormActive,
  formData,
  setFormData,
  step,
  setStep,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => {
    setFormData({
      ...formData,
      timesPerWeek: data.timesPerWeek,
      name: data.name,
    });
    handleNextStep();
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <div className="h-screen bg-white fixed top-0 w-screen left-0 lg:left-28 flex flex-col items-center">
      <h1 className="text-center text-3xl mt-8 underline decoration-black">
        Workout Plan Details
      </h1>

      <div className="w-full max-w-xs mt-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 border-black"
        >
          <div className="mb-6 relative">
            <input
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="workoutPlanName"
              {...register("name", {
                required: true,
                maxLength: 50,
              })}
              type="text"
              placeholder=" "
              defaultValue={formData.name}
            />
            <label
              for="workoutPlanName"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Workout Plan Name
            </label>
          </div>
          <div className="mb-6 relative">
            <input
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              id="timesPerWeek"
              {...register("timesPerWeek", {
                required: true,
                maxLength: 20,
              })}
              defaultValue={formData.timesPerWeek}
              type="number"
              min={1}
              max={7}
              placeholder=" "
            />
            <label
              for="timesPerWeek"
              className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Times per Week
            </label>
          </div>
          <div className="flex justify-between">
            <button
              className="z-50 bg-white hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
              disabled={step === 1 ? true : false}
              onClick={handlePreviousStep}
            >
              Previous
            </button>

            <button
              type="submit"
              className="z-50 bg-white hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Next
            </button>
          </div>
        </form>
      </div>

      <button
        className="fixed top-0 right-0 z-50"
        onClick={() => setCreateWorkoutFormActive(false)}
      >
        <AiOutlineClose className="text-black w-10 h-10 m-2" />
      </button>
    </div>
  );
};

export default WorkoutPlanDetailsStep;
