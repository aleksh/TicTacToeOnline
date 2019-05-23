import * as React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//actions
import { gameActions } from "../../bus/game/actions";
import GameSettings from "../GameSettings/GameSettings";
import TicTacToe from "../TicTacToe/TicTacToe";
import UserCard from "../UserCard/UserCard";

interface ICurrentUserProps {
	type: number;
	actions: any;
}

interface ICurrentUserState {}

class CurrentUser extends React.Component<ICurrentUserProps, ICurrentUserState> {
	public render() {		
		return (
			<div className="bd-highlight userCol">
                <UserCard
                    isPlaying = {false}
					displayName={"myname"}
					isOnline={true}
					avatarUrl={"https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto/gigs/21760012/original/d4c0c142f91f012c9a8a9c9aeef3bac28036f15b/create-your-cartoon-style-flat-avatar-or-icon.jpg"}					
				/>                
            </div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		type: state.game.get("type")
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators({ ...gameActions }, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CurrentUser);
