import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'
import type { Database } from '@/types/types_db'

export async function GET(request: NextRequest) {
	const requestUrl = new URL(request.url)
	const code = requestUrl.searchParams.get('code')

	if (code) {
		const supabase = createRouteHandlerClient<Database>({ cookies })
		await supabase.auth.exchangeCodeForSession(code)
		console.log('this is from route', code, supabase)
	} else {
		console.log('this is from route no code', code)

	}



	// URL to redirect to after sign in process completes
	return NextResponse.redirect(requestUrl.origin)
}