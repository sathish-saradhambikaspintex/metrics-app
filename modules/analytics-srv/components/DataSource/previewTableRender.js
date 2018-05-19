import React from "react";
import { HTMLTable } from "lib";
import { map, prop, path } from "ramda";

function getColumns(schema, items) {
  const renderSchemaCol = props => {
    const { displayName, fieldName, fieldType } = props;
    const getItem = i => prop(i, items);
    const fieldRender = path([fieldType, "renderDatum"], () => null);
    return (
      <HTMLTable.Column
        key={`${fieldName}-col`}
        label={displayName}
        render={i => fieldRender({ data: getItem(i), props })}
      />
    );
  };
  return map(renderSchemaCol, schema);
}

export default function previewTableRender(userSchema, items, rowCount) {
  return (
    <HTMLTable.Container rowCount={rowCount}>
      {getColumns(userSchema, items)}
    </HTMLTable.Container>
  );
}
