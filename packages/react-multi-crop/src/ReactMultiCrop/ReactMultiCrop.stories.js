import React from "react";
import ReactMultiCrop from "./ReactMultiCrop";

export default {
  title: "ReactMultiCrop",
  component: ReactMultiCrop,
};

const Template = (args) => <ReactMultiCrop hideLabel {...args} />;
export const Default = Template.bind({});
Default.args = {
  image: "https://picsum.photos/200",
  hideLabel: true,
};

Default.parameters = {
  docs: {
    description: {
      component: "Example load an image to cropper",
    },
    source: {
      code: `<ReactMultiCrop image="https://picsum.photos/200" hideLabel />`,
    },
  },
};

Default.argTypes = {
  image: {
    description: "image url",
  },
  hideLabel: {
    description: "hide the default label",
  },
};
