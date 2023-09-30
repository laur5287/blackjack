import { ThemeToggle } from '@/components/theme-toggle'
import Image from 'next/image'
import * as logic from '@/lib/jslogic'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getUserSession } from '@/lib/auth'
export default async function Home() {
  const u = await getUserSession()
  console.log(u)
  const user = await prisma.user.findFirst({
    where: {
      email: 'laur.sindile@gmail.com'
    },

  })
  return (

    <div id='page' className='flex flex-col items-center h-full '>

      <nav className="flex justify-end w-full ">
        <Button variant='ghost'><RotateCcw /></Button>
        <ThemeToggle />
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
