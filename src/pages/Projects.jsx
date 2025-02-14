import { Card } from 'primereact/card';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import ProjectForm from '../components/ProjectForm';
import ProjectInfoDialog from '../components/ProjectInfoDialog';
import ProjectList from '../components/ProjectList';
import ProjectStats from '../components/ProjectStats';
import useStore from '../stores/app.store';
import { endDateNotBeforeStartDate } from '../utils/utils';

export const EMPTY_PROJECT = {
    name: '',
    start_date: null,
    end_date: null,
};

export default function Projects() {
    const {
        projects,
        addProject,
        editProject,
        deleteProject,
        people,
        removePersonFromProject,
    } = useStore();
    const [selectedProject, setSelectedProject] = useState(EMPTY_PROJECT);
    const [selectedProjectInfo, setSelectedProjectInfo] = useState(null);
    const [projectToDelete, setProjectToDelete] = useState(null);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [infoDialogVisible, setInfoDialogVisible] = useState(false);

    const onSubmit = (project) => {
        if (!endDateNotBeforeStartDate(project)) {
            Swal.fire({
                title: 'Project',
                text: "Project Start Date Can't be Before Start Date!",
                icon: 'error',
            });
            return;
        }
        if (project.id) {
            editProject(project);
            setSelectedProject(EMPTY_PROJECT);
        } else {
            addProject(project);
        }
        Swal.fire({
            title: 'Project',
            text: `Project ${project.id ? 'Updated' : 'Added'} Successfully!`,
            icon: 'success',
        });
    };

    const onCancel = () => {
        setSelectedProject(EMPTY_PROJECT);
    };

    const projectFormRef = useRef(null);

    const onEditClick = (project) => {
        setSelectedProject({
            ...project,
            start_date: new Date(project.start_date),
            end_date: new Date(project.end_date),
        });
        projectFormRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        });
    };

    const onDeleteClick = (project) => {
        setProjectToDelete(project);
        setDeleteDialogVisible(true);
    };

    const onInfoClick = (project) => {
        setSelectedProjectInfo(project);
        setInfoDialogVisible(true);
    };

    const doDelete = () => {
        deleteProject(projectToDelete);
        if (projectToDelete.id === selectedProject.id) {
            setSelectedProject(EMPTY_PROJECT);
        }
        people.forEach((person) => {
            removePersonFromProject(projectToDelete.id, person.id);
        });
        setDeleteDialogVisible(false);
        Swal.fire({
            title: 'Project',
            text: `Project ${projectToDelete?.name} Deleted Successfully!`,
            icon: 'success',
        });
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
                                    ref={projectFormRef}
                                />
                            </div>
                            <div className="surface-card p-4 border-round">
                                <ProjectList
                                    projects={projects}
                                    onEditClick={onEditClick}
                                    onDeleteClick={onDeleteClick}
                                    onInfoClick={onInfoClick}
                                />
                            </div>
                        </div>
                    </div>
                </Card>

                <DeleteConfirmationDialog
                    name={projectToDelete?.name}
                    onCancel={() => setDeleteDialogVisible(false)}
                    onConfirm={doDelete}
                    visible={deleteDialogVisible}
                />

                <ProjectInfoDialog
                    project={selectedProjectInfo}
                    visible={infoDialogVisible}
                    onCancel={() => setInfoDialogVisible(false)}
                />

                <Card className="shadow-2">
                    <h1 className="text-center">Statistics</h1>
                    <ProjectStats projects={projects} />
                </Card>
            </div>
        </div>
    );
}
