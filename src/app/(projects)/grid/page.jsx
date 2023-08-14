'use client';
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { Employees } from "@/app/data/employees";

export default function GridPage() {

  const gridRef = useRef(); // Optional - for accessing Grid's API
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {field: 'employeeName', filter: true},
    {field: 'title', filter: true},
    {field: 'city', filter: true},
    {field: 'country', filter: true}
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
      sortable: true
    }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback( e => {
    gridRef.current.api.deselectAll();
  }, []);

  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="container mx-auto bg-white p-4">
        <h1>AG Grid Page</h1>
        {/* Example using Grid's API */}
        {/* <button onClick={buttonListener} className="px-3 py-2 bg-sky-600 text-white">Push Me</button> */}

        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
        <div className="ag-theme-alpine w-full h-[600px]">

          <AgGridReact
              ref={gridRef} // Ref for accessing Grid's API

              rowData={Employees} // Row Data for Rows
              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties

              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              rowSelection='multiple' // Options - allows click selection of rows

              onCellClicked={cellClickedListener} // Optional - registering for Grid Event
              />
        </div>
      </div>
    </main>
  );
}
