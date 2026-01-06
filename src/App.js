import { useEffect, useState } from "react";
const KEY = "ebde49e4";

function App() {
	const [movies, setMovies] = useState([]);
	const [query, setQuery] = useState("");

	useEffect(() => {
		const controller = new AbortController();
		async function fetchMovies(controller) {
			try {
				const response = await fetch(
					`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
					{
						signal: controller.signal,
					}
				);
				const data = await response.json();
				if (data.Response === "True") {
					setMovies(data.Search);
				} else {
					setMovies([]);
				}
			} catch (error) {
				console.error("Error fetching movies:", error);
			}
		}
		fetchMovies(controller);
		return () => controller.abort();
	}, [query]);

	return (
		<div>
			<h1>Movies</h1>
			<input
				type="text"
				placeholder="Search movies..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<table>
				<thead>
					<tr>
						<th>Title</th>
						<th>Year</th>
					</tr>
				</thead>
				<tbody>
					{movies.map((movie) => (
						<tr key={movie.imdbID}>
							<td>{movie.Title}</td>
							<td>{movie.Year}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
