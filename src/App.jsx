import { Route, Routes, useLocation, useNavigate } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import About from './pages/About';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import People from './pages/People';
import Projects from './pages/Projects';

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentPath = location.pathname.toLowerCase();

    const navbarItems = [
        {
            label: 'Projects',
            icon: 'pi pi-lightbulb',
            command: () => navigate('/projects'),
            template: (item) => (
                <span
                    className={`p-menuitem-link ${
                        currentPath === '/projects'
                            ? 'text-blue-500 font-bold'
                            : 'text-gray-700'
                    }`}
                    onClick={item.command}
                >
                    <i className={`${item.icon} mr-2`}></i>
                    <span>{item.label}</span>
                </span>
            ),
        },
        {
            label: 'People',
            icon: 'pi pi-users',
            command: () => navigate('/people'),
            template: (item) => (
                <span
                    className={`p-menuitem-link ${
                        currentPath === '/people'
                            ? 'text-blue-500 font-bold'
                            : 'text-gray-700'
                    }`}
                    onClick={item.command}
                >
                    <i className={`${item.icon} mr-2`}></i>
                    <span>{item.label}</span>
                </span>
            ),
        },
        {
            label: 'About',
            icon: 'pi pi-info-circle',
            command: () => navigate('/about'),
            template: (item) => (
                <span
                    className={`p-menuitem-link ${
                        currentPath === '/about'
                            ? 'text-blue-500 font-bold'
                            : 'text-gray-700'
                    }`}
                    onClick={item.command}
                >
                    <i className={`${item.icon} mr-2`}></i>
                    <span>{item.label}</span>
                </span>
            ),
        },
    ];

    const VALID_ROUTES = new Set(['/people', '/', '/projects', '/about']);

    return (
        <>
            {VALID_ROUTES.has(currentPath) && <Navbar items={navbarItems} />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/people" element={<People />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
