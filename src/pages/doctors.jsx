/* eslint-disable react/prop-types */
import { Box, Grid, Link, Typography } from "@mui/material";
import Card from "../components/card";
import axios from "axios";
import { useContext } from "react";
import { menuButton } from "../App";
const result = await axios.get(
  "http://my-doctors.net:8090/specializations?$limit=100&$sort[name]=1"
);

let total = result.data.total;
let data = result.data.data.slice(0, 8);
export default function Dashboard(props) {
  const { handleListItemClick } = useContext(menuButton);
  return (
    <Box sx={{ flexGrow: 1, padding: 5 }}>
      <Grid container>
        <Grid item xs={12}>
          <img src="/images/finalbanner.svg" alt="" />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} md={8}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", color: "#3f51b5" }}
          >{`${total}+ Specialities`}</Typography>
        </Grid>
      </Grid>
      <Grid container>
        {data.map((item) => (
          <Grid item key={item.name} xs={12} sm={6} lg={3} sx={{ padding: 2 }}>
            <Card name={item.name} />
          </Grid>
        ))}
      </Grid>
      <Grid container justifyContent={"flex-end"}>
        <Grid item>
          <Link
            variant="body2"
            sx={{ cursor: "pointer" }}
            onClick={(e) => {
              props.setPath("speciality");
              handleListItemClick(e, 2);
            }}
          >
            View all specialities
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
