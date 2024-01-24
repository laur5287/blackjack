'use client'
import { GameTable } from '@/components/GameTable'

export default function Home() {

	return (
		<div id='page' className='flex md:p-12 w-full   flex-col items-center h-full '>
			<GameTable />
		</div>
	)
}
