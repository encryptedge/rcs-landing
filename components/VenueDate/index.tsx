import React from 'react'

function VenueDate() {
    return (
        <section className="flex flex-col gap-8  lg:min-h-screen max-w-7xl mx-auto p-4 lg:p-8 justify-center venu">
            <div className="flex flex-col gap-8  lg:flex-row w-full items-start justify-between">
                <div className="item">
                    <p className="mb-3 text-3xl text-primary font-medium">
                        Date
                    </p>
                    <p className="text-6xl font-bold">26 - 27 Jan 2024</p>
                </div>
                <div className="item">
                    <p className="mb-3 text-3xl text-primary font-medium">
                        Time
                    </p>
                    <p className="text-6xl font-bold">12 PM</p>
                </div>
                <div className="item">
                    <p className="mb-3 text-3xl text-primary font-medium">
                        Duration
                    </p>
                    <p className="text-6xl font-bold">24 Hour</p>
                </div>
            </div>
            <div className="">
                <div className="item">
                    <p className="mb-3 text-3xl text-primary font-medium">
                        Venue
                    </p>
                    <a href='https://maps.app.goo.gl/WEPbZsMdRL4xV3o78'><p className="text-6xl font-bold">
                        Lovely Professional University, <br />
                        Jalandhar
                    </p></a>
                </div>
            </div>
        </section>
    )
}

export default VenueDate
