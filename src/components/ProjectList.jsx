import dayjs from 'dayjs';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import { getProjectStatus } from '../utils/utils';

export default function ProjectList({
    projects,
    onEditClick,
    onDeleteClick,
    onInfoClick,
}) {
    return (
        <div className="card">
            <DataTable
                value={projects}
                stripedRows
                showGridlines
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25]}
                emptyMessage={
                    <div className="flex justify-content-center">
                        <span>No projects found.</span>
                    </div>
                }
                className="shadow-2"
                dataKey="id"
            >
                <Column field="name" header="Name" sortable></Column>
                <Column
                    field="start_date"
                    header="Start Date"
                    sortable
                    body={(project) =>
                        dayjs(project.start_date).format('DD MMMM YYYY')
                    }
                ></Column>
                <Column
                    field="end_date"
                    header="End Date"
                    sortable
                    body={(project) =>
                        dayjs(project.end_date).format('DD MMMM YYYY')
                    }
                ></Column>
                <Column
                    header="Project Status"
                    sortable
                    body={(project) => {
                        const projectStatus = getProjectStatus(project);
                        const statusText =
                            projectStatus < 0
                                ? 'Lewat'
                                : projectStatus === 0
                                ? 'Hari Ini'
                                : 'Aman';

                        const getSeverity = (statusText) => {
                            switch (statusText) {
                                case 'Lewat':
                                    return 'danger';
                                case 'Hari Ini':
                                    return 'warning';
                                case 'Aman':
                                    return 'success';
                                default:
                                    return null;
                            }
                        };

                        return (
                            <Tag
                                value={statusText}
                                severity={getSeverity(statusText)}
                            />
                        );
                    }}
                ></Column>
                {(onEditClick || onInfoClick || onDeleteClick) && (
                    <Column
                        header="Action"
                        body={(project) => (
                            <div className="flex gap-2 justify-content-center">
                                <Button
                                    icon="pi pi-info-circle"
                                    severity="primary"
                                    onClick={() => onInfoClick(project)}
                                />
                                <Button
                                    icon="pi pi-pencil"
                                    severity="success"
                                    onClick={() => onEditClick(project)}
                                />
                                <Button
                                    icon="pi pi-trash"
                                    severity="danger"
                                    onClick={() => onDeleteClick(project)}
                                />
                            </div>
                        )}
                    ></Column>
                )}
            </DataTable>
        </div>
    );
}
