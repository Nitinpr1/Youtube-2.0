import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import { logo } from "../utils/constants";
import { SearchBar } from "./";

const Navbar = () => (
  <Stack
    direction="row"
    alignItems="center"
    p={1}
    sx={{
      position: "sticky",
      background: "#000",
      top: 0,
      justifyContent: "space-between",

      boxShadow:
        "0px 2px 8px 0px rgba(224, 75, 82, 0.5), 0px 4px 16px 0px rgba(224, 75, 82, 0.5)",
      borderBottom: "1px solid #fff",
      borderRadius: "10px",
    }}
  >
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={70} />
    </Link>
    <SearchBar />
  </Stack>
);

export default Navbar;
