import { ScoreProps } from '@/app/types/gameTypes'

export const Score = ({ score, label }: ScoreProps) => (
	<div className=" flex flex-col lg:flex-row items-center  ml-6 ">

		<div className="text-2xl font-bold   rounded-full w-20 h-20 flex items-center justify-center m-2 shadow-lg">
			{score}
		</div>
		<span className='text-3xl font-medium '>{label}</span>
	</div>
)

