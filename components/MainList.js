import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Link from "next/link";
import GroupsIcon from "@mui/icons-material/Groups";
import SavingsIcon from "@mui/icons-material/Savings";
import PaymentsIcon from "@mui/icons-material/Payments";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const MainListItems = (
  <React.Fragment>
    <Link href="/">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>
    <Link href="/members">
      <ListItemButton>
        <ListItemIcon>
          <GroupsIcon />
        </ListItemIcon>
        <ListItemText primary="Members" />
      </ListItemButton>
    </Link>

    <Link href="/transactions">
      <ListItemButton>
        <ListItemIcon>
          <ReceiptLongIcon />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
      </ListItemButton>
    </Link>

    <Link href="/savings">
      <ListItemButton>
        <ListItemIcon>
          <SavingsIcon />
        </ListItemIcon>
        <ListItemText primary="Savings" />
      </ListItemButton>
    </Link>

    <Link href="/payouts">
      <ListItemButton>
        <ListItemIcon>
          <PaymentsIcon />
        </ListItemIcon>
        <ListItemText primary="Payouts" />
      </ListItemButton>
    </Link>

    <Link href="/loans">
      <ListItemButton>
        <ListItemIcon>
          <CreditScoreIcon />
        </ListItemIcon>
        <ListItemText primary="Loans" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export default MainListItems;
