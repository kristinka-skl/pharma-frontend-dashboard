import { Order } from '@/app/types/pharma';
import {
    Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import css from 'styled-jsx/css';
import cssModule from './Table.module.css';
import Image from 'next/image';

interface BasicTableProps {
  dataList: Order[];
}

export default function OrdersTable({ dataList }: BasicTableProps) {
  console.log('dataList:', dataList);
  return (
    <Box className={cssModule.box} sx={{ width: '100%' }}>
      <Typography
        className={cssModule.tableTitle}
        sx={{ flex: '1 1 100%' }}
        id="tableTitle"
        component="p"
      >
        All orders
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 511, maxWidth: 1280 }} aria-label="simple table">
          <TableHead>
            <TableRow className={cssModule.tableRow}>
              <TableCell>User Info</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Products</TableCell>
              <TableCell align="left">Order date</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList &&
              dataList.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <div className={cssModule.photoAndName}>
                      <Image
                        src={row.photo}
                        width={36}
                        height={36}
                        alt="portrait photo"
                      />
                      {row.name}
                    </div>
                  </TableCell>
                  <TableCell align="left">{row.address}</TableCell>
                  <TableCell align="left">{row.products}</TableCell>
                  <TableCell align="left">{row.order_date}</TableCell>
                  <TableCell align="left">{row.price}</TableCell>
                  <TableCell align="left">{row.status}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
