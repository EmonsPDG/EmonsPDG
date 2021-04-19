const cardAverage = (title,text,result) => {
    let groupGraphs = document.querySelector('.emonsContent__groupGraphsSatisfaction');
    let containerCardAverages = document.querySelector('.emonsContent__groupGraphsSatisfactionCardAverages');


    let cardAverage = document.createElement('div');
    
    // let cardAverageImg = document.createElement('img');
    // cardAverageImg.setAttribute('src','./resources/emojiHappy.svg');
    let cardAverageH3 = document.createElement('h3');
    cardAverageH3.innerHTML = title;
    let cardAverageP = document.createElement('p');
    cardAverageP.innerHTML = text;
    let cardAverageH2 = document.createElement('h2');
    cardAverageH2.innerHTML = result;

    cardAverage.classList.add('emonsContent__homeSatisfactionGraphsAverage');
    
    // cardAverage.appendChild(cardAverageImg);
    cardAverage.appendChild(cardAverageH3);
    cardAverage.appendChild(cardAverageP);
    cardAverage.appendChild(cardAverageH2);
    
    
    containerCardAverages.appendChild(cardAverage);
    groupGraphs.appendChild(containerCardAverages);
}

db.collection("answers").where("category", "==", "Emotional").get().then((querySnapshot) => {
    var dataAnswers = [];
    let averageSatisfaction = [];
    querySnapshot.forEach((doc) => {
        dataAnswers.push(doc.data());
    });
    let resultFinalSatisfaction = '';

    dataAnswers.forEach((elem) => {
        let sumSatisfaction = 0;
        averageSatisfaction.push(parseInt(elem.result));

        averageSatisfaction.forEach((satisfactionResult) => {
            sumSatisfaction += satisfactionResult;
        });
        resultFinalSatisfaction = parseFloat(sumSatisfaction / averageSatisfaction.length).toFixed(1); 
    });
    let text = 'Tus estudiantes se encuentran emocionalmente en un promedio de:';
    cardAverage('Emocional',text, resultFinalSatisfaction);
});

db.collection("answers").where("category", "==", "Satisfaction").get().then((querySnapshot) => {
    var dataAnswers = [];
    let averageSatisfaction = [];
    querySnapshot.forEach((doc) => {
        dataAnswers.push(doc.data());
    });
    let resultFinalSatisfaction = '';

    dataAnswers.forEach((elem) => {
        let sumSatisfaction = 0;
        averageSatisfaction.push(parseInt(elem.result));

        averageSatisfaction.forEach((satisfactionResult) => {
            sumSatisfaction += satisfactionResult;
        });
        resultFinalSatisfaction = parseFloat(sumSatisfaction / averageSatisfaction.length).toFixed(1); 
    });
    let text = 'El promedio de satisfacción con el curso es de:';
    cardAverage('Satisfacción',text, resultFinalSatisfaction);
});

db.collection("answers").where("category", "==", "Activities").get().then((querySnapshot) => {
    var dataAnswers = [];
    let averageSatisfaction = [];
    querySnapshot.forEach((doc) => {
        dataAnswers.push(doc.data());
    });
    let resultFinalSatisfaction = '';

    dataAnswers.forEach((elem) => {
        let sumSatisfaction = 0;
        averageSatisfaction.push(parseInt(elem.result));

        averageSatisfaction.forEach((satisfactionResult) => {
            sumSatisfaction += satisfactionResult;
        });
        resultFinalSatisfaction = parseFloat(sumSatisfaction / averageSatisfaction.length).toFixed(1); 
    });
    let text = 'La satisfacción con las actividades en clase en promedio es de:';
    cardAverage('Actividades',text, resultFinalSatisfaction);
});

db.collection("answers").where("category", "==", "Jobs").get().then((querySnapshot) => {
    var dataAnswers = [];
    let averageSatisfaction = [];
    querySnapshot.forEach((doc) => {
        dataAnswers.push(doc.data());
    });
    let resultFinalSatisfaction = '';

    dataAnswers.forEach((elem) => {
        let sumSatisfaction = 0;
        averageSatisfaction.push(parseInt(elem.result));

        averageSatisfaction.forEach((satisfactionResult) => {
            sumSatisfaction += satisfactionResult;
        });
        resultFinalSatisfaction = parseFloat(sumSatisfaction / averageSatisfaction.length).toFixed(1); 
    });
    let text = 'La satisfacción con los trabajos y entregas en promedio es de:';
    cardAverage('Trabajos',text, resultFinalSatisfaction);
});


db.collection("answers").where("category", "==", "Metodology").get().then((querySnapshot) => {
    var dataAnswers = [];
    let averageSatisfaction = [];
    querySnapshot.forEach((doc) => {
        dataAnswers.push(doc.data());
    });
    let resultFinalSatisfaction = '';

    dataAnswers.forEach((elem) => {
        let sumSatisfaction = 0;
        averageSatisfaction.push(parseInt(elem.result));

        averageSatisfaction.forEach((satisfactionResult) => {
            sumSatisfaction += satisfactionResult;
        });
        resultFinalSatisfaction = parseFloat(sumSatisfaction / averageSatisfaction.length).toFixed(1); 
    });
    let text = 'La satisfacción con la metodología utilizada en clase en promedio es de:';
    cardAverage('Metodología',text, resultFinalSatisfaction);
});


