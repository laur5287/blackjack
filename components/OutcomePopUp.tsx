import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

const OutcomePopUp = ({ isOpen, onDismiss, message }: any) => {
	return (
		<Popover open={isOpen} onOpenChange={onDismiss}>
			<PopoverTrigger asChild>
				{/* Invisible trigger for programmatic control */}
				<button style={{ display: "none" }}>Open</button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="">
					<h2>Game Outcome</h2>
					<p>{message}</p>
					<button onClick={onDismiss}>Close</button>
				</div>
			</PopoverContent>
		</Popover>
	);
};
export default OutcomePopUp
