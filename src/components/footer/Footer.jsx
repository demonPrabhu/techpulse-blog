import React from 'react'
import { Link } from 'react-router'
import Logo from '../Logo'

/** Site footer: logo/tagline/copyright plus links to the author's GitHub and LinkedIn. */
function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap items-center justify-between">
                    <div className="w-full p-6 md:w-1/2">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Link to='/'>
                                <Logo width="100px" />
                                </Link>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    TechPulse — a blog platform built with React, Redux Toolkit &amp; Appwrite
                                </p>
                                <p className="mt-2 text-sm text-gray-600">
                                    &copy; 2026 Prabhat Bhatia. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6 md:w-1/2">
                        <div className="h-full md:text-right">
                            <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-gray-500">
                                Connect
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <a
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        href="https://github.com/demonPrabhu"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        href="https://www.linkedin.com/in/prabhat-bhatia-6344141a0"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Footer