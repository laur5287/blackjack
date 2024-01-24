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

	return (
		<div className=" flex  w-full justify-center	 items-center p-4 rounded-lg shadow-lg">
			<div className="relative min-w-[200px] flex   h-[150px]">


				{
					hand?.map((card, index) => (
						<div key={`${card}-${index}`} className={cn('', index >= 0 && `absolute left-${6 * index}`)}>
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
						</div>
					))
				}
			</div>
			<Score score={score} label='Player' />
		</div>
	);
}
export default PlayerHand