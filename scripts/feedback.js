let feedbackList = document.querySelector('.feedback__list');
let startSemester = '';
const createCardFeedback = (id,title,text,date,emoji) => {
    indexWeek = parseInt(restaFechas(startSemester,date)/7);
    if(indexWeek <= 0) {
        indexWeek = 1;
    }

    let feedbackListItem = document.querySelector('#listItem'+indexWeek);

    let feedbackCard = document.createElement('div');
    let feedbackCardImg = document.createElement('img');
    switch (emoji) {
        case 'happy':
            feedbackCardImg.setAttribute('src','./resources/emojiHappy.svg');
            feedbackCard.classList.add('feedback__listItemCard--good');
            break;
        case 'bad':
            feedbackCardImg.setAttribute('src','./resources/emojiBad.svg');
            feedbackCard.classList.add('feedback__listItemCard--alert');
            break;
        default:
            feedbackCardImg.setAttribute('src','./resources/emojiHappy.svg');
            feedbackCard.classList.add('feedback__listItemCard--good');
            break;
    }
    let feedbackCardText = document.createElement('div');
    let feedbackCardTextH3 = document.createElement('h3');
    switch (title) {
        case 'Metodology':
            feedbackCardTextH3.innerHTML = 'Metodología';
            break;
        case 'Jobs':
            feedbackCardTextH3.innerHTML = 'Trabajos y entregas';
            break;
        case 'Activities':
            feedbackCardTextH3.innerHTML = 'Actividades en clase';
            break;
        case 'Emotional':
            feedbackCardTextH3.innerHTML = 'Emocional';
            break;
        case 'Satisfaction':
            feedbackCardTextH3.innerHTML = 'Satisfacción general';
            break;
    }
    let feedbackCardTextP = document.createElement('p');
    feedbackCardTextP.innerHTML = text;

    feedbackCard.classList.add('feedback__listItemCard');
    feedbackCardText.classList.add('feedback__listItemCardText');
    feedbackCard.setAttribute("id",id);

    feedbackCard.appendChild(feedbackCardImg);
    feedbackCard.appendChild(feedbackCardText);
    feedbackCardText.appendChild(feedbackCardTextH3);
    feedbackCardText.appendChild(feedbackCardTextP);

    feedbackListItem.appendChild(feedbackCard);
}

restaFechas = function(f1,f2) {
    var aFecha1 = f1.split('/');
    var aFecha2 = f2.split('/');
    var fFecha1 = Date.UTC(aFecha1[2],aFecha1[1]-1,aFecha1[0]);
    var fFecha2 = Date.UTC(aFecha2[2],aFecha2[1]-1,aFecha2[0]);
    var dif = fFecha2 - fFecha1;
    var dias = Math.floor(dif / (1000 * 60 * 60 * 24));
    return dias;
}

let arrayWeeks = [];

for (let i = 0; i < 17; i++) {
    arrayWeeks.push(new Array(0));
}

db.collection("feedbacks").onSnapshot((querySnapshot) => {
    let feedbackAnswers = [];

    //Codigo para vaciar el contenedor principal al momento en que se debe crear una nueva tarjeta para que no se
    //vuelvan a pintar las mismas de antes
    let feedbackListLastContainer = document.querySelector('.feedback__list');
    feedbackListLastContainer.textContent = ' ';

    querySnapshot.forEach((doc) => {
        feedbackAnswers.push(doc.data());
    });

    db.collection('semester').doc('2021-1').get().then((doc) => {
        if (doc.exists) {
            startSemester = doc.data().start;
        }

        let indexWeek = '';

        feedbackAnswers.forEach((feedback) => {
            let dateFeedback = feedback.date;
            indexWeek = parseInt(restaFechas(startSemester,dateFeedback)/7);
            if(indexWeek <= 0) {
                indexWeek = 1;
            }
            // console.log('Semana de respuesta: '+ indexWeek);
            arrayWeeks[indexWeek].push(feedback);
            createCardFeedback(feedback.id,feedback.category,feedback.feedback,feedback.date,feedback.emoji);
            let feedbackListContainer = document.querySelectorAll('.feedback__listItem');
            feedbackListContainer.forEach((feedbackContainer)=>{
                if(feedbackContainer.childNodes.length > 1){
                    feedbackContainer.classList.remove('feedback__listItem--hidden');
                }
            });
        });
    });

    arrayWeeks.forEach((week,index) => {
        let feedbackListItem = document.createElement('div');
        feedbackListItem.classList.add('feedback__listItem');
        feedbackListItem.classList.add('feedback__listItem--hidden');
        feedbackListItem.setAttribute('id','listItem'+index);

        let feedbackListItemWeek = document.createElement('p');
        feedbackListItemWeek.innerHTML = 'Semana'+' '+index;
        feedbackListItem.appendChild(feedbackListItemWeek);
        feedbackList.appendChild(feedbackListItem);
    });
});
