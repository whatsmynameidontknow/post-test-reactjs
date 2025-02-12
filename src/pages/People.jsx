import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import PersonForm from '../components/PersonForm';
import PersonList from '../components/PersonList';
import PersonStats from '../components/PersonStats';
import useStore from '../stores/app.store';

const EMPTY_PERSON = {
    full_name: '',
    division: undefined,
};

export default function People() {
    const { people, addPerson, editPerson, deletePerson } = useStore();
    const [selectedPerson, setSelectedPerson] = useState(EMPTY_PERSON);
    const [personToDelete, setPersonToDelete] = useState();
    const [dialogVisible, setDialogVisible] = useState(false);

    const onSubmit = (person) => {
        if (person.id) {
            editPerson(person);
            return;
        }
        addPerson(person);
        setSelectedPerson(EMPTY_PERSON);
    };

    const onCancel = () => {
        setSelectedPerson(EMPTY_PERSON);
    };

    const onEditClick = (person) => {
        setSelectedPerson(person);
    };

    const onDeleteClick = (person) => {
        setPersonToDelete(person);
        setDialogVisible(true);
    };

    const doDelete = () => {
        deletePerson(personToDelete);
        if (personToDelete.id === selectedPerson.id) {
            setSelectedPerson(EMPTY_PERSON);
        }
        setDialogVisible(false);
    };

    return (
        <div className="surface-ground p-4 md:p-6">
            <div className="flex flex-column gap-4">
                <Card className="shadow-2">
                    <div className="flex flex-column gap-4">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-900 mb-2">
                                Person Management
                            </h1>
                        </div>

                        <div className="flex flex-column gap-4">
                            <div className="surface-card p-4 border-round">
                                <PersonForm
                                    personData={selectedPerson}
                                    onSubmit={onSubmit}
                                    onCancel={onCancel}
                                />
                            </div>
                            <div className="surface-card p-4 border-round">
                                <PersonList
                                    people={people}
                                    onEditClick={onEditClick}
                                    onDeleteClick={onDeleteClick}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                <Dialog
                    header={
                        <span className="font-bold text-xl">
                            Confirm Deletion
                        </span>
                    }
                    visible={dialogVisible}
                    onHide={() => setDialogVisible(false)}
                    className="w-full md:w-30rem"
                    modal
                    footer={
                        <div className="flex justify-content-end gap-2">
                            <Button
                                label="Cancel"
                                icon="pi pi-times"
                                onClick={() => setDialogVisible(false)}
                                className="p-button-text"
                            />
                            <Button
                                label="Delete"
                                icon="pi pi-trash"
                                onClick={doDelete}
                                severity="danger"
                                autoFocus
                            />
                        </div>
                    }
                >
                    <div className="flex flex-column align-items-center gap-4 py-4">
                        <i className="pi pi-exclamation-triangle text-6xl text-yellow-500" />
                        <p className="m-0 text-lg text-center">
                            Are you sure you want to delete{' '}
                            <span className="font-bold text-900">
                                {personToDelete?.full_name}
                            </span>
                            ?
                        </p>
                        <p className="m-0 text-sm text-600">
                            This action cannot be undone.
                        </p>
                    </div>
                </Dialog>

                <Card className="shadow-2">
                    <h1 className="text-center">Statistics</h1>
                    <PersonStats people={people} />
                </Card>
            </div>
        </div>
    );
}
