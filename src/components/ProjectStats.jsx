import dayjs from 'dayjs';
import { Chart } from 'primereact/chart';

export default function ProjectStats({ projects }) {
    if (!projects || (projects && projects.length === 0)) {
        return <h3 className="text-center">No Statistics Available</h3>;
    }
    const yearlyCount = new Map();
    const projectYears = projects.map((project) => ({
        start_year: dayjs(project.start_date).year(),
        end_year: dayjs(project.end_date).year(),
    }));

    projectYears.forEach((project) => {
        while (project.start_year <= project.end_year) {
            yearlyCount.set(
                project.start_year,
                (yearlyCount.get(project.start_year) || 0) + 1
            );
            project.start_year++;
        }
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
