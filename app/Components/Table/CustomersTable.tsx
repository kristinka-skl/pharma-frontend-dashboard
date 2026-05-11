import { Customer } from '@/app/types/pharma';
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
// import css from 'styled-jsx/css';
import cssModule from './Table.module.css';
import Image from 'next/image';

interface BasicTableProps {
  dataList: Customer[];
}

export default function CustomersTable({ dataList }: BasicTableProps) {
  console.log('dataList:', dataList);
  return (
    <Box className={cssModule.box} sx={{ width: '100%' }}>
      <Typography
        className={cssModule.tableTitle}
        variant="tableTitle"
        component="p"
      >
        Customers Data
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 511, maxWidth: 1280 }} aria-label="simple table">
          <TableHead>
            <TableRow className={cssModule.tableRow}>
              <TableCell>User Info</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Register date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList &&
              dataList.map((row) => {
                const imgSrc =
                  row.image || row.photo || '/images/default-avatar.png';
                return (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div className={cssModule.photoAndName}>
                        <Image
                          src={imgSrc}
                          width={36}
                          height={36}
                          alt="portrait photo"
                        />
                        {row.name}
                      </div>
                    </TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.phone}</TableCell>
                    <TableCell align="left">{row.register_date}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
