import { toast } from 'react-hot-toast';
import React from 'react'
import Button from '../ui/Button'

function TicketCard({
    setTicketType,
    setTicketBookingOpen
}: {
    setTicketType: (val: string) => void,
    setTicketBookingOpen: (val: boolean) => void
}) {
    return (
        <div className="card w-full max-w-sm bg-white text-black p-5">
            <p className="font-bold text-4xl">
                LPU <br />
                Student Pass
            </p>
            <p className="mt-8 text-lg">
                For the students of Lovely Professional University.
            </p>

            <div className="mt-8 text-lg">
                <p className="text-primary">Includes: </p>
                <div className="flex flex-col gap-2">
                        <p> - Welcome Kit Includes: 1 x Notepad-Pen, 1 x ID-Lanyard, Stickers</p>
                        <p> - Access to CTF</p>
                        <p> - Breakfast, Lunch, Dinner & Snacks</p>
                        <p> - Complimentry Swags</p>
                        <p> - Conference Attendee Certificate</p>
                </div>
            </div>
            <div className="button mt-8">
                <Button size={'full'} onClick={()=> {
                    setTicketType('student_pass')
                    setTicketBookingOpen(true)
                    toast.success('LPU Student Pass Selected', {
                        position: 'top-right',
                    });
                }} className='bg-red-950'>Rs. 250</Button>
            </div>
        </div>
    )
}

export default TicketCard