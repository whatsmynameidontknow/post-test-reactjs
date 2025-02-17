import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { useGlobalFilter } from '../hooks/useGlobalFilter';

export default function DivisionList({
    divisions,
    onEditClick,
    onDeleteClick,
    onInfoClick,
}) {
    const { filters, globalFilterValue, onGlobalFilterChange } =
        useGlobalFilter({
            global: {
                value: null,
                matchMode: FilterMatchMode.CONTAINS,
            },
        });
    return (
        <div className="card">
            <DataTable
                value={divisions}
                stripedRows
                showGridlines
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25]}
                emptyMessage={
                    <div className="flex justify-content-center">
                        <span>No divisions found.</span>
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
                                placeholder="Search by division name"
                            />
                        </IconField>
                    </div>
                )}
            >
                <Column field="name" header="Division Name" sortable></Column>
                {(onInfoClick || onEditClick || onDeleteClick) && (
                    <Column
                        header="Action"
                        body={(division) => (
                            <div className="flex gap-2 justify-content-center">
                                {onInfoClick && (
                                    <Button
                                        icon="pi pi-info-circle"
                                        severity="primary"
                                        onClick={() => onInfoClick(division)}
                                    />
                                )}
                                {onEditClick && (
                                    <Button
                                        icon="pi pi-pencil"
                                        severity="success"
                                        onClick={() => onEditClick(division)}
                                    />
                                )}
                                {onDeleteClick && (
                                    <Button
                                        icon="pi pi-trash"
                                        severity="danger"
                                        onClick={() => onDeleteClick(division)}
                                    />
                                )}
                            </div>
                        )}
                    ></Column>
                )}
            </DataTable>
        </div>
    );
}
