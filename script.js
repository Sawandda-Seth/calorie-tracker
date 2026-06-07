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

/**
 * Calculate total calories
 */
function calculateTotalCalories() {
    const total = foods.reduce(
        (sum, food) => sum + Number(food.calories),
        0
    );

    totalCaloriesElement.textContent = total;
}

/**
 * Display foods
 */
function displayFoods() {

    foodList.innerHTML = "";

    foods.forEach((food, index) => {

        const li = document.createElement("li");

        li.className =
            "flex justify-between items-center border-b py-3";

        li.innerHTML = `
            <span>
                ${food.name} -
                ${food.calories} Calories
            </span>

            <button
                onclick="removeFood(${index})"
                class="bg-red-500 text-white px-2 py-1 rounded">
                Delete
            </button>
        `;

        foodList.appendChild(li);
    });

    calculateTotalCalories();
}

/**
 * Add food item
 */
foodForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const name =
        document.getElementById("foodName").value;

    const calories =
        document.getElementById("foodCalories").value;

    foods.push({
        name,
        calories
    });

    saveFoods();
    displayFoods();

    foodForm.reset();
});

/**
 * Remove food item
 */
function removeFood(index) {

    foods.splice(index, 1);

    saveFoods();
    displayFoods();
}

/**
 * Reset all foods
 */
resetBtn.addEventListener("click", () => {

    foods = [];

    saveFoods();
    displayFoods();
});

/**
 * Fetch calorie data
 */
async function fetchFoodData() {

    try {

        const response =
            await fetch("calorie.json");

        const data =
            await response.json();

        data.forEach(food => {

            const button =
                document.createElement("button");

            button.className =
                "bg-blue-500 text-white px-3 py-2 rounded mr-2 mb-2";

            button.textContent =
                `${food.name} (${food.calories})`;

            button.addEventListener("click", () => {

                foods.push({
                    name: food.name,
                    calories: food.calories
                });

                saveFoods();
                displayFoods();
            });

            suggestions.appendChild(button);
        });

    } catch (error) {

        console.error(error);

        suggestions.innerHTML =
            "<p class='text-red-500'>Unable to load food data.</p>";
    }
}

displayFoods();
fetchFoodData();