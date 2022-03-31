'use strict';

//Parte 1, 1.a
const message = document.getElementById('message');
const panelControl = document.getElementById('panel-control');
const panelGame = document.getElementById('panel-game');
const btLevel = document.getElementById('btLevel');
const btPlay = document.getElementById('btPlay');
const placard = document.getElementById('points');
//Ficha 3, I 1.a
const cards = panelGame.querySelectorAll('.card');

//Ficha 3, Parte II 2.a
  let cardsLogos = [
    'angular',
    'bootstrap',
    'html',
    'javascript',
    'vue',
    'svelte',
    'react',
    'css',
    'backbone',
    'ember'];


// parte 1, b.4
const gameStarted = document.querySelectorAll('.gameStarted');


 // Ficha 4, 1.b
 let flippedCards =[];

 let totalFlippedCards;

 let points;

function reset(){

    // parte 1, b.1
    panelGame.style.display = 'none';
    
    // parte 1, b.3
    //message.textContent = '';
    
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
    
    cards.forEach(function(element){
        setTimeout(()=>{
            element.classList.remove('flipped');
            element.classList.remove('inative');
            element.classList.remove('grayscale');
        },600);
    });

    
    modalGameOver.style.display = 'block';
  
    btPlay.textContent = 'Iniciar Jogo';
    btLevel.disabled = false;
    reset();
    
}




function startGame(){
    btPlay.textContent = 'Terminar Jogo';
    btLevel.disabled = true;
    totalFlippedCards = 0;
//    console.log(cards.length);
    points = 0;
    // parte 3, b.3
    gameStarted.forEach(function(element, index,arr){
        element.classList.remove('hide');
    });

    // parte 3, b.4
    message.classList.add('hide');
    // Ficha 3, Parte 1.c
    
    /*cards.forEach(function(card, index, arr){
        let randomNumber = Math.floor(Math.random() * cards.length) +1;
        card.style.order = randomNumber;
    });
    */
    
    //Ficha 3, Parte 2.a
    
    //console.log(cardsLogos);
    shuffleArray(cardsLogos);
    //console.log(cardsLogos);
    //showCards(cards);

    cards.forEach(function(card, index, arr){
       
        let i; 
        if (index < (arr.length/2)){
            i = index;
        }else{
            i = arr.length - index - 1;
        }  
        card.dataset.logo = cardsLogos[i];
        let cardImg = card.querySelector('.card-front');
        cardImg.src = 'images/' + cardsLogos[i] + '.png' ;
    });

}
/*
function showCards(cards){
    cards.forEach(function(element, index, arr){
        element.classList.add('flipped');
    });
}
*/

cards.forEach(function(card, index, arr){
    card.addEventListener('click', function(){flipCard(this)},{once: true});
    card.addEventListener('mouseover', function(){this.classList.add('cardHover')});
    card.addEventListener('mouseout', function(){this.classList.remove('cardHover')});
});

function flipCard(card){
    
    card.classList.add('flipped');
    //this.classList.add('flipped');

    /*

    flippedCards.forEach(function(element,index,arr){
        console.log(element + " " + index);
    });
    
    */
  
    // Ficha 4, 1.c
    flippedCards.push(card);
    
    if (flippedCards.length == 2){
        checkPair(flippedCards);
    }

}

function checkPair(flippedCards){
    if(flippedCards[0].dataset.logo==flippedCards[1].dataset.logo){
        //console.log("iguais");        
        
        flippedCards.forEach(function(element){
            
            setTimeout(()=>{  
                element.classList.add('inative');
                let cardFront = element.querySelector('.card-front');
                cardFront.classList.add('grayscale');
            },500)

        });

        totalFlippedCards += 2;
        score('up');
        gameOver()

    }else{

        flippedCards.forEach(function(element){
           
            setTimeout(()=>{
                element.classList.remove('flipped')
                element.addEventListener('click', function(){flipCard(this)}, {once:true});
            },500)

        });   
        score('down');
        
    }
    flippedCards.pop();
    flippedCards.pop();
}




function gameOver(){
    if(totalFlippedCards == cards.length){
       stopGame();
        return true;
    }else{
        return false;
    }
}

// Ficha 3, Parte 1.c
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


panelGame.addEventListener('click', ()=>{
    message.classList.add('hide');
});

function score(situation){
    if (situation == 'up'){
        points = (cards.length-totalFlippedCards)*2;
    }else{
        if(points>=2){
            points -= 2;
        }else{
            points = 0;
        }
    }
    placard.textContent = points;
}

reset();