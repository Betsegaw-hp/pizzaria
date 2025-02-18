import { cleanup, render } from '@testing-library/react';
import { afterEach, expect, test } from 'vitest';
import Pizza from '../Pizza';

afterEach(cleanup);

test("alt text renders for pizza image", async () => {
    const name = "Pizza";
    const src = "https://picsum.photos/200/300";

    const screen = render(
        <Pizza name={name} description={"my favourite pizza"} image={src} />
    );

    const image = screen.getByRole("img");

    expect(image.src).toBe(src);
    expect(image.alt).toBe(name);
});


test("testing if the image renders", async () => {
    const screen = render(
        <Pizza name={"Pizza"} description={"my favourite pizza"}  />
    );

    const image = screen.getByRole("img");
    expect(image.src).not.toBe("");
});