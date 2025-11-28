import { render, screen } from "@testing-library/react"
import { Navbar } from "./navbar"
import { Provider } from "react-redux"
import { store } from "@/lib/store"

describe("Navbar", () => {
  it("renders navigation links", () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    )
    expect(screen.getByRole("button", { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /resume/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /portfolio/i })).toBeInTheDocument()
  })

  it("highlights active page", () => {
    render(
      <Provider store={store}>
        <Navbar />
      </Provider>,
    )
    const aboutBtn = screen.getByRole("button", { name: /about/i })
    expect(aboutBtn).toHaveClass("text-accent")
  })
})
