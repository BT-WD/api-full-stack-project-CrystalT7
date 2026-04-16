const tmdbKey = "175ade703b8d878249323b60ef3eeffe";
const tmdbBaseUrl = "https://api.themoviedb.org/3/";
const cookBtn = document.getElementById("cookBtn");


const getGenres = async () => {
const genreRequestEndpoint = "genre/movie/list"
  const requestParams = `?api_key=${tmdbKey}`
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try{
      const response = await fetch(urlToFetch)
      if(response.ok == true){
        const jsonResponse = await response.json();
        genres = jsonResponse.genres
        return genres
        //console.log(jsonResponse)
      }
  } catch (error) {
    console.error("Error fetching genres:", error);
  }
};

//getGenres()
const getMovies = async () => {
  const selectedGenre = getSelectedGenre()
  var discoverMovieEndpoint = `discover/movie`
  var requestParams = `?api_key=${tmdbKey}&?with_genres${selectedGenre}`
  var urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`
  try {
      const response = await fetch(urlToFetch)
      if(response.ok){
          const jsonResponse = await response.json();
          const movies = jsonResponse.results
         // console.log(jsonResponse)
         return movies
       //   console.log(movies)
      }
  } catch (error) {
      console.log(error)
  }
};


const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const requestParams = `?api_key=${tmdbKey}`;

  const movieUrl = `${tmdbBaseUrl}movie/${movieId}${requestParams}`;
  const creditsUrl = `${tmdbBaseUrl}movie/${movieId}/credits${requestParams}`;

  try {
    // Fetch movie details
    const movieResponse = await fetch(movieUrl);
    if (!movieResponse.ok) throw new Error("Movie details failed");
    const movieInfo = await movieResponse.json();

    // Fetch credits
    const creditsResponse = await fetch(creditsUrl);
    if (!creditsResponse.ok) throw new Error("Credits failed");
    const creditsJson = await creditsResponse.json();

    // Extract cast
    movieInfo.cast = creditsJson.cast.slice(0, 5);

    // Extract crew roles
    movieInfo.directors = creditsJson.crew.filter(c => c.job === "Director");
    movieInfo.writers = creditsJson.crew.filter(c => c.job === "Writer" || c.department === "Writing");
    movieInfo.producers = creditsJson.crew.filter(c => c.job === "Producer");

    return movieInfo;

  } catch (error) {
    console.error("Error fetching movie info:", error);
    return null;
  }
};
const showRandomMovie = async () => {
  const movieInfo = document.getElementById("movieInfo");
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movies = await getMovies()
  randomMovie = getRandomMovie(movies)
  info = await getMovieInfo(randomMovie)
  displayMovie(info)

};

const searchMovies = async (query) => {
  const endpoint = `search/movie`;
  const params = `?api_key=${tmdbKey}&query=${encodeURIComponent(query)}`;
  const url = `${tmdbBaseUrl}${endpoint}${params}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      return json.results;
    }
  } catch (error) {
    console.error("Movie search error:", error);
  }
};

const searchPeople = async (query) => {
  const endpoint = `search/person`;
  const params = `?api_key=${tmdbKey}&query=${encodeURIComponent(query)}`;
  const url = `${tmdbBaseUrl}${endpoint}${params}`;

  try {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      return json.results;
    }
  } catch (error) {
    console.error("People search error:", error);
  }
};
getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
