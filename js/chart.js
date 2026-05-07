function createChart(fire, flood, quake) {
    const canvas = document.getElementById("riskChart");
    
    if (window.myChart) window.myChart.destroy();

    window.myChart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: ['KEBAKARAN', 'BANJIR', 'GEMPA'],
            datasets: [{
                label: 'Tingkat Risiko (%)',
                data: [fire, flood, quake],
                backgroundColor: ['#ff3366', '#00ccff', '#ffcc00'],
                borderColor: '#00ffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true, labels: { color: 'white' } }
            },
            scales: {
                y: { 
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: '#ccc' }
                },
                x: {
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    ticks: { color: '#ccc' }
                }
            }
        }
    });
}