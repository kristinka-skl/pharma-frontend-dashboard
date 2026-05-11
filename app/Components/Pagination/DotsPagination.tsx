import { Box } from '@mui/material';

interface DotsPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function DotsPagination({
  totalPages,
  currentPage,
  onPageChange,
}: DotsPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 3, mb: 3 }}>
      {Array.from({ length: totalPages }).map((_, index) => {
        const pageNumber = index + 1; 
        const isActive = pageNumber === currentPage;

        return (
          <Box
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            sx={{
              width: isActive ? 12 : 9,
              height: isActive ? 12 : 9,
              borderRadius: '50%',
              backgroundColor: isActive ? 'var(--accent)' : '#E7F1ED',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: isActive ? 'var(--accent)' : '#E7F1ED',
              },
            }}
          />
        );
      })}
    </Box>
  );
}