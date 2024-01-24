'use client'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { AvatarFallback, AvatarImage, Avatar as RootAvatar } from '@/components/ui/avatar'
import SignOutButton from './SignOutButton'


export const Avatar = ({ user }: any) => {
	const { name, avatar_url } = user.user_metadata

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<RootAvatar>
					{avatar_url && (
						<AvatarImage src={avatar_url} referrerPolicy="no-referrer" />
					)}
					{!avatar_url && <AvatarFallback>{name}</AvatarFallback>}
				</RootAvatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent >
				<DropdownMenuLabel>{name}</DropdownMenuLabel>

				<DropdownMenuSeparator />
				<DropdownMenuItem className="w-full cursor-pointer">
					<SignOutButton />

				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}