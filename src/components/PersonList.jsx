import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';

export default function PersonList({
    people,
    onEditClick,
    onDeleteClick,
    onInfoClick,
    showDivision = true,
}) {
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
            >
                <Column field="full_name" header="Full Name" sortable></Column>
                {showDivision && (
                    <Column
                        field="division.name"
                        header="Division"
                        sortable
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
