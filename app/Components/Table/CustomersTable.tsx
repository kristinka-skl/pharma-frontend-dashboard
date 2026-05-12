import { Customer } from '@/app/types/pharma';
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
  dataList: Customer[];
}

export default function CustomersTable({ dataList }: BasicTableProps) {
  console.log('dataList:', dataList);
  return (
    <Box className={cssModule.box} sx={{ minWidth: { xs: '511px', md: '960px', lg: '1280px' } }}>
      <Typography
        className={cssModule.tableTitle}
        variant="tableTitle"
        component="p"
      >
        Customers Data
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 670, maxWidth: 1280, 
          tableLayout: 'fixed' 
          }} aria-label="customers table">
          <TableHead>
            <TableRow className={cssModule.tableRow}
            sx={{ height: { xs: '42px', md: '58px' } }}
            >
              <TableCell sx={{ width: '18%' }}>User Info</TableCell>
              <TableCell sx={{ width: '25%' }} align="left">Email</TableCell>
              <TableCell sx={{ width: '20%' }} align="left">Address</TableCell>
              <TableCell sx={{ width: '22%' }} align="left">Phone</TableCell>
              <TableCell sx={{ width: '15%' }} align="left">Register date</TableCell>
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
                    <TableCell sx={{ wordBreak: { xs: 'break-all', md: 'normal' }, overflowWrap: 'anywhere' }} align="left">{row.email}</TableCell>
                    <TableCell sx={{ wordBreak: { xs: 'break-all', md: 'normal' }, overflowWrap: 'anywhere' }} align="left">{row.address}</TableCell>
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
