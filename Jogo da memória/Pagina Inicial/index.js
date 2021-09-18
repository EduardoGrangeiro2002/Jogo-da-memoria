
onload= function(){
    let nome = localStorage.getItem('Texto');
    let gameOverText = document.getElementById('Texto');
    let Score = document.getElementById('Score')
       gameOverText.innerHTML = 'Parabens ' + nome + ' você completou o jogo.'
    
    

}


function atualizar(e){
   let valor = e.value;
   let gameOverText = document.getElementById('Texto');
   localStorage.setItem('Texto', valor)

}


