import supabase from "@/utils/supbaseClient";
import Button from "@mui/material/Button";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function Member({ getMembers }) {
  const [name, setName] = useState("");

  async function addMember() {
    const { error } = await supabase.from("members").insert({
      name: name,
      balance: 0.0,
    });

    console.log("error -->", error);
    if (!error) {
      getMembers();
      alert("added successfully");
    }
  }

  return (
    <div className="w-full p-10  ">
      <div className="flex items-center w-full justify-between ">
        <TextField
          className="w-60"
          id="filled-basic"
          label="Name"
          variant="filled"
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
        />
        <Button variant="contained" className="bg-blue-500" onClick={addMember}>
          Add Member
        </Button>
      </div>
    </div>
  );
}

export default Member;
