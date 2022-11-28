import {withStyles} from '@mui/styles';
import Button from '@mui/material/Button';

export const CustomQuestionButton = withStyles({
    root: {
        background: '#f2f2f2',
        borderRadius: '32px',
        color: '#1c1c1c',
        fontSize: '14px',
        lineHeight: '20px',
        padding: '12px 24px',
        boxShadow: 'none',
        '&:hover': {
            background: '#eae9e9',
        },
    }
})(props => <Button {...props} />);