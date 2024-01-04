const BetPanel = ({ onBetSelected }) => (
	<div className="">
		<div className="flex justify-around">
			{[10, 50, 100].map((amount) => (
				<button
					key={amount}
					className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
					onClick={() => onBetSelected(amount)}
				>
					Bet {amount}
				</button>
			))}
		</div>
	</div>
);
export default BetPanel