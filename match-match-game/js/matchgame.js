(function(){
  var countRow = +(document.body.querySelector("#main-menu input[checked]").value);
  var countTime = 30; 
  var frontName = 'front1';
  var timerId;
  var cardAgain;
  var matchingGame = {};
    matchingGame.deck = [
      'cardAK', 'cardAK',
      'cardAQ', 'cardAQ',
      'cardAJ', 'cardAJ',
      'cardBK', 'cardBK',
      'cardBQ', 'cardBQ',
      'cardBJ', 'cardBJ', 
    ];  
  
  showMainMenu();

  function showMainMenu() {
    var mainMenu = document.body.querySelector("#main-menu");
    var buttonStart = document.body.querySelector("#main-menu input[type=button]");
    var input = document.body.querySelectorAll("#main-menu input[type=radio]");

    document.body.querySelector("#main-menu").style.display = "";
    document.body.querySelector("#cards").style.display = "none";
    document.body.querySelector("#timer").style.display = "none";
    document.body.querySelector("#gameOver").style.display = "none";

    for (var i=0; i < 3; i++) {
      mainMenu.children[i].style.left =  100 * i + "px";  
    }

    for(var i=0; i< 3; i++){
      mainMenu.children[i].addEventListener("click", selectFront);
    }    

    for(var i=0; i< input.length; i++){
      input[i].addEventListener("click", selectCountRow);
    }  
    
    buttonStart.addEventListener("click", startGame);

    function selectFront() {
      document.body.querySelector("#main-menu .selected").classList.remove("selected");
      this.classList.add("selected");
      frontName =this.children[0].classList[1];
    }
    function selectCountRow() {
      document.body.querySelector("#main-menu input[checked]").removeAttribute("checked");
      this.setAttribute("checked", "checked");
    }
  }

  function startGame() {
    countRow = +(document.body.querySelector("#main-menu input[checked]").value);
    document.body.querySelector("#main-menu").style.display = "none";
    document.body.querySelector("#cards").style.display = "";
    document.body.querySelector("#timer").style.display = "";
    timerStart();
    startMatchGame();
  }

  function timerStart() { 
    timerId = setInterval(update, 1000);
    update(); 
  }

  function update() {
    var timer = document.getElementById('timer');
    timer.children[0].innerHTML = countTime + " seconds";
    countTime--;
    if (cards.children.length == 0) {
      timerStop();
    }
    if (countTime ===  -1) {
      timerStop();
    } 
  }  

  function timerStop() {
    clearInterval(timerId);
    timerId = null;
    if (cards.children.length == 0){
      cards.style.display = "none";
      gameOver.children[0].innerHTML = "You win";
      gameOver.style.display = "";
    }
    if (cards.children.length !== 0){
      cards.style.display = "none";
      gameOver.children[0].innerHTML = "You lose";
      gameOver.style.display = "";
    }
    gameOver.children[1].addEventListener("click", playAgain);
  }

  function startMatchGame() {
    // shuffling the deck
    matchingGame.deck.length = 4 * countRow; 
    matchingGame.deck.sort(shuffle);

    // clone 12 copies of the card
    var cards = document.body.querySelector("#cards");
    cards.children[0].children[0].classList.add(frontName);
    var card = cards.firstElementChild.cloneNode(true);
    cardAgain = card;
    for(var i=0; i<matchingGame.deck.length-1; i++){
      cards.appendChild(card);
      card = cards.firstElementChild.cloneNode(true);
    }
    // initialize each card
    var addHeight = 0;
    if (countRow == 1) {addHeight = 140}
    if (countRow == 2) {addHeight = 60}
    cards.children[0].style.left =  "0px";  
    cards.children[0].style.top =   addHeight + "px"; 
    for (var i=1; i <= matchingGame.deck.length-1; i++) {
        cards.children[i].style.left =  100 * (i%4) + "px";  
        cards.children[i].style.top =  140 * Math.floor(i/4) + addHeight + "px";  
    }
    var pattern = matchingGame.deck.pop();
    for(var i=0; i<countRow*4; i++){
      cards.children[i].children[1].classList.add(pattern);
      cards.children[i].children[1].setAttribute("data-pattern", pattern);
      pattern = matchingGame.deck.pop();
    }

    for(var i=0; i<cards.children.length; i++){
      cards.children[i].addEventListener("click", selectCard);
    }
  }

  function shuffle() {
    return 0.5 - Math.random();
  }

  function selectCard() {
    if (document.body.querySelectorAll(".card-flipped").length > 1){
      return;    
    }
    this.classList.add("card-flipped");

    if (document.body.querySelectorAll(".card-flipped").length ==2){
      setTimeout(checkPattern,500);
    }
  }

  function checkPattern() {
    if (isMatchPattern()) {
      document.body.querySelector(".card-flipped").classList.add("card-removed");
      document.body.querySelector(".card-removed").classList.remove("card-flipped");
      document.body.querySelector(".card-flipped").classList.add("card-removed");
      document.body.querySelector(".card-flipped").classList.remove("card-flipped");
      setTimeout(removeTookCards, 700);
    } else {  
      document.body.querySelector(".card-flipped").classList.remove("card-flipped");
      document.body.querySelector(".card-flipped").classList.remove("card-flipped");
    }
  }

  function isMatchPattern() {
    var cards = document.body.querySelectorAll(".card-flipped");
    var pattern = cards[0].children[1].getAttribute("data-pattern");
    var anotherPattern = cards[1].children[1].getAttribute("data-pattern");
    return (pattern == anotherPattern);
  }

  function removeTookCards() {
    cards.removeChild(document.body.querySelector(".card-removed"));
    cards.removeChild(document.body.querySelector(".card-removed"));
  }

  function playAgain() {
    var countNode = 0;
    document.body.querySelector("#main-menu").style.display = "";
    document.body.querySelector("#cards").style.display = "none";
    document.body.querySelector("#timer").style.display = "none";
    document.body.querySelector("#gameOver").style.display = "none";
    countNode = document.body.querySelector("#cards").children.length;
    for (var i = 0; i < countNode; i++) {
       document.body.querySelector("#cards").removeChild(document.body.querySelector("#cards .card"));
    }
    console.log(document.body.querySelector("#cards"));
    cardAgain.classList.remove("card-removed");
    cardAgain.children[0].className = "face front";
    cardAgain.children[1].className = "face back";
    document.body.querySelector("#cards").appendChild(cardAgain);
    matchingGame.deck = [
      'cardAK', 'cardAK',
      'cardAQ', 'cardAQ',
      'cardAJ', 'cardAJ',
      'cardBK', 'cardBK',
      'cardBQ', 'cardBQ',
      'cardBJ', 'cardBJ', 
    ]; 
    countTime = 30;
    console.log(cardAgain);
  }
  
})();