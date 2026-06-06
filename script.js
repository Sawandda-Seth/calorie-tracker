/**
 * Calorie Counter Application
 */

const foodForm = document.getElementById("foodForm");
const foodList = document.getElementById("foodList");
const totalCaloriesElement = document.getElementById("totalCalories");
const resetBtn = document.getElementById("resetBtn");
const suggestions = document.getElementById("foodSuggestions");

let foods = JSON.parse(localStorage.getItem("foods")) || [];

/**
 * Save food items
 */
function saveFoods() {
    localStorage.setItem("foods", JSON.stringify(foods));
}