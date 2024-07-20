import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";





export default function CustomCard({ title, text, children,color }) {
  return (
    <Card  sx={{ width:"300px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:1,borderRadius: '16px'}}>
      <CardContent  sx={{ width:"300px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
        <Typography variant="h4" component="div">
          {title}
        </Typography>
        <Typography  sx={{ textAlign: "center",color:color}}>{text}</Typography>
        {children}
        
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
