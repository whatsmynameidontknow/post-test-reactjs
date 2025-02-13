export const endDateNotBeforeStartDate = (p) => {
    return p.end_date >= p.start_date;
};
