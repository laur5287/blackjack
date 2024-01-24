'use client';

import type { Database } from '@/types/types_db';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient, Session } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useImmerReducer } from 'use-immer';
import { gameReducer } from './store/gameReducer';
import { GameState } from './types/gameTypes';

type SupabaseContext = {
	supabase: SupabaseClient<Database>;
	session: Session | null
	loading: boolean,
	state: GameState
	dispatch: React.Dispatch<any>
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
	children
}: {
	children: React.ReactNode;
}) {

	// loading ? '' : (session?.user?.id || ''), 
	const initialState: GameState = {
		userId: null,
		gameId: '',
		// gameStatus:'progress',
		resolution: undefined,
		showPopUp: true,
		showBetPanel: false,
		isDealTrue: false,
		isStandTrue: false,
		deck: [],
		balance: 1000,
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


	const [supabase] = useState(() => createPagesBrowserClient());
	const [session, setSession] = useState<Session | null>(null)
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const [state, dispatch] = useImmerReducer((draft, action) => {
		gameReducer(draft, action, supabase, session);
	}, initialState);



	const handleSignOut = () => {
		// dispatch({ type: 'SAVE_STATE' })
		saveStateToDB(state, supabase);
		// testing('value')

	}




	useEffect(() => {
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN' && session) {
				setSession(session);
				dispatch({ type: 'LOGIN', payload: session.user.id })
				router.refresh()
			} else if (event === 'SIGNED_OUT') {

				handleSignOut()
				setSession(null)
			}
			setLoading(false);
		})
		return () => { data.subscription.unsubscribe() }
	}, [router, supabase, dispatch, handleSignOut]);

	const contextValue = useMemo(() => {
		return { supabase, session, loading, state, dispatch };
	}, [supabase, session, loading, state, dispatch]);
	const testing = async (x: any) => {

		const { data, error } = await supabase
			.from('game_states')
			.insert([{ id: 66, user_id: 'a9e85e91-1309-44aa-b6aa-31354b3d78b1', resolution: 'Albania' }])
			.select()
	}
	const saveStateToDB = async (state: GameState, supabase: any) => {
		try {
			// Assuming you have a 'game_states' table in your Supabase database
			const { data, error } = await supabase.from('game_states').upsert([
				{
					user_id: state.userId,
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
					is_player_turn: state.player.isPlayerTurn,
					dealer_hand: state.dealer.hand,
					dealer_show: state.dealer.show,
					dealer_score: state.dealer.score,
					dealer_hidden_score: state.dealer.hiddenScore,
					// is_dealer_turn: state.dealer.isDealerTurn,
					message: state.message,
				},
			]);

			if (error) {
				console.error('Error saving state to DB:', error.message);
			} else {
				console.log('State saved to DB successfully:', data);
			}
		} catch (error: any) {
			console.error('Error saving state to DB:', error.message);
		}
	};

	if (loading) {
		// Return a loading indicator if data is still being fetched
		return <div>Loading...</div>;
	}


	return (
		<Context.Provider value={contextValue}>
			<>{children}</>
		</Context.Provider>
	);

}

export const useSupabase = () => {
	const context = useContext(Context);

	if (context === undefined) {
		throw new Error('useSupabase must be used inside SupabaseProvider');
	}

	return context;
};
