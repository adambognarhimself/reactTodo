import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { todo } from '../../todos';
import './StatsPage.less';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export function StatsPage() {
    const tasks = todo.getProjects().flatMap((project) => project.items);

    // Calculate task state distribution
    const todoCount = tasks.filter((task) => task.state === 'TODO').length;
    const inProgressCount = tasks.filter((task) => task.state === 'IN PROGRESS').length;
    const doneCount = tasks.filter((task) => task.state === 'DONE').length;

    // Data for the pie chart
    const taskStateData = {
        labels: ['TODO', 'IN PROGRESS', 'DONE'],
        datasets: [
            {
                label: '# of Tasks',
                data: [todoCount, inProgressCount, doneCount],
                backgroundColor: ['#ff6384', '#36a2eb', '#4bc0c0'],
                borderColor: ['#ff6384', '#36a2eb', '#4bc0c0'],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="StatsPage">
            <h1>Task State Distribution</h1>
            <div className="ChartContainer">
                <Pie
                    data={taskStateData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false, 
                    }}
                />
            </div>
        </div>
    );
}
