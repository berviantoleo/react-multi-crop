import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { IActionComponentProps } from '../interfaces';

export function ActionsComponent({
  addNew,
  deleteShapes,
  discardActiveObject,
  multiSelect,
}: IActionComponentProps) {
  return (
    <Grid
      alignItems="flex-start"
      container
      direction="column"
      item
      justifyContent="flex-start"
      spacing={2}
      xs
    >
      <Grid item xs>
        <Button color="primary" id="addmore" onClick={addNew} variant="contained">
          Add More Shapes
        </Button>
      </Grid>
      <Grid item xs>
        <Button color="primary" id="deleteselected" onClick={deleteShapes} variant="contained">
          Delete Selected Object
        </Button>
      </Grid>
      <Grid item xs>
        <Button color="primary" id="multiselect" onClick={multiSelect} variant="contained">
          Select All
        </Button>
      </Grid>
      <Grid item xs>
        <Button id="discard" color="primary" onClick={discardActiveObject} variant="contained">
          Discard Selection
        </Button>
      </Grid>
    </Grid>
  );
}
