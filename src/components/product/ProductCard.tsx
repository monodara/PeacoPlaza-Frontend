import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { ProductType } from "../../misc/type";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/productSlice";

export default function ProductCard({ product }: { product: ProductType }) {
  const dispatch = useDispatch();
  function cartButtonHandler(item: ProductType) {
    dispatch(addToCart(item));
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`${product.id}`}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={product.images[0]}
            alt={product.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <button onClick={() => cartButtonHandler(product)}>add to cart</button>
    </Card>
  );
}
