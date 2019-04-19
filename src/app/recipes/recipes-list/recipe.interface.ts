import { IngredientInterface } from '../../shared/ingredient.interface';

export interface RecipeInterface {
  id?: number;
	name: string;
	description: string;
	image_path: string;
  ingredients: IngredientInterface[];
}
