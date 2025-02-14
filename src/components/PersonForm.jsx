import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { FloatLabel } from 'primereact/floatlabel';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { EMPTY_PERSON } from '../constants/constants';
import useStore from '../stores/app.store';

export default function PersonForm({ personData, onSubmit, onCancel, ref }) {
    const [formData, setFormData] = useState(personData);
    const { divisions } = useStore();

    useEffect(() => {
        setFormData(personData);
    }, [personData]);

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
                    onSubmit(formData);
                    setFormData(EMPTY_PERSON);
                }}
            >
                <h2 className="text-center text-2xl font-bold m-0 mb-4 text-900">
                    {personData.id ? 'Edit' : 'Add'} Person
                </h2>

                <FloatLabel>
                    <InputText
                        id="full_name"
                        value={formData.full_name}
                        name="full_name"
                        onChange={onInputChange}
                        className="w-full"
                        required
                    />
                    <label htmlFor="full_name">Full Name</label>
                </FloatLabel>

                <FloatLabel>
                    <Dropdown
                        id="division"
                        value={formData.division}
                        name="division"
                        onChange={onInputChange}
                        options={divisions}
                        optionLabel="name"
                        className="w-full"
                        placeholder="Select a Division"
                        required
                    />
                    <label htmlFor="division">Select a Division</label>
                </FloatLabel>

                <div className="flex gap-2">
                    <Button
                        label={formData.id ? 'Save' : 'Add'}
                        type="submit"
                        className="flex-1"
                        disabled={!(formData.full_name && formData.division)}
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
