import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
import supabase from "@/utils/supbaseClient";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const columns = [
  { id: "name", label: "Name", minWidth: 120 },
  {
    id: "loan",
    label: "Loan Balance",
    minWidth: 120,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "savingsTotal",
    label: "Total Savings",
    minWidth: 120,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "expectedPayout",
    label: "Accumalated Payout",
    minWidth: 120,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function MemberTable({ rows = [], getMembers, setOpen, setCurrent }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleOpen = (item) => {
    setCurrent(item);
    setOpen(true);
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("members").delete().eq("id", id);

    console.log(error);

    if (!error) {
      alert("Deleted Successfully");
      getMembers();
    }
  };

  return (
    <div className="w-full p-10  ">
      <TableContainer className="w-full ">
        <Table className="w-full " stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
              <StyledTableCell
                key="edit"
                align="right"
                style={{ minWidth: 60 }}
              >
                Edit
              </StyledTableCell>
              <StyledTableCell
                key="delete"
                align="right"
                style={{ minWidth: 60 }}
              >
                Delete
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <StyledTableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.id}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </StyledTableCell>
                      );
                    })}
                    <StyledTableCell key="edit" align="right">
                      {/* <EditIcon
                        onClick={() => handleOpen(row)}
                        className="hover:cursor-pointer hover:scale-105 hover:text-green-500"
                      /> */}
                      edit
                    </StyledTableCell>
                    <StyledTableCell key="delete" align="right">
                      {/* <DeleteIcon
                        onClick={() => handleDelete(row.id)}
                        className="hover:cursor-pointer hover:scale-105 hover:text-red-500 "
                      /> */}
                      delete
                    </StyledTableCell>
                  </StyledTableRow>
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

export default MemberTable;
