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

    //Anropar funktionen om koden ovanför har godkänts
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
        return data.resipes[0];

        //Visa resultat
    }catch(error){
        //om något går fel
        apiMessage.textContent ="Inget recept med detta namn, testa igen!";
    }
}

//Funktion som skriver ut receptet i DOM
async function showRecipe(recipe){

}

//Eventlysnare till validering
searchButton.addEventListener("click", validateInput );



