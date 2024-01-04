// Import your game context if you're using one

const BalanceDisplay = ({ balance }: { balance: number }) => {


	return (
		<div className="min-h-[50px] border border-red-500 flex w-full justify-end">

			<div className="p-4  rounded shadow-md ">
				<h3 className="text-lg font-semibold">Balance</h3>
				<p className="text-2xl font-bold">${balance}</p>
			</div>
		</div>
	);
};

export default BalanceDisplay;
