import { RecentCustomer } from '@/app/types/pharma';
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
import Image from 'next/image';
import cssModule from './Table.module.css';

interface BasicTableProps {
  dataList: RecentCustomer[];
}

export default function RecentCustomersTable({ dataList }: BasicTableProps) {
  console.log('dataList:', dataList);
  return (
    <Box className={cssModule.box} sx={{ width: '100%', height: '100%' } }>
      <Typography
        className={cssModule.tableTitle}
        sx={{ flex: '1 1 100%' }}
        id="tableTitle"
        component="p"
      >
        Recent Customers
      </Typography>
      <TableContainer >
        <Table sx={{ minWidth: 335, maxWidth: 630, height: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow className={cssModule.tableRow}>
              <TableCell>Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Spent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList &&
              dataList.map((row) => {
                const imgSrc = row.photo || '/images/default-avatar.png';
                return (
                  <TableRow className={cssModule.tableRow}
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
                    <TableCell align="left">{row.spent}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
