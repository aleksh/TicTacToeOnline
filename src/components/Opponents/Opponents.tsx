import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { allUsersActions } from "../../bus/allUsers/actions";
import { gameActions } from "../../bus/game/actions";
import VOUser from "../../VO/VOUser";
import UserCard from "../UserCard/UserCard";
import UsersList from "../UsersList/UsersList";

import { fb } from '../../init/firebaseConfig';
import { userActions } from "../../bus/user/actions";



interface IOpponentsProps {
    user: VOUser;
	choosedUser: VOUser;
	allUsers: VOUser[];
    actions: any;
    isPlaying:boolean;
}

interface IOpponentsState {}

class Opponents extends React.Component<IOpponentsProps, IOpponentsState> {
	_handlerInviteForPlay = () => {
		const { choosedUser, actions, user } = this.props;

        if(choosedUser.isPC) {
            actions.playWithPC();    
        } else {
            //actions.inviteToPlay(choosedUser);
            // need Refacvtor Later
            
            const newGame = {
                player1: user,
                player2: choosedUser,
                stepId: 0 ,
                isPlaying: false,                
            }
            
            
            fb.database().ref("games").push(newGame).then((response) =>{
                const gameId = response.key;
                console.log("KKKKKKKKKEEEYYY");
                console.log(gameId);
                const curGameRef = fb.database().ref(`games/${gameId}`);
                    curGameRef.on('value', snapshot => {
                    console.log("snaphott GAAAAME waiting for invite");
                    console.log(snapshot.val());

                    if(snapshot.exists()){
                        console.log("OPPONENT COMP Play Game");
                        console.log(snapshot.val());
                        
                        if(snapshot.val().isPlaying === true) {
                            curGameRef.off();

                           // const reStepId = fb.database().ref(`games/${key}`)

                           this.props.actions.playWithUser({                                
                                gameId,
                                isMyTurn: true,
                                amICross: true,
                            });

                            console.log("Play Game");                         
                        }
                    } else {
                        //Decline or Game End
                    }
                })
            });

        }	
	};

	_handlerSetOpponent = (pUser: VOUser) => {
		const { actions } = this.props;
		actions.setOpponent(pUser);
	};

	public render() {
		const { choosedUser, allUsers, isPlaying } = this.props;
		return (
			<div className="bd-highlight userCol">				
				<UserCard
                    isPlaying = {isPlaying}
					displayName={choosedUser.displayName}
					isOnline={choosedUser.isOnline}
					avatarUrl={choosedUser.photoURL}
                    click={this._handlerInviteForPlay}
                    btnTitle={"Play with Me"}
				/>
				<UsersList
                    isPlaying = {isPlaying}
					choosedUser={choosedUser}
					allUsers={allUsers}
					click={this._handlerSetOpponent}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		choosedUser: state.allUsers.get("choosedUser"),
        allUsers: state.allUsers.get("allUsers"),
        isPlaying: state.game.get("isPlaying"),
        user: state.user.get("user"),
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		actions: bindActionCreators(
			{ ...gameActions, ...allUsersActions },
			dispatch
		)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Opponents);
