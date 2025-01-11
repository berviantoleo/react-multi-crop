import React from 'react';
import Container from './Container';
import { IActionComponentProps } from '../interfaces';

export function ActionsComponent({
  addButton,
  addNew,
  deleteButton,
  deleteShapes,
  discardActiveObject,
  discardButton,
}: IActionComponentProps): React.JSX.Element {
  return (
    <Container>
      <div>{addButton && React.cloneElement(addButton, { onClick: addNew })}</div>
      <div>{deleteButton && React.cloneElement(deleteButton, { onClick: deleteShapes })}</div>
      <div>
        {discardButton && React.cloneElement(discardButton, { onClick: discardActiveObject })}
      </div>
    </Container>
  );
}
