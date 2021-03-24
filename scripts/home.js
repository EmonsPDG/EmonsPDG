var data = [];

db.collection("students").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
       // console.log(`${doc.id} => ${doc.data()}`);
        data.push(doc.id);
    });

    data.forEach((id) => {
        //console.log(id);
        db.collection("students").doc(id).collection("answers").doc("0Vhx0SrMei5XlYyPDWlB").get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    });

});




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
            data: [6, 10, 5, 2, 7, 8, 2, 5, 1, 7, 8, 2,5, 2, 7,5],
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

