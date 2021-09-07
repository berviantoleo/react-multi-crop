import React from "react";
import Grid from "@material-ui/core/Grid";
import { ReactMultiCrop, IOutputData } from "@berviantoleo/react-multi-crop";

function convertToImage(name: string, output: IOutputData) {
  let canvasElement = output.canvasElement?.toDataURL();

  return canvasElement ? (
    <div>
      Result {name}:
      <img src={canvasElement} alt={`crop-${name}`} />
    </div>
  ) : undefined;
}

export default function Readonly() {
  const [selectedValue, setSelectedValue] = React.useState<IOutputData | null>(
    null
  );
  const [hoverValue, setHoverValue] = React.useState<IOutputData | null>(null);

  return (
    <Grid container>
      <Grid item xs>
        <ReactMultiCrop
          id="canvasReadonly"
          readonly={true}
          includeHtmlCanvas
          onSelect={(value: IOutputData) => {
            setSelectedValue(value);
          }}
          onHover={(value: IOutputData) => {
            setHoverValue(value);
          }}
          record={{
            clippings: [
              {
                id: 1,
                rect: { x1: 0.0, y1: 0.0, x2: 0.2, y2: 0.2 },
                rectPx: {},
              },
              {
                id: 2,
                rect: { x1: 0.5, y1: 0.5, x2: 0.7, y2: 0.7 },
                rectPx: {},
              },
              {
                id: 3,
                rect: { x1: 0.3, y1: 0.3, x2: 0.5, y2: 0.5 },
                rectPx: {},
              },
              {
                id: 4,
                rect: { x1: 0.7, y1: 0.7, x2: 1.0, y2: 1.0 },
                rectPx: {},
              },
              {
                id: 5,
                rect: { x1: 0.2, y1: 0.2, x2: 0.3, y2: 0.3 },
                rectPx: {},
              },
            ],
          }}
          image="https://picsum.photos/800"
        />
      </Grid>
      <Grid item xs>
        <h3>React Multi Crop</h3>
        <h4>By Bervianto Leo P - 2021</h4>
        <h5>Result</h5>
        {selectedValue && convertToImage("Selected", selectedValue)}
        {hoverValue && convertToImage("Hovered", hoverValue)}
      </Grid>
    </Grid>
  );
}
