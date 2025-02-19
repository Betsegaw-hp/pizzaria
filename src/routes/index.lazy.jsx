import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: () => {
		return (
			<div className="index">
				<div className="index-brand">
					<h1>Padre Gino&apos;s</h1>
					<p>Pizza & Art at a location near you</p>
				</div>
				<ul>
					<li>
						<Link to="/order">Order</Link>
					</li>
					<li>
						<Link to="/past">Past Orders</Link>
					</li>
					<li>
						<Link to="/contact">Contact</Link>
					</li>
				</ul>
			</div>
		);
	},
});
