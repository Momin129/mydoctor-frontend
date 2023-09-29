import {
  Box,
  Grid,
  TextField,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Pagination,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/card";

const result = await axios.get(
  "http://my-doctors.net:8090/specializations?$limit=100&$sort[name]=1"
);

let total = result.data.total;
let data = result.data.data;

export default function Speciality() {
  const [sort, setSort] = useState(16);
  const [slicedData, setSlicedData] = useState(data.slice(0, sort));
  const [pages, setPages] = useState(2);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.length != 0) {
      data = result.data.data;
      const filterData = data.filter((item) => {
        if (item.name.toLowerCase().includes(searchValue.toLowerCase()))
          return item;
      });
      data = filterData;
    } else data = result.data.data;
    total = data.length;
    setSlicedData(data.slice(0, sort));
    let noPages;
    if (total === sort) noPages = 0;
    else if (total % sort === 0) noPages = Math.floor(total / sort);
    else noPages = Math.floor(total / sort) + 1;
    setPages(noPages);
    setPageNumber(1);
  };

  useEffect(() => {
    setSlicedData(data.slice(0, sort));
    let noPages;
    if (total === sort) noPages = 0;
    else if (total % sort === 0) noPages = Math.floor(total / sort);
    else noPages = Math.floor(total / sort) + 1;
    setPages(noPages);
    setPageNumber(1);
  }, [sort]);

  useEffect(() => {
    let start = 0,
      end = sort;
    if (pageNumber > 1) {
      start = sort * (pageNumber - 1);
      end = sort * pageNumber;
    }
    if (end > data.length) end = data.length;
    setSlicedData(data.slice(start, end));
  }, [pageNumber]);

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 5 }}>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#3f51b5" }}
          >{`${total}+ Specialities`}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          display={"flex"}
          justifyContent={"space-evenly"}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: 1,
              borderColor: "#e6e6e6",
              width: "max-content",
            }}
          >
            <TextField
              placeholder="Search a Speciality"
              sx={{ "& fieldset": { border: "none" } }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") handleSearch();
              }}
            />
            <IconButton onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>
          <Box sx={{ width: "60px", display: "inline-block" }}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                onChange={handleChange}
              >
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Grid>
      </Grid>
      <Grid container>
        {slicedData.map((item) => (
          <Grid item key={item.name} xs={12} sm={6} lg={3} sx={{ padding: 2 }}>
            <Card name={item.name} />
          </Grid>
        ))}
      </Grid>
      <Grid container sx={{ marginTop: "20px" }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          {pages > 1 && (
            <Pagination
              count={pages}
              page={pageNumber}
              size="large"
              onChange={(e, pageNumber) => {
                setPageNumber(pageNumber);
              }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
