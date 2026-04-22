const mealKey = "1";
const mealBaseUrl = "https://www.themealdb.com/api/json/v1/1/";
const cookBtn = document.getElementById("cookBtn");


const getCategories = async () => {
const categoryEndpoint = "categories.php";
  //const requestParams = `?api_key=${mealKey}`
  const urlToFetch = `${mealBaseUrl}${categoryEndpoint}`;
  try{
      const response = await fetch(urlToFetch)
      if(response.ok == true){
        const jsonResponse = await response.json();
        categories = jsonResponse.categories
        return categories
        //console.log(jsonResponse)
      }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

//getGenres()
const getMeals = async () => {
  const selectedCategory = getSelectedCategory()
  var mealsEndpoint = "filter.php"
  var requestParams = `?c=${selectedCategory}`
  var urlToFetch = `${mealBaseUrl}${mealsEndpoint}${requestParams}`
  try {
      const response = await fetch(urlToFetch)
      if(response.ok){
          const jsonResponse = await response.json();
          const meals = jsonResponse.meals
         // console.log(jsonResponse)
         return meals
       //   console.log(movies)
      }
  } catch (error) {
      console.log(error)
  }
};


const getMealInfo = async (meal) => {
  const mealId = meal.idMeal
  //const requestParams = `?api_key=${mealKey}`;

  //const movieUrl = `${mealBaseUrl}movie/${movieId}${requestParams}`;
  const urlToFetch = `${mealBaseUrl}lookup.php?i=${mealId}`

  try {
    // Fetch movie details
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const mealInfo = jsonResponse.meals[0];
      return mealInfo;
    }


  } catch (error) {
    console.error("Error fetching movie info:", error);
    return null;
  }
};
const showRandomMeal = async () => {
  const mealInfo = document.getElementById("recipeInfo");
  if (mealInfo && mealInfo.childNodes.length > 0) {
    clearCurrentMeal();
  }
  const meals = await getMeals();
  const randomMeal = getRandomMeal(meals);
  let info = await getMealInfo(randomMeal);
  displayMeal(info);
};


const searchMeals = async (query) => {
  const endpoint = `search.php`;
  const params = `?s=${encodeURIComponent(query)}`;
  const url = `${mealBaseUrl}${endpoint}${params}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      return json.meals;
    }
  } catch (error) {
    console.error("Meal search error:", error);
  }
  document.getElementById("searchBtn").onclick = async () => {
  const query = document.getElementById("searchInput").value;
  const results = await searchMeals(query);
  displaySearchResults(results);
};
};

getCategories().then(populateCategoryDropdown)
cookBtn.onclick = showRandomMeal

updateFavoritesList()