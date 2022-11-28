import * as React from 'react'
import useAxios from '../hooks/useAxios'
import {useHistory} from 'react-router-dom';
import {Box} from '@mui/system'
import {Grid, CircularProgress, Typography} from '@mui/material'
import {CustomItem} from '../assets/custom-components/CustomItem'
import {CustomNextButton} from "../assets/custom-components/CustomNextButton"
import {CustomArrowRightIcon} from "../assets/custom-components/CustomArrowRightIcon"

const Settings = () => {
    const history = useHistory();
    const [active, setActive] = React.useState(null)
    const {response, error, loading} = useAxios({url: '/api_category.php'});

    if (loading) {
        return (
            <Box mt={20} textAlign="center">
                <CircularProgress/>
            </Box>
        );
    }

    if (error) {
        return (
            <Typography variant='h6' mt={20} color='red'>
                Some Went Wrong!
            </Typography>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        history.push('/questions');
    };

    const itemStyle = {
        backgroundColor: '#fff',
        borderColor: '#29af73',
    };

    return (
        <Box mt={5}>
            <Typography style={{color: '#000937'}} variant="h5" textAlign='center' fontWeight="600" mb={5}>
                Select Category 🚀
            </Typography>

            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 8, md: 12}}>
                {response?.trivia_categories.slice(0, 10).map((category, idx) => (
                    <Grid item xs={2} sm={4} md={4} key={idx}>
                        <CustomItem style={active === category ? itemStyle : null} onClick={() => setActive(category)}>
                            <Typography variant='p' fontWeight='500'>
                                {category.name}
                            </Typography>
                        </CustomItem>
                    </Grid>
                ))}
            </Grid>

            <Box mt={5}>
                <CustomNextButton onClick={handleSubmit}>
                    Next
                    <CustomArrowRightIcon />
                </CustomNextButton>
            </Box>
        </Box>

    );
};

export default Settings;
