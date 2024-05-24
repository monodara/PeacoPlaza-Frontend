import React, { useEffect } from 'react'
import { AppState, useAppDispatch } from '../../app/store';
import { useParams } from 'react-router-dom';
import { OrderReadDto } from './orderDto';
import { ordersActions } from './orderSlice';
import { useSelector } from 'react-redux';
import { useTheme } from '../theme/ThemeContext';
import { Box, LinearProgress } from '@mui/material';
import { productsActions } from '../products/productSlice';
import { ProductReadDto } from '../products/productDto';

export default function OrderDetails() {
    const token = localStorage.getItem("token");
    const dispatch = useAppDispatch();
    const { id } = useParams();

    useEffect(() => {
      dispatch(ordersActions.fetchById({ id: id ?? "default" }));
    }, [id]);
    const order: OrderReadDto | undefined = useSelector(
      (state: AppState) => state.orders.selectedItem
    );
    const loading: boolean = useSelector(
      (state: AppState) => state.products.loading
    );
    const error: string | undefined = useSelector(
      (state: AppState) => state.products.error
    );
    
    const { theme } = useTheme();
    const color = theme.palette.text.primary;
    const primaryColor = theme.palette.primary.main;
    const backgroundColor = theme.palette.background.default;

    const orderProduct = order?.orderProducts;
    let products : ProductReadDto[] = [];
//     orderProduct?.forEach(op=>{
//         let res = await dispatch(
//           productsActions.fetchById({ id: id ?? "default" })
// );
//         products.push(res.payload as ProductReadDto)
//     })

    if (loading) {
      return (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      );
    }

    if (error) {
      return <p>{error}</p>;
    }

      return (
        <div className="font-[sans-serif] mt-10">
          <h1>Order Details</h1>
          <h3>Get styled soon</h3>
          <div>{order?.id}</div>
          <div>{order?.status}</div>
          <div>{order?.dateOfDelivery}</div>
          <div>Order Products</div>
          <div>{products.map((p)=>
            (<div>{p.title}</div>)
          )}</div>

        </div>
      );
    }
