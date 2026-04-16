let likedMovies = []
let dislikedMovies = [];

const populateGenreDropdown = (genres) => {
  const select = document.getElementById("genres");

  for (const genre of genres) {
    let option = document.createElement("option");
    option.value = genre.id;
    option.text = genre.name;
    select.appendChild(option);
  }
};

const getSelectedGenre = () => {
  const selectedGenre = document.getElementById("genres").value;
  return selectedGenre;
};

const showBtns = () => {
  const btnDiv = document.getElementById("likeOrDislikeBtns");
  btnDiv.removeAttribute("hidden");
};

const clearCurrentMovie = () => {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  moviePosterDiv.innerHTML = "";
  movieTextDiv.innerHTML = "";
};

const likeMovie = () => {
  likedMovies.push(info); // "info" is the current movie object
  console.log("Liked Movies:", likedMovies);
  updateMovieLists();
  clearCurrentMovie();
  showRandomMovie();
};

const dislikeMovie = () => {
  dislikedMovies.push(info);
  console.log("Disliked Movies:", dislikedMovies);
  updateMovieLists();
  clearCurrentMovie();
  showRandomMovie();
};

const createMoviePoster = (posterPath) => {
  const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;

  const posterImg = document.createElement("img");
  posterImg.setAttribute("src", moviePosterUrl);
  posterImg.setAttribute("id", "moviePoster");
  return posterImg;
};

const createMovieTitle = (title) => {
  const titleHeader = document.createElement("h1");
  titleHeader.setAttribute("id", "movieTitle");
  titleHeader.innerHTML = title;

  return titleHeader;
};

const createMovieOverview = (overview) => {
  const overviewParagraph = document.createElement("p");
  overviewParagraph.setAttribute("id", "movieOverview");
  overviewParagraph.innerHTML = overview;

  return overviewParagraph;
};

const getRandomMovie = (movies) => {
  const randomIndex = Math.floor(Math.random() * movies.length);
  const randomMovie = movies[randomIndex];
  return randomMovie;
};

const displayMovie = (movieInfo) => {
  const moviePosterDiv = document.getElementById("moviePoster");
  const movieTextDiv = document.getElementById("movieText");
  const likeBtn = document.getElementById("likeBtn");
  const dislikeBtn = document.getElementById("dislikeBtn");

  const moviePoster = createMoviePoster(movieInfo.poster_path);
  const titleHeader = createMovieTitle(movieInfo.title);
  const overviewText = createMovieOverview(movieInfo.overview);


  const releaseDate = document.createElement("p");
  releaseDate.id = "movieReleaseDate";
  releaseDate.innerHTML = `<strong>Release Date:</strong> ${movieInfo.release_date}`;


    const castList = document.createElement("ul");
  castList.id = "movieCast";
  castList.innerHTML = "<strong>Cast:</strong>";
  
  movieInfo.cast.forEach(actor => {
    const li = document.createElement("li");
    li.textContent = actor.name;
    castList.appendChild(li);
  });
  
  moviePosterDiv.appendChild(moviePoster);
  movieTextDiv.appendChild(titleHeader);
  movieTextDiv.appendChild(releaseDate);
  movieTextDiv.appendChild(overviewText);

  // Director(s)
  const directorSection = document.createElement("p");
  directorSection.innerHTML = `<strong>Director:</strong> ${
    movieInfo.directors.length > 0
      ? movieInfo.directors.map(d => d.name).join(", ")
      : "N/A"
  }`;
  movieTextDiv.appendChild(directorSection);

  // Writer(s)
  const writerSection = document.createElement("p");
  writerSection.innerHTML = `<strong>Writer(s):</strong> ${
    movieInfo.writers.length > 0
      ? movieInfo.writers.map(w => w.name).join(", ")
      : "N/A"
  }`;
  movieTextDiv.appendChild(writerSection);

  // Producer(s)
  const producerSection = document.createElement("p");
  producerSection.innerHTML = `<strong>Producer(s):</strong> ${
    movieInfo.producers.length > 0
      ? movieInfo.producers.map(p => p.name).join(", ")
      : "N/A"
  }`;
  movieTextDiv.appendChild(producerSection);
  movieTextDiv.appendChild(castList);





  showBtns();
  likeBtn.onclick = likeMovie;
  dislikeBtn.onclick = dislikeMovie;
};


const updateMovieLists = () => {
  const likedList = document.getElementById("likedList");
  const dislikedList = document.getElementById("dislikedList");

  likedList.innerHTML = "";
  dislikedList.innerHTML = "";

  likedMovies.forEach(movie => {
    const li = document.createElement("li");
    li.textContent = movie.title;
    likedList.appendChild(li);
  });

  dislikedMovies.forEach(movie => {
    const li = document.createElement("li");
    li.textContent = movie.title;
    dislikedList.appendChild(li);
  });
  const displaySearchResults = (results, type) => {
  const container = document.getElementById("searchResults");
  container.innerHTML = "";

  if (results.length === 0) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("searchResult");

    if (type === "movie") {
      div.innerHTML = `
        <h3>${item.title}</h3>
        <p>Release: ${item.release_date || "N/A"}</p>
      `;
      div.onclick = async () => {
        const info = await getMovieInfo(item);
        displayMovie(info);
      };
    }

    if (type === "person") {
      div.innerHTML = `
        <h3>${item.name}</h3>
        <p>Known for: ${item.known_for_department}</p>
      `;
    }

    container.appendChild(div);
  });
};
};
