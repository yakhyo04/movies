const elList = document.querySelector('.films__card-wrapper');

films.forEach((film) =>{
    let newLi = document.createElement('li');
    let newImg = document.createElement('img');
    let newTitle = document.createElement('h2');
    let newGenreList = document.createElement('ul')
    let newGenreItem = document.createElement('li')
    let newTime = document.createElement('time');
    let newOverview = document.createElement('p')
    let newBtn = document.createElement('button')
    
    let date = new Date(film.release_date)
    let month = date.getMonth() +1;
    let day = date.getDate();
    let year = date.getFullYear(); 
    
    
    newLi.setAttribute('class', 'films__card');
    newTime.setAttribute('datetime', `${day}.${month}.${year}`);
    newTime.textContent = `${day}.${month}.${year}`;
    newGenreList.setAttribute('class', 'films__genere-list');
    newGenreItem.setAttribute('class', 'films__genere-item');
    newBtn.setAttribute('class', 'films__btn')
    newOverview.setAttribute('class', 'films__overview');
    newImg.setAttribute('src', film.poster)
    newTitle.setAttribute('class', 'films__sub-title');
    newTitle.textContent = film.title;
    newGenreItem.textContent = film.genres
    newOverview.textContent = film.overview
    
    
    newLi.appendChild(newImg)
    // newLi.appendChild(newTitle)
    // newGenreList.appendChild(newGenreItem)
    // newLi.appendChild(newGenreList)
    // newLi.appendChild(newOverview)
    // newLi.appendChild(newTime)
    elList.appendChild(newLi);
    
    
    newImg.onclick = function(){
        newLi.appendChild(newTitle)
        newGenreList.appendChild(newGenreItem)
        newLi.appendChild(newGenreList)
        newLi.appendChild(newOverview)
        newLi.appendChild(newTime)
    }
    newBtn.onclick = function (){
        newBtn.style.display = none
    }
})