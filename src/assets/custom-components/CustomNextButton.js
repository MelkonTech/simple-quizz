import {withStyles} from '@mui/styles';
import Button from '@mui/material/Button';

export const CustomNextButton = withStyles({
    root: {
        background: '#2bc37f',
        borderRadius: '32px',
        border: '1px solid #30aa74',
        color: '#fff',
        fontSize: '14px',
        lineHeight: '20px',
        padding: '12px 24px',
        boxShadow: 'none',
        
        '&:hover': {
            background: '#29af73',
        },
    },
    label: {
        textTransform: 'capitalize'
    }
})(props => <Button {...props} />);