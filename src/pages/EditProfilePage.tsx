import React from "react";
import Catcher from "../components/Catcher/Catcher";
import EditProfile from "../components/EditProfile/EditProfile";
import Modals from "../components/Modals/Modals";
import Opponents from "../components/Opponents/Opponents";
import User from "../components/User/User";

interface IEditProfilePageProps {}

const EditProfilePage: React.FunctionComponent<IEditProfilePageProps> = (
	props: IEditProfilePageProps
) => {
	return (
		<Catcher>
			<div className="container-fluid">
				<div className="row m-0 justify-content-center flex-nowrap">
					<User />
					<EditProfile />
					<Opponents disabled/>
				</div>
			</div>
			<Modals />
		</Catcher>
	);
};

export default EditProfilePage;
