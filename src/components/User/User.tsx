import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { auth, providerFacebook } from "../../init/firebaseConfig";

//actions
import { userActions } from "../../bus/user/actions";
import UserCard from "../UserCard/UserCard";
import VOUser from "../../VO/VOUser";

interface IUserProps {
	type: number;
	user: VOUser;
	actions: any;
}

interface IUserState {}

class User extends React.Component<IUserProps, IUserState> {
    
    
    componentDidMount = () => {
        const { actions } = this.props;

        auth.onAuthStateChanged((user:any) => {
          if (user) {
            const pUser: VOUser = new VOUser(
                user.uid,
                user.displayName,
                user.photoURL
            );

            console.log("Check if user logged in");
            actions.setUser(pUser);
          } 
        });
    }
    
    _handlerLogin = () => {
		const { actions } = this.props;
		console.log("click Login");
		auth.signInWithPopup(providerFacebook)
			.then(result => {
				const user: any = result.user;
				console.log(user);
				const pUser: VOUser = new VOUser(
					user.uid,
					user.displayName,
					user.photoURL
				);

				actions.setUser(pUser);
			})
			.catch(error => {
				console.log("Error Login");
			});
	};

	public render() {
		const { user } = this.props;
		return (
			<div className="bd-highlight userCol">
				<UserCard
					displayName={user.displayName}
					isOnline={true}
					btnTitle={"Login"}
					click={this._handlerLogin}
					avatarUrl={user.avatarUrl}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		type: state.game.get("type"),
		user: state.user.get("user")
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators({ ...userActions }, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(User);
