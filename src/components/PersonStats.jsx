import { Chart } from 'primereact/chart';

export default function PersonStats({ people, chartTitle }) {
    if (!people || (people && people.length === 0)) {
        return <h3 class="text-center">No Statistics Available</h3>;
    }
    const divisionFreq = new Map();

    people.forEach((person) => {
        divisionFreq.set(
            person.division.name,
            (divisionFreq.get(person.division.name) || 0) + 1
        );
    });

    const chartData = {
        labels: Array.from(divisionFreq.keys()),
        datasets: [
            {
                data: Array.from(divisionFreq.values()),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF4D6D', '#2D8BDD', '#FFC233'],
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: chartTitle,
                fontSize: 16,
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        const total = context.dataset.data.reduce(
                            (a, b) => a + b,
                            0
                        );
                        const percentage = Math.round((value * 100) / total);
                        return `${label}: ${value} (${percentage}%)`;
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <Chart
            type="pie"
            data={chartData}
            options={options}
            className="w-full"
        />
    );
}
