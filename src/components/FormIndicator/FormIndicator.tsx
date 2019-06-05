import * as React from "react";
import { ReactComponent as IconMark } from "../../assets/image/checkmark.svg";
import { ReactComponent as IconCross } from "../../assets/image/cross.svg";
import { ReactComponent as IconLoading } from "../../assets/image/loader.svg";

interface IFormIndicatorProps {
	loading: boolean;
	done: boolean;
	error: boolean;
}

const FormIndicator: React.FunctionComponent<IFormIndicatorProps> = ({
	loading,
	done,
	error
}) => {
	return (
		<div>
			{loading && <IconLoading />}
			{error && <IconCross />}
			{done && <IconMark />}
		</div>
	);
};

export default FormIndicator;
