import { database } from './database.js';

import express from 'express';
import logger from 'morgan';
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use('/', express.static('client'));

app.post('/saveworkouts', async (req, res) => {
    try{
        console.log(req.body);
        const { exercise, duration, intensity } = req.body;
        if (!exercise || !duration || !intensity) {
            return res.status(400).json({ error: 'Invalid Excercise, Duration, or Intensity' });
        }
        await database.saveWorkout(exercise, duration, intensity);
        res.status(200).json({status: 'success'});
    } catch(error){
        console.error('Error saving workouts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getworkouts', async (req, res) => {
    try {
        const allWorkouts = await database.getAllWorkouts();
        res.status(200).json(allWorkouts);
    } catch (error) {
      console.error('Error getting workouts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/deleteworkout/:id', async (req, res) => {
    try {
        const workoutId = req.params.id;
        await database.deleteWorkout(workoutId);
        res.status(200).json({ status: 'success' });
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.all('*', async (request, response) => {
    response.status(404).send(`Not found: ${request.path}`);
});

app.listen(port, () => {
    console.log("running");
});