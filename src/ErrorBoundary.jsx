import { Link } from "@tanstack/react-router";
import { Component } from "react";

class ErrorBoundary extends Component {
	state = { hasError: false };
	static getDerivedStateFromError() {
		return { hasError: true };
	}
	componentDidCatch(error, info) {
		console.error("ErrorBoundary caught an error => ", error);
		console.info(info);
	}
	render() {
		if (this.state.hasError) {
			return (
				<div className="error-boundary">
					<h2>Uh oh!</h2>
					<p>
						There was an error with this listing.{" "}
						<button>
							<Link to="/">Click here</Link>
						</button>{" "}
						to back to the home page.
					</p>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
