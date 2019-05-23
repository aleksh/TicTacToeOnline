import * as React from "react";

//Icons
import  { ReactComponent as IconCross } from "../../assets/image/icons8-delete-filled.svg";
import { ReactComponent as IconZero} from "../../assets/image/icons8-round-filled.svg";

interface ITicItemProps {
	className?: string;
	isAcross?: boolean;
	isEmpty: boolean;
	id: number;
	click: Function;
	isMyTurn: boolean;
	done: boolean;
}

export interface ITicItemState {}

export default class TicItem extends React.Component<
	ITicItemProps,
	ITicItemState
> {
	constructor(props: any) {
		super(props);
	}

	_handlerClick = (): void => {
		const { click, id, isEmpty, isMyTurn } = this.props;
		if (isEmpty && isMyTurn) {
			click(id);
		}
    };
    
	public render() {
		const { className, isEmpty, isAcross, done } = this.props;
        const Icon = isAcross ? IconCross : IconZero;
        const imgClass = done ? "green" : "";
		return (
			<div className={className} onClick={this._handlerClick}>
				{!isEmpty && <Icon  className={imgClass}/>}
			</div>
		);
	}
}
