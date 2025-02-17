import { Card } from 'primereact/card';

export default function Home() {
    return (
        <div
            className="flex column align-items-center"
            style={{
                minHeight: '80vh',
            }}
        >
            <div className="max-w-6xl mx-auto">
                <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-200">
                    <div className="flex flex-column align-items-center justify-content-center gap-3 p-4">
                        <i className="pi pi-home text-5xl text-blue-600"></i>
                        <h1 className="text-3xl md:text-5xl font-bold text-center text-gray-900 m-0">
                            Welcome!
                        </h1>
                        <p className="text-xl md:text-2xl text-center text-gray-600 mt-2">
                            Gatau mau diisi apa, biar ga kosong aja
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
