import type { StorybookConfig } from "@storybook/nextjs"

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.{js,jsx,ts,tsx}", "../app/**/*.stories.{js,jsx,ts,tsx}"],
  addons: ["@storybook/addon-essentials", "@storybook/addon-interactions", "@storybook/addon-onboarding"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
}

export default config
