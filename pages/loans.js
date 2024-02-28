import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";

import supabase from "@/utils/supbaseClient";
import Header from "@/components/header";
import Sidebar from "@/components/Sidebar";
import { Box } from "@mui/material";
import MainTable from "@/components/MainTable";

const interestRate = 0.05;

const months = [
  {
    index: 7,
    name: "aug",
  },
  {
    index: 8,
    name: "sept",
  },
  {
    index: 9,
    name: "oct",
  },
  {
    index: 10,
    name: "nov",
  },
  {
    index: 11,
    name: "dec",
  },
  {
    index: 0,
    name: "jan",
  },
  {
    index: 1,
    name: "feb",
  },
  {
    index: 2,
    name: "mar",
  },
  {
    index: 3,
    name: "apr",
  },
  {
    index: 4,
    name: "may",
  },
  {
    index: 5,
    name: "jun",
  },
  {
    index: 6,
    name: "jul",
  },
];

function Loans() {
  const [people, setPeople] = useState([]);
  const [rows, setRows] = useState([]);
  const [rowsLoanPayout, setRowsLoanPayout] = useState([]);

  useEffect(() => {
    getLoans();
  }, []);

  async function getLoans() {
    let _rows = [];
    let _rowsLoanAmount = [];
    let rowLoanAmount = {};
    let row = {};
    const { data, error } = await supabase
      .from("members")
      .select(
        `
        name,
        balance,
        transactions (
          amount,
          month
        )
      `
      )
      .eq("transactions.transaction_type", "loan");

    let payout = 0;
    data.forEach((item) => {
      months.forEach((month) => {
        let sum = 0;
        item.transactions.forEach((transc) => {
          if (transc.month === month.index) {
            sum += transc.amount;
          }
        });

        rowLoanAmount[month.name] = sum;

        if (month.index !== 7 && sum > 0) {
          payout += sum;
          let current_payout = payout;
          let interest = payout * interestRate;
          console.log(interest);
          payout += interest;
          row[month.name] = current_payout;
        } else {
          let interest = sum * interestRate;
          payout = sum + interest;
          console.log(interest);
          row[month.name] = sum;
        }
      });
      row["name"] = item.name;
      rowLoanAmount["name"] = item.name;

      let rowItem = structuredClone(row);
      let rowItem2 = structuredClone(rowLoanAmount);

      _rows.push(rowItem);
      _rowsLoanAmount.push(rowItem2);
    });
    console.log("rows maybe? ->", _rows);
    setRows(_rows);
    setRowsLoanPayout(_rowsLoanAmount);
    setPeople(data);
  }

  return (
    <Paper className="min-h-screen" sx={{ width: "100%", overflow: "hidden" }}>
      <Header />
      <div className=" min-w-screen flex">
        <Sidebar />
        <div className="w-full">
          <h1>Loan Payouts</h1>
          <MainTable rows={rowsLoanPayout} />
          <hr />

          <h1>Loan Repayment Amount</h1>
          <MainTable rows={rows} />
        </div>
      </div>
      {JSON.stringify(rowsLoanPayout)}
    </Paper>
  );
}

export default Loans;
