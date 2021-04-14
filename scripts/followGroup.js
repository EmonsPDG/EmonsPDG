var ctx = document.getElementById('satisfactionGraphGroup').getContext('2d');

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6', 'Semana 7', 'Semana 8', 'Semana 9', 'Semana 10', 'Semana 11', 'Semana 12', 'Semana 13', 'Semana 14', 'Semana 15','Semana 16'],
        datasets: [{
            label: 'My First dataset',
            borderColor: 'rgb(255, 99, 132)',
            data: [6, 10, 5, 3, 7, 8, 2, 5, 2, 7, 8, 2,5, 2, 7, 5],
            backgroundColor: "#513E97",
        }]
    },

    // Configuration options go here
    options: {
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

