import {Box} from "@mui/system";
import Dialog from "../components/Dialog"

const HomePage = () => {
    return (
        <Box
            className="candles"
            style={{
                backgroundSize: "cover",
                height: "100vh",
                backgroundPosition: "center"
            }}>
            <Dialog />
        </Box>
    );
};

export default HomePage;
