import React, { Component } from "react";
import "./App.css";
import TitleList from "./TitleList";
import Navigation from "./Navigation";
import UserProfile from "./UserProfile";
import Logo from "./Logo";
import Hero from "./Hero";
import Trailer from "../src/Trailer"; // a component to display the trailer video
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: "",
			searchUrl: "",
			trailerUrl: "", // a state variable to store the trailer URL
		};
	}

	onChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};

	handleKeyUp = (e) => {
		if (e.key === "Enter" && this.state.searchQuery !== "") {
			let searchUrl = `search/multi?query=${this.state.searchQuery}`;
			this.setState({
				searchUrl,
			});
		}
	};

	// a function to fetch the trailer URL from the API
	getTrailer = (movieId) => {
		let url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=YOUR_API_KEY`;
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				// get the first video result that has type 'Trailer'
				let trailer = data.results.find((video) => video.type === "Trailer");
				if (trailer) {
					// construct the YouTube URL for the trailer
					let trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;
					this.setState({
						trailerUrl,
					});
				}
			})
			.catch((error) => console.log(error));
	};

	render() {
		return (
			<div>
				<header className="Header">
					<Logo />
					<Navigation />
					<div id="search" className="Search">
						<input
							name="searchQuery"
							value={this.state.searchQuery}
							onKeyUp={this.handleKeyUp}
							placeholder="Search for movies"
							size="40"
							onChange={this.onChange}
							type="text"
						/>
					</div>
					<UserProfile />
				</header>
				<Hero />
				{/*    <TitleList title="Search Results" url={this.state.searchUrl} />
        <TitleList
          title="Top TV picks for Jack"
          url="discover/tv?sort_by=popularity.desc&page=1"
        /> */}
				<TitleList
					title="Trending now"
					url="discover/movie?sort_by=popularity.desc&page=1"
					getTrailer={this.getTrailer} // pass the getTrailer function as a prop to TitleList
				/>
				<TitleList
					title="Most watched in Horror"
					url="genre/27/movies?sort_by=popularity.desc&page=1"
					getTrailer={this.getTrailer} // pass the getTrailer function as a prop to TitleList
				/>
				<TitleList
					title="Sci-Fi greats"
					url="genre/878/movies?sort_by=popularity.desc&page=1"
					getTrailer={this.getTrailer} // pass the getTrailer function as a prop to TitleList
				/>
				<TitleList
					title="Comedy magic"
					url="genre/35/movies?sort_by=popularity.desc&page=1"
					getTrailer={this.getTrailer} // pass the getTrailer function as a prop to TitleList
				/>

				{/* use a conditional rendering to show the Trailer component only when the trailerUrl is not empty */}
				{this.state.trailerUrl && <Trailer url={this.state.trailerUrl} />}
			</div>
		);
	}
}
