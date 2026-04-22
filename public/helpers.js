let favoriteMeals = JSON.parse(localStorage.getItem("favoriteMeals")) || [];


const populateCategoryDropdown = (categories) =>{
  const select = document.getElementById("categoryDropdown")

  for(const category of categories){
    let option = document.createElement("option")
    option.value = category.strCategory;
    option.text = category.strCategory
    select.appendChild(option)
  }
}
const getSelectedCategory = () => {
  const selectedCategory = document.getElementById("categoryDropdown").value;
  return selectedCategory;
};
const showBtns = () => {
  const btn = document.getElementById("favoriteBtn");
  btn.removeAttribute("hidden");
};

const clearCurrentMeal = () => {
  const recipePhotoDiv = document.getElementById("recipePhoto");
  const recipeTextDiv = document.getElementById("recipeText");
  recipePhotoDiv.innerHTML = "";
  recipeTextDiv.innerHTML = "";
};


const createRecipePhoto = (thumbUrl) => {
  const posterImg = document.createElement("img");
  posterImg.setAttribute("src", thumbUrl);
  posterImg.setAttribute("id", "recipePhoto");
  return posterImg;
};

const createRecipeTitle = (title) => {
  const titleHeader = document.createElement("h1");
  titleHeader.setAttribute("id", "recipeTitle");
  titleHeader.innerHTML = title;
  return titleHeader;
};

const createRecipeOverview = (instructions) => {
  const overviewParagraph = document.createElement("p");
  overviewParagraph.setAttribute("id", "recipeOverview");
  overviewParagraph.innerHTML = instructions;
  return overviewParagraph;
};


const getRandomMeal = (meals) => {
  const randomIndex = Math.floor(Math.random() * meals.length);
  return meals[randomIndex];
};

const displayMeal = (mealInfo) => {
  const recipePhotoDiv = document.getElementById("recipePhoto");
  const recipeTextDiv = document.getElementById("recipeText");
  const favoriteBtn = document.getElementById("favoriteBtn");

  const recipePhoto = createRecipePhoto(mealInfo.strMealThumb);
  const titleHeader = createRecipeTitle(mealInfo.strMeal);
  const overviewText = createRecipeOverview(mealInfo.strInstructions);

  const categoryArea = document.createElement("p");
  categoryArea.innerHTML = `<strong>Category:</strong> ${mealInfo.strCategory} | <strong>Cuisine:</strong> ${mealInfo.strArea}`;

  const ingredientList = document.createElement("ul");
  ingredientList.id = "ingredientList";
  ingredientList.innerHTML = "<strong>Ingredients:</strong>";

  for (let i = 1; i <= 20; i++) {
    const ingredient = mealInfo[`strIngredient${i}`];
    const measure = mealInfo[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = `${measure ? measure.trim() : ""} ${ingredient.trim()}`.trim();
      ingredientList.appendChild(li);
    }
  }

  recipePhotoDiv.appendChild(recipePhoto);
  recipeTextDiv.appendChild(titleHeader);
  recipeTextDiv.appendChild(categoryArea);
 const bottomSection = document.createElement("div");
bottomSection.id = "recipeBottom";

bottomSection.appendChild(ingredientList);
bottomSection.appendChild(overviewText);

recipeTextDiv.appendChild(bottomSection);

  showBtns();
  favoriteBtn.onclick = () => addToFavorites(mealInfo)
};

const updateFavoritesList = () => {
  const favoritesList = document.getElementById("favoritesList");
  favoritesList.innerHTML = "";

  favoriteMeals.forEach(meal => {
    const li = document.createElement("li");
    li.textContent = meal.strMeal;
    favoritesList.appendChild(li);
  });
};

const displaySearchResults = (results) => {
  const container = document.getElementById("searchResults");
  container.innerHTML = "";

  if (!results || results.length === 0) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("searchResult");
    div.innerHTML = `
      <h3>${item.strMeal}</h3>
      <p>Category: ${item.strCategory || "N/A"}</p>
    `;
    div.onclick = async () => {
      const mealDetails = await getMealInfo(item);
      displayMeal(mealDetails);
    };
    container.appendChild(div);
  });
};

const addToFavorites = (meal) => {
  favoriteMeals.push(meal);
  localStorage.setItem("favoriteMeals", JSON.stringify(favoriteMeals));
  updateFavoritesList();
};