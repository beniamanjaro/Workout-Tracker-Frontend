import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import FieldArray from "./FieldArray";
import { yupResolver } from "@hookform/resolvers/yup";
import workoutPlansService from "../../services/workoutPlans";
import * as yup from "yup";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";

const schema = yup
  .object({
    routines: yup.array(
      yup.object({
        name: yup.string().required(),
        exercises: yup.array(
          yup.object({
            name: yup.number().required(),
            sets: yup.string().required(),
          })
        ),
      })
    ),
  })
  .required();

const CreateWorkoutForm = ({
  setCreateWorkoutFormActive,
  formData,
  setFormData,
  options,
  setStep,
  step,
  timesPerWeek,
  id,
  setWorkoutPlanDetails,
}) => {
  const defaultValues = {
    routines: formData.routines,
  };

  const {
    user: { token },
  } = useContext(AuthContext);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = (data) => {
    const routinesForApi = data.routines.map((r) => {
      let workoutSetsTemp = [];
      r.exercises.map((e) => {
        let sets = [];
        for (let i = 0; i < e.sets; i++) {
          sets.push({ exerciseId: e.name, numberOfReps: 0, weight: 0 });
        }
        return workoutSetsTemp.push({ sets });
      });
      return {
        name: r.name,
        dayOrderNumber: r.dayOrderNumber,
        workoutSets: workoutSetsTemp,
      };
    });

    handleUpdateWorkoutPlan(routinesForApi);
    setCreateWorkoutFormActive(false);
    notify();
    setFormData({
      ...formData,
      name: "",
      timesPerWeek: 0,
      routines: [],
    });
    setStep(1);
  };

  const notify = () => {
    toast.success("Successfully updated the workout plan!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleUpdateWorkoutPlan = async (routinesForApi) => {
    const details = await workoutPlansService.updateWorkoutPlan(
      { ...formData, routines: routinesForApi },
      id,
      token
    );
    setWorkoutPlanDetails(details);
  };

  return (
    <>
      <h1 className="text-center text-3xl mt-8 underline decoration-black">
        Routine Details
      </h1>
      <form
        className="flex flex-col items-center mt-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldArray
          {...{ control, register, defaultValues, getValues, setValue, errors }}
          options={options}
          timesPerWeek={timesPerWeek}
        />

        <div className="flex">
          <button
            className="z-50 bg-white hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            disabled={step === 1 ? true : false}
            onClick={handlePreviousStep}
          >
            Previous
          </button>

          <button
            type="submit"
            className="z-50 bg-green-500 hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Update Workout
          </button>
        </div>
      </form>
      <button
        className="fixed top-0 right-0 z-50"
        onClick={() => setCreateWorkoutFormActive(false)}
      >
        <AiOutlineClose className="text-black w-10 h-10 m-2" />
      </button>
    </>
  );
};

export default CreateWorkoutForm;
