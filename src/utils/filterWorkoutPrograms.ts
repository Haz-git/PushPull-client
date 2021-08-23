const filterWorkoutPrograms = (workoutPrograms: any[], currFilters: any) => {
    const filteredWorkoutPrograms = workoutPrograms.filter((program) => {
        for (const key in currFilters) {
            if (
                program[key] === undefined ||
                (program[key] !== currFilters[key] &&
                    currFilters[key] !== 'any')
            )
                return false;
        }

        return true;
    });

    return filteredWorkoutPrograms;
};

export default filterWorkoutPrograms;
