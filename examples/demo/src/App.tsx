import React from "react";
import Grid from "@material-ui/core/Grid";
import { ReactMultiCrop } from "@berviantoleo/react-multi-crop";

export default function App() {
  const [cropValue, setCropValue] = React.useState([]);
  return (
    <Grid container>
      <Grid item xs>
        <ReactMultiCrop
          id="canvas"
          input={{
            value: cropValue,
            name: "multicrop",
            onChange: function (value: any) {
              console.log(value);
              let newObject = value[0];
              if (newObject) {
                console.log(newObject);
                if (newObject.canvasElement) {
                  console.log(newObject.canvasElement.toDataURL());
                }
              }
              setCropValue(value);
            },
          }}
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
          image="https://picsum.photos/800"
        />
      </Grid>
      <Grid item xs>
        <h3>React Multi Crop</h3>
        <h4>By Bervianto Leo P - 2021</h4>
        <h5>Crop Result</h5>
        {cropValue &&
          cropValue.map((objectData: any, i) => {
            let canvasElement = objectData.canvasElement.toDataURL();
            return (
              <div>
                Result {i}:
                <img src={canvasElement} alt={`crop-${i}`} />
              </div>
            );
          })}
      </Grid>
    </Grid>
  );
}
