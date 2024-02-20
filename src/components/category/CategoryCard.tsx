import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { CategoryType } from "../../misc/type";

export default function ProductCard({ category }: { category: CategoryType }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="300"
          image={category.image}
          alt={category.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {category.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
