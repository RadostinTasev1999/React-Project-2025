import { describe,it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Catalog from "./Catalog";
import { MemoryRouter } from "react-router";

describe('Catalog Component', () => {
    it('Should display "Latest posts"', () => {
        render(
            <MemoryRouter>
                <Catalog heading="Latest posts"/>
            </MemoryRouter>
        )

        const textElement = screen.getByTestId('heading').textContent

        expect(textElement).toEqual('Latest posts');
        
    })
})
