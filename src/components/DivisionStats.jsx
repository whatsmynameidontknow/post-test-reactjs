import { Chart } from 'primereact/chart';

export default function DivisionStats({ divisions }) {
    if (!divisions || (divisions && divisions.length === 0)) {
        return <h3 className="text-center">No Statistics Available</h3>;
    }
    const chartData = {
        labels: divisions.map((division) => division.name),
        datasets: [
            {
                label: 'Number of People',
                data: divisions.map((division) => division.member_count),
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
                text: 'People by Division',
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
