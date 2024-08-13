import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";
import { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "plain",
      values: [
        { name: "plain", value: "#e0e0e0" },
        { name: "warm", value: "hotpink" },
        { name: "cool", value: "deepskyblue" },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [withBackgrounds],
};

export default preview;
