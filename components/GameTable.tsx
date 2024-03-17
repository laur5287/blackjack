'use client'
import BalanceDisplay from "./BalanceDisplay"
import BetArea from "./BetArea"
import DealerHand from "./DealerHand"
import PlayerHand from "./PlayerHand"
import { useImmerReducer } from 'use-immer';
import { GameState } from '@/app/types/gameTypes';
import PlayPopUp from '@/components/PlayPopUp'
import BetPanel from '@/components/BetPanel'
import DealButton from '@/components/DealButton'
import StandButton from '@/components/StandButton'
import HitButton from '@/components/HitButton'
import { gameReducer, DEAL_CARDS, PLAY, STAND, HIT, CLEAR_BET, PLACE_BET, DRAW_CARD, EVALUATE_GAME, SAVE_STATE } from "@/app/store/gameReducer"
import OutcomePopUp from '@/components/OutcomePopUp'
import { Badge } from "@/components/ui/badge"
import { ResolutionDialog } from "@/components/Resolution"
import { useSupabase } from "@/app/supabase-provider"
import type { User } from '@supabase/auth-helpers-nextjs';
import type { Session } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { saveStateToDB } from "@/app/store/gameReducer"
import { useRouter } from "next/navigation"




export const GameTable = () => {
	const router = useRouter()

	const { supabase, session, loading, state, dispatch } = useSupabase(); //async
	const [status, setStatus] = useState(state.resolution)
	// useEffect(() => {
	// 	if (!status) {
	// 		return
	// 	}
	// 	console.log('status', status)

	// }, [status])

	// const initialState: GameState = {
	// 	userId: loading ? '' : (session?.user?.id || ''), //did session returned ? .....

	// 	gameId: '',
	// 	resolution: undefined,
	// 	showPopUp: true,
	// 	showBetPanel: false,
	// 	isDealTrue: false,
	// 	isStandTrue: false,
	// 	deck: [],
	// 	balance: 1000,
	// 	currentBet: 0,
	// 	player: {
	// 		hand: [],
	// 		score: 0,
	// 		isPlayerTurn: false
	// 	},
	// 	dealer: {
	// 		hand: [],
	// 		show: false,
	// 		score: 0,
	// 		hiddenScore: 0,
	// 		isDealerTurn: false
	// 	},
	// 	message: '',
	// }
	// const [state, dispatch] = useImmerReducer((draft, action) => {
	// 	gameReducer(draft, action, supabase, session);
	// }, initialState);
	const handlePlay = () => {
		dispatch({ type: PLAY })
		router.push('/bet')
	};

	// const handleDeal = () => {

	// 	dispatch({ type: DEAL_CARDS });
	// 	dispatch({ type: EVALUATE_GAME });

	// }

	// const handleHit = () => {

	// 	dispatch({ type: HIT });
	// 	dispatch({ type: EVALUATE_GAME });
	// }
	// const handleStand = () => {
	// 	dispatch({ type: STAND });
	// 	dispatch({ type: EVALUATE_GAME });
	// 	dispatch({ type: DRAW_CARD, payload: 'dealer' })
	// 	dispatch({ type: EVALUATE_GAME });
	// 	// dispatch({ type: EVALUATE_GAME });
	// }
	// useEffect(() => {
	// 	console.log('state changed', state)

	// }, [state])

	function handleSave() {
		// console.log("hello")

		// dispatch({ type: SAVE_STATE })
		console.log('save state', state)

		saveStateToDB(state, supabase)
	}

	return (

		<div id='table' className=' flex relative flex-col justify-center items-center w-full h-full'>
			{/* <Button onClick={handleSave}>Save</Button> */}
			{state.showPopUp && <PlayPopUp onStartClick={handlePlay} />}
			{/* {state.showBetPanel &&
				(
					<div className='flex flex-col shadow-2xl w-full '>
						<BalanceDisplay balance={state.balance} />
						<BetArea
							currentBet={state.currentBet}
							onBetSelected={(amount) => dispatch({ type: 'PLACE_BET', payload: amount })}
							onClearBet={() => dispatch({ type: 'CLEAR_BET' })}
							onPlaceBet={handleDeal}
						/>
					</div>
				)} */}
			{/* {state.isDealTrue && (
				<div className="w-full ">
					<BalanceDisplay balance={state.balance} />
					<section className='flex relative w-full   flex-col gap-1 items-center justify-center '>
						<DealerHand dealer={state.dealer} />

						<div id='actions' className='flex items-center justify-around min-h-[100px] min-w-full'>
							<HitButton onHitClick={handleHit} />
							<Badge className='p-8 text-xl shadow-2xl font-bold border-transparent' variant="outline" >
								${state.currentBet}
							</Badge>
							<StandButton onStandClick={handleStand} />
						</div>

						<PlayerHand player={state.player} />
					</section>
				</div>
			)} */}
			{/* {state.resolution && (
				<>
					<ResolutionDialog message={state.resolution} />
				</>
			)} */}
		</div>
	)
}

