import * as React from "react";

//Icons
import IconCross from "../../assets/image/icons8-delete-filled.svg";
import IconZero from "../../assets/image/icons8-round-filled.svg";

interface ITicItemProps {
	className?: string;
	isAcross?: boolean;
	isEmpty: boolean;
	id: number;
    click: Function;
    isMyTurn: boolean;
}

export interface ITicItemState {}

export default class TicItem extends React.Component<
	ITicItemProps,
	ITicItemState
> {
	constructor(props: any) {
		super(props);
	}

	_handlerClick = ():void => {
        const { click, id, isEmpty, isMyTurn } = this.props;
        if (isEmpty && isMyTurn) {
            click(id);
        }
	};

	public render() {
        const { className, isEmpty, isAcross } = this.props;
        const Icon = isAcross ? IconCross : IconZero;
		return (
			<div className={className} onClick={this._handlerClick}>
				{!isEmpty && <img src={Icon} alt="" />}
			</div>
		);
	}
}
