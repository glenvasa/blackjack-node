const rs = require("readline-sync");

let deck = [
  "2 of Hearts", "3 of Hearts", "4 of Hearts", "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts", "9 of Hearts", "10 of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts", "Ace of Hearts",
  "2 of Clubs", "3 of Clubs", "4 of Clubs", "5 of Clubs", "6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs", "10 of Clubs", "Jack of Clubs", "Queen of Clubs", "King of Clubs", "Ace of Clubs",
  "2 of Diamonds", "3 of Diamonds", "4 of Diamonds", "5 of Diamonds", "6 of Diamonds", "7 of Diamonds", "8 of Diamonds", "9 of Diamonds", "10 of Diamonds", "Jack of Diamonds", "Queen of Diamonds", "King of Diamonds", "Ace of Diamonds",
  "2 of Spades", "3 of Spades", "4 of Spades", "5 of Spades", "6 of Spades", "7 of Spades", "8 of Spades", "9 of Spades", "10 of Spades", "Jack of Spades", "Queen of Spades", "King of Spades", "Ace of Spades",
];

let newDeck = [
  "2 of Hearts", "3 of Hearts", "4 of Hearts", "5 of Hearts", "6 of Hearts", "7 of Hearts", "8 of Hearts", "9 of Hearts", "10 of Hearts", "Jack of Hearts", "Queen of Hearts", "King of Hearts", "Ace of Hearts",
  "2 of Clubs", "3 of Clubs", "4 of Clubs", "5 of Clubs", "6 of Clubs", "7 of Clubs", "8 of Clubs", "9 of Clubs", "10 of Clubs", "Jack of Clubs", "Queen of Clubs", "King of Clubs", "Ace of Clubs",
  "2 of Diamonds", "3 of Diamonds", "4 of Diamonds", "5 of Diamonds", "6 of Diamonds", "7 of Diamonds", "8 of Diamonds", "9 of Diamonds", "10 of Diamonds", "Jack of Diamonds", "Queen of Diamonds", "King of Diamonds", "Ace of Diamonds",
  "2 of Spades", "3 of Spades", "4 of Spades", "5 of Spades", "6 of Spades", "7 of Spades", "8 of Spades", "9 of Spades", "10 of Spades", "Jack of Spades", "Queen of Spades", "King of Spades", "Ace of Spades",
  ];

let playerCard1 = "";
let playerCard2 = "";
let dealerCard1 = "";
let dealerCard2 = "";
let playerCard1Value = 0;
let playerCard2Value = 0;
let dealerCard1Value = 0;
let dealerCard2Value = 0;
let playerCardTotal = 0;
let dealerCardTotal = 0;

let playerRecord = {
  win: 0,
  loss: 0,
  push: 0,
};

let {win, loss, push} = playerRecord

const blackJack = () => {
  console.log(
    `
Let's Play BlackJack!!! Your record is ${win} ${win === 1 ? `win` : `wins`} ${loss} ${loss === 1 ? `loss` : `losses`} and ${push} ${push === 1 ? `push` : `pushes`}`
  );
  deal();
};

const deal = () => {
  playerCard1 = deck[Math.floor(Math.random() * (deck.length + 1))];
  dealerCard1 = deck[Math.floor(Math.random() * (deck.length + 1))];
  playerCard2 = deck[Math.floor(Math.random() * (deck.length + 1))];
  dealerCard2 = deck[Math.floor(Math.random() * (deck.length + 1))];

  deck.splice(deck.indexOf(playerCard1), 1);
  deck.splice(deck.indexOf(dealerCard1), 1);
  deck.splice(deck.indexOf(playerCard2), 1);
  deck.splice(deck.indexOf(dealerCard2), 1);

  playerCard1Value = computeValue(playerCard1);
  dealerCard1Value = computeValue(dealerCard1);
  playerCard2Value = computeValue(playerCard2);
  dealerCard2Value = computeValue(dealerCard2);

  playerCardTotal = playerCard1Value + playerCard2Value;
  dealerCardTotal = dealerCard1Value + dealerCard2Value;

  if (playerCardTotal === 21) {
    twentyOne(playerCard1, playerCard2);
  }

  let dealHitStand = rs.keyInYN(
    `You have been dealt (${playerCard1}) and (${playerCard2}). Your Total is ${playerCardTotal}. The dealer is showing (${dealerCard1}), value of ${dealerCard1Value}. Do you want to HIT? `
  );
  dealHitStand ? playerHit() : playerStand();
};

const computeValue = (card) => {
  let cardValue;
  if (card.startsWith("10")) {
    return (cardValue = 10);
  }

  if (card[0] === "J") {
    cardValue = 10;
  } else if (card[0] === "Q") {
    cardValue = 10;
  } else if (card[0] === "K") {
    cardValue = 10;
  } else if (card[0] === "A") {
    cardValue = 11;
  } else {
    cardValue = Number(card[0]);
  }

  return cardValue;
};

const twentyOne = (card1, card2) => {
  if (!card2) {
    console.log(
      `You hit and were dealt (${card1}) and have BlackJack!! Congrats. You Win!!!`
    );
  } else {
    console.log(
      `You were dealt (${card1}) and (${card2}) which is 21 and BlackJack!! Congrats. You Win!!!`
    );
  }
  win += 1;
  playAgain();
};

const playerHit = () => {
  console.log("Player Hits");
  let hitCard = deck[Math.floor(Math.random() * (deck.length + 1))];
  deck.splice(deck.indexOf(hitCard), 1);
  let hitCardValue = computeValue(hitCard);
  playerCardTotal += hitCardValue;
  playerCardTotal === 21 ? twentyOne(hitCard) : null;
  playerCardTotal > 21 ? playerBust(hitCard, hitCardValue) : null;
  let hitStand = rs.keyInYN(
    `You hit and were dealt (${hitCard}). Your total is now ${playerCardTotal}. The dealer is showing (${dealerCard1}), value of ${dealerCard1Value}. Do you want to HIT? `
  );
  hitStand ? playerHit() : playerStand();
};

const playerStand = () => {
  console.log(`Player Stands with ${playerCardTotal}`);
  console.log(
    `Dealer was dealt (${dealerCard1}) and (${dealerCard2}) for a total of ${dealerCardTotal}. ${
      dealerCardTotal >= 17 && dealerCardTotal < 21 ? "Dealer must STAND." : ""
    }`
  );
  while (dealerCardTotal < 17) {
    let seeDealerHitCard = rs.keyInYN("Press 'y' to see Dealer's next card");
    seeDealerHitCard ? dealerHit() : dealerHit();
  }
  if (dealerCardTotal > 21) {
    dealerBust();
  } else {
    compareTotals();
  }
};

const playerBust = (card, cardValue) => {
  console.log(
    `You were dealt (${card}), value of ${cardValue}. Your total is now ${playerCardTotal} and you BUST. Sorry...You lose!!! The dealer's total was ${dealerCardTotal}.`
  );
  loss += 1;
  playAgain();
};

const dealerBust = () => {
  console.log(
    `The dealer's total is ${dealerCardTotal} and he BUST. Your total is ${playerCardTotal}. Congrats...You Win!!!`
  );
  win += 1;
  playAgain();
};

const dealerHit = () => {
  let dealerHitCard = deck[Math.floor(Math.random() * (deck.length + 1))];
  deck.splice(deck.indexOf(dealerHitCard), 1);
  let dealerHitCardValue = computeValue(dealerHitCard);
  dealerCardTotal += dealerHitCardValue;
  console.log(
    `The dealer HIT and was dealt (${dealerHitCard}). His total is now ${dealerCardTotal}. ${
      dealerCardTotal >= 17 && dealerCardTotal < 21 ? `Dealer must STAND.` : ""
    }`
  );
};

const compareTotals = () => {
  if (playerCardTotal > dealerCardTotal) {
    console.log(
      `Your total is ${playerCardTotal} and the dealer's total is only ${dealerCardTotal}. Congrats...You win!!!`
    );
    win += 1;
  } else if (playerCardTotal < dealerCardTotal) {
    dealerCardTotal === 21
      ? console.log(`The dealer has BLACKJACK. Sorry...You Lose!!!`)
      : console.log(
          `The dealer's total is ${dealerCardTotal} but you only have ${playerCardTotal}. Sorry...You lose!!`
        );
    loss += 1;
  } else {
    console.log(
      `You and the dealer both have ${playerCardTotal} so the game is a PUSH. No Winner!!!`
    );
    push += 1;
  }

  playAgain();
};

const playAgain = () => {
  let playMore = rs.keyInYN(`Do you want to play again?`);
  if (playMore) {
    deck = [...newDeck];
    blackJack();
  } else {
    console.log(
      `Thanks for playing. Your record was ${win} ${win === 1 ? `win` : `wins`} ${loss} ${loss === 1 ? `loss` : `losses`} and ${push} ${push === 1 ? `push` : `pushes`}`
      
    );
  }
};

blackJack();
