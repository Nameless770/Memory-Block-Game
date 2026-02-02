let card = document.querySelectorAll('.card');
let gameBord = document.getElementById('GameBord');
let user = document.getElementById('user');
let startButton = document.getElementById('startButton');  
let startScreen = document.getElementById('startScreen');
let BackCards = document.querySelectorAll('.blockBack');
let cardContainer = Array.from(card);
let orderRange = [...Array(card.length).keys()];
let firstSelectedCard = null;
let secondSelectedCard = null;
let lockBoard = false;
let openedCards = 0;
/***********************************************************/

for (let i = 0; i < card.length; i++) {
    card[i].onclick = function() {

        if (lockBoard) return;

        this.classList.add('flip');
        openedCards++;
        this.classList.add('unclickable');
        if (openedCards === 1) {
            firstSelectedCard = this;
        } else if (openedCards === 2) {
            secondSelectedCard = this;
            checkForMatch(firstSelectedCard, secondSelectedCard);
        }
        else{
            lockBoard = true;
            card.forEach(c => c.classList.add('unclickable'));
        }
    }
}

startButton.onclick = function() {
    startScreen.style.display = 'none';
    let promptMsg = prompt("Hello Player, Please Enter Your Name", "");
    while(promptMsg === null || promptMsg.trim() === "") {
        promptMsg = prompt("Hello Player, Please Enter Your Name", "");
    }
    user.value = promptMsg;
    // shuffle
    shuffle(orderRange);
    cardContainer.forEach((card, index) => {
        card.style.order = orderRange[index];
    });
    gameBord.classList.remove('blur');
    
}
if(startScreen.style.display !== 'none') {
    gameBord.classList.add('blur');
}

function checkForMatch(firstSelectedCard, secondSelectedCard) {
    let tries = document.querySelector('#tries span');
    if (firstSelectedCard.dataset.id === secondSelectedCard.dataset.id) {
        firstSelectedCard.classList.add('match');
        secondSelectedCard.classList.add('match');
        openedCards = 0;
        lockBoard = false;
        card.forEach(c => {
            if (!c.classList.contains('match')) {
                c.classList.remove('unclickable');
            }
        });
    } else {
        tries.innerHTML = parseInt(tries.innerHTML) + 1;
        setTimeout(() => {
            firstSelectedCard.classList.remove('flip');
            secondSelectedCard.classList.remove('flip');
            openedCards = 0;
            lockBoard = false;
            card.forEach(c => c.classList.remove('unclickable'));
        }, 1000);
    }
}
function shuffle(array) {
    let current = array.length,
    temp,
    random;

    while (current > 0) {

    random = Math.floor(Math.random() * current);

    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;

}
    return array;
}