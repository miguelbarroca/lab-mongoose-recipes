const mongoose = require('mongoose');
mongoose.set("strictQuery", true);
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones

  })
  .then(() => {
    //recipe()
    manyRecipes();
    deleteCarrotCake();
    //return mongoose.connection.close()

  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  
  const risotoRecipe = {
    title: "Bacon & Mushrooms Risoto",
    enum: ["Easy Peasy"],
    ingredients: ["Bacon", "Mushrooms"],
    cuisine: "Italian",
    dishType: "main course",
    image: "",
    duration: 30,
    creator: "Fabrizzio Giffi",
  };
  console.log(risotoRecipe.title)

  const recipe = async () => {
    try{
      const createRecipe = await Recipe.create(risotoRecipe);
      return createRecipe
    }
    catch(error){
      console.log(error)
    }
  }

  const manyRecipes = async () => {
    try{
      const recipeArray = await Recipe.insertMany(data)
      return recipeArray  
    }
    catch(error){
      console.log(`Error`, error);
    }
  }



  
  Recipe.find()
  .then((allrecipes) => {
    for(let i = 0; i < allrecipes.length; i++) {
      console.log("Recipe: " + allrecipes[i].title);
      console.log()
    }
    
  })
  .catch((error) => {
    console.log(error);
  });




  Recipe.findOneAndUpdate(
    {title: "Rigatoni alla Genovese"},
    {duration: 100},
    {new: true},
  )
  .then((updated) => {
        console.log("Nice, now you updated", updated);
  })
  .catch((error) => {
        console.log("There was an error", error);
  });
// SAME THING ASYNC WAIT
  // const updateRigatoni = async () => {
  //   try{
  //     const findPasta = await Recipe.findOneAndUpdate(
  //   {title: 'Rigatoni alla Genovese'},
  //   {duration: 100},
  //   {new: true})
  //   console.log('Nice it was a succes!')
  //   return findPasta;
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }

//! PROBABLY WRONG
  // const deleteCarrotCake = async () => {
  //   try{
  //     const deleteOneCarrot = await Recipe.deleteOne({title:"Carrot Cake"})
  //     console.log(`Cake was deleted`)
  //   }
  //   catch(error){
  //     console.log("No carrot Cake Found", (error))
  //   }
  // }
  