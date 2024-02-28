import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "name", label: "Name", minWidth: 120 },
  {
    id: "aug",
    label: "Aug",
    minWidth: 90,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "sept",
    label: "Sept",
    minWidth: 90,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "oct",
    label: "Oct",
    minWidth: 90,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "nov",
    label: "Nov",
    minWidth: 90,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "dec",
    label: "Dec",
    minWidth: 90,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "jan",
    label: "Jan",
    minWidth: 90,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "feb",
    label: "Feb",
    minWidth: 90,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "mar",
    label: "Mar",
    minWidth: 90,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "apr",
    label: "Apr",
    minWidth: 90,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "may",
    label: "May",
    minWidth: 90,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "jun",
    label: "Jun",
    minWidth: 90,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "jul",
    label: "Jul",
    minWidth: 90,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function MainTable({ rows }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  return (
    <div className="w-full p-5  ">
      <TableContainer className="w-full ">
        <Table className="w-full " stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </div>
  );
}

export default MainTable;
