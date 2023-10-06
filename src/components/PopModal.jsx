import React, { useContext, useState } from 'react';
import "../styles/PopModal.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DataContext } from '../App';
import { addLocal } from '../functions/localstorage';

const PopModal = ({ open, setOpen, data }) => {

    const { empData, setEmpData } = useContext(DataContext);

    const handleClose = () => setOpen(false);

    const [name, setName] = useState(data?.name);
    const [id, setId] = useState(data?.id);
    const [phoneNum, setPhoneNum] = useState(data?.phone_number);
    const [email, setEmail] = useState(data?.email_id);


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


    const EditUserInfoFunc = () => {
        const userInfo = { name, id, phoneNum, email }
        findUser(empData, userInfo)
        handleClose();

    }

    const findUser = (empData, userInfo) => {
        empData?.forEach((element, index) => {
            if (!element.info.title.toLowerCase().includes("team")) {
                if (element.info.id === userInfo.id) {
                    empData[index].info = {
                        title: data?.title,
                        id: userInfo.id,
                        name: userInfo.name,
                        phone_number: userInfo.phoneNum,
                        email_id: userInfo.email,
                    }
                }
                else {
                    findUser(element.children, userInfo)
                }
            }
            else {
                element.children.forEach((element, index2) => {
                    if (element.id === userInfo.id) {
                        empData[index].children[index2] = {
                            title: data?.title,
                            id: userInfo.id,
                            name: userInfo.name,
                            phone_number: userInfo.phoneNum,
                            email_id: userInfo.email,
                        }
                    }
                })
            }
        })
        addLocal("data", empData, true);
        setEmpData(empData);
    }

    const removeMemberFunc = () => {
        removeUser(empData, id)
        handleClose();
    }

    const removeUser = (empData, id) => {
        empData?.forEach((element, index) => {

            if (element.info.title.toLowerCase().includes("team")) {
                element.children.forEach((child, index) => {
                    if (child.id === id) {
                        element.children.splice(index, 1);
                        return;
                    }
                })
            }
            else {
                removeUser(element.children, id);
            }
        })
        addLocal("data", empData, true);
        setEmpData(empData);
    }



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

                        <h1>{data?.title}</h1>
                        <label className='info-label' htmlFor="name">
                            <p style={{ width: "30%" }}>Name :  </p>
                            <input onChange={(e) => setName(e.target.value)} className='info-input' id="name" type="text" value={name} />
                        </label>
                        <label className='info-label' htmlFor="id">
                            <p style={{ width: "30%" }}>Id : </p>
                            <input onChange={(e) => setId(e.target.value)} disabled={true} className='info-input input-disable' id="id" type="text" value={id} />
                        </label>
                        <label className='info-label' htmlFor="phone">
                            <p style={{ width: "30%" }}>Phone Number : </p>
                            <input onChange={(e) => setPhoneNum(e.target.value)} className='info-input' id="phone" type="text" value={phoneNum} />
                        </label>
                        <label className='info-label' htmlFor="email">
                            <p style={{ width: "30%" }}>Email : </p>
                            <input onChange={(e) => setEmail(e.target.value)} className='info-input' id="email" type="email" value={email} />
                        </label>
                    </div>
                    <div className='modal-btn-div'>
                        <button className='modal-btn modal-update' onClick={EditUserInfoFunc}>Update</button>

                        {/* Render DELETE BUTTON only for Members */}
                        {
                            data?.title === "member" && <button onClick={removeMemberFunc} className='modal-btn modal-delete'>Delete</button>
                        }
                        <i style={{ fontSize: '11px', color: '#fffeb3' }}>Note: Refresh the page to see delete effect</i>
                    </div>
                </Box>
            </Modal>


        </>
    )
}

export default PopModal;