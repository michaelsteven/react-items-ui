import { createTheme } from '@mui/material/styles';
import { grey, red } from '@mui/material/colors';
import hexToRgba from 'hex-to-rgba';
import { hexToRgb } from '../../helpers/utilities';

const black = {
  100: '#000000',
  87: '#212121',
  54: '#757575',
  38: '#9E9E9E',
  24: '#C2C2C2',
  12: '#E0E0E0',
  0: '#292929',
};

const coreBlue = {
  100: '#005378',
  87: '#216989',
  54: '#75A2B6',
  38: '#9EBECC',
  24: '#C2D6DF',
  12: '#1C313A',
  overlay: '#F0F5F7',
};

const status = {
  grey: '#9E9E9E',
  red: '#D32F2F',
  amber: '#FFA000',
  green: '#388E3C',
  sky: '#BDE5F8',
  blood: '#D0021B',
};

const sourceTeal = {
  100: '#00929B',
  87: '#00929B',
  54: '#75C4C9',
  38: '#9ED5D9',
  24: '#C2E5E7',
  overlay: '#F0F9F9',
};






const colors = {
  primary: grey,
  secondary: red,
  tertiary: coreBlue[38],
  overlay: coreBlue.overlay,
  retry: '#ff9100',
  background: hexToRgba(black[12], 0.12),
  border: black[12],
  default: status.grey,
  success: status.green,
  error: status.red,
  warning: status.amber,
  info: status.sky,
  errorBg: '#F9E6E6',
  text: {
    primary: black[87],
    secondary: black[54],
    criticalFailure: status.blood,
  },
  black,
  grey,
  white: '#FFFFFF',
  coreBlue,
  sourceTeal,
  panelGrey: '#909497',
  hrGrey: '#D4D4D4',
};
export const theme = {
  colors,
  coreBlue,
  fonts: {
    primary: 'IBM Plex Sans',
    secondary: 'IBM Plex Sans',
  },
  boxShadows: {
    low: '0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0, 0, 0, 0.2)',
    medium:
      '0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12), 0 5px 5px -3px rgba(0,0,0,0.2)',
    high: '0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px -5px rgba(0,0,0,0.2)',
    overlay:
      '0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2)',
  },
  accordion: {
    column: {
      guide: `2px solid ${grey[100]}`,
    },
    hoverBg: hexToRgba(coreBlue.overlay, 0.8),
  },
  buttons: {
    primary: {
      background: colors.primary,
      color: 'white',
    },
    inline: {
      color: colors.primary,
      hoverBackground: hexToRgba(coreBlue.overlay, 1),
      hoverColor: colors.primary,
    },
    outline: {
      color: colors.primary,
      border: grey[300],
    },
    danger: {
      color: 'white',
      background: red[500],
    },
  },
  bubbles: {
    width: '300px',
  },
  icons: {
    default: grey[600],
    material: grey[500],
    active: grey[900],
    disabled: grey[300],
  },
  disabled: {
    hoverBackground: grey[100],
    textColorLight: grey[300],
    textColorDark: grey[500],
  },
  navigation: {
    hover: grey[100],
  },
  // added for rbaas
  spacing: {
    unit: '5',
  },
  illustrations: {
    outlineColor: colors.primary,
  },
};

export const muiTheme = (
  primary = coreBlue[100],
  secondary = coreBlue[87]
) => {
  const primaryHover = hexToRgb(primary);
  const primaryHoverString = secondary
    ? `rgba(${primaryHover.r}, ${primaryHover.g}, ${primaryHover.b}, 0.1)`
    : grey[100];
  return createTheme({
    typography: {
      fontFamily: 'IBM Plex Sans',
      useNextVariants: true,
    },
    palette: {
      primary: {
        main: colors.primary,
        dark: coreBlue[87],
        light: coreBlue[54],
      },
      secondary: {
        light: coreBlue[24],
        main: colors.secondary,
        dark: coreBlue[100],
      },
      error: {
        main: status.red,
      },
      action: {
        hover: primaryHoverString,
      },
    },
    overrides: {
      MuiMenuItem: {
        root: {
          'font-size': '12px',
          'padding-top': '10px',
          'padding-bottom': '10px',
        },
      },
      MuiTableCell: {
        root: {
          '&:last-child': {
            paddingRight: 0,
          },
        },
        head: {
          'font-size': '12px',
          'font-weight': '500',
          'letter-spacing': '0.25px',
          'line-height': '20px',
          color: '#757575',
        },
        body: {
          'font-size': '16px',
          'font-weight': '500',
          'letter-spacing': '0.15px',
          'line-height': '24px',
          color: '#212121',
        },
      },
      MuiExpansionPanel: {
        root: {
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
      MuiListItem: {
        gutters: {
          paddingLeft: '6px',
        },
      },
      MuiAccordion: { root: { transition: 'none' } },
      MuiAccordionSummary: {
        content: {
          '&.Mui-expanded': {
            margin: 0,
          },
          margin: 0,
        },
        root: {
          '&.Mui-expanded': {
            'min-height': 'auto',
          },
          padding: '1px',
        },
      },
      MuiAccordionDetails: {
        root: {
          padding: '0 0 0 0',
        },
      },
      MuiIconButton: {
        edgeEnd: {
          marginRight: 0,
        },
      },
      MuiTableSortLabel: {
        root: {
          'font-size': '.8rem',
        },
      },
    },
  });
};
