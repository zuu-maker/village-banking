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
import MemberTable from "@/components/MemberTable";
import Member from "@/components/Member";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalComponent from "@/components/ModalComponent";

function members() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState({});

  useEffect(() => {
    getMembers();
  }, []);

  async function getMembers() {
    let _rows = [];
    let row = {
      edit: "Edit",
      delete: "Delete",
    };
    const { data, error } = await supabase
      .from("members")
      .select(
        `
            id,
            name,
            balance
          `
      )
      .order("id", { ascending: true });

    let payout = 0;
    data.forEach((item) => {
      row["id"] = item.id;
      row["name"] = item.name;
      row["loan"] = item.balance;
      row["savingsTotal"] = item.balance;
      row["expectedPayout"] = item.balance;

      let rowItem = structuredClone(row);
      _rows.push(rowItem);
    });
    console.log("rows maybe? ->", _rows);
    setRows(_rows);
  }

  async function editMember(id, name) {
    const { error } = await supabase.from("members").upsert({ id, name });

    if (!error) {
      alert("sucessfully Updated, Please refresh page to delete");
      setOpen(false);
      setCurrent({});
      getMembers();
    }
  }

  return (
    <Paper className="min-h-screen" sx={{ width: "100%", overflow: "hidden" }}>
      <ModalComponent
        current={current}
        handleEdit={editMember}
        open={open}
        setOpen={setOpen}
      />

      <Header />
      <div className=" min-w-screen flex">
        <Sidebar />
        <div className="w-full">
          <Member getMembers={getMembers} />
          <MemberTable
            setOpen={setOpen}
            getMembers={getMembers}
            rows={rows}
            setCurrent={setCurrent}
          />
        </div>
      </div>
    </Paper>
  );
}

export default members;