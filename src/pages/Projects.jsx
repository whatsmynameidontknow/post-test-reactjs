import { Card } from 'primereact/card';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import ProjectForm from '../components/ProjectForm';
import ProjectInfoDialog from '../components/ProjectInfoDialog';
import ProjectList from '../components/ProjectList';
import ProjectStats from '../components/ProjectStats';
import { EMPTY_PROJECT } from '../constants/constants';
import useStore from '../stores/app.store';

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
    const [infoDialogVisible, setInfoDialogVisible] = useState(false);

    const onSubmit = (project) => {
        if (project.id) {
            editProject(project);
            setSelectedProject(EMPTY_PROJECT);
        } else {
            addProject(project);
        }
        Swal.fire({
            title: project.name,
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
        Swal.fire({
            title: project?.name,
            text: `Are You Sure You Want to Delete ${project?.name}?`,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showCancelButton: true,
            icon: 'question',
        }).then((res) => {
            if (res.isConfirmed) {
                deleteProject(project);
                if (project.id === selectedProject?.id) {
                    setSelectedProject(EMPTY_PROJECT);
                }
                people.forEach((person) => {
                    removePersonFromProject(project.id, person.id);
                });
                Swal.fire({
                    title: project.name,
                    text: `Project ${project.name} Deleted Successfully!`,
                    icon: 'success',
                });
            }
        });
    };

    const onInfoClick = (project) => {
        setSelectedProjectInfo(project);
        setInfoDialogVisible(true);
    };

    return (
        <div className="surface-ground p-4 md:p-6">
            <div className="flex flex-column gap-4">
                <Card className="shadow-2">
                    <div className="flex flex-column gap-4">
                        <h1 className="text-4xl font-bold text-900 mb-2 text-center">
                            Projects Management
                        </h1>

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

                <ProjectInfoDialog
                    project={selectedProjectInfo}
                    visible={infoDialogVisible}
                    onCancel={() => setInfoDialogVisible(false)}
                />

                <Card className="shadow-2">
                    <h1 className="text-4xl font-bold text-900 mb-2 text-center">
                        Statistics
                    </h1>
                    <ProjectStats projects={projects} />
                </Card>
            </div>
        </div>
    );
}
