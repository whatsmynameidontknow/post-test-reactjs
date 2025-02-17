import GitInfo from 'react-git-info/macro';
import { GITHUB_REPO_URL } from '../constants/constants';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const gitInfo = GitInfo();

    return (
        <footer className="surface-ground mt-auto">
            <div className="card shadow-2">
                <div className="flex flex-column md:flex-row justify-content-between align-items-center gap-3 p-4">
                    <div className="text-700">
                        <span>
                            © {currentYear}{' '}
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://github.com/thansetan"
                                className="no-underline text-blue-500 hover:text-blue-700"
                            >
                                aku
                            </a>
                        </span>
                    </div>
                    <div className="flex align-items-center gap-2">
                        <i className="pi pi-github text-xl"></i>
                        <a
                            href={`${GITHUB_REPO_URL}/commit/${gitInfo.commit.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline text-blue-500 hover:text-blue-700"
                        >
                            {gitInfo.commit.shortHash}
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
