var ctx = document.getElementById('satisfactionGraph').getContext('2d');

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8', 'Sem 9', 'Sem 10', 'Sem 11', 'Sem 12', 'Sem 13', 'Sem 14', 'Sem 15','Sem 16'],
        datasets: [{
            label: 'My First dataset',
            borderColor: 'rgb(255, 99, 132)',
            data: [6, 10, 5, 2, 7, 8, 2, 5, 2, 7, 8, 2,5, 2, 7,5],
            backgroundColor: 'transparent',
            fill: false,
            pointStyle: 'rectRounded',
            lineTension: 0,
        }]
    },

    // Configuration options go here
    options: {
        maintainAspectRatio: false,
        legend: { display: false },
    }
});

