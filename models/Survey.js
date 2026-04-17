// Survey Model (in-memory for now)
let surveys = [];
let nextId = 1;

class Survey {
  constructor(title, questions) {
    this.id = nextId++;
    this.title = title;
    this.questions = questions;
    this.createdAt = new Date();
  }

  static getAll() {
    return surveys;
  }

  static create(title, questions) {
    const survey = new Survey(title, questions);
    surveys.push(survey);
    return survey;
  }

  static findById(id) {
    return surveys.find(s => s.id === parseInt(id));
  }
}

module.exports = Survey;