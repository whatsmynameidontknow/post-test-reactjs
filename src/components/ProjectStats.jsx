import dayjs from 'dayjs';
import { Chart } from 'primereact/chart';

export default function ProjectStats({ projects }) {
    const yearlyCount = new Map();
    projects.forEach((project) => {
        const startYear = dayjs(project.start_date).year();
        const endYear = dayjs(project.end_date).year();
        yearlyCount.set(startYear, (yearlyCount.get(startYear) ?? 0) + 1);
        if (startYear !== endYear)
            yearlyCount.set(endYear, (yearlyCount.get(endYear) ?? 0) + 1);
    });

    const years = Array.from(yearlyCount.keys()).sort();
    const chartData = {
        labels: years,
        datasets: [
            {
                label: 'Number of Projects',
                data: years.map((year) => yearlyCount.get(year)),
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Projects by Year',
                fontSize: 16,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <div className="card">
            <Chart type="bar" data={chartData} options={options} />
        </div>
    );
}
