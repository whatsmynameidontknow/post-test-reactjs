import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Timeline } from 'primereact/timeline';
import { useEffect, useState } from 'react';

export default function About() {
    const me = {
        name: 'Fathan Arsyadani',
        division: 'Back End',
        timeline: [
            {
                status: 'Lahir',
                date: '2000',
            },
            {
                status: 'Hidup (kayanya)',
                date: new Date().getFullYear(),
            },
            {
                status: 'Meninggal',
                date: '????',
            },
        ],
    };

    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const updateWidth = () => {
            setWidth(window.innerWidth);
        };
        window.addEventListener('resize', updateWidth);
        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    return (
        <div className="px-2 md:px-4 py-4 md:py-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <div className="mb-4 md:mb-8">
                    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <h2 className="text-2xl md:text-3xl font-bold mt-0 mb-4 md:mb-6 text-center text-blue-800">
                            <i className="pi pi-user mr-2 md:mr-3 text-blue-600"></i>
                            Tentang Saya
                        </h2>
                        <div className="flex flex-column md:flex-row w-full align-items-center justify-content-between p-2 md:p-4 gap-3">
                            <h1 className="text-3xl md:text-5xl font-bold m-0 text-gray-900 tracking-tight text-center md:text-left">
                                {me.name}
                            </h1>
                            <Tag
                                value={me.division}
                                severity="info"
                                className="text-base md:text-lg px-2 md:px-3 py-1 md:py-2"
                            />
                        </div>
                    </Card>
                </div>

                <div className="mb-4">
                    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-200">
                        <h2 className="text-2xl md:text-3xl font-bold mt-0 mb-4 md:mb-6 text-center text-blue-800">
                            <i className="pi pi-history mr-2 md:mr-3 text-blue-600"></i>
                            Riwayat Hidup
                        </h2>
                        <Timeline
                            value={me.timeline}
                            layout={width >= 768 ? 'horizontal' : 'vertical'}
                            className="p-2 md:p-4"
                            content={(item) => (
                                <div className="flex flex-column gap-2 md:gap-3 p-2 md:p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                    <span className="text-xl md:text-2xl font-semibold text-gray-800">
                                        {item.status}
                                    </span>
                                    <span className="text-base md:text-lg text-gray-500">
                                        {item.date}
                                    </span>
                                </div>
                            )}
                            pt={{
                                marker: {
                                    className:
                                        'border-4 w-2rem md:w-3rem h-2rem md:h-3rem flex align-items-center justify-content-center text-white',
                                },
                            }}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
}
