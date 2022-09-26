import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import FieldArray from "./FieldArray";
import { yupResolver } from "@hookform/resolvers/yup";
import workoutPlansService from "../../services/workoutPlans";
import * as yup from "yup";

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
  userDetails,
  setUserDetails,
  token,
  timesPerWeek,
}) => {
  const defaultValues = {
    routines: formData.routines,
  };

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const onSubmit = (data) => {
    console.log(data);
    const workoutSetsForApi = data.routines.map((r) => {
      let workoutSets2 = [];
      r.exercises.map((e) => {
        let sets = [];
        for (let i = 0; i < e.sets; i++) {
          sets.push({ exerciseId: e.name, numberOfReps: 0, weight: 0 });
        }
        return workoutSets2.push({ sets });
      });
      return {
        name: r.name,
        dayOrderNumber: r.dayOrderNumber,
        workoutSets: workoutSets2,
      };
    });
    console.log(workoutSetsForApi);
    handleCreateWorkoutPlan(workoutSetsForApi);
    setCreateWorkoutFormActive(false);
    setFormData({
      ...formData,
      name: "",
      timesPerWeek: 0,
      routines: [],
    });
    setStep(1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleCreateWorkoutPlan = async (workoutSetsForApi) => {
    console.log(formData);
    const workout = await workoutPlansService.createWorkoutPlan(
      { ...formData, routines: workoutSetsForApi },
      token
    );
    const workoutPlans = userDetails.workoutPlans.concat(workout);
    setUserDetails({
      ...userDetails,
      workoutPlans,
    });
    console.log("userDetails after workout created", userDetails);
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

        <button type="button" onClick={() => reset(defaultValues)}>
          Reset
        </button>

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
            className="z-50 bg-white hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Create Workout
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