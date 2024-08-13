import type { Meta, StoryObj } from "@storybook/react";

import {ListItem} from "./ListItem.tsx";
import Icon from "react-native-vector-icons/Ionicons";

const meta = {
    title: "components/ListItem",
    component: ListItem,
} satisfies Meta<typeof ListItem>;


export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        title: "Hello World",
    },
};

export const WithProps: Story = {
    args: {
        title: "Hello Props world",
        rightComponent: <Icon name={"home"} size={24} />
    }
}
