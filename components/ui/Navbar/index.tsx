'use client'
import React, { Fragment, useState } from 'react'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    XMarkIcon,
    HomeIcon,
} from '@heroicons/react/24/outline'

import { cn } from '@/lib/utils'
import RegisterDialog from '@/components/RegisterDialog'
const navigation = [
    {
        name: 'Join Discord',
        href: 'https://s.encryptedge.in/discord',
        current: false,
    },
]

const Navbar = () => {
    const [registerOpen, setRegisterOpen] = useState(false)
    return (
        <>
            <Disclosure
                as="nav"
                className="fixed w-screen top-0 left-0 z-10 bg-background lg:border-b-2 border-primary"
            >
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8 w-full lg:py-4">
                            <div className="relative flex h-16 items-center justify-between w-full">
                                <div className="flex items-center px-2 lg:px-0 w-full">
                                    <div className="shrink-0">
                                        <img
                                            src="/logo.png"
                                            alt="RCS CTF Logo"
                                            className="h-24"
                                        />
                                        {/* <h1 className="text-3xl font-bold">
                                        RCS CTF 2024
                                    </h1> */}
                                    </div>
                                    <div className="hidden lg:ml-auto lg:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    target="_blank"
                                                    className={cn(
                                                        'rounded-md px-3 py-2 text-xl flex items-center gap-2 hover:text-white transition ease-in-out',
                                                        {
                                                            'text-white':
                                                                item.current,
                                                            'text-gray-500 hover:bg-opacity-10':
                                                                !item.current,
                                                        }
                                                    )}
                                                    aria-current={
                                                        item.current
                                                            ? 'page'
                                                            : undefined
                                                    }
                                                >
                                                    {item.current && (
                                                        <span className="h-2 w-2 border-2 border-primary block"></span>
                                                    )}
                                                    {item.name}
                                                </a>
                                            ))}
                                            {/* <a
                                                href={'#'}
                                                className={
                                                    'px-3 py-2 text-xl flex items-center gap-2 bg-white text-black hover:bg-black hover:text-white hover:border-white hover:ring-1 hover:ring-white focus:ring-1 focus:ring-white hover:rounded-md transition duration-150 ease-in-out'
                                                }
                                                onClick={() =>
                                                    setRegisterOpen(true)
                                                }
                                            >
                                                Register
                                            </a> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex lg:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-primary p-2 text-white focus:outline-none">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>
                        <Disclosure.Panel className="lg:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={cn(
                                            'block rounded-md px-3 py-2 text-base font-medium ',
                                            {
                                                'bg-primary text-white':
                                                    item.current,
                                                'text-white hover:bg-opacity-75':
                                                    !item.current,
                                            }
                                        )}
                                        aria-current={
                                            item.current ? 'page' : undefined
                                        }
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                                <Disclosure.Button
                                    as="a"
                                    href="#ticketSection"
                                    className={cn(
                                        'block px-3 py-2 text-base font-medium bg-white text-black'
                                    )}
                                    onClick={() => setRegisterOpen(false)}
                                >
                                    Get passes
                                </Disclosure.Button>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <RegisterDialog open={registerOpen} setOpen={setRegisterOpen} />
        </>
    )
}

export default Navbar
