import * as React from 'react';
import Slide from '@mui/material/Slide';

export const CustomTransition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction='up' ref={ref} {...props} />;
});