import { Product } from '@/app/types/pharma';
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
  dataList: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

export default function ProductsTable({
  dataList,
  onEdit,
  onDelete,
}: BasicTableProps) {
  return (
    <Box
      className={cssModule.box}
      sx={{ minWidth: { xs: '690px', md: '960px', lg: '1280px' } }}
    >
      <Typography
        className={cssModule.tableTitle}
        variant="tableTitle"
        component="p"
      >
        All products
      </Typography>
      <TableContainer>
        <Table
          sx={{ minWidth: 511, maxWidth: 1280, tableLayout: 'fixed' }}
          aria-label="products table"
        >
          <TableHead>
            <TableRow
              className={cssModule.tableRow}
              sx={{ height: { xs: '42px', md: '58px' } }}
            >
              <TableCell sx={{ width: {xs: '20%', md: '22%'} }}>Product Info</TableCell>
              <TableCell sx={{ width: {xs: '18%', md: '14%'} }} align="left">
                Category
              </TableCell>
              <TableCell sx={{ width: {xs: '13%', md: '14%'} }} align="left">
                Stock
              </TableCell>
              <TableCell sx={{ width: {xs: '18%', md: '22%'} }} align="left">
                Supplier
              </TableCell>
              <TableCell sx={{ width: {xs: '14%', md: '13%'} }} align="left">
                Price
              </TableCell>
              <TableCell sx={{ width: {xs: '17%', md: '15%'} }} align="left">
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
                    <TableCell align="left">{row.category}</TableCell>
                    <TableCell align="left">{row.stock}</TableCell>
                    <TableCell align="left">{row.suppliers}</TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">
                      <div className={cssModule.actions}>
                        <button
                        aria-label='edit'
                          className={`${cssModule.actionBtn} ${cssModule.updBtn}`}
                          onClick={() => onEdit(row)}
                        >
                          <svg
                            className={cssModule.icon}
                            width={16}
                            height={16}
                            aria-hidden='true'
                          >
                            <use href="./sprite.svg#icon-edit"></use>
                          </svg>
                        </button>
                        <button
                        aria-label='delete'
                          className={`${cssModule.actionBtn} ${cssModule.delBtn}`}
                          onClick={() => onDelete(row._id)}
                        >
                          <svg
                            className={cssModule.icon}
                            width={16}
                            height={16}
                            aria-hidden='true'
                          >
                            <use href="./sprite.svg#icon-trash"></use>
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
