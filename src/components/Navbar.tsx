import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='hidden lg:block'>
        <div className="container">
            <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish">
                <Link className="relative nav_link" href="/">HOME</Link>
                <Link className="relative nav_link" href="/">CATEGORIES</Link>
                <Link className="relative nav_link" href="/">ACCESSORIES</Link>
                <Link className="relative nav_link" href="/">OFFERS</Link>

            </div>
        </div>
    </div>
  )
}

export default Navbar