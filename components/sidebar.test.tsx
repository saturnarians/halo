import { render, screen } from "@testing-library/react"
import { Sidebar } from "./sidebar"
import { Provider } from "react-redux"
import { store } from "@/lib/store"

describe("Sidebar", () => {
  it("renders the sidebar", () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>,
    )
    expect(screen.getByText("Richard hanrick")).toBeInTheDocument()
  })

  it("displays contact information", () => {
    render(
      <Provider store={store}>
        <Sidebar />
      </Provider>,
    )
    expect(screen.getByText("Web developer")).toBeInTheDocument()
  })
})
