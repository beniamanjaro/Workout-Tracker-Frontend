// if (changedExers.length > 1) {
//   const addExesToDb = async () => {
//     await exercisesService.addExercisesBulk(changedExers, token);
//     console.log(changedExers);
//     console.log("yep");
//     console.log("yep");
//   };
//   addExesToDb();
// }

// useEffect(() => {
//   const getExer = async () => {
//     const exs = await exercisesService.getApiExercises();
//     const changedExers = exs.map((item) => {
//       return {
//         name: item.name,
//         category: item.bodyPart,
//         equipment: item.equipment,
//         GifLink: item.gifUrl,
//       };
//     });
//     await exercisesService.addExercisesBulk(changedExers, token);
//     console.log("useeffect triggered");
//     console.log(changedExers);
//     // setExercises(exs);
//   };
//   getExer();
// }, []);
