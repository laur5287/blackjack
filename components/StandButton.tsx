import { Button } from "./ui/button"
const StandButton = ({ onStandClick }: any) => (
	<Button variant='secondary'
		className=""

		onClick={onStandClick}
	>
		STAND
	</Button>

);
export default StandButton