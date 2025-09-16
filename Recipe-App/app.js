let searchBox = document.querySelector(".Search-box");
let searchBtn = document.querySelector(".submit");
let recipeContainer = document.querySelector(".recipe-container");
let recipeDetailsContent = document.querySelector(".recipe-details-content");
let closeBtn = document.querySelector(".recipe-close-btn");

const fetchRec = async (qery) => {
  recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${qery}`
    );
    const respose = await data.json();

    recipeContainer.innerHTML = "";
    respose.meals.forEach((meals) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
    <img src = "${meals.strMealThumb}">
    <h3>${meals.strMeal}</h3>
    <p><span>${meals.strArea} </span> Dish</p>
    <p>Belong to <span>${meals.strCategory}</span> Category</p>

    `;
      const button = document.createElement("button");
      button.textContent = "View Recipe";
      recipeDiv.appendChild(button);

      //Adding EventListener to recipe buttion
      button.addEventListener("click", () => {
        openRecipePop(meals);
      });

      recipeContainer.appendChild(recipeDiv);
    });
  } catch (error) {
    recipeContainer.innerHTML = "<h2>Error in fetching Recipes...</h2>";
  }
};

//Function to fetch ingredients ane measurements
const fetchIngredients = (meals) => {
  let ingredientsList = "";
  for (let i = 1; i <= 20; i++) {
    const ingredient = meals[`strIngredient${i}`];
    if (ingredient) {
      const measure = meals[`strMeasure${i}`];
      ingredientsList += `<li>${measure}${ingredient}</li>`;
    } else {
      break;
    }
  }
  return ingredientsList;
};

const openRecipePop = (meals) => {
  recipeDetailsContent.innerHTML = `
  <h2 class = "recipeName">${meals.strMeal}</h2>
  <h3>Ingredents:</h3>
  <ul class = "ingredientsList">${fetchIngredients(meals)}</ul>
  <div class = "recipeInstructions">
    <h3>instructions: </h3>
    <p>${meals.strInstructions}</p>
  </div>
  `;

  recipeDetailsContent.parentElement.style.display = "block";
};

closeBtn.addEventListener("click", () => {
  recipeDetailsContent.parentElement.style.display = "none";
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInp = searchBox.value.trim();

  if (!searchInp) {
    recipeContainer.innerHTML = `<h2>Please enter a valid input</h2>`;
    return;
  }
  fetchRec(searchInp);
});
