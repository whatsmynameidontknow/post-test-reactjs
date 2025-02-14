import { Route, Routes, useLocation, useNavigate } from 'react-router';
import './App.css';
import Navbar from './components/Navbar';
import About from './pages/About';
import NotFound from './pages/NotFound';
import People from './pages/People';
import Projects from './pages/Projects';

function App() {
    const navigate = useNavigate();
    const navbarItems = [
        {
            label: 'Projects',
            icon: 'pi pi-lightbulb',
            command: () => navigate('/projects'),
        },
        {
            label: 'People',
            icon: 'pi pi-users',
            command: () => navigate('/people'),
        },
        {
            label: 'About',
            icon: 'pi pi-info-circle',
            command: () => navigate('/about'),
        },
    ];

    const VALID_ROUTES = new Set(['/people', '/', '/projects', '/about']);
    const location = useLocation();
    return (
        <>
            {VALID_ROUTES.has(location.pathname.toLowerCase()) && (
                <Navbar items={navbarItems} />
            )}
            <Routes>
                <Route path="/people" element={<People />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
