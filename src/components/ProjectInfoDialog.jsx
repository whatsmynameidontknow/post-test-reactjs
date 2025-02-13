import dayjs from 'dayjs';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import { MAX_CONCURRENT } from '../constants/constants';
import { EMPTY_PERSON } from '../pages/People';
import useStore from '../stores/app.store';
import PersonList from './PersonList';
import PersonStats from './PersonStats';

export default function ProjectInfoDialog({ project, visible, onCancel }) {
    const { people, addPersonToProject, removePersonFromProject, projects } =
        useStore();
    const [selectedPerson, setSelectedPerson] = useState();
    const toastRef = useRef(null);
    useEffect(() => {
        setSelectedPerson(EMPTY_PERSON);
    }, [project]);

    const concurrentProjectsDoesNotExceedLimit = (personId) => {
        let allProjects = projects.filter((p) =>
            p?.members?.some((m) => m.id === personId)
        );
        if (!allProjects.some((p) => p.id === project.id)) {
            allProjects.push(project);
        }

        if (allProjects.length <= MAX_CONCURRENT) {
            return true;
        }

        const events = [];
        allProjects.forEach((p) => {
            events.push({ date: new Date(p.start_date), type: 1 });
            events.push({ date: new Date(p.end_date), type: -1 });
        });

        events.sort((a, b) => {
            const diff = a.date - b.date;
            if (diff === 0) {
                return a.type - b.type;
            }
            return diff;
        });

        let concurrent = 0;
        for (const event of events) {
            concurrent += event.type;
            if (concurrent > MAX_CONCURRENT) {
                return false;
            }
        }

        return true;
    };

    const projectDetails = [
        {
            label: 'Start Date',
            value: dayjs(project?.start_date).format('DD MMMM YYYY'),
        },
        {
            label: 'End Date',
            value: dayjs(project?.end_date).format('DD MMMM YYYY'),
        },
        { label: 'Total Members', value: project?.members?.length || 0 },
    ];

    return (
        <Dialog
            header={`${project?.name} Details`}
            visible={visible}
            onHide={onCancel}
            className="w-full lg:w-10 md:w-6"
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        >
            <div className="flex flex-column gap-4">
                <Card className="shadow-1">
                    <div className="grid">
                        {projectDetails.map((detail, index) => (
                            <div key={detail.label} className="col-12 md:col-4">
                                <div className="flex flex-column align-items-center p-3 border-round">
                                    <span className="text-500 text-sm">
                                        {detail.label}
                                    </span>
                                    <span className="text-900 text-xl font-medium">
                                        {detail.value}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="shadow-1">
                    <h3 className="text-xl font-semibold m-0 mb-3">
                        Add Team Member
                    </h3>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (
                                !concurrentProjectsDoesNotExceedLimit(
                                    selectedPerson.id
                                )
                            ) {
                                toastRef.current.show({
                                    severity: 'error',
                                    summary: 'Failed!',
                                    detail: `${selectedPerson?.full_name} telah tergabung di terlalu banyak project untuk periode ini!`,
                                });
                                return;
                            }
                            addPersonToProject(project?.id, selectedPerson);
                            setSelectedPerson(EMPTY_PERSON);
                        }}
                        className="flex gap-3"
                    >
                        <Dropdown
                            id="person"
                            value={selectedPerson}
                            options={people}
                            optionDisabled={(person) =>
                                project?.members?.some(
                                    (p) => p.id === person.id
                                )
                            }
                            optionLabel="full_name"
                            className="flex-1"
                            placeholder="Select a Person"
                            onChange={(e) => setSelectedPerson(e.value)}
                            required
                        />
                        <Button
                            label="Add Member"
                            icon="pi pi-user-plus"
                            type="submit"
                        />
                    </form>
                </Card>

                <Divider align="center">
                    <span className="text-500">Team Members</span>
                </Divider>

                <Card className="shadow-1">
                    <PersonList
                        people={project?.members}
                        onDeleteClick={(person) => {
                            removePersonFromProject(project?.id, person.id);
                        }}
                    />
                </Card>

                <Divider align="center">
                    <span className="text-500">Statistics</span>
                </Divider>
                <Card className="shadow-1">
                    <PersonStats
                        people={project?.members}
                        chartTitle={`${project?.name} Members by Division`}
                    />
                </Card>
            </div>
            <Toast ref={toastRef} position="bottom-right" />
        </Dialog>
    );
}
