import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}
export const getCardImagePath = (card: string) => {
	// Update this path to correctly point to your images directory
	const imagePath = `/cards/${card}.png`;
	return imagePath;
};
