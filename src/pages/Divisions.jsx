import { Card } from 'primereact/card';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import DivisionForm from '../components/DivisionForm';
import DivisionInfoDialog from '../components/DivisionInfoDialog';
import DivisionList from '../components/DivisionList';
import DivisionStats from '../components/DivisionStats';
import { EMPTY_DIVISION } from '../constants/constants';
import useStore from '../stores/app.store';

export default function Divisions() {
    const { people, divisions, addDivision, editDivision, deleteDivision } =
        useStore();
    const [selectedDivision, setSelectedDivision] = useState(EMPTY_DIVISION);
    const [infoDialogVisible, setInfoDialogVisible] = useState(false);
    const [selectedDivisionInfo, setSelectedDivisionInfo] = useState();

    const divisionMemberCount = new Map();
    people.forEach((person) => {
        divisionMemberCount.set(
            person.division_id,
            (divisionMemberCount.get(person.division_id) ?? 0) + 1
        );
    });

    const divisionsStatsData = divisions.map((division) => ({
        ...division,
        member_count: divisionMemberCount.get(division.id) ?? 0,
    }));

    const onSubmit = (division) => {
        if (division.id) {
            editDivision(division);
            setSelectedDivision(EMPTY_DIVISION);
        } else {
            addDivision(division);
        }
        Swal.fire({
            title: division.name,
            text: `Division ${division.id ? 'Updated' : 'Added'} Successfully!`,
            icon: 'success',
        });
    };

    const onCancel = () => {
        setSelectedDivision(EMPTY_DIVISION);
    };

    const divisionFormRef = useRef(null);

    const onEditClick = (division) => {
        setSelectedDivision(division);
        divisionFormRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };

    const onDeleteClick = (division) => {
        Swal.fire({
            title: division.name,
            text: `Are You Sure You Want to Delete ${division.name}?`,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showCancelButton: true,
            icon: 'question',
        }).then((res) => {
            if (res.isConfirmed) {
                const anyPersonInCurrentDivision = people.some(
                    (person) => person.division_id === division.id
                );
                if (anyPersonInCurrentDivision) {
                    Swal.fire({
                        title: division.name,
                        text: `Cannot delete ${division.name} - it still has active members. Please reassign or remove all members first.`,
                        icon: 'error',
                    });
                    return;
                }
                deleteDivision(division);
                if (division.id === selectedDivision?.id) {
                    setSelectedDivision(EMPTY_DIVISION);
                }
                Swal.fire({
                    title: division.name,
                    text: `${division.name} Deleted Successfully!`,
                    icon: 'success',
                });
            }
        });
    };

    const onInfoClick = (division) => {
        setSelectedDivisionInfo(division);
        setInfoDialogVisible(true);
    };

    return (
        <div className="surface-ground p-4 md:p-6">
            <div className="flex flex-column gap-4">
                <Card className="shadow-2">
                    <div className="flex flex-column gap-4">
                        <h1 className="text-4xl font-bold text-900 mb-2 text-center">
                            Divisions Management
                        </h1>

                        <div className="flex flex-column gap-4">
                            <div className="surface-card p-4 border-round">
                                <DivisionForm
                                    divisionData={selectedDivision}
                                    onSubmit={onSubmit}
                                    onCancel={onCancel}
                                    ref={divisionFormRef}
                                />
                            </div>
                            <div className="surface-card p-4 border-round">
                                <DivisionList
                                    divisions={divisions}
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
                    <DivisionStats divisions={divisionsStatsData} />
                </Card>

                <DivisionInfoDialog
                    visible={infoDialogVisible}
                    division={selectedDivisionInfo}
                    onClose={() => setInfoDialogVisible(false)}
                />
            </div>
        </div>
    );
}
