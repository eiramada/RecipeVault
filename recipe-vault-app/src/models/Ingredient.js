export default class Ingredient {
  constructor(name, quantity, unit, notes = "") {
    this.name = name;
    this.quantity = quantity;
    this.unit = unit;
    this.notes = notes;
  }
}
