import supabase from "@/utils/supbaseClient";
import { Button } from "@mui/base";
import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

const transactionTypes = [
  {
    id: 1,
    type: "Deposit",
  },
  {
    id: 2,
    type: "Loan",
  },
  {
    id: 3,
    type: "Loan Repayment",
  },
];

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

function Transaction({ getTransactions }) {
  const [members, setMembers] = useState([]);
  const [month, setMonth] = useState("");
  const [amount, setAmount] = useState("");
  const [member, setMember] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    getMembers();
  }, []);

  async function getMembers() {
    const { data, error } = await supabase.from("members").select(
      `
          id,
          name,
          balance
        `
    );
    setMembers(data);
  }

  async function updateMembersBalance(memberId) {
    console.log(members, memberId);
    let foundMember = members.find((member) => member.id === memberId);
    console.log("here", foundMember);

    // if (transactionTypes[type - 1].type.toLowerCase() === "deposit") {
    let balance = parseFloat(foundMember.balance) + parseFloat(amount);
    console.log(foundMember);
    // }
    console.log(balance);

    const { error } = await supabase
      .from("members")
      .upsert({ id: memberId, balance: parseFloat(balance) });

    return error;
  }

  async function tranac() {
    console.log(
      member,
      parseFloat(amount),
      month,
      transactionTypes[type].type.toLowerCase()
    );
    let _amount = parseFloat(amount);
    const { error } = await supabase.from("transactions").insert({
      member_id: member,
      amount: _amount,
      month: month,
      transaction_type: transactionTypes[type - 1].type.toLowerCase(),
    });

    let err = await updateMembersBalance(member);

    console.log("error -->", err);
    if (!error) {
      getTransactions();
      alert("added successfully");
    }
  }

  return (
    <div className="w-full p-10  ">
      <div className="flex items-center w-full justify-between ">
        <Select
          className="w-60"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //   value={age}
          defaultValue="Please Pick a Mamber"
          required={true}
          label="Age"
          variant="filled"
          onChange={(e) => setMember(e.target.value)}
          value={member}
          //   onChange={handleChange}
        >
          {members.map((member) => (
            <MenuItem key={member.id} value={member.id}>
              {member.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          className="w-60"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          //   value={age}
          onChange={(e) => setMonth(e.target.value)}
          value={month}
          defaultValue="Please Pick a Mamber"
          required
          label="Age"
          variant="filled"
          //   onChange={handleChange}
        >
          {months.map((month) => (
            <MenuItem key={month.index} value={month.index}>
              {month.name}
            </MenuItem>
          ))}
        </Select>
        <Select
          className="w-60"
          onChange={(e) => setType(e.target.value)}
          value={type}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue="Please Pick a Mamber"
          required
          label="Age"
          variant="filled"
        >
          {transactionTypes.map((transactionType) => (
            <MenuItem key={transactionType.id} value={transactionType.id}>
              {transactionType.type}
            </MenuItem>
          ))}
        </Select>
        <TextField
          className="w-60"
          id="filled-basic"
          label="Amount"
          variant="filled"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          type="number"
        />
        <Button onClick={tranac}>Process Transaction</Button>
      </div>
    </div>
  );
}

export default Transaction;
