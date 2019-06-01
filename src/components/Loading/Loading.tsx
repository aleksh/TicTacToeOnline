import * as React from "react";
import Styles from "./Loading.module.scss";
interface ILoadingProps {}

const Loading: React.FunctionComponent<ILoadingProps> = props => {
	return (
		<section className={Styles.loading}>
			<div className={Styles["container--center"]}>
				<div className={Styles["dancing-pug"]}>
					<ul>
						<li className={`${Styles.ear} ${Styles.elq}`} />
						<li className={Styles.ear} />
						<li className={Styles.eye} />
						<li className={Styles.eye} />
						<li />
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Loading;
