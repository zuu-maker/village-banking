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
import Header from "@/components/Header";
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

function Payout() {
  const [people, setPeople] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getSavings();
  }, []);

  async function getSavings() {
    let _rows = [];
    let row = {};
    const { data, error } = await supabase.from("members").select(`
          name,
          balance,
          transactions (
            amount,
            month
          )
        `);

    let payout = 0;
    data.forEach((item) => {
      months.forEach((month) => {
        let sum = 0;
        item.transactions.forEach((transc) => {
          if (transc.month === month.index) {
            sum += transc.amount;
          }
        });

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
      let rowItem = structuredClone(row);

      _rows.push(rowItem);
    });
    console.log("rows maybe? ->", _rows);
    setRows(_rows);
    setPeople(data);
  }

  return (
    <Paper className="min-h-screen" sx={{ width: "100%", overflow: "hidden" }}>
      <Header />
      <div className=" min-w-screen flex">
        <Sidebar />
        <MainTable rows={rows} />
      </div>
    </Paper>
  );
}

export default Payout;
