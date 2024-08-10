import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function CustomCard({ title, text, children, color,wrapperClasses }) {
  return (
    <div className={`flex flex-col items-center justify-center border rounded-2xl w-72 ${wrapperClasses}`}>
      <div className="flex flex-col items-center justify-center w-72 p-4">
        <h4 className="text-2xl">{title}</h4>
        <p className={`text-center ${color}`}>{text}</p>
        {children}
      </div>
      <div className="card-actions"></div>
    </div>
  );
}
