import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const protectRoute: (inner?: GetServerSideProps) => GetServerSideProps = (inner) => {
	return async (ctx) => {
		const supabase = createServerSupabaseClient(ctx);
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (!session)
			return {
				redirect: { 
					destination: '/login',
					permanent: false,
				},
			};

		if (inner) return inner(ctx);

		return { props: {} };
	};
};
export default protectRoute;
