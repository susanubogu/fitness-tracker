import { workouts } from "./script.js";

let button = document.getElementById('submit');
let excercise = document.getElementById('name');
let eduration = document.getElementById('duration');
let eintensity = document.getElementById('intensity');
let workoutList = document.getElementById('workoutList');
const deleteButton = document.createElement('delete-button');

// function renderWorkout(workout, index) {
//     const workoutItem = document.createElement('li');
//     workoutItem.textContent = `${workout.exercise} - ${workout.duration} minutes (${workout.intensity})`;

//     // Add a delete button with a data-index attribute to identify the workout index
//     const deleteButton = document.createElement('button');
//     deleteButton.textContent = 'Delete';
//     deleteButton.classList.add('delete-button');
//     deleteButton.dataset.index = index;

//     // Append the delete button to the workout item
//     workoutItem.appendChild(deleteButton);

//     workoutList.appendChild(workoutItem);
// }

button.addEventListener('click', async () => {
    console.log(excercise.value);
    console.log(parseInt(eduration.value));
    console.log(eintensity.value);
    await workouts.saveWorkouts(excercise.value, parseInt(eduration.value), eintensity.value);
    workouts.updateWorkoutList();
});

//delete
workoutList.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-button')) {
        const index = event.target.dataset.index;
        await workouts.deleteWorkout(index);
    }
});

deleteButton.addEventListener('click', async () => {
    const index = event.target.dataset.index;
    await workouts.deleteWorkout(index);
    workouts.updateWorkoutList();
});

workouts.getWorkout(); // Fetch initial workout data when the page loads
workouts.updateWorkoutList(); // Update workout list synchronously after fetching initial data