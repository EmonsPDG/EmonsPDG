const statusPage = document.querySelector('.emonsContent__titleStatusVar');
const textStatus = localStorage.getItem('variableText');
statusPage.innerHTML = textStatus;

const dbSearch = localStorage.getItem('variable');

const feedbackList = document.querySelector('.averageDetail__feedbacksList');
const ratingList = document.querySelector('.averageDetail__ratingsList');

const createCardFeedback = (id,title,text,emoji) => {

    let feedbackCard = document.createElement('div');
    let feedbackCardImg = document.createElement('img');
    feedbackCardImg.setAttribute('src','./resources/emojiHappy.svg');
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
    let feedbackCardTextP = document.createElement('p');
    feedbackCardTextP.innerHTML = text;

    feedbackCard.classList.add('averageDetail__feedbacksListCard');
    feedbackCardText.classList.add('averageDetail__feedbacksListCardText');
    feedbackCard.setAttribute("id",id);

    feedbackCard.appendChild(feedbackCardImg);
    feedbackCard.appendChild(feedbackCardText);
    feedbackCardText.appendChild(feedbackCardTextH3);
    feedbackCardText.appendChild(feedbackCardTextP);

    feedbackList.appendChild(feedbackCard);
}

const createCardRating = (id,text,emoji) => {
    let ratingCard = document.createElement('div');
    let ratingCardImg = document.createElement('img');
    switch (emoji) {
        case 'happy':
            ratingCardImg.setAttribute('src','./resources/emojiHappy.svg');
            ratingCard.classList.add('feedback__listItemCard--good');
            break;
        case 'bad':
            ratingCardImg.setAttribute('src','./resources/emojiBad.svg');
            ratingCard.classList.add('feedback__listItemCard--alert');
            break;
        default:
            ratingCardImg.setAttribute('src','./resources/emojiHappy.svg');
            ratingCard.classList.add('feedback__listItemCard--good');
            break;
    }
    let ratingCardTextP = document.createElement('p');
    ratingCardTextP.innerHTML = text;

    ratingCard.classList.add('averageDetail__ratingsListCard');
    ratingCard.setAttribute("id",id);

    ratingCard.appendChild(ratingCardImg);
    ratingCard.appendChild(ratingCardTextP);

    ratingList.appendChild(ratingCard);
}

db.collection("feedbacks").where("category","==",dbSearch).onSnapshot((querySnapshot) => {
    feedbackList.textContent = ' ';

    if(querySnapshot.empty){
        let feedbackEmptyAlert = document.createElement('p');
        feedbackEmptyAlert.innerHTML= '¡Aún no tienes retroalimentaciones en esta categoría!'
        feedbackList.appendChild(feedbackEmptyAlert);
    }

    querySnapshot.forEach((doc) => {
        createCardFeedback(doc.id,doc.data().category,doc.data().feedback,doc.data().emoji);    
    });
});


db.collection("answers").where("category","==",dbSearch).onSnapshot((querySnapshot) => {
    ratingList.textContent = ' ';

    if(querySnapshot.empty){
        let feedbackEmptyAlert = document.createElement('p');
        feedbackEmptyAlert.innerHTML= '¡Aún no tienes retroalimentaciones en esta categoría!'
        ratingList.appendChild(feedbackEmptyAlert);
    }
    querySnapshot.forEach((doc) => {
        createCardRating(doc.id,doc.data().result,doc.data().emoji);
    });
});