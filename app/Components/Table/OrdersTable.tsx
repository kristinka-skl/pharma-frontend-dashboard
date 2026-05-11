import { Order } from '@/app/types/pharma';
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
import Image from 'next/image';

interface BasicTableProps {
  dataList: Order[];
}

export default function OrdersTable({ dataList }: BasicTableProps) {

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Completed':
        return {
          badgeBg: 'rgba(89, 177, 122, 0.1)', 
          badgeText: 'var(--accent)',
        };
      case 'Confirmed':
        return {
          badgeBg: 'rgba(138, 43, 226, 0.1)', 
          badgeText: '#8059e4',
        };
      case 'Pending':
        return {
          badgeBg: 'rgba(245, 158, 11, 0.1)', 
          badgeText: '#f79042',
        };
      case 'Cancelled':
        return {
          badgeBg: 'rgba(232, 80, 80, 0.1)',  
          badgeText: 'var(--accent-2)',
        };
      case 'Processing':
        return {
          badgeBg: 'rgba(59, 130, 246, 0.1)',
          badgeText: '#70a6e8',
        };
      default:
        return {
          badgeBg: 'transparent',
          badgeText: 'inherit',
        };
    }
  };

  console.log('dataList:', dataList);

  return (
    
    <Box className={cssModule.box} sx={{ width: { xs: '511px', md: '960px', lg: '1280px' } }}>
      <Typography
        className={cssModule.tableTitle}
        variant="tableTitle"
        component="p"
      >
        All orders
      </Typography>
      <TableContainer>
        <Table sx={{ minWidth: 511, maxWidth: 1280 }} aria-label="orders table">
          <TableHead>
            
            <TableRow
              className={cssModule.tableRow}
              sx={{ height: { xs: '42px', md: '58px' } }}
            >
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
              dataList.map((row) => {
                
                const styles = getStatusStyles(row.status);

                return (
                  <TableRow
                    key={row.name} 
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <div className={cssModule.photoAndName}>
                        <Image className={cssModule.photo}
                          src={row.photo}
                          width={24}
                          height={24}
                          alt="portrait photo"                          
                        />
                        {row.name}
                      </div>
                    </TableCell>
                    
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.products}</TableCell>
                    
                    <TableCell align="left">
                      
                      {row.order_date}
                    </TableCell>
                    
                    <TableCell align="left">
                      
                      {Number(row.price).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </TableCell>
                    
                    
                    <TableCell align="left">
                      <Box
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '4px 12px',
                          borderRadius: '40px',
                          backgroundColor: styles.badgeBg,
                          color: styles.badgeText,
                          fontWeight: 500,
                          fontSize: '14px',
                          width: '92px',
                          minWidth: '80px',
                          height: '25px',
                          boxSizing: 'border-box',
                        }}
                      >
                        {row.status}
                      </Box>
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