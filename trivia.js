var data = require('./Apprentice_TandemFor400_Data.json');

export class PracticeTrivia {
  constructor() {
    this.deck = new Deck();
    this.score = 0;
    this.completed = false;
  }

  nextQuestion() {
    debugger
    this.deck.nextCard();
    if (this.isOver()) this.completed = true;
  }

  updateScore(answer) {
    if (!this.deck.currentCard.correctAnswer(answer)) this.deck.addWrong();
    else this.score++;
  }

  isOver () {
    debugger
    return this.deck.len === this.deck.index;
  }
}

export class Deck {
  constructor() {
    this.cards = this.generateDeck(data).map(info => new Card(info));
    this.index = 0;
    this.currentCard = this.cards[this.index];
    this.len = 10;
    this.wrong = [];
  }

  addWrong() {
    this.wrong.push(this.currentCard)
  }

  generateDeck(questions) {
    shuffle(questions)
    return questions.slice(0, 10)
  }

  nextCard() {
    this.index++;
    this.currentCard = this.cards[this.index];
  }
}

export class Card {
  constructor(info) {
    this.question = info.question;
    this.correct = info.correct;
    this.options = info.incorrect.concat(info.correct);
    this.answered = false;

    shuffle(this.options);
  }

  correctAnswer(answer) {
    this.answered = true;
    if (answer === this.correct) return true;
    else return false;
  }
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}