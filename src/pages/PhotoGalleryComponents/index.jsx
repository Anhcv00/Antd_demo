import { React, useEffect, useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const PhotoGalleryComponents = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs] = useState([
    { field: "athlete", minWidth: 170 },
    { field: "age", filter: true },
    { field: "year" },
    { field: "date" },
    { field: "sport" },
    { field: "gold" },
    { field: "silver" },
    { field: "bronze" },
    { field: "total" },
    { field: "country" },
  ]);

  const selectionOptions = useMemo(() => {
    return {
      type: "multiple",
      isRowSelectable: (rowNode) => {
        return rowNode.data ? rowNode.data.year < 2004 : false;
      },
    };
  }, []);

  const cellSelection = useMemo(() => {
    return {
      suppressMultiRanges: true,
    };
  }, []);

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((response) => response.json())
      .then((data) => setRowData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="ag-theme-quartz" style={{ height: 600, marginBottom: 36 }}>
      <h2>Photo Gallery</h2>

      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        selectionOptions={selectionOptions}
        pagination={true}
        paginationAutoPageSize={true}
        cellSelection={cellSelection}
      />
    </div>
  );
};

export default PhotoGalleryComponents;
