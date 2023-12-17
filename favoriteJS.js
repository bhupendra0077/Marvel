let arrayOfFavorites=[];
function removeFromFev(c){
    arrayOfFavorites.splice(c,1);
    localStorage.setItem('favorite',JSON.stringify(arrayOfFavorites));
    favorite();
}

function favorite(){
    char = JSON.parse(localStorage.getItem('detaOfCharacters'));
    let footerAttribute = document.querySelector('#footer-attribute');
    footerAttribute.innerHTML = char.attributionHTML;
    let ob = localStorage.getItem('favorite');
     arrayOfFavorites = JSON.parse(ob);
    let columCount=1;
    let fev="<div class='row mb-3'>";
    let count=-1;
    for(i of arrayOfFavorites){
        count++;
        fev+=`<div class="col m-4" id="columns">`;
        fev+=`<img id="characterImage" src="${i.thumbnail.path}/portrait_fantastic.${i.thumbnail.extension}"/></br>`;
        fev+=`<p class="h4" id="names">${i.name}</p><button type="button" onclick="removeFromFev(${count})" id="addFavoriteBtn">Remove favorite</button></div>`;
        columCount++;
               if(columCount==5){
                fev+=`</div><div class='row mb-3'>`;
                columCount=1;
               }
    }
    
    fev+=`</div>`;
    document.querySelector('#favorite-characters').innerHTML=fev;
    
}
 favorite();