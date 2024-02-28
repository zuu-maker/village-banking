import { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import supabase from "@/utils/supbaseClient";
import Header from "@/components/HeaderComponent";
import Sidebar from "@/components/Sidebar";
import MainTable from "@/components/MainTable";

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

function Savings() {
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

    data.forEach((item) => {
      months.forEach((month) => {
        let sum = 0;
        item.transactions.forEach((transc) => {
          if (transc.month === month.index) {
            sum += transc.amount;
          }
        });
        row[month.name] = sum;
      });
      row["name"] = item.name;
      let rowItem = structuredClone(row);
      _rows.push(rowItem);
    });
    console.log("rows maybe? ->", _rows);
    setRows(_rows);
    setPeople(data);
  }

  async function insert() {
    const date = new Date();
    const { error } = await supabase
      .from("members")
      .insert({ name: "Mkhuzo", dob: "24/02/2001" });
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

export default Savings;
