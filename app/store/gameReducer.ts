import type { Session, User } from '@supabase/auth-helpers-nextjs';
import { generateDeck, shuffleDeck, dealCards, saveState, drawCard, calculateHandScore, calculateHiddenScore } from '@/lib/jslogic';
import { GameState } from '../types/gameTypes';
export const DEAL_CARDS = 'DEAL_CARDS';
export const PLAY = 'PLAY'
export const HIT = 'HIT'
export const STAND = 'STAND'
export const CLEAR_BET = 'CLEAR_BET'
export const PLACE_BET = 'PLACE_BET'
export const EVALUATE_GAME = 'EVALUATE_GAME';
export const UPDATE_MESSAGE = 'UPDATE_MESSAGE';
export const DRAW_CARD = 'DRAW_CARD'
export const SAVE_STATE = 'SAVE_STATE'
export const LOGIN = 'LOGIN'
export const RESETGAME = 'RESETGAME'

export const gameReducer = (draft: GameState, action: any, supabase: any, session: Session | null) => {



	switch (action.type) {

		case RESETGAME:
			draft = {
				userId: draft.userId,
				gameId: '',
				// gameStatus:'progress',
				resolution: '',
				showPopUp: false,
				showBetPanel: true,
				isDealTrue: false,
				isStandTrue: false,
				deck: [],
				balance: draft.balance,
				currentBet: 0,
				player: {
					hand: [],
					score: 0,
					isPlayerTurn: false
				},
				dealer: {
					hand: [],
					show: false,
					score: 0,
					hiddenScore: 0,
					isDealerTurn: false
				},
				message: '',
			}
			console.log('draft', draft)


			break
		case LOGIN:
			draft.userId = action.payload

			break
		case SAVE_STATE:
			// if (session?.user?.id) {
			// console.log('reducer')
			saveStateToDB(draft, supabase);
			// console.log('reducer finish')
			break;

		case PLAY:
			draft.showPopUp = false
			draft.showBetPanel = true
			// draft.userId = user?.id
			break;


		case DEAL_CARDS:
			// Implement logic to deal cards and update state
			const deck = shuffleDeck(generateDeck())
			const { playerHand, dealerHand, remainingDeck } = dealCards(deck)
			const [hidden, score, total] = calculateHiddenScore(dealerHand)
			draft.player.hand = playerHand;
			draft.dealer.hand = dealerHand;
			draft.player.score = calculateHandScore(playerHand);
			draft.dealer.hiddenScore = hidden;
			draft.dealer.score = score
			draft.deck = remainingDeck;
			draft.showBetPanel = false;
			draft.isDealTrue = true
			draft.player.isPlayerTurn = true
			break;

		case HIT:

			const card = drawCard(draft.deck) //draw
			console.log(card)
			draft.deck = draft.deck.filter(item => item !== card) //subtract card from deck
			draft.player.hand.push(card)
			draft.player.score = calculateHandScore(draft.player.hand) //update score

			break;

		case STAND:
			draft.isStandTrue = true
			draft.dealer.show = true
			draft.dealer.isDealerTurn = true
			draft.player.isPlayerTurn = false
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
			draft.deck = draft.deck.filter(item => item !== newCard) //subtract card from deck
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
			if (playerScore === 21) {
				draft.resolution = "Player Wins"
			} else if (dealerScore === 21) {
				draft.resolution = 'Dealer Wins'
			}

			if (playerScore > 21) {
				draft.resolution = "Player Busts! Dealer Wins!";
			} else if (dealerScore > 21) {
				draft.resolution = "Dealer Busts! Player Wins!";
			} else if (playerScore === 21 && dealerScore === 21) {
				draft.resolution = " It's a Tie!";
			}
			break;
		default:
			return draft;
	}
};
export const saveStateToDB = async (state: GameState, supabase: any) => {
	try {
		// Assuming you have a 'game_states' table in your Supabase database
		const { data, error } = await supabase.from('game_states').upsert([
			{
				// user_id: state.userId,
				game_id: state.gameId,
				resolution: state.resolution,
				show_popup: state.showPopUp,
				show_bet_panel: state.showBetPanel,
				is_deal_true: state.isDealTrue,
				is_stand_true: state.isStandTrue,
				deck: state.deck,
				balance: state.balance,
				current_bet: state.currentBet,
				player_hand: state.player.hand,
				player_score: state.player.score,
				player_is_player_turn: state.player.isPlayerTurn,
				dealer_hand: state.dealer.hand,
				dealer_show: state.dealer.show,
				dealer_score: state.dealer.score,
				dealer_hidden_score: state.dealer.hiddenScore,
				dealer_is_dealer_turn: state.dealer.isDealerTurn,
				message: state.message,
			},
		]);

		if (error) {
			console.error('Error saving state to DB:', error.message);
		} else {
			console.log('State saved to DB successfully:', data);
		}
	} catch (error: any) {
		console.error('CATCH Error saving state to DB:', error.message);
	}
};
