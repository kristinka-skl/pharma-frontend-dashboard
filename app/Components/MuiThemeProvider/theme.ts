import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    tableTitle: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    tableTitle?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    tableTitle: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 375,
      md: 768,
      lg: 1440,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: 'var(--font-inter-sans), sans-serif',

    tableTitle: {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: 1.25,
      color: 'var(--main-black)',
      backgroundColor: 'var(--background)',
      borderRadius: '8px 8px 0 0',
      width: '100%',
      height: '48px',
      paddingLeft: '14px',
      paddingRight: '14px',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          ...(ownerState.variant === 'tableTitle' && {
            [theme.breakpoints.up('md')]: {
              height: '64px',
              paddingLeft: '20px',
              paddingRight: '20px',
              fontSize: '18px',
              lineHeight: 1.77,
            },
          }),
        }),
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontFamily: 'var(--font-inter-sans), sans-serif',
          fontWeight: 500,
          padding: '14px',
          borderRight: '1px solid rgba(29, 30, 33, 0.08)',
          '&:last-child': {
            borderRight: 'none',
          },
          [theme.breakpoints.up('md')]: {
            padding: '20px',
          },
        }),

        head: ({ theme }) => ({
          fontSize: '12px',
          lineHeight: 1.16667,
          color: 'rgba(29, 30, 33, 0.4)',
          [theme.breakpoints.up('md')]: {
            fontSize: '14px',
            lineHeight: 1.28571,
          },
        }),

        body: ({ theme }) => ({
          fontSize: '12px',
          lineHeight: 1.16667,
          color: '#1d1e21',
          [theme.breakpoints.up('md')]: {
            fontSize: '16px',
            lineHeight: 1.125,
          },
        }),
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: ({ theme }) => ({
          height: '74px',
          [theme.breakpoints.up('md')]: {
            height: '76px',
          },
        }),
        head: ({ theme }) => ({
          height: '42px',
          [theme.breakpoints.up('md')]: {
            height: '58px',
          },
        }),
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          overflowX: 'visible', 
        },
      },
    },
  },
});

export default theme;
