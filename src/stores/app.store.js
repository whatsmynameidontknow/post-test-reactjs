import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const DATE_KEYS = new Set(['start_date', 'end_date']);

const storage = createJSONStorage(() => localStorage, {
    reviver: (key, value) => {
        if (value && value.type === 'date') {
            return new Date(value.value);
        }
        return value;
    },
    replacer: (key, value) => {
        if (DATE_KEYS.has(key)) {
            return {
                type: 'date',
                value: value,
            };
        }
        return value;
    },
});

const useStore = create(
    persist(
        (set) => ({
            people: [],
            projects: [],
            divisions: [],
            addPerson: (person) =>
                set((state) => ({
                    people: [
                        ...state.people,
                        {
                            ...person,
                            id: `person-${Date.now()}`,
                        },
                    ],
                })),
            editPerson: (person) =>
                set((state) => {
                    const newPeople = state.people.map((p) => {
                        if (p.id === person.id) {
                            p = person;
                        }
                        return p;
                    });
                    return {
                        people: newPeople,
                    };
                }),
            deletePerson: (person) =>
                set((state) => ({
                    people: state.people.filter((p) => p.id !== person.id),
                })),
            addProject: (project) =>
                set((state) => ({
                    projects: [
                        ...state.projects,
                        {
                            ...project,
                            id: `project-${Date.now()}`,
                        },
                    ],
                })),
            editProject: (project) =>
                set((state) => {
                    const newProjects = state.projects.map((p) => {
                        if (p.id === project.id) {
                            p = project;
                        }
                        return p;
                    });
                    return {
                        projects: newProjects,
                    };
                }),
            deleteProject: (project) =>
                set((state) => ({
                    projects: state.projects.filter((p) => p.id !== project.id),
                })),
            addPersonToProject: (projectId, personId) =>
                set((state) => {
                    const projects = state.projects.map((project) => {
                        if (project.id === projectId) {
                            project.member_ids = project.member_ids ?? [];
                            if (
                                project.member_ids.some(
                                    (p) => p.id === personId
                                )
                            )
                                return project;
                            project.member_ids.push(personId);
                        }
                        return project;
                    });

                    const people = state.people.map((person) => {
                        if (person.id === personId) {
                            person.project_ids = person.project_ids ?? [];
                            if (person.project_ids.includes(projectId))
                                return person;
                            person.project_ids.push(projectId);
                        }
                        return person;
                    });

                    return {
                        projects: projects,
                        people: people,
                    };
                }),
            removePersonFromProject: (projectId, personId) =>
                set((state) => {
                    const projects = state.projects.map((project) => {
                        if (project.id === projectId) {
                            project.member_ids = project?.member_ids?.filter(
                                (id) => id !== personId
                            );
                        }
                        return project;
                    });

                    const people = state.people.map((person) => {
                        if (person.id === personId) {
                            person.project_ids = person?.project_ids?.filter(
                                (id) => id !== projectId
                            );
                        }
                        return person;
                    });
                    return {
                        projects: projects,
                        people: people,
                    };
                }),
            addDivision: (division) =>
                set((state) => ({
                    divisions: [
                        ...state.divisions,
                        {
                            ...division,
                            id: `division-${Date.now()}`,
                        },
                    ],
                })),
            editDivision: (division) =>
                set((state) => {
                    const divisions = state.divisions.map((d) => {
                        if (division.id === d.id) {
                            return division;
                        }
                        return d;
                    });
                    return {
                        divisions: divisions,
                    };
                }),
            deleteDivision: (division) =>
                set((state) => ({
                    divisions: state.divisions.filter(
                        (d) => d.id !== division.id
                    ),
                })),
        }),
        {
            name: 'post-test',
            storage: storage,
            version: 96,
        }
    )
);

export default useStore;
