import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const DATE_KEYS = new Set(['start_date', 'end_date']);

const storage = createJSONStorage(() => localStorage, {
    reviver: (key, value) => {
        if (value && value.type === 'date') {
            console.log(value.value);
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
            addPerson: (person) =>
                set((state) => {
                    person.id = `person-${Date.now()}`;
                    return {
                        people: [...state.people, person],
                    };
                }),
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
                set((state) => {
                    project.id = `project-${Date.now()}`;
                    return {
                        projects: [...state.projects, project],
                    };
                }),
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
        }),
        {
            name: 'post-test',
            storage: storage,
        }
    )
);

export default useStore;
