import React from 'react';

type Props = {
  children?: React.ReactNode;
  height?: number;
  width?: number;
  row?: boolean;
};

export default function Container({ children, height, width, row = false }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: row ? 'row' : 'column',
        gap: '10px',
        height,
        width,
      }}
    >
      {children}
    </div>
  );
}
