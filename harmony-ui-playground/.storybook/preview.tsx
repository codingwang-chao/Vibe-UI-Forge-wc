import type { Preview } from "@storybook/react-vite"
import type { ReactNode } from "react"
import "../src/index.css"
import { ThemeProvider } from "../src/component/theme-provider"

const preview: Preview = {
  decorators: [
    (Story): ReactNode => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    controls: {
      expanded: true,
    },
  },
}

export default preview
