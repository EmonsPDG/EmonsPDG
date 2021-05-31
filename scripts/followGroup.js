// new SlimSelect({
//     select: '#category'
// });
let datasets = [];
let containerGraph = document.querySelector('.emonsContent__groupGraphsSatisfactionContainer');


restaFechas = function(f1,f2) {
    var aFecha1 = f1.split('/');
    var aFecha2 = f2.split('/');
    var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
}

let startSemester = '';
let dataGraph = [];



for (let i = 0; i < 5; i++) {
    dataGraph.push(new Array(0));
}



$(document).ready(function(){
    $('.inputRadioEmotional').iCheck({
        checkboxClass: 'icheckbox_flat-purple',
        radioClass: 'iradio_flat-purple',
    });

    $('.inputRadioSatisfation').iCheck({
        checkboxClass: 'icheckbox_flat-red',
        radioClass: 'iradio_flat-red',
    });

    $('.inputRadioActivities').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass: 'iradio_flat-green',
    });

    $('.inputRadioJobs').iCheck({
        checkboxClass: 'icheckbox_flat-blue',
        radioClass: 'iradio_flat-blue',
    });

    $('.inputRadioMetodolody').iCheck({
        checkboxClass: 'icheckbox_flat-yellow',
        radioClass: 'iradio_flat-yellow',
    });
});


const graph = (category,datasets) =>{
    console.log(datasets);
    switch (category) {
        case 'emotional':
            dataGraph[0] = datasets;
            break;
        case 'satisfaction':
            dataGraph[1] = datasets;
            break;
        case 'activities':
            dataGraph[2] = datasets;
            break;
        case 'jobs':
            dataGraph[3] = datasets;
            break;
        case 'metodology':
            dataGraph[4] = datasets;
            break;
        default:
            break;
    }

    if(document.getElementById('satisfactionGraphGroup')){
        containerGraph.removeChild(document.getElementById('satisfactionGraphGroup'));
    };
    var graphView = document.createElement('canvas');
    graphView.classList.add('emonsContent__groupGraphsSatisfactionData');
    graphView.setAttribute('id','satisfactionGraphGroup');
    containerGraph.appendChild(graphView);
    var ctx = document.getElementById('satisfactionGraphGroup').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        // The data for our dataset
        data: {
            labels: ['Sem 0', 'Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8', 'Sem 9', 'Sem 10', 'Sem 11', 'Sem 12', 'Sem 13', 'Sem 14','Sem 15','Sem 16'],
            datasets: [
                {
                    label: 'Emocional',
                    borderColor: 'rgb(149, 136, 178)',
                    data: dataGraph[0],
                    backgroundColor: "#9588B2",
                },
                {
                    label: 'Satisfacción',
                    borderColor: 'rgb(236, 112, 99)',
                    data: dataGraph[1],
                    backgroundColor: "#EC7063",
                },
                {
                    label: 'Actividades',
                    borderColor: 'rgb(26, 188, 156)',
                    data: dataGraph[2],
                    backgroundColor: "#1ABC9C",
                },
                {
                    label: 'Trabajos',
                    borderColor: 'rgb(52, 152, 219)',
                    data: dataGraph[3],
                    backgroundColor: "#3498DB",
                },
                {
                    label: 'Metodología',
                    borderColor: 'rgb(241, 196, 15)',
                    data: dataGraph[4],
                    backgroundColor: "#F1C40F",
                }
            ]
        },
    
        // Configuration options go here
        options: {
            maintainAspectRatio: false,
            legend: { display: false },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 1,
                        max: 5,
                    }
                }],
            },
            tooltip: true,
        }
    }); 
}


$ ('.inputRadioEmotional').on('ifToggled', function (event) { 
    let resultTotalWeek = [];
    let dataAnswers = [];
    let answersWeek = [];

    for (let i = 0; i < 17; i++) {
        answersWeek.push(new Array(0));
    }

    if(event.target.checked){
        db.collection("answers").where("category", "==", "Emotional").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dataAnswers.push(doc.data());
            });

            db.collection('semester').doc('2021-1').get().then((doc) => {
                if (doc.exists) {
                    startSemester = doc.data().start;
                } else {
                    console.log("No such document!");
                }
        
                let indexWeek = '';
                let sumTotalResult = 0;
        
                dataAnswers.forEach((answer) => {

                    /* Encontrar en que semana se encuentra la respuesta para agregar a su respectivo arreglo*/
                    let dateAnswer = answer.date;
                    indexWeek = parseInt(restaFechas(startSemester,dateAnswer)/7);
                    if(indexWeek <= 0) {
                        indexWeek = 1;
                    }
                    console.log('Semana de respuesta: '+ indexWeek);
        
                    /*Arreglo de resultados por semana */
                    let resultsWeek = [];
                    /*Variable para guardar la suma de los resultados de cada semana */
                    let sumWeek = 0;
        
                    answersWeek[indexWeek].push(parseInt(answer.result));
                    answersWeek[indexWeek].forEach((resultweek) => {
                        resultsWeek.push(resultweek);
                    });
                    resultsWeek.forEach((result)=>{
                        sumWeek += result;
                    });
                    sumTotalResult = sumWeek/resultsWeek.length;
                    resultTotalWeek[0] = 0;
                    resultTotalWeek[indexWeek] = sumTotalResult;
                    // console.log('Week ' + indexWeek +': ' + resultTotalWeek[indexWeek]);
                });
                graph('emotional',resultTotalWeek);
            });
        });
    }else{
        graph('emotional',[0]);
    };  
});

$ ('.inputRadioSatisfation').on('ifToggled', function (event) { 
    let resultTotalWeek = [];    
    let dataAnswers = [];
    let answersWeek = [];
    for (let i = 0; i < 17; i++) {
        answersWeek.push(new Array(0));
    }

    if(event.target.checked){
        db.collection("answers").where("category", "==", "Satisfaction").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dataAnswers.push(doc.data());
            });
            db.collection('semester').doc('2021-1').get().then((doc) => {
                if (doc.exists) {
                    startSemester = doc.data().start;
                } else {
                    console.log("No such document!");
                }
        
                let indexWeek = '';
                let sumTotalResult = 0;
        
                dataAnswers.forEach((answer) => {
                    /* Encontrar en que semana se encuentra la respuesta para agregar a su respectivo arreglo*/
                    let dateAnswer = answer.date;
                    indexWeek = parseInt(restaFechas(startSemester,dateAnswer)/7);
                    if(indexWeek <= 0) {
                        indexWeek = 1;
                    }
                    //console.log('Semana de respuesta: '+ indexWeek);
        
                    /*Arreglo de resultados por semana */
                    let resultsWeek = [];
                    /*Variable para guardar la suma de los resultados de cada semana */
                    let sumWeek = 0;
        
                    answersWeek[indexWeek].push(parseInt(answer.result));
                    answersWeek[indexWeek].forEach((resultweek) => {
                        resultsWeek.push(resultweek);
                    });
                    resultsWeek.forEach((result)=>{
                        sumWeek += result;
                    });
                    sumTotalResult = sumWeek/resultsWeek.length;
                    resultTotalWeek[0] = 0;
                    resultTotalWeek[indexWeek] = sumTotalResult;
                    // console.log('Week ' + indexWeek +': ' + resultTotalWeek[indexWeek]);
                });
                graph('satisfaction',resultTotalWeek);
            });
        });
    }else{
        graph('satisfaction',0);
    };  
})

$ ('.inputRadioActivities').on('ifToggled', function (event) { 
    let resultTotalWeek = [];    
    let dataAnswers = [];
    let answersWeek = [];
    for (let i = 0; i < 17; i++) {
        answersWeek.push(new Array(0));
    }

    if(event.target.checked){
        db.collection("answers").where("category", "==", "Activities").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dataAnswers.push(doc.data());
            });
            db.collection('semester').doc('2021-1').get().then((doc) => {
                if (doc.exists) {
                    startSemester = doc.data().start;
                } else {
                    console.log("No such document!");
                }
        
                let indexWeek = '';
                let sumTotalResult = 0;
        
                dataAnswers.forEach((answer) => {
                    /* Encontrar en que semana se encuentra la respuesta para agregar a su respectivo arreglo*/
                    let dateAnswer = answer.date;
                    indexWeek = parseInt(restaFechas(startSemester,dateAnswer)/7);
                    if(indexWeek <= 0) {
                        indexWeek = 1;
                    }
                    //console.log('Semana de respuesta: '+ indexWeek);
        
                    /*Arreglo de resultados por semana */
                    let resultsWeek = [];
                    /*Variable para guardar la suma de los resultados de cada semana */
                    let sumWeek = 0;
        
                    answersWeek[indexWeek].push(parseInt(answer.result));
                    answersWeek[indexWeek].forEach((resultweek) => {
                        resultsWeek.push(resultweek);
                    });
                    resultsWeek.forEach((result)=>{
                        sumWeek += result;
                    });
                    sumTotalResult = sumWeek/resultsWeek.length;
                    resultTotalWeek[0] = 0;
                    resultTotalWeek[indexWeek] = sumTotalResult;
                    // console.log('Week ' + indexWeek +': ' + resultTotalWeek[indexWeek]);
                });
                graph('activities',resultTotalWeek);
            });
        });
    }else{
        graph('activities',0);
    };  
})

$ ('.inputRadioJobs').on('ifToggled', function (event) { 
    let resultTotalWeek = [];    
    let dataAnswers = [];
    let answersWeek = [];
    for (let i = 0; i < 17; i++) {
        answersWeek.push(new Array(0));
    }

    if(event.target.checked){
        db.collection("answers").where("category", "==", "Jobs").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dataAnswers.push(doc.data());
            });
            db.collection('semester').doc('2021-1').get().then((doc) => {
                if (doc.exists) {
                    startSemester = doc.data().start;
                } else {
                    console.log("No such document!");
                }
        
                let indexWeek = '';
                let sumTotalResult = 0;
        
                dataAnswers.forEach((answer) => {
                    /* Encontrar en que semana se encuentra la respuesta para agregar a su respectivo arreglo*/
                    let dateAnswer = answer.date;
                    indexWeek = parseInt(restaFechas(startSemester,dateAnswer)/7);
                    if(indexWeek <= 0) {
                        indexWeek = 1;
                    }
                    //console.log('Semana de respuesta: '+ indexWeek);
        
                    /*Arreglo de resultados por semana */
                    let resultsWeek = [];
                    /*Variable para guardar la suma de los resultados de cada semana */
                    let sumWeek = 0;
        
                    answersWeek[indexWeek].push(parseInt(answer.result));
                    answersWeek[indexWeek].forEach((resultweek) => {
                        resultsWeek.push(resultweek);
                    });
                    resultsWeek.forEach((result)=>{
                        sumWeek += result;
                    });
                    sumTotalResult = sumWeek/resultsWeek.length;
                    resultTotalWeek[0] = 0;
                    resultTotalWeek[indexWeek] = sumTotalResult;
                    // console.log('Week ' + indexWeek +': ' + resultTotalWeek[indexWeek]);
                });
                graph('jobs',resultTotalWeek);
            });
        });
    }else{
        graph('jobs',0);
    };  
})

$ ('.inputRadioMetodolody').on('ifToggled', function (event) { 
    let resultTotalWeek = [];    
    let dataAnswers = [];
    let answersWeek = [];
    for (let i = 0; i < 17; i++) {
        answersWeek.push(new Array(0));
    }

    if(event.target.checked){
        db.collection("answers").where("category", "==", "Metodology").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                dataAnswers.push(doc.data());
            });
            db.collection('semester').doc('2021-1').get().then((doc) => {
                if (doc.exists) {
                    startSemester = doc.data().start;
                } else {
                    console.log("No such document!");
                }
        
                let indexWeek = '';
                let sumTotalResult = 0;
        
                dataAnswers.forEach((answer) => {
                    /* Encontrar en que semana se encuentra la respuesta para agregar a su respectivo arreglo*/
                    let dateAnswer = answer.date;
                    indexWeek = parseInt(restaFechas(startSemester,dateAnswer)/7);
                    if(indexWeek <= 0) {
                        indexWeek = 1;
                    }
                    //console.log('Semana de respuesta: '+ indexWeek);
        
                    /*Arreglo de resultados por semana */
                    let resultsWeek = [];
                    /*Variable para guardar la suma de los resultados de cada semana */
                    let sumWeek = 0;
        
                    answersWeek[indexWeek].push(parseInt(answer.result));
                    answersWeek[indexWeek].forEach((resultweek) => {
                        resultsWeek.push(resultweek);
                    });
                    resultsWeek.forEach((result)=>{
                        sumWeek += result;
                    });
                    sumTotalResult = sumWeek/resultsWeek.length;
                    resultTotalWeek[0] = 0;
                    resultTotalWeek[indexWeek] = sumTotalResult;
                    // console.log('Week ' + indexWeek +': ' + resultTotalWeek[indexWeek]);
                });
                graph('metodology',resultTotalWeek);
            });
        });
    }else{
        graph('metodology',0);
    };  
})   

graph([]);
