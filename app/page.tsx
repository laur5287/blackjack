import { ThemeToggle } from '@/components/theme-toggle'
import Image from 'next/image'
import * as logic from '@/lib/jslogic'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getUserSession } from '@/lib/auth'
import { Avatar } from '@/components/Avatar'
import { SignIn } from '@/components/signin'

export default async function Home() {
  const user = await getUserSession()
  console.log(user)
  const u = await prisma.user.findFirst({
    where: {
      email: 'laur.sindile@gmail.com'
    },

  })
  return (

    <div id='page' className='flex flex-col items-center h-full '>

      <nav className="flex p-4 space-x-2 justify-end items-center w-full ">
        {/* <Button variant='ghost'><RotateCcw /></Button> */}
        <ThemeToggle />

        {user ? <Avatar user={user} /> : <SignIn />}


      </nav>

      {/* <DealerHand dealer={dealer} /> */}
      <div className="flex justify-between w-full p-1 sm:px-16 md:px-24">
        <Button
          className='h-8'
        >HIT </Button>
        <Button  >STAND </Button>
      </div>
      <div className="">hello {user?.name}</div>
      {/* <PlayerHand player={player} /> */}


    </div>
  )
}
