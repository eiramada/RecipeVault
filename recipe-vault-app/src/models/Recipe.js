import Ingredient from "./Ingredient";
import Instruction from "./Instruction";

export default class Recipe {
  constructor(
    id,
    title,
    description,
    ingredients = [],
    instructions = [],
    images = [],
    tags = [],
    servings,
    prepTime,
    cookTime,
    author,
    createdAt = new Date(),
    updatedAt = new Date(),
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.images = images;
    this.tags = tags;
    this.servings = servings;
    this.prepTime = prepTime;
    this.cookTime = cookTime;
    this.totalTime = prepTime + cookTime;
    this.author = author;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
  }

  addInstruction(instruction) {
    this.instructions.push(instruction);
  }
}
