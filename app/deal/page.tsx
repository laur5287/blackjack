'use client'
import BalanceDisplay from "@/components/BalanceDisplay";
import DealerHand from "@/components/DealerHand";
import HitButton from "@/components/HitButton";
import PlayerHand from "@/components/PlayerHand";
import StandButton from "@/components/StandButton";
import { Badge } from "@/components/ui/badge";
import { useSupabase } from "../supabase-provider";
import { STAND, EVALUATE_GAME, DRAW_CARD, HIT, } from "../store/gameReducer";
import { ResolutionDialog } from "@/components/Resolution";

const Deal = () => {
	const { supabase, session, loading, state, dispatch } = useSupabase(); //async
	const handleStand = () => {
		dispatch({ type: STAND });
		dispatch({ type: EVALUATE_GAME });
		dispatch({ type: DRAW_CARD, payload: 'dealer' })
		dispatch({ type: EVALUATE_GAME });
		// dispatch({ type: EVALUATE_GAME });
	}
	const handleHit = () => {

		dispatch({ type: HIT });
		dispatch({ type: EVALUATE_GAME });


	}

	return (
		<>
			<section id='deal_page'
				className=' flex relative flex-col justify-center items-center w-full h-full'
			>
				{state.isDealTrue && (
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
				)}
				{state.resolution && (
					<>
						<ResolutionDialog message={state.resolution} />
					</>
				)}
			</section>
		</>
	);
};
export default Deal;