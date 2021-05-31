const cardAverage = (id,title,text,result) => {
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
    cardAverage.setAttribute("id",id);

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
    cardAverage("EmotionalGraph",'Emocional',text, resultFinalSatisfaction);

    
    const graphEmotional = document.getElementById('EmotionalGraph');
    const handleClick = (event) =>{
        location.href="averageDetail.html";
        localStorage.clear();
        localStorage.setItem("variable","Emotional");
        localStorage.setItem("variableText","Emocional");
    }
    graphEmotional.addEventListener("click",handleClick);
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
    cardAverage("SatisfactionGraph",'Satisfacción',text, resultFinalSatisfaction);
    const graphSatisfaction = document.getElementById('SatisfactionGraph');
    const handleClick = (event) =>{
        location.href="averageDetail.html";
        localStorage.clear();
        localStorage.setItem("variable","Satisfaction");
        localStorage.setItem("variableText","Satisfacción");
    }
    graphSatisfaction.addEventListener("click",handleClick);
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
    cardAverage("ActivitiesGraph",'Actividades',text, resultFinalSatisfaction);
    const graphActivities = document.getElementById('ActivitiesGraph');
    const handleClick = (event) =>{
        location.href="averageDetail.html";
        localStorage.clear();
        localStorage.setItem("variable","Activities");
        localStorage.setItem("variableText","Actividades en clase");
    }
    graphActivities.addEventListener("click",handleClick);
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
    cardAverage("JobsGraph",'Trabajos',text, resultFinalSatisfaction);
    const graphJobs = document.getElementById('JobsGraph');
    const handleClick = (event) =>{
        location.href="averageDetail.html";
        localStorage.clear();
        localStorage.setItem("variable","Jobs");
        localStorage.setItem("variableText","Trabajos y entregas");
    }
    graphJobs.addEventListener("click",handleClick);
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
    cardAverage("metodologyGraph",'Metodología',text, resultFinalSatisfaction);
    const graphMetodology = document.getElementById('metodologyGraph');
    const handleClick = (event) =>{
        location.href="averageDetail.html";
        localStorage.clear();
        localStorage.setItem("variable","Metodology");
        localStorage.setItem("variableText","Metodología");
    }
    graphMetodology.addEventListener("click",handleClick);
});

