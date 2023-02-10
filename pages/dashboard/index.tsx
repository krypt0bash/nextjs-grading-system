import Navbar from "@components/Navbar";
import protectRoute from "@utils/protectRoute";
import React, { useEffect } from "react";

const DashboardPage = () => {
	return (
		<div>
			<Navbar />
			<p>Dasboard index</p>
		</div>
	);
};

export default DashboardPage;

export const getServerSideProps = protectRoute();
