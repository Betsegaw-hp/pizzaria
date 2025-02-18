import { expect, test } from "vitest";
import getPastOrders from "../api/getPastOrders";

// vi.mock("../api/getPastOrders", () => ({
//     default: vi.fn(() => Promise.resolve([{order_id: 21359, date:"2024-11-01",time:"22:31:38"}])),
//   }));

test.skip("snapshot of past order json", async () => {
    const page = 1
    const result = await getPastOrders(page);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toMatchSnapshot();
});