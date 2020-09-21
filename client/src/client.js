
const writeEvent =(text)=>{
  var newLi= document.createElement('li');
  newLi.innerHTML=text;
  //delete previous li's
  stats=document.getElementById('status');
  while(stats.lastChild){
    stats.removeChild(stats.lastChild)
  }
  document.getElementById('status').appendChild(newLi);
};


const onFormSubmitted = (e) => {
  e.preventDefault();
  const input = document.getElementById('nKname');
  const text=input.value;
  //input.value ='';
  sock.emit('namentry',text);
  document
    .getElementById('nKname_setter')
    .style.display= "none";
}

document
  .getElementById('nKname_form')
  .addEventListener('submit', onFormSubmitted);

const playfunkymusicwiththebuttons = (carddict) => {
    for (var card in carddict){
    //add listeners to the nodes, set as active when clicked
    carddict[card][0].addEventListener('click',()=>{
      //remove previous active - im sure this is memory-intensive im just dumb and drunk
      for (var c2 in carddict){
        if (carddict[c2].className == "selectedcard"){
          carddict[c2].classList.remove("selectedcard")
        }
        //make new card active
        carddict[card].element.classList.add("selectedcard");
      }
    });
  }
  // add listener to submit button, and go fuck yourself
  document.getElementById("submitcard").addEventListener('click',() => {
    for (var c4 in carddict){
      if (carddict[c2].className == "selectedcard"){
        sock.emit('cardselection', c4)
      }
    }
  })
}

const sock = io();

sock.on('message', writeEvent);

sock.on('modal', ((sLi) =>{
  document.getElementById('modal').removeAttribute('hidden');
  ['sub1','sub2','sub3'].forEach((cardsub, i) => {
    document.getElementById(cardsub).src=(sLi[i]+'.gif');
    document.getElementById(cardsub).addEventListener('click',()=>{
      sock.emit('modal', cardsub);
    });
  })
}));

sock.on('prompt', (newPrompt)=>{
  console.log(newPrompt);
  document.getElementById('prompt').innerHTML=newPrompt;
});

sock.on('getinput',(msg)=>{
  answer=window.prompt(msg);
  sock.emit('getinput', answer);
})
//new card list is sent handler


var ctx = document.getElementById('canvas').getContext('2d');
cardlabels=['card1','card2','card3','card4','card5','card6','card7'];
cardDict={};
for (var c in cardlabels){
  i=0;
  //carddict holds the number of the card, associated with the dom location
  cardDict[i]=[document.getElementById(c),0];
  i++;
}
sock.on('card', function(info){
  if(info.image){
    for (var idx in cardDict){
      if (cardDict[idx][1]==0){
        cardDict[idx][1]=info.num;
        cardDict[idx][0].src='data:image/jpeg;base64,' + info.buffer;
        if (idx>=7){
          //if all the gif slots have been filled, move on to next step
          playfunkymusicwiththebuttons(cardDict);
        }
        break;
      }
    }
  }

});
