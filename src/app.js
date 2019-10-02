
const categoryContainer = document.getElementById('popularByCategory');
document.getElementById('btn-search').addEventListener('click', function () {
	const titleSearch = document.getElementById('searchBar').value;
	const request = new Request('http://www.omdbapi.com/?s=' + titleSearch + '&apikey=9e07827a');
	//('http://www.omdbapi.com?i=' + movieTitle + '&plot=full' + '&apikey=3a181f1c')
	fetch(request).then(function (result) {
		return result.json();
	}).then(function (data) {
		const searchEl = document.getElementById('searchResult');
		const len = data.Search.length;
		for (let i = 0; i < len; i++) {
			const movieContainer = document.createElement('div');
			const movieTitle = document.createElement('div');
			movieTitle.innerText = data.Search[i].Title;
			const movieYear = document.createElement('div');
			movieYear.innerText = data.Search[i].Year;
			const moviePoster = document.createElement('img');
			moviePoster.src = data.Search[i].Poster;

			const buttonMore = document.createElement('button');
			buttonMore.textContent = ("+ Ver más");
			buttonMore.addEventListener('click', () => {

				const movieID = data.Search[i].imdbID;
				fetch('http://www.omdbapi.com/?i=' + movieID + '&plot=full' + '&apikey=9e07827a&')
					.then(result => result.json())
					.then(data => {
						document.getElementById("container").innerHTML +=
							`<div class="bestResult">
						<img class="poster" src=${data.Poster}>
						<h2 class="title">${data.Title}</h2>
						<p class="plot">${data.Plot}</p>
						<p class="actors">${data.Actors}</p>
						<p class="genre">${data.Genre}</p>
						<p class="runtime">${data.Runtime}</p>
						<p class="imdbRating">${data.imdbRating}</p></div>`
					})
			})

			movieContainer.appendChild(moviePoster);
			movieContainer.appendChild(movieTitle);
			movieContainer.appendChild(movieYear);
			movieContainer.appendChild(buttonMore);
			searchEl.appendChild(movieContainer);
			console.log(data.Search[i]);
		}


	});
});
window.addEventListener('load', () => {

	const request = new Request('https://api.themoviedb.org/3/discover/movie?api_key=97d773c470d7cb0726fe1da76931493c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
	//https://api.themoviedb.org/3/movie/?api_key=	');
	fetch(request).then(function (result) {
		return result.json();
	}).then(function (data) {

		for (let i = 0; i < data.results.length; i++) {

			const allContainer = document.getElementById('allCards');
			allContainer.innerHTML +=
				`<div class="all">
				<img class="poster" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.results[i].poster_path}">
				<h2 class="title">${data.results[i].original_title}</h2>
				<p class="plot">${data.results[i].overview}</p>
				<p class="runtime">${data.results[i].vote_average} /10</p>
			</div>`

		}
	})
});

const filterGender = (data, x) => {
	const popular = data.results;
	const popularMoviesFiltered = popular.filter(Element => {
		return Element.genre_ids.includes(x);
	});
	return popularMoviesFiltered;
}

const createCard = (data) => {

	for (let i = 0; i < data.length; i++) {
		const categoryContainer = document.getElementById('popularByCategory');
		categoryContainer.innerHTML +=
			`<div class="all">
				<img class="poster" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2${data[i].poster_path}">
				<h2 class="title">${data[i].original_title}</h2>
				<p class="plot">${data[i].overview}</p>
				<p class="runtime">${data[i].vote_average} /10</p>
			</div>`

	}
}


function makePopularRequest(x) {

	const request = new Request('https://api.themoviedb.org/3/discover/movie?api_key=97d773c470d7cb0726fe1da76931493c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1')
	//https://api.themoviedb.org/3/movie/?api_key=	');
	fetch(request).then(function (result) {
		return result.json();
	}).then(function (data) {

		let resultFilter = filterGender(data, x);
		createCard(resultFilter);


	});

	
}

document.getElementById('btnComedy').addEventListener('click', () => {
	document.getElementById('allCards').style.display = 'none';
	categoryContainer.innerHTML="";
	makePopularRequest(35);
});

document.getElementById('btnSciFi').addEventListener('click', () => {
	document.getElementById('allCards').style.display = 'none';
	categoryContainer.innerHTML="";
	makePopularRequest(878);
});

document.getElementById('btnThriller').addEventListener('click', () => {
	document.getElementById('allCards').style.display = 'none';
	categoryContainer.innerHTML="";
	makePopularRequest(53);
});