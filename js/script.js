const elList = document.querySelector('.films__card-wrapper');
const elForm = document.querySelector('#form');
const elSearch = document.querySelector('#search');
const elSelect = elForm.querySelector('#select');
const elOption = elForm.querySelector('#option')



// function renderMovies(filmsArr, element){
//     filmsArr.forEach((film) =>{
//         const cloneTemplate = elTemplate.cloneNode(true)

//         cloneTemplate.querySelector('.films__img').src = film.poster
//         cloneTemplate.querySelector('.films__card-title').textContent = film.title

//         element.appendChild(cloneTemplate)
//     })
// }

// renderMovies(films, elList)















function renderGenres(filmArr, element){
    let result = []
    filmArr.forEach(film =>{
        film.genres.forEach((genre) =>{
            if(!result.includes(genre)){
                result.push(genre)
            }
        })
    })
    result.forEach((genre) =>{
        let newOption = document.createElement('option');
        newOption.textContent = genre;
        newOption.value = genre;
        element.appendChild(newOption)
    })
}

renderGenres(films, elSelect)


function renderFilms(films, element){
    element.innerHTML = null;
    films.forEach((film) =>{
        let newLi = document.createElement('li');
        let newImg = document.createElement('img');
        let newTitle = document.createElement('h2');
        let newGenreList = document.createElement('ul')
        let newGenreItem = document.createElement('li')
        let newTime = document.createElement('time');
        let newOverview = document.createElement('p')
        
        let date = new Date(film.release_date)
        let month = date.getMonth() +1;
        let day = date.getDate();
        let year = date.getFullYear(); 
        
        
        newLi.setAttribute('class', 'films__card');
        newTime.setAttribute('datetime', `${day}.${month}.${year}`);
        newTime.textContent = `${day}.${month}.${year}`;
        newGenreList.setAttribute('class', 'films__genere-list');
        newGenreItem.setAttribute('class', 'films__genere-item');
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

    })
}

renderFilms(films, elList)


elForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let searchValue = elSearch.value.trim()
    // let selectValue = elSelect.value.trim()

    const regex = new RegExp(searchValue, 'gi')

    let filteredArray = films.filter(film => film.title.match(regex))
    console.log(filteredArray)

    renderFilms(filteredArray, elList)
})


elSelect.addEventListener("change", (e) =>{
    e.preventDefault();

    let selectValue = elSelect.value.trim()
    let selectArray = []
   
    if(selectValue == "All"){
        selectArray = films
    }else{
        selectArray = films.filter((film) => {
            return film.genres.includes(selectValue)
        })
    }
    renderFilms(selectArray, elList)
})