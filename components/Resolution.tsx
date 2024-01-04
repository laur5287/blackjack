'use client'
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

export const Resolution = ({ message }: { message: string }) => {
	const [isClient, setIsClient] = useState(false);
	const { width, height } = useWindowSize()
	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	return (

		<div id='resolution' className="absolute bg-background/20 w-full h-full flex items-center justify-center">

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


