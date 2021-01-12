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
          hideLabel
          input={{
            value: cropValue,
            name: "multicrop",
            onChange: function (value) {
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
          //image="https://ucarecdn.com/ca8d2fdd-33ef-440f-b46b-f08c100693b7/"
          image="https://catalog-import-dev.nos.jkt-1.neo.id/webcSuperindoSuperHemat/1157khboqy7x"
        />
      </Grid>
      <Grid item xs>
        <h2>Crop Result</h2>
        {cropValue &&
          cropValue.map((objectData, i) => {
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
