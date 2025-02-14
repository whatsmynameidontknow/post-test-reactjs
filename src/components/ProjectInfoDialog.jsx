import dayjs from 'dayjs';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import { EMPTY_PERSON } from '../constants/constants';
import useStore from '../stores/app.store';
import { getProjectStatus } from '../utils/utils';
import PersonList from './PersonList';
import PersonStats from './PersonStats';

export default function ProjectInfoDialog({ project, visible, onCancel }) {
    const { people, addPersonToProject, removePersonFromProject } = useStore();
    const [selectedPerson, setSelectedPerson] = useState();
    const toastRef = useRef(null);
    useEffect(() => {
        setSelectedPerson(EMPTY_PERSON);
    }, [project]);

    const projectMembers = people.filter((person) =>
        project?.member_ids?.includes(person.id)
    );

    const projectStatus = getProjectStatus(project);

    const projectDetails = [
        {
            label: 'Start Date',
            value: dayjs(project?.start_date).format('DD MMMM YYYY'),
            icon: 'pi pi-calendar',
        },
        {
            label: 'End Date',
            value: dayjs(project?.end_date).format('DD MMMM YYYY'),
            icon: 'pi pi-calendar-times',
            className:
                projectStatus < 0
                    ? 'text-red-500'
                    : projectStatus === 0
                    ? 'text-yellow-500'
                    : '',
        },
        {
            label: 'Total Members',
            value: project?.member_ids?.length || 0,
            icon: 'pi pi-users',
        },
    ];

    return (
        <Dialog
            header={`${project?.name} Details`}
            visible={visible}
            onHide={onCancel}
            className="w-full lg:w-8 md:w-6"
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        >
            <div className="flex flex-column gap-4">
                <Card className="shadow-1">
                    <div className="grid">
                        {projectDetails.map((detail) => (
                            <div key={detail.label} className="col-12 md:col-4">
                                <div className="flex flex-column align-items-center p-3 border-round surface-50">
                                    <i
                                        className={`${detail.icon} text-xl text-primary mb-2`}
                                    ></i>
                                    <span className="text-500 text-sm">
                                        {detail.label}
                                    </span>
                                    <span
                                        className={`text-900 text-xl font-medium ${
                                            detail.className ?? ''
                                        }`}
                                    >
                                        {detail.value}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {projectStatus >= 0 && (
                    <Card className="shadow-1">
                        <div className="flex align-items-center justify-content-between mb-3">
                            <h3 className="text-xl font-semibold m-0">
                                Add Team Member
                            </h3>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                addPersonToProject(
                                    project?.id,
                                    selectedPerson.id
                                );
                                setSelectedPerson(EMPTY_PERSON);
                                Swal.fire({
                                    title: project?.name,
                                    text: `${selectedPerson.full_name} Added to Project ${project?.name}`,
                                    icon: 'success',
                                    customClass: {
                                        container: 'z-9999',
                                    },
                                });
                            }}
                            className="flex gap-3"
                        >
                            <Dropdown
                                id="person"
                                value={selectedPerson}
                                options={people}
                                optionDisabled={(person) =>
                                    project?.member_ids?.some(
                                        (id) => id === person.id
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
                )}

                <Divider align="center">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-users text-primary"></i>
                        <span className="text-500 font-medium">
                            Team Members
                        </span>
                        <Badge
                            value={projectMembers.length || 0}
                            severity="info"
                        />
                    </div>
                </Divider>

                <Card className="shadow-1">
                    <PersonList
                        people={projectMembers}
                        onDeleteClick={(person) => {
                            Swal.fire({
                                title: project?.name,
                                text: `Are You Sure You Want to Remove ${person?.full_name} from Project ${project?.name}?`,
                                confirmButtonText: 'Yes',
                                cancelButtonText: 'No',
                                showCancelButton: true,
                                icon: 'question',
                                customClass: {
                                    container: 'z-9999',
                                },
                            }).then((res) => {
                                if (res.isConfirmed) {
                                    removePersonFromProject(
                                        project?.id,
                                        person.id
                                    );
                                    Swal.fire({
                                        title: project?.name,
                                        text: `${person?.full_name} Removed from Project ${project?.name}`,
                                        icon: 'success',
                                        customClass: {
                                            container: 'z-9999',
                                        },
                                    });
                                }
                            });
                        }}
                    />
                </Card>

                <Divider align="center">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-chart-bar text-primary"></i>
                        <span className="text-500 font-medium">Statistics</span>
                    </div>
                </Divider>

                <Card className="shadow-1">
                    <PersonStats
                        people={projectMembers}
                        chartTitle={`${project?.name} Members by Division`}
                    />
                </Card>
            </div>
            <Toast ref={toastRef} position="bottom-right" />
        </Dialog>
    );
}
