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
function validateInput(event){
    event.preventDefault();

    const searchText = inputEl.value.trim();

    //Rensa tidigare felmeddelande
    errorP.textContent ="";

    //Validera om fältet är fylld
    if(searchText === ""){
        errorP.textContent= "Du måste skriva in en sökfras!";
        return;//avbryter, inget API:anrop görs
    }

    //Här är sökning giltigt
    searchAPI(searchText);
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
        console.log(data);
        return data.resipes[0];

    }catch(error){
        //om något går fel
        console.error ="Något gick fel, testa igen senare!";
    }


}

//Funktion som skriver ut receptet i DOM
async function showRecipe(event){
    event.preventDefault(); //stoppa sidomladning

    const data = await searchAPI(inputEl.value);
    console.log(data);

    //Rensa tidigare felmeddelande
    apiMessage.innerHTML ="";

    if(!data || data.resipes.lenght === 0 ){
        apiMessage.innerHTML = `Receptet hittades inte, prova en annan sökfras!`;
        return;
    }

    data.recipes.forEach(recipes => { 
    
    //Skapar en li för varje ingrediens och varje instuktion
    const ingredients =recipes.ingredients.map((item) => `<li>${item}</li>`).join("");
    const instructions =recipes.instructions.map((step) => `<li>${step}</li>`).join("");
        
    //Ersätter tidigare recept med den nya
    recipeSection.innerHTML =`

    <article>
    <h3>${recipes.name}</h3>
    <img src="${recipes.image}" alt="${recipes.name}">
    <div class="recipe-info">
    <p><strong>Servings: </strong> ${recipes.servings}.</p>
    <p><strong>Prep time: </strong> ${recipes.prepTimeMinutes} minutes.</p>
    <p><strong>Cooking time: </strong> ${recipes.cookTimeMinutes} minutes.</p>
    <p><strong>Difficulty: </strong> ${recipes.difficulty}.</p>
    </div>

    <h4>Ingredients:</h4>
    <ul>${ingredients}</ul>

    <h4>Instructions:</h4>
    <ol>${instructions}</ol>
    </article>`;
        
    });

}


//Eventlysnare
form.addEventListener("submit", showRecipe );




