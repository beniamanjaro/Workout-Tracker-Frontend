import { useContext, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import FieldArray from "./FieldArray";
import { yupResolver } from "@hookform/resolvers/yup";
import workoutPlansService from "../../services/workoutPlans";
import * as yup from "yup";
import { get, isEmpty } from "lodash";
import { AuthContext } from "../../context/AuthContext";
import { WorkoutPlansContext } from "../../context/WorkoutPlansContext";
import {
  ADD_WORKOUT_PLAN,
  ENABLE_HAMBURGER_MENU,
} from "../../context/actionTypes";
import { HamburgerMenuContext } from "../../context/HamburgerMenuContext";

//Got the code for the unique properties from here => https://github.com/jquense/yup/issues/345
const uniquePropertyTest = function (value, propertyName, message) {
  if (
    this.parent
      .filter((v) => v !== value)
      .some((v) => get(v, propertyName) === get(value, propertyName))
  ) {
    throw this.createError({
      path: `${this.path}.${propertyName}`,
      message,
    });
  }

  return true;
};
yup.addMethod(yup.object, "uniqueProperty", function (propertyName, message) {
  return this.test("unique", message, function (value) {
    return uniquePropertyTest.call(this, value, propertyName, message);
  });
});
yup.addMethod(yup.object, "uniqueProperties", function (propertyNames) {
  return this.test("unique", "", function (value) {
    const errors = propertyNames
      .map(([propertyName, message]) => {
        try {
          return uniquePropertyTest.call(this, value, propertyName, message);
        } catch (error) {
          return error;
        }
      })
      .filter((error) => error instanceof yup.ValidationError);

    if (!isEmpty(errors)) {
      throw new yup.ValidationError(errors);
    }

    return true;
  });
});

const schema = yup
  .object({
    routines: yup.array(
      yup
        .object({
          name: yup.string().required(),
          dayOrderNumber: yup.number().min(1).max(7).required(),
          exercises: yup.array(
            yup.object({
              name: yup.number().required(),
              sets: yup.string().required(),
            })
          ),
        })
        .uniqueProperties([
          ["name", "name must be unique"],
          [
            "dayOrderNumber",
            "routine day order must be unique and between 1 and 7",
          ],
        ])
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
}) => {
  const defaultValues = {
    routines: formData.routines,
  };

  const {
    user: { token },
  } = useContext(AuthContext);

  const { dispatch } = useContext(WorkoutPlansContext);
  const dispatchHambuerMenu = useContext(HamburgerMenuContext).dispatch;
  const { isHamburgerMenuVisible } = useContext(HamburgerMenuContext);

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
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const workoutSetsForApi = data.routines.map((r) => {
      let workoutSets2 = [];
      r.exercises.map((e) => {
        let sets = [];
        for (let i = 0; i < e.sets; i++) {
          sets.push({ exerciseId: e.name, numberOfReps: 0, weight: 0 });
        }
        return workoutSets2.push({ sets });
      });
      if (!isHamburgerMenuVisible) {
        dispatchHambuerMenu({ type: ENABLE_HAMBURGER_MENU });
      }

      return {
        name: r.name,
        dayOrderNumber: r.dayOrderNumber,
        workoutSets: workoutSets2,
      };
    });

    handleCreateWorkoutPlan(workoutSetsForApi, workoutSetsForApi.length);
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

  const handleCreateWorkoutPlan = async (workoutSetsForApi, timesPerWeek) => {
    const workout = await workoutPlansService.createWorkoutPlan(
      { ...formData, timesPerWeek: timesPerWeek, routines: workoutSetsForApi },
      token
    );
    dispatch({
      type: ADD_WORKOUT_PLAN,
      payload: workout,
    });
  };

  const handleCloseForm = () => {
    dispatchHambuerMenu({ type: ENABLE_HAMBURGER_MENU });
    setCreateWorkoutFormActive(false);
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
            className="bg-white hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            disabled={step === 1 ? true : false}
            onClick={handlePreviousStep}
          >
            Previous
          </button>

          <button
            type="submit"
            className="bg-white hover:bg-gray-100 active:scale-95 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Create Workout
          </button>
        </div>
      </form>
      <button className="fixed top-0 right-0 z-50" onClick={handleCloseForm}>
        <AiOutlineClose className="text-black w-10 h-10 m-2" />
      </button>
    </>
  );
};

export default CreateWorkoutForm;
