export default class Instruction {
  constructor(step, description, images = []) {
    this.step = step;
    this.description = description;
    this.images = images;
  }
}
