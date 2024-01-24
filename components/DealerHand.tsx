import Image from "next/image";
import { DealerHandProps } from "@/app/types/gameTypes";
import { cn, getCardImagePath } from "@/utils/utils";
import { Score } from "./Score";


const DealerHand: React.FC<DealerHandProps> = ({ dealer }) => {

	const { hand, show, score } = dealer;


	return (
		<div className=" flex w-full justify-center   items-center p-4 rounded-lg shadow-md">

			<div className="relative min-w-[200px] flex   h-[150px]">
				{hand?.map((card, index) => (



					<div key={`${card}-${index}`} className={cn(``, show && index >= 1 && ` absolute    w-[100px] h-[150px] left-${6 * index}`)}>
						{show || index !== 0 ? (
							<Image

								src={getCardImagePath(card)}
								alt={`Card ${card}`}
								width={100}
								height={150}
								className={cn(`rounded shadow-lg `, index >= 1 && ` -translate-x-18`)}
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
			</div>
			<Score score={score} label='Dealer' />

		</div>
	);
}

export default DealerHand;
