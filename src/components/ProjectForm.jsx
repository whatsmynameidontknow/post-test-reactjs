import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { EMPTY_PROJECT } from '../pages/Projects';

export default function ProjectForm({ projectData, onSubmit, onCancel }) {
    const [formData, setFormData] = useState(projectData);

    useEffect(() => {
        setFormData(projectData);
    }, [projectData]);

    const onInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    return (
        <div className="flex justify-content-center">
            <form
                className="flex flex-column gap-4 p-6 surface-card border-round-xl shadow-4 w-full md:w-30rem"
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(formData);
                    setFormData(EMPTY_PROJECT);
                }}
            >
                <h2 className="text-center text-2xl font-bold m-0 mb-4 text-900">
                    {projectData.id ? 'Edit' : 'Add'} Project
                </h2>

                <FloatLabel className="w-full">
                    <InputText
                        id="name"
                        value={formData.name}
                        name="name"
                        onChange={onInputChange}
                        className="w-full p-inputtext-lg"
                        required
                    />
                    <label htmlFor="name" className="text-gray-700">
                        Project Name
                    </label>
                </FloatLabel>

                <FloatLabel className="w-full">
                    <Calendar
                        id="start_date"
                        value={formData.start_date}
                        onChange={onInputChange}
                        showIcon
                        showButtonBar
                        className="w-full"
                        pt={{
                            input: { className: 'p-inputtext-lg w-full' },
                            dropdownButton: { className: 'bg-primary' },
                            calendar: { className: 'border-round-xl' },
                        }}
                    />
                    <label htmlFor="start_date" className="text-gray-700">
                        Start Date
                    </label>
                </FloatLabel>

                <FloatLabel className="w-full">
                    <Calendar
                        id="end_date"
                        value={formData.end_date}
                        onChange={onInputChange}
                        minDate={formData.start_date}
                        showIcon
                        showButtonBar
                        className="w-full"
                        disabled={!formData.start_date}
                        pt={{
                            input: { className: 'p-inputtext-lg w-full' },
                            dropdownButton: { className: 'bg-primary' },
                            calendar: { className: 'border-round-xl' },
                        }}
                    />
                    <label htmlFor="end_date" className="text-gray-700">
                        End Date
                    </label>
                </FloatLabel>

                <div className="flex gap-3 mt-4">
                    <Button
                        label={formData.id ? 'Save' : 'Submit'}
                        type="submit"
                        className="flex-1 p-button-lg p-button-raised"
                    />
                    {formData.id && (
                        <Button
                            label="Cancel"
                            onClick={() => onCancel()}
                            severity="secondary"
                            type="button"
                            className="flex-1 p-button-lg p-button-raised"
                        />
                    )}
                </div>
            </form>
        </div>
    );
}
