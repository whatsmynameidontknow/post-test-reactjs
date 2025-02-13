import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function DeleteConfirmationDialog({
    visible,
    name,
    onCancel,
    onConfirm,
}) {
    return (
        <Dialog
            header={<span className="font-bold text-xl">Confirm Deletion</span>}
            visible={visible}
            onHide={onCancel}
            className="w-full md:w-30rem"
            modal
            footer={
                <div className="flex justify-content-end gap-2">
                    <Button
                        label="Cancel"
                        icon="pi pi-times"
                        onClick={onCancel}
                        className="p-button-text"
                    />
                    <Button
                        label="Delete"
                        icon="pi pi-trash"
                        onClick={onConfirm}
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
                    <span className="font-bold text-900">{name}</span>?
                </p>
                <p className="m-0 text-sm text-600">
                    This action cannot be undone.
                </p>
            </div>
        </Dialog>
    );
}
