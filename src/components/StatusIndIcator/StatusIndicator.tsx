import * as React from 'react'
import cl from "classnames";

interface IStatusIndicatorProps {
    isOnline:boolean;
}

const StatusIndicator: React.FunctionComponent<IStatusIndicatorProps> = (props) => {    
    const badgeClass = cl({
        "mx-1": true,
        "badge badge-pill": true,
        "badge-success": props.isOnline,
        "badge-danger": !props.isOnline,
    });

  return <span className={badgeClass}>&nbsp;</span>;
};

export default StatusIndicator;