import React, { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useSelector } from 'react-redux'
import { Logo, Container, LogoutBtn } from '../index'

/** Site nav bar; shows Login/Sign Up when logged out or Add Post/My Posts + Logout when logged in. */
export default function Header() {

    const authStatus = useSelector((state) => state.auth.status)
    const [menuOpen, setMenuOpen] = useState(false)

    // Each item's `active` flag decides whether it's shown for the current auth state.
    const items = [
        { name: 'Home', slug: '/', active: true },
        { name: 'Login', slug: '/login', active: !authStatus },
        { name: 'Sign Up', slug: '/signup', active: !authStatus },
        { name: 'Add Post', slug: '/add-post', active: authStatus },
        { name: 'My Posts', slug: '/my-posts', active: authStatus },
    ]

    // Shared active/inactive styling for both desktop and mobile links
    const linkClass = ({ isActive }) =>
        `rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            isActive
                ? 'bg-sky-100 text-sky-700'
                : 'text-white hover:bg-blue-100 hover:text-slate-900'
        }`

    // Same styling, but block-level and left-aligned for the mobile dropdown
    const mobileLinkClass = ({ isActive }) =>
        `block w-full text-left rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-200 ${
            isActive
                ? 'bg-sky-100 text-sky-700'
                : 'text-white hover:bg-blue-100 hover:text-slate-900'
        }`

    return (
        <header className='sticky top-0 z-20 py-3 shadow bg-gray-400'>
            <Container>
                <nav className='flex items-center'>
                    <div>
                        <Link to='/' className="inline-flex items-center">
                            <Logo width="100px" />
                        </Link>
                    </div>

                    {/* Hamburger toggle, visible only below md breakpoint */}
                    <button
                        className="ml-auto md:hidden text-white p-2"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label="Toggle menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Desktop nav */}
                    <ul className='hidden md:flex items-center gap-1 ml-auto'>
                        {items.map((item) =>
                            item.active && (
                                <li key={item.name}>
                                    {/* end is needed only for Home ("/"): every other route path is a prefix
                                        of "/", so without `end` NavLink would treat Home as always-active. */}
                                    <NavLink to={item.slug} className={linkClass} end={item.slug === '/'}>
                                        {item.name}
                                    </NavLink>
                                </li>
                            )
                        )}

                        {authStatus && (
                            <li className="ml-1">
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>

                {/* Mobile dropdown menu */}
                {menuOpen && (
                    <ul className="md:hidden flex flex-col gap-1 mt-3 pb-2">
                        {items.map((item) =>
                            item.active && (
                                <li key={item.name}>
                                    <NavLink
                                        to={item.slug}
                                        end={item.slug === '/'}
                                        className={mobileLinkClass}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {item.name}
                                    </NavLink>
                                </li>
                            )
                        )}

                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                )}
            </Container>
        </header>
    )
}