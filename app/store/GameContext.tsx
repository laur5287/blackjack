'use client'
// import { createContext, useContext, useReducer, Dispatch } from 'react';

// import { GameAction, SetBetAction, UpdateBalanceAction } from '@/app/types/gameTypes';
// import { Actions } from 'immer-reducer';

import React, { createContext, useContext } from 'react';
import { useImmer } from 'use-immer';
import { GameState } from '@/app/types/gameTypes';

const GameStateContext = createContext<GameState | null>(null);
const GameDispatchContext = createContext<Function | null>(null);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
	const initialState: GameState = {
		userId: '',
		gameId: '',
		resolution: '',
		showPopUp: false,
		showBetPanel: false,
		isDealTrue: false,
		isStandTrue: false,
		balance: 1000,
		currentBet: 0,
		deck: [],
		player: {
			hand: [],
			score: 0,
			isPlayerTurn: true,
		},
		dealer: {
			hand: [],
			show: false,
			score: 0,
			hiddenScore: 0,
			isDealerTurn: false,
		},
		message: 'Place your bet!',
	};
	const [state, updateState] = useImmer(initialState);

	return (
		<GameStateContext.Provider value={state}>
			<GameDispatchContext.Provider value={updateState}>
				{children}
			</GameDispatchContext.Provider>
		</GameStateContext.Provider>
	);
};

export const useGameState = () => useContext(GameStateContext);
export const useGameDispatch = () => useContext(GameDispatchContext);
// const GameStateContext = createContext<GameState | null>(null);
// // const GameDispatchContext = createContext<Dispatch<Actions> | null>(null);
// const GameDispatchContext = createContext<Dispatch<Actions<typeof GameReducer>> | null>(null);

// export const GameProvider = ({ children }: { children: React.ReactNode }) => {
// 	const [state, dispatch] = useReducer(GameReducerFunction, initialState);

// 	return (
// 		<GameStateContext.Provider value={state}>
// 			<GameDispatchContext.Provider value={dispatch}>
// 				{children}
// 			</GameDispatchContext.Provider>
// 		</GameStateContext.Provider>
// 	);
// };

// export const useGameState = () => useContext(GameStateContext);
// export const useGameDispatch = () => useContext(GameDispatchContext);
