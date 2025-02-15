import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { EMPTY_DIVISION } from '../constants/constants';
import useStore from '../stores/app.store';

export default function DivisionForm({
    divisionData,
    onSubmit,
    ref,
    onCancel,
}) {
    const { divisions } = useStore();

    const [formData, setFormData] = useState(divisionData);
    useEffect(() => {
        setFormData(divisionData);
    }, [divisionData]);
    const onInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    return (
        <div className="flex justify-content-center" ref={ref}>
            <form
                className="flex flex-column gap-4 p-4 surface-card border-round shadow-2 w-full md:w-30rem"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (
                        divisions.some(
                            (d) =>
                                d.name.toLowerCase().trim() ===
                                formData.name.toLowerCase().trim()
                        )
                    ) {
                        Swal.fire({
                            title: 'Duplicate Division Name!',
                            text: `Division Named ${formData.name} Already Exists!`,
                            icon: 'error',
                        });
                        return;
                    }
                    onSubmit({
                        name: formData.name.trim(),
                    });
                    setFormData(EMPTY_DIVISION);
                }}
            >
                <h2 className="text-center text-2xl font-bold m-0 mb-4 text-900">
                    {divisionData.id ? 'Edit' : 'Add'} Division
                </h2>

                <FloatLabel>
                    <InputText
                        id="name"
                        value={formData.name}
                        name="name"
                        onChange={onInputChange}
                        className="w-full"
                        required
                    />
                    <label htmlFor="name">Division Name</label>
                </FloatLabel>

                <div className="flex gap-2">
                    <Button
                        label={formData.id ? 'Save' : 'Add'}
                        type="submit"
                        className="flex-1"
                        disabled={!formData.name?.trim()}
                    />
                    {formData.id && (
                        <Button
                            label="Cancel"
                            onClick={() => onCancel()}
                            type="button"
                            severity="secondary"
                            className="flex-1"
                        />
                    )}
                </div>
            </form>
        </div>
    );
}
