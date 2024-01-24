'use client';

import { useSupabase } from '@/app/supabase-provider';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';


export default function SignOutButton() {
	const router = useRouter();
	const { supabase } = useSupabase();

	const handleSignOut = async () => {
		await supabase.auth.signOut()
		router.refresh()
	}
	return (
		<Button
			variant='destructive'
			onClick={handleSignOut}
			className='w-full'>
			Sign out
		</Button>
	);
}