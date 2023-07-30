import React from "react";
// import HeroButton from "./HeroButton";
import "./Banner.css";
import { useEffect, useState } from "react";
// import axios from "../fetch/axios";
import axios from "axios";
import requests from "./requests";

function Hero() {
	const [Movie, setMovie] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const request = await axios.get(
					`https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`
				);
				setMovie(
					request?.data.results[
						Math.floor(Math.random() * request.data.results.length)
					]
				);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);
	// console.log(Movie);

	function truncate(str, n) {
		return str?.length > n ? str.substr(0, n - 1) + "..." : str;
	}

	return (
		<header
			className="banner"
			style={{
				backgroundSize: "cover",
				backgroundImage: `url("https://image.tmdb.org/t/p/original/${Movie?.backdrop_path}")`,
				backgroundPosition: "center center",
			}}>
			<div className="banner__contents">
				<h1 className="banner__title">
					{Movie?.title || Movie?.name || Movie?.original_name}
				</h1>
				<div className="banner__buttons">
					<button className="banner__button">Play</button>
					<button className="banner__button">My List</button>
				</div>
				<h1 className="banner__description">
					{truncate(Movie?.overview, 150)}
				</h1>
			</div>
			<div className="banner__fadeBottom"></div>
			<div className="overlay" />
			{/* <div className="button-wrapper">
				<HeroButton primary={true} text="Watch now" />
				<HeroButton primary={false} text="+ My list" />
			</div> */}
		</header>
	);
}

export default Hero;
