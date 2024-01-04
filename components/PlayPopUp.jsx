import { Button } from '@/components/ui/button'
const PlayPopUp = ({ onStartClick }) => (
	<div className=" bg-opacity-50 flex  items-center justify-center ">
		<div className=" p-4 rounded text-center">
			<h2>Welcome to Blackjack!</h2>
			<Button
				variant='secondary'
				onClick={onStartClick}
			>
				Play
			</Button>
		</div>
	</div>
);
export default PlayPopUp