import type { Meta, StoryObj } from "@storybook/react"
import { ContactSection } from "./contact-section"

const meta = {
  title: "Components/ContactSection",
  component: ContactSection,
  decorators: [
    (Story) => (
      <div className="p-8 bg-background">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ContactSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
