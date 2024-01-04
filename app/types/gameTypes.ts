export interface GameState {
	resolution: string | undefined
	showPopUp: boolean
	showBetPanel: boolean
	isDealTrue: boolean
	isStandTrue: boolean
	balance: number;
	currentBet: number;
	deck: string[]
	player:
	{
		hand: string[],
		score: number,
		isPlayerTurn: boolean
	}
	dealer: {
		hand: string[],
		show: boolean,
		score: number,
		hiddenScore: number
		isDealerTurn: boolean
	};
	message: string;
}
export interface DealerHandProps {
	dealer: {
		hand: string[];
		show: boolean;
		score: number
	};
}
export type ScoreProps = {
	score: number
	label: string
}

// Define action types for your game
// export type SetBetAction = {
// 	type: 'setBet';
// 	payload: number;
// };

// export type UpdateBalanceAction = {
// 	type: 'updateBalance';
// 	payload: number;
// };

// export type DealCardsAction = {
// 	type: 'dealCards';
// 	payload: string[]

// };

// export type PlayerHitAction = {
// 	type: 'playerHit';
// };

// export type PlayerStandAction = {
// 	type: 'playerStand';
// }
// export type ShuffleDeckAction = {
// 	type: 'shuffleDeck';
// 	payload: number;
// };
// export type generateDeckAction = {
// 	type: 'generateDeck';
// };

// export type GameAction = SetBetAction | UpdateBalanceAction | DealCardsAction | PlayerHitAction | PlayerStandAction | generateDeckAction | ShuffleDeckAction  /* | OtherActionTypes */;