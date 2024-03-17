import Image from "next/image"
import { cn, getCardImagePath } from "@/utils/utils";
import { Score } from "./Score";

interface PlayerHandProps {
	player: {
		hand: string[]
		score: number
	}

}
const PlayerHand: React.FC<PlayerHandProps> = ({ player }) => {
	const { hand, score } = player
	// console.log(hand)

	return (
		<div className=" flex  w-full justify-center	 items-center p-4 rounded-lg shadow-lg">
			<div className="relative min-w-[200px] flex   h-[150px]">


				{
					hand?.map((card, index) => {
						// console.log(index)

						return (
							<div key={`${card}-${index}`}
								// className={cn('absolute', index > 0 && `translate-x- translate-x-[${6 * index}px]`)}
								style={{ position: 'absolute', left: parseInt(`${index * 18}`) }}
							>
								<Image
									src={getCardImagePath(card)}
									alt={`Card ${card}`}
									width={100}
									height={150}
									className="rounded shadow-lg"
									onError={(e) => {
										e.currentTarget.src = '/cards/default.png';
									}}
								/>
							</div>)
					})
				}
			</div>
			<Score score={score} label='Player' />
		</div>
	);
}
export default PlayerHand