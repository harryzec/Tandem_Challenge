var data = require('./Apprentice_TandemFor400_Data.json');

export class PracticeTrivia {
  constructor() {
    this.deck = new Deck();
    this.score = 0;
    this.completed = false;
    this.range = null;
  }

  nextQuestion() {
    debugger
    this.deck.nextCard();
    if (this.isOver()) this.completed = true;
  }

  updateScore(answer) {
    if (!this.deck.currentCard.correctAnswer(answer)) {
      this.deck.addWrong();
      return false;
    } else {
      this.score++;
      return true;
    } 
  }

  isOver () {
    if (this.deck.len === this.deck.index) {
      if (this.score <=3) this.range = 'Needs Improvement'
      else if (this.score <= 6) this.range = 'Solid Score'
      else if (this.score <= 9) this.range = 'Trivia Wiz'
      else this.range = 'Perfect Score!'
      return true
    }

    return false;
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
    if (this.index === this.len) return;

    let correct = this.cards[this.index].correct;
    this.cards[this.index].correct = this.cards[this.index-1].correct;

    setTimeout(()=> {
      this.cards[this.index].correct = correct;
    }, 300)
    
    this.currentCard = this.cards[this.index];
  }
}

export class Card {
  constructor(info) {
    this.question = info.question;
    this.correct = info.correct;
    this.options = info.incorrect.concat(info.correct);
    this.answered = false;
    this.choice = null

    shuffle(this.options);
  }

  correctAnswer(answer) {
    this.answered = true;
    if (answer === this.correct) return true;
    this.choice = answer;
    return false;
  }
}

export function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}