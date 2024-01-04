import { Divide } from "lucide-react";
import Image from "next/image";
import { DealerHandProps } from "@/app/types/gameTypes";
import { getCardImagePath } from "@/lib/utils";
import { Score } from "./Score";


const DealerHand: React.FC<DealerHandProps> = ({ dealer }) => {

	const { hand, show, score } = dealer;


	return (
		<div className=" flex w-full justify-center items-center p-4 rounded-lg shadow-md">


			{hand?.map((card, index) => (
				<div key={`${card}-${index}`} className="relative m-1">
					{show || index !== 0 ? (
						<Image
							src={getCardImagePath(card)}
							alt={`Card ${card}`}
							width={100}
							height={150}
							className="rounded shadow-lg"
							onError={(e) => {
								e.currentTarget.src = '/cards/default.png'; // Fallback image
							}}
						/>
					) : (
						<Image
							src="/cards/BACK_blue.png"
							alt="Card Back"
							width={100}
							height={150}
							className="rounded shadow-lg"
						/>
					)}
				</div>
			))}
			<Score score={score} label='Dealer' />

		</div>
	);
}

export default DealerHand;
