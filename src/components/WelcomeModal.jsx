import { Box, Modal } from "@mui/material";
import "../styles/PopModal.css";

import "../styles/WelcomeModal.css";

const WelcomeModal = ({ open, setOpen}) => { 

    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "70%",
        height:"fit-content",
        bgcolor: '#272727',
        border: '2px solid #00C5FF',
        borderRadius: "20px",
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='modal-info-div'>
                        <div>
                            <h1 style={{fontSize:"60px"}}>Hi, I am <span style={{color:"#00A6FF"}}>Harsh Gupta</span> 😊</h1>

                            <p style={{marginBottom:"30px"}}>Thanks for checking this mini <span style={{color:"#00A6FF"}}>Hierarchy UI</span> project</p>

                            <i style={{ fontSize:"15px"}}><span style={{backgroundColor:"#f7564a", padding:'2px 7px', borderRadius:'10px'}}>Note</span>: If you find something is not update after performing some CRUD operation, then please do a refresh.😉</i>

                            <p style={{marginTop:"30px"}}><span style={{backgroundColor:"#ffc000",color:"#000", padding:'2px 7px', borderRadius:'10px'}}>Click anywhere</span> to remove this welcome message!!</p>
                        </div>
                    </div>
                </Box>
            </Modal>


        </>
    )
}

export default WelcomeModal;