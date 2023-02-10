import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { signOut } from '@utils/auth';
import { useEffect } from 'react';

const SignoutPage = () => {
	const supabase = useSupabaseClient();
	useEffect(() => {
		signOut(supabase);
	});
	return (
		<div className='h-screen w-screen flex justify-center items-center'>
			<h1>You've been signed out.</h1>
		</div>
	);
};

export default SignoutPage;
