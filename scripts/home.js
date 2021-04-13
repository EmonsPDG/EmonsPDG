var dataAnswers = [];

restaFechas = function(f1,f2) {
    var aFecha1 = f1.split('/');
    var aFecha2 = f2.split('/');
    var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
}

db.collection("answers").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        dataAnswers.push(doc.data());
    });

    let resultTotalWeek1 = 0;
    let resultTotalWeek2 = 0;
    let resultTotalWeek3 = 0;
    let resultTotalWeek4 = 0;
    let resultTotalWeek5 = 0;
    let resultTotalWeek6 = 0;
    let resultTotalWeek7 = 0;
    let resultTotalWeek8 = 0;
    let resultTotalWeek9 = 0;
    let resultTotalWeek10 = 0;

    //Forma de calcular las semanas, trayendo la fecha de inicio de semestre con la diferencia de la fecha de respuesta
    let startSemester = '';
    db.collection('semester').doc('2021-1').get().then((doc) => {
        if (doc.exists) {
            startSemester = doc.data().start;
        } else {
            console.log("No such document!");
        }

        //Forma de traer los resultados de cada respuesta
        let sumTotalResult = 0;

        //Semana de respuesta comparada desde el dia de respuesta a la pregunta con el inicio de semestre
        let weekAnswer = '';

        //Arreglos de respuesta por semana para saber el length de respuestas en esa semana
        let answersWeek1 = [];
        let answersWeek7 = [];

        dataAnswers.forEach((elem) => {

            //Relacionado a la fecha, semana de respuesta
            let dateAnswer = elem.date;
            // console.log('Dias de respuesta: '+ restaFechas(startSemester,dateAnswer));
            weekAnswer = parseInt(restaFechas(startSemester,dateAnswer)/7);
            if(weekAnswer <= 0) {
                weekAnswer = 1;
            }
            console.log('Semana de respuesta: '+ weekAnswer);

            //Resultados por semana
            let resultsWeek1 = 0;
            let resultsWeek7 = 0;

            //Resultados según la semana
            switch (weekAnswer) {
                case 7:
                    answersWeek7.push(parseInt(elem.result));
                    answersWeek7.forEach( (week7) =>{
                        resultsWeek7 += week7;
                        sumTotalResult = resultsWeek7/answersWeek7.length;
                        resultTotalWeek7 = sumTotalResult;
                        console.log('Week 7: ' + resultTotalWeek7);
                    })
                    break;

                case 1:
                    answersWeek1.push(parseInt(elem.result));
                    answersWeek1.forEach((week1) => {
                        resultsWeek1 += week1;
                        sumTotalResult = resultsWeek1/answersWeek1.length;
                        resultTotalWeek1 = sumTotalResult;
                        console.log('Week 1: ' + resultTotalWeek1);
                    });
                    break;
            
                default:
                    break;
            }

            //Grafica de satisfacción general
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
                        data: [resultTotalWeek1, resultTotalWeek2, resultTotalWeek3, resultTotalWeek4, resultTotalWeek5, resultTotalWeek6, resultTotalWeek7, 5, 1, 5, 5, 2,5, 2, 3,5],
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
        });

    }).catch((error) => {
        console.log("Error getting document:", error);
    });
});

    
