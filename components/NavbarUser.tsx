import Link from 'next/link';

const NavbarUser = ({ user, profile }: any) => {
	return (
		<div className='dropdown dropdown-end '>
			{!profile?.avatar_url ? (
				// ? Better to change the avatar to a component?
				<img
					tabIndex={0}
					className='rounded-full w-10 cursor-pointer'
					src={`https://ui-avatars.com/api/name=${profile?.full_name}`}
				/>
			) : (
				<img tabIndex={0} className='rounded-full w-10 h-10 cursor-pointer' src={`${profile?.avatar_url}`} />
			)}
			<ul tabIndex={0} className='dropdown-content menu p-2 bg-white mt-1 rounded w-52 text-sm'>
				{!user ? (
					<>
						<li className='hover:bg-gray-800 hover:text-white p-2 rounded'>
							<Link href='/login'>Login</Link>
						</li>
					</>
				) : (
					<>
						<div className='p-2 border-b-2 border-gray-100 cursor'>
							<h1 className='text-xs'>Logged in as</h1>
							<p className='mt-1 text-xs font-bold'>{user?.email}</p>
						</div>
						<li className='hover:bg-gray-800 hover:text-white p-2 rounded'>
							<Link href='/dashboard'>Dashboard</Link>
						</li>
						<li className='hover:bg-gray-800 hover:text-white p-2 rounded'>
							<Link href='/dashboard/account'>Account</Link>
						</li>
						<li className='hover:bg-gray-800 hover:text-white p-2 rounded'>
							<Link href='/login/signout'>Sign out</Link>
						</li>
					</>
				)}
			</ul>
		</div>
	);
};

export default NavbarUser;
