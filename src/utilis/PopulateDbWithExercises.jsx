// if (changedExers.length > 1) {
//   const addExesToDb = async () => {
//     await exercisesService.addExercisesBulk(changedExers, token);
//     console.log(changedExers);
//     console.log("yep");
//     console.log("yep");
//   };
//   addExesToDb();
// }

//   user: { token },
// } = useContext(AuthContext);

// useEffect(() => {
//   const {
//     user: { userId, token },
// } = useContext(AuthContext);

// useEffect(() => {
//   const getExer = async () => {
//     const exs = await exercisesService.getApiExercises();
//     const changedExers = exs.map((item) => {
//       return {
//         name: item.name,
//         category: item.bodyPart,
//         equipment: item.equipment,
//         gifLink: item.gifUrl,
//         muscle: item.target,
//       };
//     });
//     await exercisesService.addExercisesBulk(changedExers, token);
//     console.log("useeffect triggered");
//     console.log(changedExers);
//     setExercises(exs);
//   };
//   getExer();
// }, []);
