'use client'

interface BetAreaProps {
	currentBet: number;
	onBetSelected: (bet: number) => void;
	onClearBet: () => void;
	onPlaceBet: () => void;
}

const BetArea: React.FC<BetAreaProps> = ({ currentBet, onBetSelected, onClearBet, onPlaceBet }) => {
	const betOptions = [10, 50, 100, 500]; // Define your bet denominations here

	return (
		<div id='bet_area' className="  flex flex-col items-center p-4 rounded ">
			<h3 className="text-lg font-semibold">Place Your Bets</h3>
			<div className="bet-options my-2">
				{betOptions.map((amount) => (
					<button
						key={amount}
						className={` ${currentBet === amount ? 'bg-green-500' : 'bg-blue-500'} 
                        hover:bg-blue-700  font-bold py-2 px-4 rounded m-1`}
						onClick={() => onBetSelected(amount)}
					>
						${amount}
					</button>
				))}
			</div>
			<div className="current-bet my-2">
				<span>Current Bet: ${currentBet}</span>
			</div>
			<div className="bet-controls my-2">
				<button className="bg-red-500 hover:bg-red-700  font-bold py-2 px-4 rounded m-1" onClick={onClearBet}>
					Clear Bet
				</button>
				<button className="bg-green-500 hover:bg-green-700  font-bold py-2 px-4 rounded m-1" onClick={onPlaceBet}>
					Place Bet
				</button>
			</div>
		</div>
	);
};

export default BetArea;

