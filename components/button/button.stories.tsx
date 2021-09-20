import { ComponentMeta, ComponentStory } from "@storybook/react"

import Button from "."
import React from "react"

// 元数据，button描述信息
export default {
  title: "通用/Button",
  component: Button
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Basic = Template.bind({});
Basic.args = {
  children: "按钮"
}
