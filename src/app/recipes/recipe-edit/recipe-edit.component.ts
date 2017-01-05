import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Rx";
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

import { RecipeService } from "../recipe.service";
import { Recipe } from  "../recipe";

@Component({
  selector: 'rb-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup; 
  private recipeIndex: number;
  private recipe: Recipe;
  private subscription: Subscription;
  private isNew = true;
  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private recipeService: RecipeService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
          if (params.hasOwnProperty('id')) {
          this.isNew = false;
           this.recipeIndex = +params['id'];
           this.recipe = this.recipeService.getRecipe(this.recipeIndex);
        } else {
          this.isNew = true;
          this.recipe = null;
        }
     });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
private initForm(isNew: boolean) {
  let recipeName = '';
  let recipeImageUrl = '';
  let recipeContent = '';
  let recipeIngredients: FormArray = new FormArray ([]);
  
  if(!this.isNew) {
    for (let i = 0; i < this.recipe.ingredients.length; i++ ) {
      recipeIngredients.push(
        new FormGroup({
          name: new FormControl( this.recipe.ingredients[i].name, Validators.required ),
          amount: new FormControl( this.recipe.ingredients[i].amount, 
          [Validators.required, 
          Validators.pattern("\\d+")
          ])
        })
      );
    }
    recipeName = this.recipe.name;
    recipeImageUrl = this.recipe.imagePath;
    recipeContent = this.recipe.description;
  }
  this.recipeForm = this.formBuilder.group({
  name: [recipeName, Validators.required],
  imagePath: [recipeImageUrl, Validators.required],
  description: [recipeContent, Validators.required],
  ingredients: recipeIngredients
});
}

}
