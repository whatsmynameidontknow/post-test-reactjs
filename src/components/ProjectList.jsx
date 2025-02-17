import dayjs from 'dayjs';
import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import { useGlobalFilter } from '../hooks/useGlobalFilter';

export default function ProjectList({
    projects,
    onEditClick,
    onDeleteClick,
    onInfoClick,
}) {
    const { filters, onGlobalFilterChange, globalFilterValue } =
        useGlobalFilter({
            global: {
                value: null,
                matchMode: FilterMatchMode.CONTAINS,
            },
            start_date: {
                value: null,
                matchMode: FilterMatchMode.DATE_AFTER,
            },
            end_date: {
                value: null,
                matchMode: FilterMatchMode.DATE_BEFORE,
            },
            status: {
                value: null,
                matchMode: FilterMatchMode.EQUALS,
            },
        });

    const statusTemplate = (statusText) => {
        const getSeverity = (statusText) => {
            switch (statusText) {
                case 'lewat':
                    return 'danger';
                case 'hari ini':
                    return 'warning';
                case 'aman':
                    return 'success';
                default:
                    return null;
            }
        };
        return <Tag value={statusText} severity={getSeverity(statusText)} />;
    };
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
                globalFilterFields={['name']}
                filters={filters}
                header={() => (
                    <div className="flex justify-content-end">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search" />
                            <InputText
                                value={globalFilterValue}
                                onChange={onGlobalFilterChange}
                                placeholder="Search by project name"
                            />
                        </IconField>
                    </div>
                )}
                filterDisplay="row"
            >
                <Column field="name" header="Name" sortable></Column>
                <Column
                    field="start_date"
                    header="Start Date"
                    sortable
                    body={(project) =>
                        dayjs(project.start_date).format('DD MMMM YYYY')
                    }
                    filter
                    filterField="start_date"
                    showFilterMenu={false}
                    filterElement={(o) => (
                        <div className="w-10rem md:min-w-full">
                            <Calendar
                                placeholder="Start date after"
                                value={o.value}
                                onChange={(e) => o.filterApplyCallback(e.value)}
                                showButtonBar
                            />
                        </div>
                    )}
                    showClearButton={false}
                ></Column>
                <Column
                    field="end_date"
                    header="End Date"
                    sortable
                    body={(project) =>
                        dayjs(project.end_date).format('DD MMMM YYYY')
                    }
                    filter
                    filterField="end_date"
                    showFilterMenu={false}
                    filterElement={(o) => (
                        <div className="w-10rem md:min-w-full">
                            <Calendar
                                placeholder="End date before"
                                value={o.value}
                                onChange={(e) => o.filterApplyCallback(e.value)}
                                showButtonBar
                            />
                        </div>
                    )}
                    showClearButton={false}
                ></Column>
                <Column
                    header="Project Status"
                    body={(project) => statusTemplate(project.status)}
                    filter
                    filterField="status"
                    showFilterMenu={false}
                    filterElement={(o) => (
                        <div>
                            <Dropdown
                                value={o.value}
                                itemTemplate={statusTemplate}
                                options={['aman', 'hari ini', 'lewat']}
                                onChange={(e) => o.filterApplyCallback(e.value)}
                                placeholder="Select status"
                                showClear
                            />
                        </div>
                    )}
                    showClearButton={false}
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
