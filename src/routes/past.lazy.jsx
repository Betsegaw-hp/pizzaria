import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import getPastOrder from "../api/getPastOrder";
import getPastOrders from "../api/getPastOrders";
import Modal from "../Modal";

export const Route = createLazyFileRoute("/past")({
	component: PastOrdersRoute,
});

const intl = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
});

function PastOrdersRoute() {
	const [page, setPage] = useState(1);
	const [focusedOrder, setfocusedOrder] = useState();

	const { isLoading, data } = useQuery({
		queryKey: ["past-orders", page],
		queryFn: () => getPastOrders(page),
		staleTime: 30000,
	});

	const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
		queryKey: ["past-order", focusedOrder],
		queryFn: () => getPastOrder(focusedOrder),
		enabled: !!focusedOrder, // only fetch when focusedOrder is truthy (not null or undefined)
		staleTime: 24 * 60 * 60 * 1000, // 1 day
	});

	if (isLoading) {
		return (
			<div className="past-orders">
				<h2>LOADING …</h2>
			</div>
		);
	}
	return (
		<div className="past-orders">
			<table>
				<thead>
					<tr>
						<td>ID</td>
						<td>Date</td>
						<td>Time</td>
					</tr>
				</thead>
				<tbody>
					{data.map((order) => (
						<tr key={order.order_id}>
							<td>
								<button
									onClick={() =>
										setfocusedOrder(order.order_id)
									}
								>
									{order.order_id}
								</button>
							</td>
							<td>{order.date}</td>
							<td>{order.time}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="pages">
				<button disabled={page <= 1} onClick={() => setPage(page - 1)}>
					Previous
				</button>
				<div>{page}</div>
				<button
					disabled={data.length < 10}
					onClick={() => setPage(page + 1)}
				>
					Next
				</button>
			</div>
			{focusedOrder ? (
				<div onBlur={() => setfocusedOrder()}>
					<Modal>
						<button onClick={() => setfocusedOrder()}>Close</button>
						<h2>Order #{focusedOrder}</h2>
						{isLoadingPastOrder ? (
							<h2>LOADING …</h2>
						) : (
							<table>
								<thead>
									<tr>
										<td>Product</td>
										<td>Quantity</td>
										<td>Size</td>
										<td>Price</td>
									</tr>
								</thead>
								<tbody>
									{pastOrderData.orderItems.map((pizza) => (
										<tr
											key={`${pizza.pizzaTypeId}_${pizza.size}`}
										>
											<td>{pizza.name}</td>
											<td>{pizza.quantity}</td>
											<td>{pizza.size}</td>
											<td>{intl.format(pizza.price)}</td>
										</tr>
									))}
									<tr className="past-order-total">
										<td>Total</td>
										<td></td>
										<td></td>
										<td>
											{intl.format(
												pastOrderData.orderItems.reduce(
													(acc, pizza) =>
														acc + pizza.total,
													0,
												),
											)}
										</td>
									</tr>
								</tbody>
							</table>
						)}
					</Modal>
				</div>
			) : null}
		</div>
	);
}
