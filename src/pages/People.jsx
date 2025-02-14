import { Card } from 'primereact/card';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import PersonForm from '../components/PersonForm';
import PersonInfoDialog from '../components/PersonInfoDialog';
import PersonList from '../components/PersonList';
import PersonStats from '../components/PersonStats';
import { EMPTY_PERSON } from '../constants/constants';
import useStore from '../stores/app.store';

export default function People() {
    const {
        divisions,
        people,
        addPerson,
        editPerson,
        deletePerson,
        removePersonFromProject,
        projects,
    } = useStore();
    const [selectedPerson, setSelectedPerson] = useState(EMPTY_PERSON);
    const [infoDialogVisible, setInfoDialogVisible] = useState(false);
    const [selectedPersonInfo, setSelectedPersonInfo] = useState();
    const peopleWithDivisions = people.map((person) => ({
        ...person,
        division: divisions.find((d) => d.id === person.division_id),
    }));
    const onSubmit = (person) => {
        person.division_id = person.division.id;
        delete person.division;
        if (person.id) {
            editPerson(person);
            setSelectedPerson(EMPTY_PERSON);
        } else {
            addPerson(person);
        }
        Swal.fire({
            title: person.full_name,
            text: `Person ${person.id ? 'Updated' : 'Added'} Successfully!`,
            icon: 'success',
        });
    };

    const onCancel = () => {
        setSelectedPerson(EMPTY_PERSON);
    };

    const personFormRef = useRef(null);

    const onEditClick = (person) => {
        setSelectedPerson(person);
        personFormRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };

    const onDeleteClick = (person) => {
        Swal.fire({
            title: person?.full_name,
            text: `Are You Sure You Want to Delete ${person?.full_name}?`,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showCancelButton: true,
            icon: 'question',
        }).then((res) => {
            if (res.isConfirmed) {
                deletePerson(person);
                if (person.id === selectedPerson?.id) {
                    setSelectedPerson(EMPTY_PERSON);
                }
                projects.forEach((project) =>
                    removePersonFromProject(project.id, person.id)
                );
                Swal.fire({
                    title: person.full_name,
                    text: `${person.full_name} Deleted Successfully!`,
                    icon: 'success',
                });
            }
        });
    };

    const onInfoClick = (person) => {
        setSelectedPersonInfo(person);
        setInfoDialogVisible(true);
    };

    return (
        <div className="surface-ground p-4 md:p-6">
            <div className="flex flex-column gap-4">
                <Card className="shadow-2">
                    <div className="flex flex-column gap-4">
                        <h1 className="text-4xl font-bold text-900 mb-2 text-center">
                            People Management
                        </h1>

                        <div className="flex flex-column gap-4">
                            <div className="surface-card p-4 border-round">
                                <PersonForm
                                    personData={selectedPerson}
                                    onSubmit={onSubmit}
                                    onCancel={onCancel}
                                    ref={personFormRef}
                                />
                            </div>
                            <div className="surface-card p-4 border-round">
                                <PersonList
                                    people={peopleWithDivisions}
                                    onEditClick={onEditClick}
                                    onDeleteClick={onDeleteClick}
                                    onInfoClick={onInfoClick}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="shadow-2">
                    <h1 className="text-4xl font-bold text-900 mb-2 text-center">
                        Statistics
                    </h1>
                    <PersonStats people={peopleWithDivisions} />
                </Card>

                <PersonInfoDialog
                    visible={infoDialogVisible}
                    person={selectedPersonInfo}
                    onClose={() => setInfoDialogVisible(false)}
                />
            </div>
        </div>
    );
}
