import React, { useEffect, useState } from 'react';
import axios from 'axios';
require('dotenv').config();

export default function DailyForecast() {
	const url = process.env.URL;

	const [currentWeather, latestWeather] = useState('');
	const [query, setQuery] = useState('');

	useEffect(() => {
		const getCurrentWeather = () => {
			if (query === '') {
				return;
			} else {
				axios
					.get(`https://api.weather.gov/gridpoints/TOP/31,80/forecast/hourly`)
					.then((res) => {
						latestWeather({
							currentTemp: res.data.properties.periods[0].temperature,
							unit: res.data.properties.periods[0].temperatureUnit,
							data: res.data,
						});
					})
					.catch((err) => console.log(err.message));
			}
		};
		getCurrentWeather();
	}, [url, query]);
	console.log('data', currentWeather);
	console.log('url', url);
	return (
		<div>
			<input
				type='text'
				name='search'
				value={query}
				onChange={(e) => {
					setQuery(e.target.value);
				}}></input>
			<p>
				Current Weather: {currentWeather.currentTemp} {currentWeather.unit}
			</p>
		</div>
	);
}
