const front = "card_front";

const back = "card_back";

const CARD = "card";

const ICON = "icon";
let tempo = document.getElementById('time');



startGame();
setInterval(atualizarTexto, 1000)
function startGame(){
    
    initializeCards(game.createCardsFromTechs())

    
}

function initializeCards(cards){
    let gameBoard = document.getElementById('GameBoard')
    gameBoard.innerHTML = "";
    
    game.cards.forEach((card) =>{
         let cardElement = document.createElement('div');

         cardElement.id = card.id;

         cardElement.classList.add(CARD);

         cardElement.dataset.icon = card.icon;
         cardFlipped(cardElement);
         
         

         createCardContent(front, card, cardElement);
         createCardContent(back, card, cardElement);

         cardElement.addEventListener('click', flipCard);
         gameBoard.appendChild(cardElement);
    


    })
}

function createCardContent(face, card, element){
   let cardFace = document.createElement('div');
   cardFace.classList.add(face);

   if(face == front){
          let iconElement = document.createElement('img');
          iconElement.classList.add(ICON);
          iconElement.src = '../images/' + card.icon + '.png'
          cardFace.appendChild(iconElement)
          
   }else{
      cardFace.innerHTML = "&lt/&gt"
   }
element.appendChild(cardFace)

}



function flipCard(){


    if(game.setCard(this.id)){
     movesAtualizar()
     
     this.classList.add('flip');
     if(game.secondCard){
     if(game.checkMath()){
        
        game.clearCards()
        game.points();
        if(game.checkGameOver()){
           let gameOverLayer = document.getElementById('GameOver')
           gameOverLayer.style.display = 'flex';
           atualizarPoints();
           
        }

     }else{
        setTimeout(()=>{ 
         let firstCardView  = document.getElementById(game.firstCard.id);
         let secondCardView = document.getElementById(game.secondCard.id);

         firstCardView.classList.remove('flip');
         secondCardView.classList.remove('flip');
         game.unflipCards();
        }, 1000)
     };
    }
  }

}

function Restart(){
   startGame();
   let gameOverLayer = document.getElementById('GameOver')
       gameOverLayer.style.display = 'none';
       game.minutosDezena = 0;
       game.minutosUnidade = 0;
       game.segundosDezena = 0;
       game.segundosUnidade = -1;
       game.moves = 0;
       movesAtualizar()
       

}

function movesAtualizar(){
   let movesInterface = document.getElementById('moves');   
   movesInterface.innerHTML = 'Jogadas: ' + game.moves;
   if(game.checkGameOver()){
      
      movesInterface.innerHTML = 'Jogadas: ' + game.moves;
      



   }
}

function atualizarTexto(){
   if(!game.checkGameOver()){
   game.timer(); 
   }
   tempo.innerHTML = 'Tempo: ' + game.minutosDezena + game.minutosUnidade + ':' + game.segundosDezena + game.segundosUnidade

}
function atualizarPoints(){
   let pointsInterface = document.getElementById('Scores');
       pointsInterface.innerHTML =  'Você obteve um total de: ' + game.pontosTotal + ' pontos.';

}

function cardFlipped(elemento){
    setTimeout(() => {
       elemento.classList.remove('flip')
    }, 3000);
    elemento.classList.add('flip')
}