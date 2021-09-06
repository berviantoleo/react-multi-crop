import React from 'react';
import { Meta, Story } from '@storybook/react';
import ReactMultiCrop, { IOutputData, IReactMultiCropProps } from './ReactMultiCrop';

export default {
  title: 'React Multi Crop',
  component: ReactMultiCrop,
} as Meta;

const Template: Story<IReactMultiCropProps> = (args: IReactMultiCropProps) => (
  <ReactMultiCrop {...args} />
);

export const DefaultEditable = Template.bind({});

DefaultEditable.args = {
  id: 'defaultEdit',
  image: 'https://picsum.photos/800',
  readonly: false,
  showLabel: false,
  showButton: false,
  includeDataUrl: false,
  includeHtmlCanvas: false,
  cropBackgroundColor: 'yellow',
  cropBackgroundOpacity: 0.3,
  input: {
    onChange(value: Array<IOutputData>) {
      console.log(value);
    },
  },
};

export const DefaultReadOnly = Template.bind({});

DefaultReadOnly.args = {
  id: 'defaultReadonly',
  image: 'https://picsum.photos/800',
  readonly: true,
  showLabel: false,
  showButton: false,
  includeDataUrl: false,
  includeHtmlCanvas: false,
  cropBackgroundColor: 'yellow',
  cropBackgroundOpacity: 0.3,
  record: {
    clippings: [
      {
        id: 1,
        rect: {
          x1: 0.1,
          x2: 0.2,
          y1: 0.1,
          y2: 0.2,
        },
      },
      {
        id: 2,
        rect: {
          x1: 0.3,
          x2: 0.4,
          y1: 0.3,
          y2: 0.4,
        },
      },
      {
        id: 3,
        rect: {
          x1: 0.8,
          x2: 1.0,
          y1: 0.8,
          y2: 1.0,
        },
      },
    ],
  },
  input: {
    onChange(value: Array<IOutputData>) {
      console.log(value);
    },
  },
};

export const ShowButton = Template.bind({});

ShowButton.args = {
  id: 'showButton',
  image: 'https://picsum.photos/800',
  readonly: false,
  showLabel: false,
  showButton: true,
  includeDataUrl: false,
  includeHtmlCanvas: false,
  cropBackgroundColor: 'yellow',
  cropBackgroundOpacity: 0.3,
  record: {
    clippings: [
      {
        id: 1,
        rect: {
          x1: 0.1,
          x2: 0.2,
          y1: 0.1,
          y2: 0.2,
        },
      },
      {
        id: 2,
        rect: {
          x1: 0.3,
          x2: 0.4,
          y1: 0.3,
          y2: 0.4,
        },
      },
      {
        id: 3,
        rect: {
          x1: 0.8,
          x2: 1.0,
          y1: 0.8,
          y2: 1.0,
        },
      },
    ],
  },
  input: {
    onChange(value: Array<IOutputData>) {
      console.log(value);
    },
  },
};
