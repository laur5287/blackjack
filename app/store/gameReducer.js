import { generateDeck, shuffleDeck, dealCards, drawCard, calculateHandScore, calculateHiddenScore } from '@/lib/jslogic';
export const DEAL_CARDS = 'DEAL_CARDS';

export const PLAY = 'PLAY'
export const HIT = 'HIT'
export const STAND = 'STAND'
export const CLEAR_BET = 'CLEAR_BET'
export const PLACE_BET = 'PLACE_BET'
export const EVALUATE_GAME = 'EVALUATE_GAME';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const DRAW_CARD = 'DRAW_CARD'

export const gameReducer = (draft, action) => {
	switch (action.type) {

		case PLAY:
			draft.showPopUp = false
			draft.showBetPanel = true
			break;


		case DEAL_CARDS:
			// Implement logic to deal cards and update state
			const deck = shuffleDeck(generateDeck())
			const { playerHand, dealerHand, remainingDeck } = dealCards(deck)
			draft.player.hand = playerHand;
			draft.dealer.hand = dealerHand;
			draft.player.score = calculateHandScore(playerHand)
			draft.dealer.score = calculateHiddenScore(dealerHand)
			draft.deck = remainingDeck;
			draft.showBetPanel = false;
			draft.isDealTrue = true
			draft.player.isPlayerTurn = true
			break;

		case HIT:
			const playerNewCard = drawCard(draft.deck) //draw
			draft.player.hand.push(playerNewCard) // add
			draft.player.score = calculateHandScore(draft.player.hand) //update score
			break;

		case STAND:
			draft.isStandTrue = true
			draft.dealer.show = true
			draft.dealer.score = calculateHandScore(draft.dealer.hand)

			break

		case CLEAR_BET:
			draft.currentBet = 0
			draft.balance = 1000
			break

		case PLACE_BET:
			draft.currentBet = action.payload
			draft.balance = draft.balance - action.payload
			break

		case DRAW_CARD:
			const newCard = drawCard(draft.deck)
			if (action.payload === 'player') {
				// Add the new card to the player's hand
				draft.player.hand.push(newCard);
				draft.player.score = calculateHandScore(draft.player.hand)
			} else if (action.payload === 'dealer') {
				// Add the new card to the dealer's hand
				draft.dealer.hand.push(newCard);
				draft.dealer.score = calculateHandScore(draft.dealer.hand)
			}


			break

		case EVALUATE_GAME:
			const playerScore = draft.player.score;
			const dealerScore = draft.dealer.score;
			if (playerScore > 21) {
				draft.resolution = "Player Busts! Dealer Wins!";
			} else if (dealerScore > 21) {
				draft.resolution = "Dealer Busts! Player Wins!";
			} else if (playerScore === dealerScore) {
				draft.resolution = " It's a Tie!";
			}
			break;
		default:
			return draft;
	}
};
