const fs = require('fs');
let rawdata = fs.readFileSync('./Apprentice_TandemFor400_Data.json');

const data = JSON.parse(rawdata);

export class Questions {
  constructor() {
    this.questions = this.getRandomQuestions(data);
  }

  getRandomQuestions(quest) {
    for (let i = quest.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [quest[i], quest[j]] = [quest[j], quest[i]];
  }
  return quest.slice(0, 10);
  }
}

// write tests here 