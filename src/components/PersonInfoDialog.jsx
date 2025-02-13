import { Badge } from 'primereact/badge';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import useStore from '../stores/app.store';
import ProjectList from './ProjectList';
import ProjectStats from './ProjectStats';

export default function PersonInfoDialog({ person, visible, onClose }) {
    const { projects } = useStore();
    const currentPersonProjects = projects.filter((project) =>
        person?.project_ids?.includes(project.id)
    );

    const personDetails = [
        {
            label: 'Full Name',
            value: person?.full_name,
            icon: 'pi pi-user',
        },
        {
            label: 'Division',
            value: person?.division?.name,
            icon: 'pi pi-building',
        },
        {
            label: 'Total Projects',
            value: currentPersonProjects?.length || 0,
            icon: 'pi pi-folder',
        },
    ];

    return (
        <Dialog
            header={`${person?.full_name} Details`}
            visible={visible}
            onHide={onClose}
            className="w-full lg:w-8 md:w-6"
            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        >
            <div className="flex flex-column gap-4">
                <Card className="shadow-1">
                    <div className="grid">
                        {personDetails.map((detail) => (
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
                        <span className="text-500 font-medium">Projects</span>
                        <Badge
                            value={currentPersonProjects?.length || 0}
                            severity="info"
                        />
                    </div>
                </Divider>

                <Card className="shadow-1">
                    <ProjectList
                        projects={currentPersonProjects}
                        emptyMessage={
                            <div className="flex flex-column align-items-center gap-2 p-5">
                                <i
                                    className="pi pi-folder-open text-500"
                                    style={{ fontSize: '2rem' }}
                                ></i>
                                <span className="text-500">
                                    No projects assigned yet
                                </span>
                            </div>
                        }
                    />
                </Card>

                <Divider align="center">
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-chart-bar text-primary"></i>
                        <span className="text-500 font-medium">Statistics</span>
                    </div>
                </Divider>

                <Card className="shadow-1">
                    <ProjectStats
                        projects={currentPersonProjects}
                        chartTitle={`${person?.full_name} Projects by Year`}
                        emptyMessage={
                            <div className="flex flex-column align-items-center gap-2 p-5">
                                <i
                                    className="pi pi-chart-line text-500"
                                    style={{ fontSize: '2rem' }}
                                ></i>
                                <span className="text-500">
                                    No statistics available
                                </span>
                            </div>
                        }
                    />
                </Card>
            </div>
        </Dialog>
    );
}
