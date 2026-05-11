import { RecentCustomer } from '@/app/types/pharma';
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
import Image from 'next/image';
import cssModule from './Table.module.css';

interface BasicTableProps {
  dataList: RecentCustomer[];
}

export default function RecentCustomersTable({ dataList }: BasicTableProps) {
  console.log('dataList:', dataList);
  return (
    <Box className={cssModule.box} sx={{ width: '100%', height: '100%' }}>
      <Typography
        className={cssModule.tableTitle}
        variant="tableTitle"
        component="p"
      >
        Recent Customers
      </Typography>
      <TableContainer>
        <Table
          sx={{
            minWidth: 335,
            maxWidth: '100%',
            height: '100%',
            tableLayout: 'fixed',
          }}
          aria-label="recent customers table"
        >
          <TableHead>
            <TableRow className={cssModule.tableHeadRow}>
              <TableCell sx={{ width: {sm: 100, lg:  214}}}>Name</TableCell>
              <TableCell sx={{ width: {sm: 148, lg: 284} }} align="left">
                Email
              </TableCell>
              <TableCell sx={{ width: {sm: 82, lg: 134} }} align="left">
                Spent
              </TableCell>
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
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
                  >
                    <TableCell component="th" scope="row">
                      <div className={cssModule.photoAndName}>
                        <Image className={cssModule.photo}
                          src={imgSrc}
                          width={24}
                          height={24}
                          alt="portrait photo"
                        />
                        {row.name}
                      </div>
                    </TableCell>
                    <TableCell
                      sx={{ wordBreak: { xs: 'break-all', md: 'normal' }, overflowWrap: 'anywhere' }}
                      align="left"
                    >
                      {row.email}
                    </TableCell>
                    <TableCell align="left">
                      {Number(row.spent).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
