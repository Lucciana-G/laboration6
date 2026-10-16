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
searchButton.addEventListener("click", (event)=> {
    event.preventDefault();
    const searchText = inputEl.value.trim();

    //Rensa tidigare felmeddelande
    errorP.textContent ="";

    //Validera om fältet är fylld
    if(searchText === ""){
        errorP.textContent= "Du måste skriva in en sökfras!";
        return;
    }
})

