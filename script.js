// 🔑 Paste Your API Key
const API_KEY = "6d0a6328bd2542d1a8ecc7d5a5ace28e";

// Favorites Array
let favorites = [];

// 🌙 Theme Toggle
const toggleBtn = document.getElementById("themeToggle");

toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        toggleBtn.innerHTML = "☀️";
    }
    else{
        toggleBtn.innerHTML = "🌙";
    }

});

// 🔍 Get Recipes
async function getRecipes() {

    const query = document.getElementById("searchInput").value;

    if(query === ""){
        alert("Please enter ingredients");
        return;
    }

    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=6&apiKey=${API_KEY}`;

    try{

        const res = await fetch(url);

        const data = await res.json();

        displayRecipes(data.results);

    }
    catch(error){

        console.log(error);

        alert("Something went wrong!");

    }
}

// 🎯 Display Recipes
function displayRecipes(recipes){

    const results = document.getElementById("results");

    results.innerHTML = "";

    recipes.forEach(recipe => {

        const div = document.createElement("div");

        div.classList.add("card");

        div.innerHTML = `
            <img src="${recipe.image}">
            <h3>${recipe.title}</h3>

            <button class="favorite-btn">
                ❤️ Add Favorite
            </button>
        `;

        // Open Details
        div.querySelector("img").onclick = () => getRecipeDetails(recipe.id);

        div.querySelector("h3").onclick = () => getRecipeDetails(recipe.id);

        // Add Favorite
        div.querySelector(".favorite-btn").onclick = () => addToFavorites(recipe);

        results.appendChild(div);

    });

}

// ❤️ Add Favorite
function addToFavorites(recipe){

    const exists = favorites.find(item => item.id === recipe.id);

    if(exists){
        alert("Already Added!");
        return;
    }

    favorites.push(recipe);

    displayFavorites();

}

// ❤️ Display Favorites
// ❤️ Display Favorites
// ❤️ Display Favorites
function displayFavorites(){

    const favoritesContainer =
        document.getElementById("favorites");

    favoritesContainer.innerHTML = `

        <button class="home-btn" onclick="goHome()">
            ← Back To Home
        </button>

    `;

    favorites.forEach(recipe => {

        const div = document.createElement("div");

        div.classList.add("card");

        div.innerHTML = `

            <img src="${recipe.image}">

            <h3>${recipe.title}</h3>

            <button class="remove-btn">
                ❌ Remove
            </button>

        `;

        // Open Recipe
        div.querySelector("img").onclick =
            () => getRecipeDetails(recipe.id);

        div.querySelector("h3").onclick =
            () => getRecipeDetails(recipe.id);

        // Remove Favorite
        div.querySelector(".remove-btn").onclick =
            () => removeFavorite(recipe.id);

        favoritesContainer.appendChild(div);

    });

}

// ❌ Remove Favorite
function removeFavorite(id){

    favorites = favorites.filter(recipe => recipe.id !== id);

    displayFavorites();

}

// 🍳 Get Recipe Details
async function getRecipeDetails(id){

    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

    try{

        const res = await fetch(url);

        const recipe = await res.json();

        showRecipePopup(recipe);

    }
    catch(error){

        console.log(error);

    }

}

// 📦 Show Popup
// 📦 Show Popup
function showRecipePopup(recipe){

    const ingredients = recipe.extendedIngredients
        .map(item => `<li>${item.original}</li>`)
        .join("");

    // 🔥 YouTube Search Link
    const youtubeLink =
        `https://www.youtube.com/results?search_query=${recipe.title}+recipe`;

    const popup = document.createElement("div");

    popup.classList.add("popup");

    popup.innerHTML = `

        <div class="popup-content">

            <!-- Back Button -->
            <button class="back-btn" onclick="closePopup()">
                ← Back
            </button>

            <!-- Close -->
            <span class="close-btn" onclick="closePopup()">
                &times;
            </span>

            <img src="${recipe.image}" class="popup-img">

            <h2>${recipe.title}</h2>

            <p><b>⏱ Ready In:</b> ${recipe.readyInMinutes} Minutes</p>

            <h3>🧂 Ingredients</h3>

            <ul>
                ${ingredients}
            </ul>

            <h3>👨‍🍳 How To Cook</h3>

            <p>
                ${recipe.instructions || "No instructions available"}
            </p>

            <!-- YouTube Video -->
            <a href="${youtubeLink}" target="_blank">

                <button class="youtube-btn">
                    ▶ Watch Recipe Video
                </button>

            </a>

        </div>

    `;

    document.body.appendChild(popup);

}

// ❌ Close Popup
function closePopup(){

    const popup = document.querySelector(".popup");

    if(popup){
        popup.remove();
    }

}

// ❤️ Open Favorites Page
document.getElementById("viewFavoritesBtn")
.addEventListener("click", () => {

    document.getElementById("results").style.display = "none";

    document.getElementById("favoritesSection").style.display =
        "block";

});

// 🏠 Back To Home
function goHome(){

    document.getElementById("results").style.display = "grid";

    document.getElementById("favoritesSection").style.display =
        "none";

}