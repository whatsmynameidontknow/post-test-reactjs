import { Card } from 'primereact/card';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import PersonForm from '../components/PersonForm';
import PersonInfoDialog from '../components/PersonInfoDialog';
import PersonList from '../components/PersonList';
import PersonStats from '../components/PersonStats';
import useStore from '../stores/app.store';

export const EMPTY_PERSON = {
    full_name: '',
    division: undefined,
};

export default function People() {
    const {
        people,
        addPerson,
        editPerson,
        deletePerson,
        removePersonFromProject,
        projects,
    } = useStore();
    const [selectedPerson, setSelectedPerson] = useState(EMPTY_PERSON);
    const [personToDelete, setPersonToDelete] = useState();
    const [dialogVisible, setDialogVisible] = useState(false);
    const [infoDialogVisible, setInfoDialogVisible] = useState(false);
    const [selectedPersonInfo, setSelectedPersonInfo] = useState();

    const onSubmit = (person) => {
        if (person.id) {
            editPerson(person);
            setSelectedPerson(EMPTY_PERSON);
        } else {
            addPerson(person);
        }
        Swal.fire({
            title: 'Person',
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
        setPersonToDelete(person);
        setDialogVisible(true);
    };

    const onInfoClick = (person) => {
        setSelectedPersonInfo(person);
        setInfoDialogVisible(true);
    };

    const doDelete = () => {
        deletePerson(personToDelete);
        if (personToDelete.id === selectedPerson.id) {
            setSelectedPerson(EMPTY_PERSON);
        }
        projects.forEach((project) =>
            removePersonFromProject(project.id, personToDelete.id)
        );
        setDialogVisible(false);
    };

    return (
        <div className="surface-ground p-4 md:p-6">
            <div className="flex flex-column gap-4">
                <Card className="shadow-2">
                    <div className="flex flex-column gap-4">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-900 mb-2">
                                People Management
                            </h1>
                        </div>

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
                                    people={people}
                                    onEditClick={onEditClick}
                                    onDeleteClick={onDeleteClick}
                                    onInfoClick={onInfoClick}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                <DeleteConfirmationDialog
                    name={personToDelete?.full_name}
                    onCancel={() => setDialogVisible(false)}
                    onConfirm={doDelete}
                    visible={dialogVisible}
                />

                <Card className="shadow-2">
                    <h1 className="text-center">Statistics</h1>
                    <PersonStats people={people} />
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
