import Image from "next/image"
import { getCardImagePath } from "@/lib/utils";
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
		<div className=" flex justify-around	 justify-items-start p-4 rounded-lg shadow-lg">
			{
				hand?.map((card, index) => (
					<div key={`${card}-${index}`} className="relative m-1">
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
			<Score score={score} label='Player' />
		</div>
	);
}
export default PlayerHand