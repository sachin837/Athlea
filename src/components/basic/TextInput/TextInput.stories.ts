import type { Meta, StoryObj } from "@storybook/react";

import {TextInput} from "./TextInput.tsx";

const meta = {
    title: "components/TextInput",
    component: TextInput,
} satisfies Meta<typeof TextInput>;


export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        value: "Hello there",
        label: "Username"
    },
};
