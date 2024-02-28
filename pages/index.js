import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import supabase from "@/utils/supbaseClient";
import Header from "@/components/HeaderComponent";
import Sidebar from "@/components/Sidebar";
import Transaction from "@/components/Transaction";
import TransactionsTable from "@/components/TransactionsTable";

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

export default function Home() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

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
