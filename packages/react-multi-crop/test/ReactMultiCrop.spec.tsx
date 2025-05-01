import React from 'react';
import { render, screen } from '@testing-library/react';
import ReactMultiCrop from '../src/ReactMultiCrop/ReactMultiCrop';
import '@testing-library/jest-dom';

test('test render', async () => {
  render(<ReactMultiCrop />);
  const buttons = screen.queryByRole('button');
  expect(buttons).toBeNull();
});

test('readonly mode', async () => {
  render(<ReactMultiCrop readonly />);
  const buttons = screen.queryByRole('button');
  expect(buttons).toBeNull();
});

test('Initial crop', async () => {
  render(
    <ReactMultiCrop
      readonly
      image="https://picsum.photos/800"
      width={800}
      height={800}
      record={{
        clippings: [
          {
            id: '1',
            rect: { x1: 0.0, y1: 0.0, x2: 0.2, y2: 0.2 },
            rectPx: {},
          },
        ],
      }}
    />,
  );
  const buttons = screen.queryByRole('button');
  expect(buttons).toBeNull();
});

test('Output Handler', async () => {
  render(
    <ReactMultiCrop
      readonly
      image="https://picsum.photos/800"
      width={800}
      height={800}
      input={{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onChange: function (value: any) {
          console.log(value);
          const newObject = value[0];
          if (newObject) {
            console.log(newObject);
            if (newObject.canvasElement) {
              console.log(newObject.canvasElement.toDataURL());
            }
          }
        },
      }}
      record={{
        clippings: [
          {
            id: '1',
            rect: { x1: 0.0, y1: 0.0, x2: 0.2, y2: 0.2 },
            rectPx: {},
          },
        ],
      }}
    />,
  );
  const buttons = screen.queryByRole('button');
  expect(buttons).toBeNull();
});
