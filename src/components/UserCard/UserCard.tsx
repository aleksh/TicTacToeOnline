import * as React from "react";
import cl from "classnames";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import VOUser from "../../VO/VOUser";


interface ITicItemProps {
	user:VOUser
}

export interface ITicItemState {}

class UserCard extends React.Component<
	ITicItemProps,
	ITicItemState
> {	

	public render() {        
        const { user: { displayName, isOnline, avatarUrl  } } = this.props;        
        const badgeClass = cl({
            "ml-2": true,
            "badge badge-pill": true,
            "badge-success": isOnline,
            "badge-danger": !isOnline,
        });
		return (
			<div className="card text-center">
                <div className="card-header">
                    <strong>{displayName}</strong>
                    <span className={badgeClass}>&nbsp;</span>
                </div>                
                <div className="card-body">                                                            
                    <img src={avatarUrl} className="card-img-top rounded-circle border border-success w-50" alt={displayName} />
                    <button type="button" className="btn btn-success mt-3">Play with Me</button>
                </div>
            </div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
		user: state.allUsers.get("choosedUser")		
	};
};

const mapDispatchToProps = (dispatch: any) => {
	return {
//		actions: bindActionCreators({ ...allUsersActions }, dispatch)
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(UserCard);
