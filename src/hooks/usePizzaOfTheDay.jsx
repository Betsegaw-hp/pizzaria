import { useDebugValue, useEffect, useState } from "react";

const usePizzaOfTheDay = () => {
	const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
	useDebugValue(
		pizzaOfTheDay ? "Pizza of the day loaded" : "Loading pizza of the day",
	);

	useEffect(() => {
		async function fetchPizzaTypes() {
			const pizzasRes = await fetch("/api/pizza-of-the-day");
			const pizzasJson = await pizzasRes.json();
			setPizzaOfTheDay(pizzasJson);
		}
		fetchPizzaTypes();
	}, []);

	return pizzaOfTheDay;
};

export default usePizzaOfTheDay;
