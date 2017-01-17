import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";

import { Recipe } from "./recipe";
import { Ingredient } from "../shared";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Schnitzel', 'Very tasty', 'http://toriavey.com/images/2011/02/IMG_1544.jpg', [
      new Ingredient('French Fries', 2),
      new Ingredient('Pork Meat', 1)
    ]),
    new Recipe('Summer Salad', 'Okayish', 'http://ohmyveggies.com/wp-content/uploads/2013/06/the_perfect_summer_salad.jpg', [])
  ];

  constructor(private http: Http) {}

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
       'Content-Type': 'application/json'
    });
    return this.http.post('https://recipebook-3a638.firebaseio.com/recipes.json', body, {headers:headers});
  }

  fetchData() {
    
  }

}
