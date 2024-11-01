const intl = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

const Cart = (props) => {
	const { cart, checkout } = props;
	const total = cart.reduce((acc, item) => {
		return acc + item.pizza.sizes[item.size];
	}, 0);

	// testing
	return (
		<div className="cart">
			<h2>Cart</h2>
			<ul>
				{cart.map((item, index) => (
					<li key={index}>
						<span className="size">{item.size}</span> –
						<span className="type">{item.pizza.name}</span> –
						<span className="price">{item.price}</span>
					</li>
				))}
			</ul>
			<p>Total: {intl.format(total)}</p>
			<button onClick={checkout}>Checkout</button>
		</div>
	);
};

export default Cart;
