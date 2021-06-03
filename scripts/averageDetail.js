const statusPage = document.querySelector('.emonsContent__titleStatusVar');
const textStatus = localStorage.getItem('variableText');
statusPage.innerHTML = textStatus;

const dbSearch = localStorage.getItem('variable');

const feedbackList = document.querySelector('.averageDetail__feedbacksList');
const ratingList = document.querySelector('.averageDetail__ratingsList');

const createCardFeedback = (id,title,text) => {

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

const createCardRating = (id,text) => {
    let ratingCard = document.createElement('div');
    let ratingCardImg = document.createElement('img');
    ratingCardImg.setAttribute('src','./resources/emojiHappy.svg');
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

    querySnapshot.forEach((doc) => {
        createCardFeedback(doc.id,doc.data().category,doc.data().feedback);    
    });
});


db.collection("answers").where("category","==",dbSearch).onSnapshot((querySnapshot) => {
    ratingList.textContent = ' ';

    querySnapshot.forEach((doc) => {
        createCardRating(doc.id,doc.data().result);
    });
});