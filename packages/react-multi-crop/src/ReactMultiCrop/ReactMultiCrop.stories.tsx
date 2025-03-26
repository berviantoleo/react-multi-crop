import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import ReactMultiCrop from './ReactMultiCrop';

const meta: Meta<typeof ReactMultiCrop> = {
  component: ReactMultiCrop,
  argTypes: {
    cropBackgroundColor: {
      options: ['yellow', 'blue', 'red'],
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof ReactMultiCrop>;

export const DefaultEditable: Story = {
  args: {
    id: 'defaultEdit',
    image: 'https://picsum.photos/800',
    readonly: false,
    showButton: false,
    includeDataUrl: false,
    includeHtmlCanvas: false,
    cropBackgroundColor: 'yellow',
    cropBackgroundOpacity: 0.3,
    input: {
      onChange: fn()
    },
  },
};

export const DefaultReadOnly: Story = {
  args: {
    id: 'defaultReadonly',
    image: 'https://picsum.photos/800',
    readonly: true,
    showButton: false,
    includeDataUrl: false,
    includeHtmlCanvas: false,
    cropBackgroundColor: 'yellow',
    cropBackgroundOpacity: 0.3,
    record: {
      clippings: [
        {
          id: '1',
          rect: {
            x1: 0.1,
            x2: 0.2,
            y1: 0.1,
            y2: 0.2,
          },
        },
        {
          id: '2',
          rect: {
            x1: 0.3,
            x2: 0.4,
            y1: 0.3,
            y2: 0.4,
          },
        },
        {
          id: '3',
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
      onChange: fn()
    },
  },
};

export const ShowButton: Story = {
  args: {
    id: 'showButton',
    image: 'https://picsum.photos/800',
    readonly: false,
    showButton: true,
    addButton: <button>Add</button>,
    deleteButton: <button>Delete</button>,
    includeDataUrl: false,
    includeHtmlCanvas: false,
    cropBackgroundColor: 'yellow',
    cropBackgroundOpacity: 0.3,
    record: {
      clippings: [
        {
          id: '1',
          rect: {
            x1: 0.1,
            x2: 0.2,
            y1: 0.1,
            y2: 0.2,
          },
        },
        {
          id: '2',
          rect: {
            x1: 0.3,
            x2: 0.4,
            y1: 0.3,
            y2: 0.4,
          },
        },
        {
          id: '3',
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
      onChange: fn()
    },
  },
};
