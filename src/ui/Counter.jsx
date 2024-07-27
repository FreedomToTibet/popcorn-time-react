
const Counter = ({ movies, error }) => {
	if (!error) {
		return (
			<p className="num-results">
				Found <strong>{movies.length}</strong> results
			</p>
		);
	}
	return (
		<p className="num-results">
				Found <strong>0</strong> results
			</p>
	);
}

export default Counter;