'use client'
// import { useEffect, useState } from 'react';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'
import { Button } from './ui/button'
import { useSupabase } from "@/app/supabase-provider"
import { RESETGAME } from '@/app/store/gameReducer'
import { useRouter } from 'next/navigation'


export const ResolutionDialog = ({ message }: { message: string }) => {
	// const [isClient, setIsClient] = useState(false);
	const { supabase, session, loading, state, dispatch } = useSupabase();
	//async

	const { width, height } = useWindowSize()
	const router = useRouter()
	// console.log('state', state, 'message', message)
	const handlePlayAgain = async () => {
		dispatch({ type: RESETGAME })
	}

	// useEffect(() => {
	// 	setIsClient(true);
	// }, []);

	// if (!isClient) {
	// 	return null;
	// }

	return (

		<div id='resolution' className="absolute flex-col-reverse gap-2 bg-background/20 w-full h-full flex items-center justify-center">
			<Button
				className='z-40'
				onClick={handlePlayAgain}
				size='lg'>Play again</Button>

			<div className="text-6xl bg-background/10">{message}</div>
			<div id='resolution_pop_up' className='absolute -z-1 w-full h-full overflow-hidden'>
				<Confetti
					width={width}
					height={height}
				/>
			</div >
		</div>

	)
}


