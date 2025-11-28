import type { Meta, StoryObj } from "@storybook/react"
import { AboutSection } from "./about-section"
import { Provider } from "react-redux"
import { store } from "@/lib/store"

const meta = {
  title: "Components/AboutSection",
  component: AboutSection,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div className="p-8 bg-background">
          <Story />
        </div>
      </Provider>
    ),
  ],
} satisfies Meta<typeof AboutSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
