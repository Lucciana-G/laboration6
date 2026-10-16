"use strict";
/*
 * Laboration 6 - Receptsökaren
 * Namn: Lucciana Ghazoul
 */


//Hämta element från DOM
const form = document.querySelector("#searchForm");
const inputEl = document.querySelector("#search");
const searchButton = document.querySelector("#searchbutton");
const errorP = document.querySelector("#error");
const apiMessage = document.querySelector("#message");
const recipeSection = document.querySelector("#recipe");


//funktion som validerar input 
function validateInput(event){
    event.preventDefault();

    const searchText = inputEl.value.trim();

    //Rensa tidigare felmeddelande
    errorP.textContent ="";

    //Validera om fältet är fylld
    if(searchText === ""){
        errorP.textContent= "Du måste skriva in en sökfras!";
        return;
    }
   //Anropar om koden övanför är giltigt
   searchAPI(searchText);
}

//Funtion som anropar API:t
async function searchAPI(searchText){
    try{
        //Skickar förfrågan till API:et.
        const response = await fetch(`https://dummyjson.com/recipes/search?q=${searchText}`);
        //Gör om svaret från API:t till ett javaScript
        const data = await response.json(); 
        //Rensa tidigare meddelande och information
        apiMessage.innerHTML="";

        //kontrollera att svaret är giltigt
        if(!data.recipe || data.recepe.lenght === 0){
           apiMessage.textContent = "Inget recept kunde hittas. Prova en annan sökfras!";
           return;
        }
        console.log(data);
        const recipe = data.resipes[0]; //Hämta första recipe

        showRecipe(recipe);

    }catch(error){
        //om något går fel
        console.error("Något har hänt fel!");
        errorP.textContent = "Något gick fel!";
    }


}

//Funktion som skriver ut receptet i DOM
async function showRecipe(recipe){
    
    //Skapar en li för varje ingrediens och varje instuktion
    const ingredients =recipe.ingredients.map((item) => `<li>${item}</li>`).join("");
    const instructions =recipe.instructions.map((step) => `<li>${step}</li>`).join("");
    
    //Ersätter tidigare recept med den nya
    recipeSection.innerHTML=`
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

//Körs när formuläret skickas



//Eventlysnare till validering
searchButton.addEventListener("click", validateInput );



