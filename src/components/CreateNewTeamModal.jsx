import React, { useContext, useState } from 'react'
import "../styles/PopModal.css";
import { Box, Modal } from '@mui/material'
import { DataContext } from '../App';
import { addLocal } from '../functions/localstorage';

const CreateNewTeamModal = ({ data, openNewTeam, setOpenNewTeam }) => {

    const {empData, setEmpData} = useContext(DataContext);

    const [id, setId] = useState();

    const handleCloseNewTeam = () => setOpenNewTeam(false);

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

    const createNewTeam = (empData, headId) => {
        empData?.forEach((element, index) => {
            if(!element.info.title.toLowerCase().includes("team")){
                if (element.info.id === headId) {
                    element.children.push({
                        info:{
                            title: `Team (${id})`,
                            id: id,
                        },
                        children: []
                    })
                    return;
                }
                else{
                    createNewTeam(element.children, headId);
                }
            }
        })
        addLocal('data', empData, true);
        setEmpData(empData);
        handleCloseNewTeam();
    }

    return (
        <>
            <Modal
                open={openNewTeam}
                onClose={handleCloseNewTeam}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='modal-info-div'>

                        <h1>Create New Team in <i style={{fontSize:'13px', fontWeight:'400', backgroundColor:''}}>{data.info.id}</i></h1>
                        <label className='info-label' htmlFor="name">
                            <p style={{ width: "30%" }}>Team Name :  </p>
                            <input disabled className='info-input' id="name" type="text" value={`Team (${id})`} />
                        </label>
                        <label className='info-label' htmlFor="id">
                            <p style={{ width: "30%" }}>Id : </p>
                            <input onChange={(e) => setId(e.target.value)} className='info-input' id="id" type="number" value={id} />
                        </label>
                    </div>
                    <div className='modal-btn-div'>
                        <button onClick={() => createNewTeam(empData, data?.info?.id)} className='modal-btn modal-update'>Create</button>
                    </div>
                </Box>
            </Modal>


        </>
    )
}

export default CreateNewTeamModal