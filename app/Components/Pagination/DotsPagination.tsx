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

  // Визначаємо максимальну кількість видимих точок
  const maxVisibleDots = 5;

  // Логіка "ковзного вікна"
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, currentPage + 2);

  // Коригуємо вікно, якщо ми дуже близько до початку
  if (currentPage <= 3) {
    endPage = Math.min(totalPages, maxVisibleDots);
  }

  // Коригуємо вікно, якщо ми дуже близько до кінця
  if (currentPage >= totalPages - 2) {
    startPage = Math.max(1, totalPages - maxVisibleDots + 1);
  }

  // Створюємо масив тільки для тих сторінок, які мають відображатися
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, mt: 3, mb: 3 }}>
      {visiblePages.map((pageNumber) => {
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