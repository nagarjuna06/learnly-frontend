import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import "../NavBar/index.css";
const SearchInput = ({ size = "", autoFocus = false }) => {
  return (
    <FormControl sx={{ width: "100%" }}>
      <OutlinedInput
        name="search"
        type="search"
        required
        autoFocus={autoFocus}
        size={size}
        placeholder="Search for anything"
        sx={{ borderRadius: 30 }}
        startAdornment={
          <InputAdornment position="start">
            <AiOutlineSearch style={{ fontSize: 20 }} />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default SearchInput;
