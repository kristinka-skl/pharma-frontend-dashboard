import { Supplier } from '@/app/types/pharma';
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

interface BasicTableProps {
  dataList: Supplier[];
  onEdit: (supplier: Supplier) => void;
  
}

export default function SuppliersTable({
  dataList,
  onEdit,  
}: BasicTableProps) {

const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Active':
        return {
          badgeBg: 'rgba(89, 177, 122, 0.1)',
          badgeText: 'var(--accent)',
        };
      case 'Deactive':
        return {
          badgeBg: 'rgba(232, 80, 80, 0.1)',
          badgeText: 'var(--accent-2)',
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
      sx={{ minWidth: { xs: '800px', md: '960px', lg: '1280px' } }}
    >
      <Typography
        className={cssModule.tableTitle}
        variant="tableTitle"
        component="p"
      >
        All suppliers
      </Typography>
      <TableContainer>
        <Table
          sx={{ minWidth: 511, maxWidth: 1280, tableLayout: 'fixed' }}
          aria-label="suppliers table"
        >
          <TableHead>
            <TableRow
              className={cssModule.tableRow}
              sx={{ height: { xs: '42px', md: '58px' } }}
            >
              <TableCell sx={{ width: {xs: '15%', md: '17%'} }}>Supplier Info</TableCell>
              <TableCell sx={{ width: {xs: '17%', md: '15%'} }} align="left">
                Address
              </TableCell>
              <TableCell sx={{ width: {xs: '12%', md: '12%'} }} align="left">
                Company
              </TableCell>
              <TableCell sx={{ width: {xs: '15%', md: '18%'} }} align="left">
                Delivery date
              </TableCell>
              <TableCell sx={{ width: {xs: '11%', md: '11%'} }} align="left">
                Amount
              </TableCell>
              <TableCell sx={{ width: {xs: '15%', md: '13%'} }} align="left">
                Status
              </TableCell>
              <TableCell sx={{ width: {xs: '15%', md: '14%'} }} align="left">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList &&
              dataList.map((row) => {
                const styles = getStatusStyles(row.status);
                return (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        wordBreak: { xs: 'break-all', md: 'normal' },
                        overflowWrap: 'anywhere',
                      }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.suppliers}</TableCell>
                    <TableCell align="left">{row.date}</TableCell>
                    <TableCell align="left">{row.amount}</TableCell>
                    <TableCell align="left"><Box
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
                      </Box></TableCell>
                    <TableCell align="left">
                      <div className={cssModule.actions}>
                        <button
                          className={`${cssModule.actionBtn} ${cssModule.updBtn} ${cssModule.updBtnWithText}`}
                          onClick={() => onEdit(row)}
                        >
                          <svg
                            className={cssModule.icon}
                            width={16}
                            height={16}
                          >
                            <use href="./sprite.svg#icon-edit"></use>
                          </svg>
                          <p>Edit</p>
                        </button>
                        
                      </div>
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
