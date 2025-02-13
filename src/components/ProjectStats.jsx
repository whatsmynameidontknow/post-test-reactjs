import dayjs from 'dayjs';
import { Chart } from 'primereact/chart';

export default function ProjectStats({ projects }) {
    const sortedProjects = projects.toSorted((a, b) => {
        const aStartDateUnix = a.start_date.getTime();
        const bStartDateUnix = b.start_date.getTime();
        const aEndDateUnix = a.end_date.getTime();
        const bEndDateUnix = b.end_date.getTime();
        return aStartDateUnix === bStartDateUnix
            ? bEndDateUnix - aEndDateUnix
            : bStartDateUnix - aStartDateUnix;
    });

    console.log('BEFORE SORTED:', projects);
    console.log('AFTER SORTED:', sortedProjects);
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
            <Chart
                type={yearlyCount.size > 1 ? 'line' : 'bar'}
                data={chartData}
                options={options}
            />
        </div>
    );
}
