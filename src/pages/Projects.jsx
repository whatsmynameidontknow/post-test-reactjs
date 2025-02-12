import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import ProjectStats from '../components/ProjectStats';
import useStore from '../stores/app.store';

const EMPTY_PROJECT = {
    name: '',
    start_date: null,
    end_date: null,
};

export default function Projects() {
    const { projects, addProject, editProject, deleteProject } = useStore();
    const [selectedProject, setSelectedProject] = useState(EMPTY_PROJECT);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [dialogVisible, setDialogVisible] = useState(false);

    const onSubmit = (project) => {
        if (project.id) {
            editProject(project);
            return;
        }
        addProject(project);
        setSelectedProject(EMPTY_PROJECT);
    };

    const onCancel = () => {
        setSelectedProject(EMPTY_PROJECT);
    };

    const onEditClick = (project) => {
        setSelectedProject({
            ...project,
            start_date: new Date(project.start_date),
            end_date: new Date(project.end_date),
        });
    };

    const onDeleteClick = (person) => {
        setProjectToDelete(person);
        setDialogVisible(true);
    };

    const doDelete = () => {
        deleteProject(projectToDelete);
        if (projectToDelete.id === selectedProject.id) {
            setSelectedProject(EMPTY_PROJECT);
        }
        setDialogVisible(false);
    };

    return (
        <div className="surface-ground p-4 md:p-6">
            <div className="flex flex-column gap-4">
                <Card className="shadow-2">
                    <div className="flex flex-column gap-4">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-900 mb-2">
                                Project Management
                            </h1>
                        </div>

                        <div className="flex flex-column gap-4">
                            <div className="surface-card p-4 border-round">
                                <ProjectForm
                                    projectData={selectedProject}
                                    onSubmit={onSubmit}
                                    onCancel={onCancel}
                                />
                            </div>
                            <div className="surface-card p-4 border-round">
                                <ProjectList
                                    projects={projects}
                                    onEditClick={onEditClick}
                                    onDeleteClick={onDeleteClick}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                <Dialog
                    header={
                        <span className="font-bold text-xl">
                            Confirm Deletion
                        </span>
                    }
                    visible={dialogVisible}
                    onHide={() => setDialogVisible(false)}
                    className="w-full md:w-30rem"
                    modal
                    footer={
                        <div className="flex justify-content-end gap-2">
                            <Button
                                label="Cancel"
                                icon="pi pi-times"
                                onClick={() => setDialogVisible(false)}
                                className="p-button-text"
                            />
                            <Button
                                label="Delete"
                                icon="pi pi-trash"
                                onClick={doDelete}
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
                            <span className="font-bold text-900">
                                {projectToDelete?.name}
                            </span>
                            ?
                        </p>
                        <p className="m-0 text-sm text-600">
                            This action cannot be undone.
                        </p>
                    </div>
                </Dialog>

                <Card className="shadow-2">
                    <h1 className="text-center">Statistics</h1>
                    <ProjectStats projects={projects} />
                </Card>
            </div>
        </div>
    );
}
