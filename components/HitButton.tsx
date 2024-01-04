import { Button } from "./ui/button"
const HitButton = ({ onHitClick }: { onHitClick: any }) => (
	<Button size='lg' variant='secondary'


		onClick={onHitClick}
	>
		Hit
	</Button>

);
export default HitButton