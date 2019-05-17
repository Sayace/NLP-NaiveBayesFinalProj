//Implementation of a Naive Bayes classifier
//Categories for Recipes include vegan, vegetarian, paleo, and pescetarian diets
const bayes = require('bayes')
const fs = require('fs')
const pescatarian = require('./pescatarian-recipes.json')
const paleo = require('./paleo-recipes.json')
const vegetarian = require('./vegetarian-recipes.json')
const vegan = require('./vegan-recipes.json')
const testData = require('./test-recipes.json')
const classifier = bayes()

//train data based on ingredients from training data
const pescatarianRecipes = pescatarian.recipes
pescatarianRecipes.forEach((recipe) => {
  classifier.learn(recipe.ingredients.join(), 'pescatarian')
})
const paleoRecipes = paleo.recipes
paleoRecipes.forEach((recipe) => {
  classifier.learn(recipe.ingredients.join(), 'paleo')
})
const vegetarianRecipes = vegetarian.recipes
vegetarianRecipes.forEach((recipe) => {
  classifier.learn(recipe.ingredients.join(), 'vegetarian')
})
const veganRecipes = vegan.recipes
veganRecipes.forEach((recipe) => {
  classifier.learn(recipe.ingredients.join(), 'vegan')
})

//variables for calculating results
let matched = 0
let total = 0

//use test data and classify the test recipes
const testRecipes = testData.recipes
const result = testRecipes.map((recipe) => {
  total += 1
  const naiveBayesClassification = classifier.categorize(recipe.ingredients.join())
  recipe.naiveBayesClassification = naiveBayesClassification
  if(recipe.class == recipe.naiveBayesClassification){
    matched +=1
  }
  return recipe
})

const returnJSON = {
  result
}

console.log(matched/total); //0.6104



fs.writeFileSync('results.json', JSON.stringify(returnJSON))
