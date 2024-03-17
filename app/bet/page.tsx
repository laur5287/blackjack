'use client'
import BalanceDisplay from "@/components/BalanceDisplay";
import BetArea from "@/components/BetArea"
import { useSupabase } from "../supabase-provider";
import { DEAL_CARDS, EVALUATE_GAME, } from "@/app/store/gameReducer"
import { useRouter } from "next/navigation"
import { useEffect } from "react";

const Bet = () => {
	const router = useRouter()

	const { supabase, session, loading, state, dispatch } = useSupabase(); //async
	// useEffect(() => {
	// 	router.refresh()
	// }, [])
	useEffect(() => {
		console.log(state)

	}, [state])
	const handleDeal = () => {

		dispatch({ type: DEAL_CARDS });
		dispatch({ type: EVALUATE_GAME });

	}


	return (
		<>
			<section
				id='bet'
				className=' flex relative flex-col justify-center items-center w-full h-full'
			>
				{/* {state.showBetPanel && */}

				<div className='flex flex-col shadow-2xl w-full '>
					<BalanceDisplay balance={state.balance} />
					<BetArea
						currentBet={state.currentBet}
						onBetSelected={(amount) => dispatch({ type: 'PLACE_BET', payload: amount })}
						onClearBet={() => dispatch({ type: 'CLEAR_BET' })}
						onPlaceBet={() => {
							handleDeal()
							router.push('/deal')
						}}
					/>
				</div>

				{/* } */}
			</section>
		</>
	);
};
export default Bet;