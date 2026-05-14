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
  console.log('dataList:', dataList);
  return (
    <Box
      className={cssModule.box}
      sx={{ minWidth: { xs: '511px', md: '960px', lg: '1280px' } }}
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
              <TableCell sx={{ width: '22%' }}>Supplier Info</TableCell>
              <TableCell sx={{ width: '20%' }} align="left">
                Address
              </TableCell>
              <TableCell sx={{ width: '16%' }} align="left">
                Company
              </TableCell>
              <TableCell sx={{ width: '21%' }} align="left">
                Delivery date
              </TableCell>
              <TableCell sx={{ width: '13%' }} align="left">
                Amount
              </TableCell>
              <TableCell sx={{ width: '13%' }} align="left">
                Status
              </TableCell>
              <TableCell sx={{ width: '13%' }} align="left">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList &&
              dataList.map((row) => {
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
                    <TableCell align="left">{row.status}</TableCell>
                    <TableCell align="left">
                      <div className={cssModule.actions}>
                        <button
                          className={`${cssModule.actionBtn} ${cssModule.updBtn}`}
                          onClick={() => onEdit(row)}
                        >
                          <svg
                            className={cssModule.icon}
                            width={16}
                            height={16}
                          >
                            <use href="./sprite.svg#icon-edit"></use>
                          </svg>
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
