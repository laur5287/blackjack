export function saveState(state) {
	console.log('saving the state to db ')
	supabase.from('game_states').upsert(state)

}


export function generateDeck() {
	const suits = ["of_clubs", "of_diamonds", "of_hearts", "of_spades"];
	const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace"];
	const deck = [];

	for (let i = 0; i < suits.length; i++) {
		for (let j = 0; j < ranks.length; j++) {
			const card = `${ranks[j]}_${suits[i]}`;
			deck.push(card);
		}
	}
	return deck;
}


export function shuffleDeck(deck) {
	if (!Array.isArray(deck)) {
		throw new Error("The deck must be an array.");
	}
	const shuffledDeck = [...deck]
	for (let i = shuffledDeck.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]]
	}
	return shuffledDeck
};

export function dealCards(inputDeck) {
	if (!Array.isArray(inputDeck)) {
		throw new Error('Input deck is not an array');
	}
	const newDeck = [...inputDeck]; // Create a copy of the deck 
	const newPlayerHand = [];
	const newDealerHand = [];
	for (let i = 0; i < 2; i++) {
		newPlayerHand.push(newDeck.pop());
		newDealerHand.push(newDeck.pop());
	}
	return {
		remainingDeck: newDeck,
		dealerHand: newDealerHand,
		playerHand: newPlayerHand,
		remaining: newDeck.length
	}
}

export const handleHit = (deck, playerHand, setDeck, setPlayerHand,) => {

	const [newCard, ...remainingDeck] = deck;
	const newPlayerHand = [...playerHand, newCard];
	setPlayerHand(newPlayerHand);
	setDeck(remainingDeck);
};

export function drawCard(deck) {
	let randomIndex = Math.floor(Math.random() * deck.length)
	let card = deck[randomIndex]
	// let remainingDeck = deck.slice(randomIndex, randomIndex++)
	// console.log(card, remainingDeck)

	return card
}

export const handleReset = (setIsGameStarted) => {
	setIsGameStarted(false)
}
export function calculateHiddenScore(dealerHand) {
	let score = 0
	let hasAce = false;
	let hidden = 0
	let totalScore = hidden + score



	for (let i = 0; i < dealerHand.length; i++) {

		const rank = dealerHand[i].split("_")[0];


		if (rank === "ace") {
			if (i === 0) {
				hidden += 11
			} else {
				score += 11;
			}
			hasAce = true;
		} else if (rank === "king" || rank === "queen" || rank === "jack") {
			if (i === 0) {
				hidden += 10
			} else {
				score += 10;
			}
		} else {
			if (i === 0) {
				hidden += parseInt(rank)
			} else {
				score += parseInt(rank);

			}
		}
	}
	if (totalScore > 21 && hasAce) {
		while (totalScore > 21 && hasAce) {
			score -= 10;
			hasAce -= 1; // Decrement the number of Aces to adjust
		}
	}

	return [hidden, score, totalScore];
}
export function calculateHandScore(hand) {
	let score = 0;
	let hasAce = false;


	for (let i = 0; i < hand.length; i++) {
		const rank = hand[i].split("_")[0];
		if (rank === "ace") {
			score += 11;
			hasAce = true;
		} else if (rank === "king" || rank === "queen" || rank === "jack") {
			score += 10;
		} else {
			score += parseInt(rank);
		}
	}

	// Adjust for Aces if the score is over 21
	if (score > 21 && hasAce) {
		// As long as reducing the score by 10 for an Ace keeps it over 21 and there's another Ace, keep reducing
		while (score > 21 && hasAce) {
			score -= 10;
			hasAce -= 1; // Decrement the number of Aces to adjust
		}
	}

	return score;
}


// export function calculateHandValue(hand, stand = false) {
// 	let score = 0;
// 	let cardsProcessed = 0;
// 	let hasAce = false;

// 	for (let card of hand) {
// 		const rank = card.split("_")[0];
// 		if (rank === "ace") {
// 			score += 11;
// 			hasAce = true;
// 		} else if (rank === "king" || rank === "queen" || rank === "jack") {
// 			score += 10;
// 		} else {
// 			score += parseInt(rank);
// 		}
// 		cardsProcessed += 1;
// 		if (!stand && cardsProcessed === 1) {
// 			break; // Exit the loop after processing the first card
// 		}
// 	}
// 	if (score > 21 && hasAce) {
// 		score -= 10; // Deduct 10 if score exceeds 21 and there's an Ace
// 	}
// 	return score
// }

export const handleStand = (deck, setDeck, dealerHand, setDealerHand) => {
	const drawCards = () => {
		// Draw a card if the dealer's score is less than 17
		if (calculateHandValue(dealerHand) < 17) {
			const [newCard, ...remainingDeck] = deck;
			setDealerHand((prevDealerHand) => [...prevDealerHand, newCard]);
			setDeck(remainingDeck);
		}
	}
};

export function determineWinner(playerScore, dealerScore) {
	if (playerScore) {
		return "Dealer";
	} else if (dealerScore > 21) {
		return "Player";
	} else if (playerScore === 21 && dealerScore !== 21) {
		return "Player";
	} else if (dealerScore === 21 && playerScore !== 21) {
		return "Dealer";
	} else if (dealerScore > playerScore) {
		return 'dealerScore'
	}
	else if (playerScore > dealerScore) {
		return 'playerScore'
	}
	else {
		return undefined; // It's a tie
	}
};


export function placeBet(amount) {
	console.log(amount)

}