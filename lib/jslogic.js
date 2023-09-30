


export function generateDeck() {
    const suits = ["C", "D", "H", "S"];
    const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
    const deck = [];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < ranks.length; j++) {
            const card = `${ranks[j]}-${suits[i]}`;
            deck.push(card);
        }
    }
    return deck;
};

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

export function drawCard(remainingDeck) {
    let randomIndex = Math.floor(Math.random() * remainingDeck.length)
    let card = remainingDeck[randomIndex]
    return card
}

export const handleReset = (setIsGameStarted) => {
    setIsGameStarted(false)
}

export function calculateHandValue(hand) {
    let score = 0;
    let hasAce = false;
    for (let card of hand) {
        const rank = card.split("-")[0];
        if (rank === "A") {
            score += 11;
            hasAce = true;
        } else if (rank === "K" || rank === "Q" || rank === "J") {
            score += 10;
        } else {
            score += parseInt(rank);
        }
    }
    if (score > 21 && hasAce) {
        score -= 10; // Deduct 10 if score exceeds 21 and there's an Ace
    }
    return score
}

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

