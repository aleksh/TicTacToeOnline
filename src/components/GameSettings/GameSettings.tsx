import * as React from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

//actions
import { gameActions } from "../../bus/game/actions";
import { GAME_TYPES } from "../../utils/Constants";

interface IGameSettingsProps {
    type: number;
    isPlaying:boolean;
    actions: any;
}

export interface IGameSettingsState {}

class GameSettings extends React.Component<
	IGameSettingsProps,
	IGameSettingsProps
> {

    _handlerTypeUpdated = (event:any) => {
        const { actions } = this.props;
        
        actions.changeGameType(Number(event.target.value));        
    }

    _getOptions = () => {
        return GAME_TYPES.map(item => {
			return (
				<option value={item} key={item}>
					{item}
				</option>
			);
        });
    }

	public render() {
		const { type, isPlaying } = this.props;		

		return (
			<div>
				<form className="form-inline justify-content-center p-3">					
                    <div className="form-group">
                        <label htmlFor="type" className="form-label pr-3">Game Type</label>                        
                        <select
                            className="form-control"
                            id="type"
                            disabled={isPlaying}
                            value={type}
                            onChange={this._handlerTypeUpdated}
                        >
                            {this._getOptions()}
                        </select>                        
                    </div>					
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => {
	return {
        type: state.game.get("type"),
        isPlaying: state.game.get("isPlaying"),
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
)(GameSettings);
