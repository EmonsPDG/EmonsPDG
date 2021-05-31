const statusPage = document.querySelector('.emonsContent__titleStatusVar');

const textStatus = localStorage.getItem('variableText');

statusPage.innerHTML = textStatus;

