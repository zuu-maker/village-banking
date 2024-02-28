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
import Transaction from "@/components/Transaction";
import TransactionsTable from "@/components/TransactionsTable";

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const months = [
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
];

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

export default function Home() {
  // const [people, setPeople] = useState([]);
  const [rows, setRows] = useState([]);

  // useEffect(() => {
  //   getMembers();
  // }, []);

  useEffect(() => {
    getTransactions();
  }, []);

  // async function getMembers() {
  //   let _rows = [];
  //   let row = {};
  //   const { data, error } = await supabase.from("members").select(`
  //     name,
  //     balance,
  //     transactions (
  //       amount,
  //       month
  //     )
  //   `);

  //   data.forEach((item) => {
  //     months.forEach((month) => {
  //       let sum = 0;
  //       item.transactions.forEach((transc) => {
  //         if (transc.month === month.index) {
  //           sum += transc.amount;
  //         }
  //       });
  //       row[month.name] = sum;
  //     });
  //     row["name"] = item.name;
  //     _rows.push(row);
  //   });
  //   console.log("rows maybe? ->", _rows);
  //   setRows(_rows);
  //   setPeople(data);
  // }

  async function getTransactions() {
    let _rows = [];
    let row = {};
    const { data, error } = await supabase
      .from("transactions")
      .select(
        `
            amount,
            month,
            transaction_type,
            members(
                name
            )
          `
      )
      .order("id", { ascending: false })
      .limit(10);

    data.forEach((item) => {
      row["member"] = item.members.name;
      row["transactionType"] = item.transaction_type;
      row["amount"] = item.amount;
      console.log(item.amount);
      months.forEach((month) => {
        if (month.index === item.month) {
          row["month"] = month.name;
        }
      });
      let rowItem = structuredClone(row);
      _rows.push(rowItem);
      console.log(row);
    });

    console.log("rows maybe? ->", _rows);
    setRows(_rows);
  }

  return (
    <Paper className="min-h-screen" sx={{ width: "100%", overflow: "hidden" }}>
      <Header />
      <div className=" min-w-screen flex">
        <Sidebar />
        <div className="w-full">
          <Transaction getTransactions={getTransactions} />
          <TransactionsTable rows={rows} />
        </div>
      </div>
    </Paper>
  );
}
