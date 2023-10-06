import { Box, Modal } from "@mui/material";
import "../styles/PopModal.css";

const SimpleModal = ({ open, setOpen, text }) => { 

    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
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
                        <p>{text}</p>
                    </div>
                </Box>
            </Modal>


        </>
    )
}

export default SimpleModal;