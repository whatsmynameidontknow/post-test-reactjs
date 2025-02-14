export const endDateNotBeforeStartDate = (p) => {
    return p.end_date >= p.start_date;
};

export const getProjectStatus = (project) => {
    const todayTime = new Date().setHours(0, 0, 0, 0);
    const projectEndDateTime = project?.end_date?.getTime();
    return projectEndDateTime - todayTime;
};
