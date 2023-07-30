import React, { Component } from "react";
import TitleListItem from "./TitleListItem";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const API_KEY = "e066523377bf09f4aafaeb2bb3577e6f";
class TitleList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {},
			mounted: false,
			trailerUrl: "",
			Movies: [],
		};
	}
	componentDidMount() {
		if (this.props.url !== "") {
			this.loadContent();
			this.setState({ mounted: true });
		}
		console.log(this.state.data);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.url !== this.props.url && nextProps.url !== "") {
			this.setState(
				{
					mounted: true,
					url: nextProps.url,
				},
				() => this.loadContent()
			);
		}
	}
	loadContent = () => {
		let requestUrl = `https://api.themoviedb.org/3/${this.props.url}&api_key=${API_KEY}`;
		fetch(requestUrl)
			.then((res) => res.json())
			.then((data) => this.setState({ data: data }))
			.catch((err) => console.log(err));
	};

	opts = {
		height: "390",
		width: "100%",
		playerVars: {
			autoplay: 1,
		},
	};

	handleClick = (movie) => {
		if (this.state.trailerUrl) {
			this.setState({ trailerUrl: "" });
		} else {
			movieTrailer(movie?.title || movie?.name || movie?.original_name)
				.then((url) => {
					const urlParams = new URLSearchParams(new URL(url).search);
					this.setState({ trailerUrl: urlParams.get("v") });
				})
				.catch((error) => console.log(error));
		}
	};

	render() {
		return (
			<div
				ref="titleCategory"
				className="TitleList"
				data-loaded={this.state.mounted}>
				<div className="Title">
					<h1>{this.props.title}</h1>
					<div className="titles-wrapper">
						{this.state.data.results &&
							this.state.data.results.map(
								(movie, index) =>
									index < 5 && (
										<TitleListItem
											adult={movie.adult}
											imageSrc={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`}
											title={movie.title}
											overview={movie.overview}
											rating={movie.vote_average}
											key={index}
										/>
									)
							)}
					</div>
				</div>
				<div style={{ padding: "40px" }}>
					{this.state.trailerUrl && (
						<YouTube videoId={this.state.trailerUrl} opts={this.opts} />
					)}
				</div>
			</div>
		);
	}
}
export default TitleList;
