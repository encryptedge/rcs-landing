'use client';
import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import {
    RegisterForm,
    registerFormSchema,
} from '@/validators/register.validator'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import axios from 'axios'
import useRazorpay from 'react-razorpay'

export default function BookTicketDialog({
    ticketType,
    open,
    setOpen,
}: {
    ticketType: string,
    open: boolean
    setOpen: (val: boolean) => void
}) {
    const [Razorpay] = useRazorpay();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterForm>({
        resolver: zodResolver(registerFormSchema),
    })
    const formSubmit = async (data: RegisterForm) => {
        if (data.uni_id === '') data.uni_id = 'N/A'
        if (data.uni_name === '') data.uni_name = 'N/A'

        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/order', {
                ticket_type: ticketType,
                ticket_data: data
            })
            const orderData = res.data
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'RCS CTF 2024',
                description: 'RCS CTF 2024 Ticket',
                image: 'https://rcs.encryptedge.in/favicon.ico',
                order_id: orderData.id,
                handler: async function (response: any) {
                    toast.success('Payment Recieved! Pease wait', {
                        position: 'top-right',
                    });

                    const verifyData = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/check-pay/' + orderData.id)
                    if (verifyData.data === 'OK!') {
                        toast.success('Ticket Confirmed!', {
                            position: 'top-right',
                        });
                    } else {
                        toast.error('Ticket not verified!', {
                            position: 'top-right',
                        });
                    }
                },
                prefill: {
                    name: data.name,
                    email: data.email,
                    contact: data.contact_no
                },
                theme: {
                    color: "#531062",
                },
            }

            const rzp1 = new Razorpay(options);

            toast.success('Payment initiated, wait for 10-15 seconds after payment', {
                position: 'top-right',
            });

            rzp1.on("payment.failed", function (response: any) {
                toast.error('Payment Failed! reach out us with order id ' + response.error.metadata.order_id, {
                    duration: 30000
                })
            });

            rzp1.open();
        } catch (err) {
            console.log(err)
            toast.error('Error Submitting Form')
        } finally {
            setOpen(false)
            reset()
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative w-full  transform overflow-hidden rounded-lg bg-black px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <form
                                    onSubmit={handleSubmit(formSubmit)}
                                    className="space-y-6 "
                                    action="#"
                                    method="POST"
                                >
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-sm font-medium leading-6 text-white"
                                        >
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="name"
                                                autoComplete="name"
                                                {...register('name')}
                                                className="block px-5 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.name && (
                                            <div className="text-sm text-red-500">
                                                {errors.name.message}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-white"
                                        >
                                            Email address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                autoComplete="email"
                                                type="email"
                                                {...register('email')}
                                                className="block px-5 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.email && (
                                            <div className="text-sm text-red-500">
                                                {errors.email.message}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="contact_no"
                                            className="block text-sm font-medium leading-6 text-white"
                                        >
                                            Contact Number
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="contact_no"
                                                autoComplete="contact_no"
                                                {...register('contact_no')}
                                                className="block px-5 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.contact_no && (
                                            <div className="text-sm text-red-500">
                                                {errors.contact_no.message}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="uni_id"
                                            className="block text-sm font-medium leading-6 text-white"
                                        >
                                            University Id
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="uni_id"
                                                {...register('uni_id')}
                                                className="block px-5 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.uni_id && (
                                            <div className="text-sm text-red-500">
                                                {errors.uni_id.message}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="uni_name"
                                            className="block text-sm font-medium leading-6 text-white"
                                        >
                                            University Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="uni_name"
                                                {...register('uni_name')}
                                                className="block px-5 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.uni_name && (
                                            <div className="text-sm text-red-500">
                                                {errors.uni_name.message}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="where_you_reside"
                                            className="block text-sm font-medium leading-6 text-white"
                                        >
                                            Where You Reside
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="where_you_reside"
                                                {...register(
                                                    'where_you_reside'
                                                )}
                                                className="block px-5 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                        {errors.where_you_reside && (
                                            <div className="text-sm text-red-500">
                                                {
                                                    errors.where_you_reside
                                                        .message
                                                }
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                        >
                                            Purchare Ticket
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
