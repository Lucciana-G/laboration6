"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Lucciana Ghazoul
 */


//Hämta element från DOM
const form = document.querySelector("#searchform");
const inputEl = document.querySelector("#search");
const searchButton = document.querySelector("#searchbutton");
const errorP = document.querySelector("#error");
const apiMessage = document.querySelector("#message");
const recipeSection = document.querySelector("#recipe");


//funktion som validerar input 
function validateInput(){

    const searchText = inputEl.value.trim();

    //Rensa tidigare felmeddelande
    errorP.textContent ="";

    //Validera om fältet är fylld
    if(searchText === ""){
        errorP.textContent= "Du måste skriva in en sökfras!";
        return null;//avbryter, inget API:anrop görs
    }

    return searchText;
}


//Funtion som anropar API:t
async function searchAPI(searchText){
     try{
        //Skickar förfrågan till API:et.
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchText}`);

        if(!response.ok){
            throw new Error("Något gick fel !");
        }
        //Gör iom svaret från API:t till ett javaScript
        const data = await response.json();
        return data;

    }catch(error){
        //om något går fel
        console.error =("Något gick fel, testa igen senare!", error);
        return null;
    }


}

//Funktion som skriver ut receptet i DOM
async function showRecipe(event){
    event.preventDefault(); //stoppa sidomladning

    const searchText = validateInput();
    //avbryt om valideringen misslyckades
    if(!searchText) return;

    const data = await searchAPI(searchText);

    //Rensa tidigare felmeddelande
    apiMessage.textContent ="";
    recipeSection.innerHTML ="";

    if(!data || data.recipes.length === 0 ){
        apiMessage.textContent = "Receptet hittades inte, prova en annan sökfras!";
        return;
    }
    
    //Plocka bara ut det första receptet
    const recipe = data.recipes[0];
    console.log(data);

    //Skapar en li för varje ingrediens och varje instuktion
    const ingredients =recipe.ingredients.map((item) => `<li>${item}</li>`).join("");
    const instructions =recipe.instructions.map((step) => `<li>${step}</li>`).join("");
        
    //Ersätter tidigare recept med den nya
    recipeSection.innerHTML =`
    <article>
    <h3>${recipe.name}</h3>
    <img src="${recipe.image}" alt="${recipe.name}">
    <div class="recipe-info">
    <p><strong>Servings: </strong> ${recipe.servings}.</p>
    <p><strong>Prep time: </strong> ${recipe.prepTimeMinutes} minutes.</p>
    <p><strong>Cooking time: </strong> ${recipe.cookTimeMinutes} minutes.</p>
    <p><strong>Difficulty: </strong> ${recipe.difficulty}.</p>
    </div>

    <h4>Ingredients:</h4>
    <ul>${ingredients}</ul>

    <h4>Instructions:</h4>
    <ol>${instructions}</ol>
    </article>`;


}

//Eventlysnare
form.addEventListener("submit", showRecipe);




