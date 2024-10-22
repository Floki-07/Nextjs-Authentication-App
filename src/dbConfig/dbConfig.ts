import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('error', (err) => {
            console.log('Mongo Connection error');

        })
        connection.on('connected', (err) => {
            console.log('Mongodb Connected');
        })
    } catch (error) {
        console.log('Something went wrong');

    }
} 