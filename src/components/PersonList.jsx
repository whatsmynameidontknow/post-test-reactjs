import { FilterMatchMode } from 'primereact/api';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';
import { useGlobalFilter } from '../hooks/useGlobalFilter';
import useStore from '../stores/app.store';

export default function PersonList({
    people,
    onEditClick,
    onDeleteClick,
    onInfoClick,
    showDivision = true,
}) {
    const { divisions } = useStore();
    const { globalFilterValue, onGlobalFilterChange, filters } =
        useGlobalFilter({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            'division.name': {
                value: null,
                matchMode: FilterMatchMode.IN,
            },
        });
    return (
        <div className="card">
            <DataTable
                value={people}
                stripedRows
                showGridlines
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25]}
                emptyMessage={
                    <div className="flex justify-content-center">
                        <span>No people found.</span>
                    </div>
                }
                className="shadow-2"
                dataKey="id"
                globalFilterFields={['full_name']}
                filters={filters}
                header={() => (
                    <div className="flex justify-content-end">
                        <IconField iconPosition="left">
                            <InputIcon className="pi pi-search" />
                            <InputText
                                value={globalFilterValue}
                                onChange={onGlobalFilterChange}
                                placeholder="Search by name"
                            />
                        </IconField>
                    </div>
                )}
                filterDisplay={showDivision ? 'row' : 'menu'}
            >
                <Column field="full_name" header="Full Name" sortable></Column>
                {showDivision && (
                    <Column
                        field="division.name"
                        header="Division"
                        sortable
                        filter
                        filterField="division.name"
                        showFilterMenu={false}
                        filterElement={(o) => (
                            <div>
                                <MultiSelect
                                    value={o.value}
                                    options={divisions.map(
                                        (division) => division.name
                                    )}
                                    onChange={(e) =>
                                        o.filterApplyCallback(e.value)
                                    }
                                    showClear
                                    showSelectAll={false}
                                    placeholder="Select divisions"
                                    maxSelectedLabels={3}
                                    display="chip"
                                    panelHeaderTemplate={<div></div>}
                                />
                            </div>
                        )}
                        showClearButton={false}
                    ></Column>
                )}
                {(onInfoClick || onEditClick || onDeleteClick) && (
                    <Column
                        header="Action"
                        body={(person) => (
                            <div className="flex gap-2 justify-content-center">
                                {onInfoClick && (
                                    <Button
                                        icon="pi pi-info-circle"
                                        severity="primary"
                                        onClick={() => onInfoClick(person)}
                                    />
                                )}
                                {onEditClick && (
                                    <Button
                                        icon="pi pi-pencil"
                                        severity="success"
                                        onClick={() => onEditClick(person)}
                                    />
                                )}
                                {onDeleteClick && (
                                    <Button
                                        icon="pi pi-trash"
                                        severity="danger"
                                        onClick={() => onDeleteClick(person)}
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
