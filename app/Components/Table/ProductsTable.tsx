import { Customer, Product } from '@/app/types/pharma';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
// import css from 'styled-jsx/css';
import cssModule from './Table.module.css';
import Image from 'next/image';

interface BasicTableProps {
  dataList: Product[];
}

export default function ProductsTable({ dataList }: BasicTableProps) {
  console.log('dataList:', dataList);
  return (
    <Box className={cssModule.box} sx={{ minWidth: { xs: '511px', md: '960px', lg: '1280px' } }}>
      <Typography
        className={cssModule.tableTitle}
        variant="tableTitle"
        component="p"
      >
        All products
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 511, maxWidth: 1280, 
          tableLayout: 'fixed' 
          }} aria-label="products table">
          <TableHead>
            <TableRow className={cssModule.tableRow}
            sx={{ height: { xs: '42px', md: '58px' } }}
            >
              <TableCell sx={{ width: '22%' }}>Product Info</TableCell>
              <TableCell sx={{ width: '20%' }} align="left">Category</TableCell>
              <TableCell sx={{ width: '16%' }} align="left">Stock</TableCell>
              <TableCell sx={{ width: '21%' }} align="left">Supplier</TableCell>
              <TableCell sx={{ width: '13%' }} align="left">Price</TableCell>
              <TableCell sx={{ width: '13%' }} align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList &&
              dataList.map((row) => {
                
                return (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">{row.stock}</TableCell>
                    <TableCell align="left">{row.suppliers}</TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">E D</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
