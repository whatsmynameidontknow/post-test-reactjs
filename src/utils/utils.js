export const endDateNotBeforeStartDate = (p) => {
    return p.end_date >= p.start_date;
};

export const PROJECT_STATUS = Object.freeze({
    LEWAT: 'lewat',
    HARI_INI: 'hari ini',
    AMAN: 'aman',
});

export const getProjectStatus = (project) => {
    const todayTime = new Date().setHours(0, 0, 0, 0);
    const projectEndDateTime = project?.end_date?.getTime();
    const projectStatus = projectEndDateTime - todayTime;
    return projectStatus < 0
        ? PROJECT_STATUS.LEWAT
        : projectStatus === 0
        ? PROJECT_STATUS.HARI_INI
        : PROJECT_STATUS.AMAN;
};
