import ReactPlayer from "react-player"; // a library that can play videos from various sources
import React, { Component } from "react";

// a Trailer component that can display the video from the given URL
class Trailer extends Component {
	render() {
		return (
			<div className="Trailer">
				<h2>Trailer</h2>
				{/* use ReactPlayer to play the video from the url prop */}
				<ReactPlayer url={this.props.url} controls={true} />
			</div>
		);
	}
}

export default Trailer;
