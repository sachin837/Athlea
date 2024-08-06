import type { Meta, StoryObj } from "@storybook/react";

import {BackHeader as Header} from "./BackHeader.tsx";

const meta = {
    title: "components/Header",
    component: Header,
} satisfies Meta<typeof Header>;


export default meta;

type Story = StoryObj<typeof meta>;

export const BackHeader: Story = {
    args: {
        title: "Hello World",
    },
};
