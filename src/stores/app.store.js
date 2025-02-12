import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
    persist(
        (set) => ({
            people: [],
            projects: [],
            addPerson: (person) =>
                set((state) => {
                    person.id = `person_${Date.now()}`;
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
        }),
        {
            name: 'post-test',
        }
    )
);

export default useStore;
