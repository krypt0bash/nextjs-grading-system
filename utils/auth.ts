import { SupabaseClient, User, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';

export const getProfileByUser = async (
	supabase: SupabaseClient,
	user: User | null,
	setState: Dispatch<SetStateAction<undefined>>
) => {
	const { data, error } = await supabase.from('profile').select('*').eq('id', user?.id).single();
	if (data) {
		setState(data);
	}
};
const getClassroomByUser: (inner?: GetServerSideProps) => GetServerSideProps = (inner) => {
	return async (ctx) => {
		const supabase = createServerSupabaseClient(ctx);
		const {
			data: { user },
		} = await supabase.auth.getUser();

		const { data: classroomObject, error: classroom_error } = await supabase
			.from('classrooms')
			.select('*')
			.eq('user_id', user?.id)
			.single();

		const { data: classroom, error } = await supabase
			.from('classroom')
			.select('*')
			.eq('id', classroomObject?.id)
			.single();

		if (inner) return inner(ctx);

		return { props: { classroom } };
	};
};

export default getClassroomByUser;

export const signOut = async (supabase: SupabaseClient) => {
	const { error } = await supabase.auth.signOut();
	if (error) toast.error('There was an error while logging out.');
};
