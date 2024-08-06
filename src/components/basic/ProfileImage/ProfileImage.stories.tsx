import type { Meta, StoryObj } from "@storybook/react";

import {ProfileImage} from "./ProfileImage.tsx";

const meta = {
    title: "components/ProfileImage",
    component: ProfileImage,
} satisfies Meta<typeof ProfileImage>;


export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        letter: "M"
    },
};
