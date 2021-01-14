import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ReactMultiCrop from '../src/ReactMultiCrop/ReactMultiCrop';
import '@testing-library/jest-dom/extend-expect';

test('test render', async () => {
  render(<ReactMultiCrop />);
  const buttons = screen.queryByRole('button');
  expect(buttons).toBeNull();
});

test('show button', async () => {
  render(<ReactMultiCrop showButton />);
  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(4);
});

test('show label', async () => {
  render(<ReactMultiCrop showLabel source="React Multi Crop" />);
  const textLabel = screen.getByText('React Multi Crop');
  expect(textLabel).toBeTruthy();
});
