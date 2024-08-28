// Entry point of the application
// - Sets up the Express server
// - Connects to the database
// - Configures middlewares and routes
// - Starts listening on the specified port

import dotenv from 'dotenv'; 
dotenv.config(); // Load environment variables from .env file
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import shoppingRoutes from './routes/shoppingRoutes.js';
import mealRoutes from './routes/mealRoutes.js';
import nutritionRoutes from './routes/nutritionRoutes.js';

const port = process.env.PORT || 3000;

const app = express()

app.use(express.json())

app.use(cors({
    origin: '*', 
    credentials: true // Enable credentials
  }));

// Routes
app.use('/api/user', userRoutes); 
app.use('/api/recipe', recipeRoutes); 
app.use('/api/shopping', shoppingRoutes); 
app.use('/api/meal', mealRoutes); 
app.use('/api/nutrition', nutritionRoutes); 


app.listen(port, async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log(`Nutri+ app listening on port ${port}!`);
    } catch (e) {
      console.log(e);
    }
  });
  