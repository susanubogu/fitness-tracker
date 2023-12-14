import { MongoClient, ObjectId } from "mongodb";

class Database{
    constructor(){
        this.url = 'mongodb+srv://subogu:test123@courseplanner.kp6wpnr.mongodb.net/?retryWrites=true&w=majority'
    }

    async saveWorkout(exercise, duration, intensity){
        const client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });

        try{
            await client.connect();
            const database = client.db('fitness-tracker');
            const collection = database.collection('workouts');
            await collection.insertOne({ exercise, duration, intensity });
        }
        finally{
            await client.close();
        }
    }

    async getAllWorkouts(){
        const client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
        try{
            await client.connect();
            const database = client.db('fitness-tracker');
            const collection = database.collection('workouts');
            return await collection.find().toArray(); 
        } 
        finally{
            await client.close();
        }
    }

    async deleteWorkout(workoutId) {
        const client = new MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
        try {
            await client.connect();
            const database = client.db('fitness-tracker');
            const collection = database.collection('workouts');
            await collection.deleteOne({ _id: new ObjectId(workoutId) });
        } finally {
            await client.close();
        }
    }
}

const database = new Database();
export { database };