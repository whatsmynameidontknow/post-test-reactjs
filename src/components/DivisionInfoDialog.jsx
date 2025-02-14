import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import useStore from '../stores/app.store';
import PersonList from './PersonList';

export default function DivisionInfoDialog({ division, visible, onClose }) {
    const { people } = useStore();
    const currentDivisionMember = people.filter(
        (person) => person.division.id === division?.id
    );

    const divisionDetails = [
        {
            label: 'Division Name',
            value: division?.name,
            icon: 'pi pi-building',
        },
        {
            label: 'Total Member',
            value: currentDivisionMember?.length || 0,
            icon: 'pi pi-users',
        },
    ];

    return (
        <Dialog
            header={`${division?.name} Details`}
            visible={visible}
            onHide={onClose}
            className="w-full lg:w-8 md:w-6"
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        >
            <div className="flex flex-column gap-4">
                <Card className="shadow-1">
                    <div className="lg:flex lg:justify-content-center">
                        {divisionDetails.map((detail) => (
                            <div key={detail.label} className="col-12 md:col-4">
                                <div className="flex flex-column align-items-center p-3 border-round surface-50">
                                    <i
                                        className={`${detail.icon} text-xl text-primary mb-2`}
                                    ></i>
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

                <Divider align="center">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-folder text-primary"></i>
                        <span className="text-500 font-medium">Member</span>
                        <Badge
                            value={currentDivisionMember?.length || 0}
                            severity="info"
                        />
                    </div>
                </Divider>

                <Card className="shadow-1">
                    <PersonList
                        people={currentDivisionMember}
                        showDivision={false}
                    />
                </Card>
            </div>
        </Dialog>
    );
}
