import type { Meta, StoryObj } from "@storybook/react"
import { PortfolioSection } from "./portfolio-section"
import { Provider } from "react-redux"
import { store } from "@/lib/store"

const meta = {
  title: "Components/PortfolioSection",
  component: PortfolioSection,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div className="p-8 bg-background">
          <Story />
        </div>
      </Provider>
    ),
  ],
} satisfies Meta<typeof PortfolioSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FilteredByWebDesign: Story = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div className="p-8 bg-background">
          <Story />
        </div>
      </Provider>
    ),
  ],
}
