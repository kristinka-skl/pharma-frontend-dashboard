import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Customer, Order } from '@/app/types/pharma';
import Image from 'next/image';
import css from 'styled-jsx/css';
import cssModule from './Table.module.css'

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

interface BasicTableProps {
    dataList: Order[] 
    // | Customer[]
    ;
}

export default function BasicTable({dataList}: BasicTableProps) {
  console.log('dataList:', dataList);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>User Info</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Products</TableCell>
            <TableCell align="left">Order date</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList && dataList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"><div className={cssModule.photoAndName}><Image src={row.photo} width={36} height={36} alt='portrait photo'/>
                {row.name}</div>
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
  );
}
