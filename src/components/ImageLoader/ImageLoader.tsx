import * as React from "react";

interface IImageLoaderProps {
	src: string;
	style?: any;
	className?: string;
	onLoad?: Function;
	onError?: Function;
	image?: Function;
	loading?: any;
	error?: Function;
}

interface IImageLoaderState {
	isLoading: boolean;
	isError: boolean;
	src?: string;
	width?: number;
	height?: number;
	errMsg?: any;
}

export default class ImageLoader extends React.PureComponent<
	IImageLoaderProps,
	IImageLoaderState
> {
	constructor(props: IImageLoaderProps) {
		super(props);
		this.state = {
			isLoading: true,
			isError: false,
			src: "",
			width: 90,
			height: 90,
			errMsg: null
        };
        console.log("constructor");
	}
	

	componentDidUpdate = (
		prevProps: IImageLoaderProps,
		prevState: IImageLoaderState
	) => {
		// reload only when image src is changed.
		if (this.props.src !== prevProps.src) {
            console.log("Reload Did Update");
			this._reload(this.props);
		}
	};

	componentDidMount = () => {
        console.log("Reload Did Mount");
        console.log(this.state);
        console.log(this.props);
        if(!this.state.src || this.state.src.length === 0) {
            this._reload(this.props);
        }
	};

	_reload = (props: IImageLoaderProps) => {
        console.log("Reload");
		// initialize
		this.setState({
			isLoading: true,
			isError: false,
			src: "",
			errMsg: null
		});

		const image = new Image();

		image.src = props.src;
		image.onload = () => {
			this.setState({
				src: image.src,
				width: image.width,
				height: image.height,
				isLoading: false,
				isError: false,
				errMsg: null
			});
			if (props.onLoad) {
				props.onLoad(image);
			}
		};
		image.onerror = err => {
			this.setState({
				src: "",
				width: 90,
				height: 90,
				isLoading: false,
				isError: true,
				errMsg: err
			});
			if (props.onError) {
				props.onError(err);
			}
		};
	};

	public render() {
		const { loading, error, image, style, className } = this.props;
		const { src, width, height, isLoading, isError, errMsg } = this.state;

		if (loading && isLoading) {
			return loading;
		} else if (error && isError && errMsg) {
			return error(errMsg);
		} else if (src && image) {
			return image({ src, width, height });
		} else if (src) {
			return (
				<img
					src={src}
					style={style}
					className={className}
					width={width}
                    height={height}
                    alt=""
				/>
			);
		}

		return null;
	}
}
