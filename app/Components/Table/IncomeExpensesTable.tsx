import { IncomeExpense, RecentCustomer } from '@/app/types/pharma';
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
  dataList: IncomeExpense[];
}

export default function IncomeExpensesTable({ dataList }: BasicTableProps) {
  console.log('dataList:', dataList);
  return (
    <Box className={cssModule.box} sx={{ width: '100%' }}>
      <Typography
        className={cssModule.tableTitle}
        sx={{ flex: '1 1 100%' }}
        id="tableTitle"
        component="p"
      >
        Income/Expenses
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 335, maxWidth: 630 }} aria-label="simple table">
          <TableHead>
            <TableRow className={cssModule.tableRow}>
              <TableCell>Today</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList &&
              dataList.map((row, index) => {
                
                return (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{row.type}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
