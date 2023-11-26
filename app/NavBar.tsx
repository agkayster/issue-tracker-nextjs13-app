'use client';

import Link from 'next/link';
import React from 'react';
import { FaBug } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import classnames from 'classnames';

const NavBar = () => {
	const currentPath = usePathname();

	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' },
	];
	return (
		<nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
			<Link href='/'>
				<FaBug />
			</Link>
			<ul className='flex space-x-6'>
				{links.map(({ href, label }) => (
					<li key={href}>
						<Link
							className={classnames({
								'text-red-500': href === currentPath,
								'text-zinc-500': href !== currentPath,
								'hover:text-zinc-800 transition-colors': true,
							})}
							href={href}>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavBar;
