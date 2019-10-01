

document.getElementById('btn-search').addEventListener('click', function(){
	const titleSearch = document.getElementById('searchBar').value;
    const request = new Request('http://www.omdbapi.com/?i=tt3896198&apikey=9e07827a&s='+titleSearch);
   
	fetch(request).then(function(result){
		return result.json();
	}).then(function(data){
		var searchEl = document.getElementById('searchResult');
		var len = data.Search.length;
		for(var i = 0; i < len; i++){
			var movieContainer = document.createElement('div');
			movieContainer.className = 'search-result--item';
			var titleEl = document.createElement('div');
			titleEl.innerText = data.Search[i].Title;
			var yearEl = document.createElement('div');
			yearEl.innerText = data.Search[i].Year;
			var typeEl = document.createElement('div');
			typeEl.innerText = data.Search[i].Type;
			var posterEl = document.createElement('img');
			posterEl.src = data.Search[i].Poster;
			movieContainer.appendChild(posterEl);
			movieContainer.appendChild(titleEl);
			movieContainer.appendChild(yearEl);
			movieContainer.appendChild(typeEl);
			searchEl.appendChild(movieContainer);
		}
	});

});