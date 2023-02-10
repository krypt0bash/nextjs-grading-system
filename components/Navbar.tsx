import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import Logo from '@public/logo.svg';
import { useEffect, useState } from 'react';
import NavbarUser from '@components/NavbarUser';
import { getProfileByUser } from '@utils/auth';

const Navbar = () => {
	const [profile, setProfile] = useState();
	const supabase = useSupabaseClient();
	const user = useUser();

	// ? Is it better maybe to SSR it?
	useEffect(() => {
		if (user) {
			getProfileByUser(supabase, user, setProfile);
		}
	}, [user]);
	return (
		<div className='w-full mt-2'>
			<div className='flex mx-auto w-4/5 h-14 items-center justify-between'>
				<Link href='/' className='font-bold text-lg'>
					<div className='flex items-center justify-center cursor-pointer'>
						<Logo className='w-8 mr-2' />
						<h1 className='font-semibold hidden md:block'>eCatalog</h1>
					</div>
				</Link>
				<NavbarUser user={user} profile={profile} />
			</div>
		</div>
	);
};

export default Navbar;
