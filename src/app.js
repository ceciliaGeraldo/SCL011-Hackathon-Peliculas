
document.getElementById('btn-search').addEventListener('click', function(){
	const titleSearch = document.getElementById('searchBar').value;
    const request = new Request('http://www.omdbapi.com/?s='+titleSearch+ '&apikey=9e07827a');
	//('http://www.omdbapi.com?i=' + movieTitle + '&plot=full' + '&apikey=3a181f1c')
	fetch(request).then(function(result){
		return result.json();
	}).then(function(data){
		const searchEl = document.getElementById('searchResult');
		const len = data.Search.length;
		for(let i = 0; i < len; i++){
			const movieContainer = document.createElement('div');
			//movieContainer.className = 'search-result--item';
			const movieTitle = document.createElement('div');
			movieTitle.innerText = data.Search[i].Title;
			const movieYear = document.createElement('div');
			movieYear.innerText = data.Search[i].Year;
			const movieType = document.createElement('div');
			movieType.innerText = data.Search[i].Type;
			const moviePoster = document.createElement('img');
			moviePoster.src = data.Search[i].Poster;
			
			const buttonMore = document.createElement('button');
			buttonMore.textContent = ("+ Ver más");
			buttonMore.addEventListener('click', ()=>{

					const movieID = data.Search[i].imdbID;
					fetch('http://www.omdbapi.com/?i='+movieID+'&plot=full'+'&apikey=9e07827a&')
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
						<p class="runtime">${data.Runtime}</p></div>
						<div class="ec-stars-wrapper">
						<a href="#" data-value="1" title="Votar con 1 estrellas">&#9733;</a>
						<a href="#" data-value="2" title="Votar con 2 estrellas">&#9733;</a>
						<a href="#" data-value="3" title="Votar con 3 estrellas">&#9733;</a>
						<a href="#" data-value="4" title="Votar con 4 estrellas">&#9733;</a>
						<a href="#" data-value="5" title="Votar con 5 estrellas">&#9733;</a>
					  </div>
					  `
						
					})
				})		
			
			movieContainer.appendChild(moviePoster);
			movieContainer.appendChild(movieTitle);
			movieContainer.appendChild(movieYear);			
			movieContainer.appendChild(movieType);
			movieContainer.appendChild(buttonMore);
			searchEl.appendChild(movieContainer);
			console.log(data.Search[i]);
		}
		
		
	});
});
