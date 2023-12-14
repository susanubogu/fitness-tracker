class script{
    
    constructor(){
        this.workouts = [];
        this.workoutList = document.getElementById('workoutList');
    }

    async saveWorkouts(exercise, duration, intensity){
        try{
            console.log('Sending data:', { exercise, duration, intensity });
            const response = await fetch('http://localhost:3000/saveworkouts',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exercise, duration, intensity }),
            });
        if(!response.ok){
            throw new Error('Failed to save workout to the server');
        }
        this.getWorkout();
        } catch(error){
            console.error('Error logging workout', error);
        }
    }

    async getWorkout(){
        try {
            const response = await fetch('http://localhost:3000/getworkouts',{
            method: 'GET'});
            if(!response.ok){
                throw new Error('Failed to get workouts');
            }

            this.workouts = await response.json();
            this.updateWorkoutList();

        } catch (error) {
            console.error('Error getting workouts from the server', error);
        }
    }

    async deleteWorkout(index) {
        try {
            const workoutToDelete = this.workouts[index];
    
            console.log('Deleting workout:', workoutToDelete);
    
            const response = await fetch(`http://localhost:3000/deleteworkout/${workoutToDelete._id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete workout on the server');
            }
    
            this.workouts.splice(index, 1);
            this.updateWorkoutList();
        } catch (error) {
            console.error('Error deleting workout:', error);
        }
    }

    async editWorkout(workout) {
        const editModal = document.getElementById('editModal');
        const editExerciseInput = document.getElementById('editExercise');
        const editDurationInput = document.getElementById('editDuration');
        const editIntensityInput = document.getElementById('editIntensity');
        const saveEditButton = document.getElementById('saveEdit');
    
        if (editExerciseInput && editDurationInput && editIntensityInput && saveEditButton) {
            editExerciseInput.value = workout.exercise;
            editDurationInput.value = workout.duration;
            editIntensityInput.value = workout.intensity;
    
            editModal.style.display = 'block';
    
            saveEditButton.onclick = async () => {
                workout.exercise = editExerciseInput.value;
                workout.duration = editDurationInput.value;
                workout.intensity = editIntensityInput.value;
    
                await this.saveWorkouts(workout.exercise, workout.duration, workout.intensity);
                editModal.style.display = 'none';
            };
        } else {
            console.error('One or more edit modal elements not found');
        }
    }

    updateWorkoutList() {
        const workoutList = document.getElementById('workoutList');
        workoutList.innerHTML = ''; // Clear the current list
    
        this.workouts.forEach((workout) => {
            const workoutItem = document.createElement('li');
            workoutItem.textContent = `${workout.exercise} - ${workout.duration} minutes (${workout.intensity})`;
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.dataset.index = this.workouts.indexOf(workout);
            deleteButton.addEventListener('click', () => this.deleteWorkout(workout._id));
    
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.classList.add('edit-button');
            editButton.addEventListener('click', () => this.editWorkout(workout));
    
            workoutItem.appendChild(deleteButton);
            workoutItem.appendChild(editButton);
            workoutList.appendChild(workoutItem);
        });
    }

}

export const workouts = new script();