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
		const { click, id } = this.props;
		click(id);
	};

	public render() {
		const { className, isEmpty, isAcross } = this.props;
		return (
			<div className={className} onClick={this._handlerClick}>
				{!isEmpty ? (
					isAcross ? (
						<img src={IconCross} alt="cross" />
					) : (
						<img src={IconZero} alt="zero" />
					)
				) : (
					""
				)}
			</div>
		);
	}
}
