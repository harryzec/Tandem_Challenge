var data = require('./Apprentice_TandemFor400_Data.json');



export class PracticeTrivia {
  constructor() {
    this.questions = this.generateQuestions(data);
    this.current = i;
    this.end = this.questions.length;
    this.score = 0;
    this.wrong = [];
  }

  generateQuestions(questions) {
      shuffle(questions)
      return questions.slice(0, 10)
  }

  play() {

    
  }

 
  
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}