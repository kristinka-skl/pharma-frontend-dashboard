import { IncomeExpense, TransactionType } from '@/app/types/pharma';
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

import cssModule from './Table.module.css';

interface BasicTableProps {
  dataList: IncomeExpense[];
}

export default function IncomeExpensesTable({ dataList }: BasicTableProps) {
  const getStatusStyles = (type: TransactionType | string) => {
    switch (type) {
      case 'Income':
        return {
          badgeBg: 'rgba(89, 177, 122, 0.1)',
          badgeText: 'var(--accent)',
          amountColor: 'var(--accent)',
          textDecoration: 'none',
        };
      case 'Expense':
        return {
          badgeBg: 'rgba(232, 80, 80, 0.1)',
          badgeText: 'var(--accent-2)',
          amountColor: 'var(--accent-2)',
          textDecoration: 'none',
        };
      case 'Error':
        return {
          badgeBg: 'rgba(29, 30, 33, 0.1)',
          badgeText: 'var(--main-black)',
          amountColor: 'var(--main-black)',
          textDecoration: 'line-through',
        };
      default:
        return {
          badgeBg: 'transparent',
          badgeText: 'inherit',
          amountColor: 'inherit',
          textDecoration: 'none',
        };
    }
  };

  return (
    <Box 
      className={cssModule.box} 
      sx={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column'
      }}
    >
      <Typography
        className={cssModule.tableTitle}
        variant="tableTitle"
        component="p"
      >
        Income/Expenses
      </Typography>
      
      <TableContainer sx={{ flexGrow: 1 }}> 
        
        <Table
          sx={{
            minWidth: 335,
            height: '100%', 
            
           
            '& .MuiTableCell-root': {
              borderRight: 'none',             
              padding: { xs: '14px', md: '20px 16px', lg: '12px 20px' }, 
            },
            '& .MuiTableRow-root': {
              height: 'auto', 
            },
          }}
          aria-label="income and expenses table"
        >
          <TableHead>
            <TableRow className={cssModule.tableHeadRow}>
              <TableCell colSpan={3} sx={{height: {xs: '46px', md: '58px'}}}>Today</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList &&
              dataList.map((row, index) => {
                const styles = getStatusStyles(row.type);
                return (
                  <TableRow
                    className={cssModule.tableRow}
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell sx={{ whiteSpace: 'nowrap' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '4px 14px',
                          borderRadius: '40px',
                          backgroundColor: styles.badgeBg,
                          color: styles.badgeText,
                          fontWeight: 500,
                          fontSize: '12px',
                          letterSpacing: '-0.05em',
                          width: 'fit-content',
                          minWidth: '80px',
                          height: '24px',
                          boxSizing: 'border-box',
                        }}
                      >
                        {row.type}
                      </Box>
                    </TableCell>

                    <TableCell
                      align="left"
                      sx={{
                        wordBreak: 'break-word',
                        paddingLeft: { xs: '14px', md: '0px' },
                      }}
                    >
                      {row.name}
                    </TableCell>

                    <TableCell
                      align="right"
                      sx={{
                        whiteSpace: 'nowrap',
                        color: styles.amountColor,
                        textDecoration: styles.textDecoration,
                        fontWeight: 500,
                        fontSize: '14px',
                        lineHeight: '1.28571',
                      }}
                    >
                      {row.amount}
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