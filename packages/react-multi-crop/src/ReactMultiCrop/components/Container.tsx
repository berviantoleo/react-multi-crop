import React from 'react';

type Props = {
  children?: React.ReactNode;
  row?: boolean;
};

export default function Container({ children, row = false }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: row ? 'row' : 'column',
        gap: '10px',
      }}
    >
      {children}
    </div>
  );
}
