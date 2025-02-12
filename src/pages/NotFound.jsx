import { Button } from 'primereact/button';
import { useNavigate } from 'react-router';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-column align-items-center justify-content-center min-h-screen bg-gray-50">
            <div className="text-center p-5">
                <h1 className="text-900 font-bold text-8xl mb-2">404</h1>
                <p className="text-600 font-bold text-4xl mb-4">
                    Page Not Found
                </p>
                <p className="text-700 text-xl mb-5">
                    The page you're looking for doesn't exist or has been
                    removed.
                </p>
                <Button
                    label="Go Back Home"
                    icon="pi pi-home"
                    severity="primary"
                    size="large"
                    onClick={() => navigate('/')}
                    className="font-bold"
                />
            </div>
        </div>
    );
}
