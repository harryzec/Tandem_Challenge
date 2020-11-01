import {PracticeTrivia, Deck, Card} from './trivia'

let testGame = new PracticeTrivia();

test("Updates Score Correctly", () => {
  let ans = testGame.deck.currentCard.correct;
  expect(testGame.updateScore(ans)).toBe(true);
})