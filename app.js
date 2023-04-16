


  const form = document.getElementById("form");
  const genreSelect = document.getElementById("genre");
  const ratingSelect = document.getElementById("rating");
  const yearSelect = document.getElementById("year");
  const recommendedResults = document.getElementById("recommendation");



  form.addEventListener("submit", e => {
    e.preventDefault();
    const genre = genreSelect.value;
    const rating = ratingSelect.value;
    const year = yearSelect.value;

    fetch("data.json")
      .then(response => response.json())
      .then(data => {
        const filteredMovies = getFilteredMovies(data, genre, rating, year);
        displayMovies(filteredMovies);
      });
  });





  function getFilteredMovies(movies, genre, rating, year) {
    // console.log("genre: " + genre + ", rating: " + rating + ", year: " + year);
    var filteredMovies = movies;

    if (genre && genre !== "All") {
      filteredMovies = filteredMovies.filter(function(movie) {
        return movie.genres.includes(genre);
      });
    }
    
    if (rating && rating !== "All") {
      filteredMovies = filteredMovies.filter(function(movie) {
        return movie.vote_average >= parseFloat(rating);
      });
    }
    
    if (year && year !== "All") {
      filteredMovies = filteredMovies.filter(function(movie) {
        return movie.release_date.includes(year);
      });
    }

    // console.log(filteredMovies)
    return filteredMovies;
  }




function displayMovies(movies) {
  const recommendedResults = document.querySelector("#recommendation");
  recommendedResults.innerHTML = "";

  if (movies.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No movies found.";
    recommendedResults.appendChild(message);
  }
  else {
    const table = document.createElement("table");
    table.classList.add("movie-table");

    // Creating table header for results
    const tableHeader = document.createElement("thead");
    const tableHeaderRow = document.createElement("tr");

    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Movie Name";
    tableHeaderRow.appendChild(nameHeader);

    const genreHeader = document.createElement("th");
    genreHeader.textContent = "Genre";
    tableHeaderRow.appendChild(genreHeader);

    const ratingHeader = document.createElement("th");
    ratingHeader.textContent = "Rating";
    tableHeaderRow.appendChild(ratingHeader);

    const yearHeader = document.createElement("th");
    yearHeader.textContent = "Year";
    tableHeaderRow.appendChild(yearHeader);

    tableHeader.appendChild(tableHeaderRow);
    table.appendChild(tableHeader);

    // Creating table body for results
    const tableBody = document.createElement("tbody");
    
    movies.forEach(movie => {
      const tableRow = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = movie.title;
      const movieYear = document.createElement("p");
      tableRow.appendChild(nameCell);

      const genreCell = document.createElement("td");
      genreCell.textContent = Array.isArray(movie.genres) ? movie.genres.join(", ") : movie.genres;
      tableRow.appendChild(genreCell);

      const ratingCell = document.createElement("td");
      ratingCell.textContent = movie.vote_average;
      tableRow.appendChild(ratingCell);

      const yearCell = document.createElement("td");
      yearCell.textContent = movie.release_date.split("-")[0];
      tableRow.appendChild(yearCell);

      tableBody.appendChild(tableRow);

    });

    table.appendChild(tableBody);
    recommendedResults.appendChild(table);
  }
}



