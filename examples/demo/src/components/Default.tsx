import React from "react";
import Grid from "@mui/material/Grid";
import { ReactMultiCrop, IOutputData } from "@berviantoleo/react-multi-crop";

export default function Default(): JSX.Element {
  const [cropValue, setCropValue] = React.useState<Array<IOutputData>>([]);
  return (
    <Grid container>
      <Grid item xs>
        <ReactMultiCrop
          id="canvas"
          input={{
            value: cropValue,
            name: "multicrop",
            onChange: function (value: Array<IOutputData>) {
              setCropValue(value);
            },
          }}
          image="https://picsum.photos/800"
          includeHtmlCanvas
          record={{
            clippings: [
              {
                id: 1,
                rect: { x1: 0.0, y1: 0.0, x2: 0.2, y2: 0.2 },
                rectPx: {},
              },
            ],
          }}
          style={{
            margin: "10px",
          }}
        />
      </Grid>
      <Grid item xs>
        <h3>React Multi Crop</h3>
        <h4>By Bervianto Leo P - 2021</h4>
        <h5>Crop Result</h5>
        {cropValue &&
          cropValue.map((objectData: IOutputData, i) => {
            const canvasElement = objectData?.canvasElement?.toDataURL();
            return (
              <div key={`crop-result-${i}`}>
                Result {i}:
                <img src={canvasElement} alt={`crop-${i}`} />
              </div>
            );
          })}
      </Grid>
    </Grid>
  );
}
