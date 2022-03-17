'use strict';

//Parte 1, 1.a
const message = document.getElementById('message');
const panelControl = document.getElementById('panel-control');
const panelGame = document.getElementById('panel-game');
const btLevel = document.getElementById('btLevel');
const btPlay = document.getElementById('btPlay');

//Ficha 3, I 1.a
const cards = panelGame.querySelectorAll('.card');

//F3, 2.a
  let cardsLogos = ['angular', 'bootstrap', 'html', 'javascript', 'vue', 'svelte', 'react', 'css', 'backbone', 'ember'];


// parte 1, b.4
const gameStarted = document.querySelectorAll('.gameStarted');

function reset(){

    // parte 1, b.1
    panelGame.style.display = 'none';
    
    // parte 1, b.3
    message.textContent = '';
    message.classList.remove('hide');
    

        
    // parte 1, b.5
    gameStarted.forEach(function(element, index, arr){
        element.classList.add('hide');
    });

    // parte 1, b.6
    btPlay.disabled = true;

   
    // parte 2, a
    
    
    let selectedLevel = btLevel.value;

    if(selectedLevel == 0){
        btPlay.disabled = true;    
    }else{
        btPlay.disabled = false;
        panelGame.style.display ="grid"
    }
    

    // parte 2, a
    /*
    btLevel.value == 0 ? btPlay.disabled = true  : btPlay.disabled = false ;
    */
}

btLevel.addEventListener('change',reset);

function stopGame(){
    btPlay.textContent = 'Iniciar Jogo';
    btLevel.disabled = false;
    reset();
    
}

function startGame(){
    btPlay.textContent = 'Terminar Jogo';
    btLevel.disabled = true;
   
    // parte 3, b.3
    gameStarted.forEach(function(element, index,arr){
        element.classList.remove('hide');
    });

    // parte 3, b.4
    message.classList.add('hide');

    cards.forEach(function(element, index, arr){
        let randomNumber = Math.floor(Math.random() * cards.length) +1;
        element.style.order = randomNumber;
    });
    //console.log(cardsLogos);
    shuffleArray(cardsLogos);
    //console.log(cardsLogos);
    showCards(cards);

    cards.forEach(function(element, index, arr){
        let i;
        if (index < arr.length/2){
            i = index;
        }else 
            i = arr.length - (index + 1);
        }   


        element.dataset.logo = cardsLogos(i);
        let cardImg = element.querySelector('.card-front');
        cardImg.src = 'images/' + cardsLogos(i) + '.png' ;
    });

}

function showCards(cards){
    cards.forEach(function(element, index, arr){
        element.classList.add('flipped');
    });
}

const shuffleArray = array =>{
    for (let i = array.length -1 ; i >0; i--){
        const j = Math.floor(Math.random()* (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

btPlay.addEventListener('click', function(){
    let currentLabelBtPlay = btPlay.textContent;
    if (currentLabelBtPlay == 'Terminar Jogo'){
        stopGame();
    }else{
        startGame();
    }

});

