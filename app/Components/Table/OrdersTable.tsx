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
import AvatarWithFallback from './AvatarWithFallback';

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
      case 'Shipped':
        return {
          badgeBg: 'rgba(245, 158, 11, 0.1)',
          badgeText: '#f79042',
        };
      case 'Delivered':
        return {
          badgeBg: 'rgba(89, 177, 122, 0.1)',
          badgeText: 'var(--accent)',
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


  return (
    <Box
      className={cssModule.box}
      sx={{ width: { xs: '700px', md: '960px', lg: '1280px' } }}
    >
      <Typography
        className={cssModule.tableTitle}
        variant="tableTitle"
        component="p"
      >
        All orders
      </Typography>
      <TableContainer>
        <Table
          sx={{ minWidth: 511, maxWidth: 1280, tableLayout: 'fixed' }}
          aria-label="orders table"
        >
          <TableHead>
            <TableRow
              className={cssModule.tableRow}
              sx={{ height: { xs: '42px', md: '58px' } }}
            >
              <TableCell sx={{ width: {xs: '18%', md: '22%'} }}>User Info</TableCell>
              <TableCell sx={{ width: {xs: '26%', md: '20%'} }} align="left">
                Address
              </TableCell>
              <TableCell sx={{ width: {xs: '12%', md: '15%'} }} align="left">
                Products
              </TableCell>
              <TableCell sx={{ width: {xs: '15%', md: '21%'} }} align="left">
                Order date
              </TableCell>
              <TableCell sx={{ width: {xs: '11%', md: '13%'} }} align="left">
                Price
              </TableCell>
              <TableCell sx={{ width: {xs: '18%', md: '14%'} }} align="left">
                Status
              </TableCell>
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
                        <AvatarWithFallback
                          src={row.photo}
                          name={row.name}
                          className={cssModule.photo}
                        />

                        {row.name}
                      </div>
                    </TableCell>

                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.products}</TableCell>
                    <TableCell align="left">{row.order_date}</TableCell>

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
