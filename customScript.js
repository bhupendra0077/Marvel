// to store all character data
let data;

// getting favorite character data from localStorage while page loads
let arr=JSON.parse(localStorage.getItem('favorite'));

// Search a character

function searchBtn(){
    let char = document.querySelector('#searchedCharacter').value;
    localStorage.setItem('searched', char);
    window.open('searchedCharacters.html');
}

// clear sticky div
function clearSticky(){
    setInterval(function() {document.querySelector('#addError').style.display="none";}, 5000);
}

// to add characters in favorite
function addToFev(k){
    let flag=true;
    for(i of arr){
        if(data.data.results[k].name==i.name){
            document.querySelector('#addError').style.display="block";
            document.querySelector('#addError').innerHTML="Already Added!";
            flag=false;
            clearSticky();
            break;
        }
    }
        if(flag){
            arr.push(data.data.results[k]);
            document.querySelector('#addError').style.display="block";
            document.querySelector('#addError').innerHTML="Successfully Added to favorites";
            clearSticky();
        }
       
   
}
// send data while clicked on a character
function clicked(character){
    localStorage.setItem('character', JSON.stringify(data.data.results[character]));
    window.open('superHeroDetails.html');
}

// storing character while clicking on favorite button
document.querySelector('#favorite-button').addEventListener('click',()=>{
    localStorage.setItem('favorite', JSON.stringify(arr));
})



let start = {
 render:()=>{
    //url to fatch comics data
    let url= "http://gateway.marvel.com/v1/public/characters?ts=1&apikey=c4b672adc87daa7aa60c93d21d8c481a&hash=267af7493ac3f2035d1288dde9222242";
    let loadingPlace = document.querySelector('#loadingMessage');
    let footerAttribute = document.querySelector('#footer-attribute');
    let characters = document.querySelector('#characters');
    //creating http request object
    let req1 = new XMLHttpRequest()
    //runs while page loading or loading data from server
    req1.onreadystatechange = ()=>{
        loadingPlace.innerHTML = 'Loading Characters...';
    }
    //runs when data loads completly
    req1.onload = function () {
        //if loading successfull
        if(req1.status == 200) {
            loadingPlace.innerHTML = 'Successfully loaded';
             data = JSON.parse(req1.responseText);//received data from server
             localStorage.setItem('detaOfCharacters', JSON.stringify(data));//stored data in local storage
            footerAttribute.innerHTML = data.attributionHTML;
            let rows = "<div id='characterRows' class='row m-3'>";
            let columCount=1;
            let count=-1;
            for(i of data.data.results){
              count++;
               rows+=`<div class="col m-4" id="columns">`;
                rows+=`<img id="characterImage" onclick="clicked(${count})" src="${i.thumbnail.path}/portrait_fantastic.${i.thumbnail.extension}"/></br>`;
               rows+=`<p class="h4" id="names">${i.name}</p><button type="button" onclick="addToFev(${count})" id="addFavoriteBtn">add favorite</button></div>`;
               columCount++;
               if(columCount==5){
                rows+=`</div><div class='row m-3'>`;
                columCount=1;
               }
            }
            rows+=`</div>`;
            characters.innerHTML=rows;

        }
        //if getting any error from server
        else{
            loadingPlace.innerHTML = 'Unable to fatch data';
        }
    }
    //opening the request
    req1.open('GET', url, true);
    //hitting the server database
    req1.send();
 }
}
start.render();

