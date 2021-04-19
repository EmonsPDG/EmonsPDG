var dataAnswers = [];
let averageGroupSatisfaction = document.querySelector('.emonsContent__homeSatisfactionGraphsAverageResult');
let containerGraph = document.querySelector('.emonsContent__homeSatisfactionGraphsData');

restaFechas = function(f1,f2) {
    var aFecha1 = f1.split('/');
    var aFecha2 = f2.split('/');
    var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
}

let answersWeek = [];
let resultTotalWeek = [];
let averageSatisfaction = [];
let startSemester = '';

for (let i = 0; i < 16; i++) {
    answersWeek.push(new Array(0));
}

const graph = (datasets) =>{
    if(document.getElementById('satisfactionGraph')){
        containerGraph.removeChild(document.getElementById('satisfactionGraph'));
    };
    var graphView = document.createElement('canvas');
    graphView.classList.add('emonsContent__homeSatisfactionGraphsData');
    graphView.setAttribute('id','satisfactionGraph');
    containerGraph.appendChild(graphView);

     //Grafica de satisfacción general
     var ctx = document.getElementById('satisfactionGraph').getContext('2d');
     var chart = new Chart(ctx, {
         // The type of chart we want to create
         type: 'line',
         
         // The data for our dataset
         data: {
             labels: ['Sem 0', 'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8', 'Sem 9', 'Sem 10', 'Sem 11', 'Sem 12', 'Sem 13', 'Sem 14','Sem 15','Sem 16'],
             datasets: [{
                 label: 'Media estudiante',
                 borderColor: 'rgb(255, 99, 132)',
                 data: [...datasets],
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
}
db.collection("answers").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        dataAnswers.push(doc.data());
    });

    //Forma de calcular las semanas, trayendo la fecha de inicio de semestre con la diferencia de la fecha de respuesta
    db.collection('semester').doc('2021-1').get().then((doc) => {

        if (doc.exists) {
            startSemester = doc.data().start;
        } else {
            console.log("No such document!");
        }

        //Forma de traer los resultados de cada respuesta
        let sumTotalResult = 0;
        let weekAnswer = '';

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
            let resultsWeek = [];
            let sumWeek = 0;

            answersWeek[weekAnswer].push(parseInt(elem.result));
            answersWeek[weekAnswer].forEach((week) => {
                resultsWeek.push(week);
            });
            resultsWeek.forEach((result)=>{
                sumWeek += result;
            });
            sumTotalResult = sumWeek/resultsWeek.length;
            resultTotalWeek[0] = 0;
            resultTotalWeek[weekAnswer] = sumTotalResult;
            //console.log('Week ' + weekAnswer +': ' + resultTotalWeek[weekAnswer]);
            
            //console.log(...resultTotalWeek);

            graph(resultTotalWeek);

            //Calcula la satisfacción general sumando todos los datos de todas las semanas y sacando el promedio,
            //calculando el promedio de la satisfacción general del curso
            let sumSatisfaction = 0;
            averageSatisfaction.push(parseInt(elem.result));

            averageSatisfaction.forEach((satisfactionResult) => {
                sumSatisfaction += satisfactionResult;
            });
            let resultFinalSatisfaction = parseFloat(sumSatisfaction / averageSatisfaction.length).toFixed(1); 
            averageGroupSatisfaction.innerHTML = resultFinalSatisfaction;
        });

    }).catch((error) => {
        console.log("Error getting document:", error);
    });
});

    
