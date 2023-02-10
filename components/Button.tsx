type ButtonProps = {
	text: string;
	link?: string;
	color?: string;
};
const Button = ({ text, link, color }: ButtonProps) => {
	//TODO: Add change password logic & modal
	//TODO: Find a way to color the button without tailwindcss exceptions config

	{
		/*
        *Change password logic
        const { data, error } = await supabase.auth.updateUser({
            email: "new@email.com",
            password: "new-password",
            data: { hello: 'world' }
        })
      
        */
	}

	return !link ? (
		<button
			onClick={() => {}}
			className={`text-sm bg-gray-50 px-5 py-2 rounded-md outline-0 border-2 cursor-pointer`}
		>
			{text}
		</button>
	) : (
		<a
			onClick={() => {}}
			href={link}
			className={`text-xs bg-gray-50 px-5 py-2 rounded-md outline-0 border-2 cursor-pointer`}
		>
			{text}
		</a>
	);
};
export default Button;
