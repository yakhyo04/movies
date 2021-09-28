const elList = document.querySelector('.films__card-wrapper');
const elForm = document.querySelector('#form');
const elSearch = document.querySelector('#search');
const elSelect = elForm.querySelector('#select');
const elSelect2 = elForm.querySelector('#select2');
const elOption = elForm.querySelector('#option');
const elFilter = elForm.querySelector('.films__filter');


// function renderMovies(filmsArr, element){
//     filmsArr.forEach((film) =>{
//         const cloneTemplate = elTemplate.cloneNode(true)

//         cloneTemplate.querySelector('.films__img').src = film.poster
//         cloneTemplate.querySelector('.films__card-title').textContent = film.title

//         element.appendChild(cloneTemplate)
//     }).0
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
        newTime.setAttribute('class', 'films__time')
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
    
    const searchValue = elSearch.value.trim();
    const selectValue = elSelect.value.trim();
    const selectValue2 = elSelect2.value.trim();
    const filterValue = elFilter.value.trim();
    const regex = new RegExp(searchValue, 'gi');
    
    const filteredArray = films.filter((film) => film.title.match(regex));
    // console.log(filteredArray)
    
    let selectArray = []
    
    if (selectValue === 'All') {
        selectArray = filteredArray
    }else{
        selectArray = filteredArray.filter(film => film.genres.includes(selectValue))
    }
    
    if(selectValue2 === 'a_z') {
        selectArray.sort((a, b) =>{
            if(a.title > b.title) {
                return 1    
            }else if(a.title < b.title) {
                return -1
            }else{
                return 0
            }
        })
    } if(selectValue2 === 'z_a') {
        selectArray.sort((a, b) =>{
            if(a.title > b.title) {
                return -1
            }else if(a.title < b.title) {
                return 1
            }else{
                return 0
            }
        })
    }if(selectValue2 === 'new_old') {
        selectArray.sort((a, b) =>{
            if(a.release_date > b.release_date) {
                return 1
            }else if(a.release_date < b.release_date) {
                return -1
            }else{
                return 0
            }
        })
    }if(selectValue2 === 'old_new') {
        selectArray.sort((a, b) =>{
            if(a.release_date > b.release_date) {
                return -1
            }else if(a.release_date < b.release_date) {
                return 1
            }else{
                return 0
            }
        })
    }
    elSearch.value = null
    
    renderFilms(selectArray, elList)
})