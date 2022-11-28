import {Paper} from "@mui/material";
import {experimentalStyled as styled} from '@mui/material/styles';

export const CustomItem = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#f8f8f8',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    boxShadow: 'none',
    border: '1px solid #dfdfdf',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));