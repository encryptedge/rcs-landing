"use client";
import SponsorSection from '@/components/SponsorSection'
import CoreTeam from '@/components/CoreTeam'
import CommunityPartners from '@/components/CommunityPartners'
import PerksSection from '@/components/PerksSection'
import RersourcePersons from '@/components/ResourcePersons'
import TicketSection from '@/components/TicketSection'
import VenueDate from '@/components/VenueDate'
import { PlayCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import Organisers from '@/components/Organisers'
import RegisterDialog from '@/components/RegisterDialog'
import { useState } from 'react'

export default function Home() {
    const [registerOpen, setRegisterOpen] = useState(false)
    return (
        <main className="text-text ">
            <section className="relative min-h-screen lg:h-screen w-screen pt-6">
                <div className="flex relative flex-col min-h-screen lg:h-screen px-4 lg:px-8 pt-18 justify-center p-2 mx-auto max-w-7xl">
                    <h1 className="text-5xl lg:text-6xl font-bold glitch">
                        REPUBLIC OF <br />
                        <span className="text-primary glitch">
                            CYBER SENTINELS CTF
                        </span>
                    </h1>
                    <h2 className="text-2xl lg:text-3xl font-bold pt-3">
                        Decrypt, Defend, Conquer <br />
                        <span>Cyber Sentinels at the Helm</span>
                    </h2>
                    <div className="paras max-w-xl flex gap-8 py-8">
                        <p>
                            Welcome to the Cyber Sentinels CTF, where digital
                            warriors embrace the challenge. In the heartbeat of
                            technology, our rallying cry is clear:
                            &quot;Decrypt, Defend, Conquer.&quot; More than a
                            Capture The Flag event, this is a journey into
                            cybersecurity, where offense and defense converge.
                        </p>
                    </div>
                    <div className="mt-10 text-xl flex items-center gap-3">
                        <a href="https://blog.encryptedge.in/2023/RCS-CTF-2024/">
                            <div className="flex text-white font-bold hover:bg-white hover:text-black hover:border-white hover:ring-1 hover:ring-white focus:ring-1 focus:ring-white">
                                <PlayCircleIcon
                                    height={30}
                                    width={30}
                                    className=""
                                />{' '}
                                <span className="">Read Blog</span>
                            </div>
                        </a>
                        <button onClick={() =>
                             setRegisterOpen(true)
                        }>
                            <div className="flex text-white font-bold hover:bg-white hover:text-black hover:border-white hover:ring-1 hover:ring-white focus:ring-1 focus:ring-white">
                                <PlusCircleIcon
                                    height={30}
                                    width={30}
                                    className=""
                                />{' '}
                                <span className="">Register Interest</span>
                            </div>
                        </button>
                    </div>
                    <div className="date hidden lg:block absolute top-80 right-0 rotate-90">
                        <p className="text-6xl text-primary font-bold tracking-[1.5rem]">
                            CTF
                        </p>
                        <p className="text-4xl font-semibold ml-28">
                            26 · 01 · 2024
                        </p>
                    </div>
                </div>

                <video
                    className="w-full h-screen absolute top-0 -z-10 object-cover"
                    src="https://d2uvmg2nv1rjub.cloudfront.net/rcs-hero-back.mp4"
                    autoPlay
                    loop
                    muted
                />
            </section>

            <PerksSection />
            <VenueDate />
            <TicketSection />
            {<SponsorSection />}
            <CoreTeam />
            <RersourcePersons />
            <CommunityPartners />
            <Organisers />
            <RegisterDialog open={registerOpen} setOpen={setRegisterOpen} />
        </main>
    )
}