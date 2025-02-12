import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
        }
    )
);

export default useStore;
