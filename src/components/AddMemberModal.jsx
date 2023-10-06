import React, { useContext, useState } from 'react';
import "../styles/AddMemberModal.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { DataContext } from '../App';
import { addLocal } from '../functions/localstorage';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMemberModal = ({ open, setOpen }) => {

    const { empData, setEmpData } = useContext(DataContext);

    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [phoneNum, setPhoneNum] = useState("");
    const [email, setEmail] = useState("");
    const [teamId, setTeamId] = useState("");
    const [dropdownOption, setDropdownOption] = useState([]);
    const [idAvailable, setIdAvailable] = useState(true);
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

    const getAllTeamId = (empData) => {
        if (dropdownOption.length === 0) {
            empData?.forEach((element, index) => {
                if (element.info.title.toLowerCase().includes("team")) {
                    setDropdownOption((prev) => [...prev, { title: element.info.title, id: element.info.id }])
                    return;
                }
                else {
                    getAllTeamId(element.children);
                }
            })
        }
    }


    const AddMemberFunc = (empData) => {
        if (name && id && email && phoneNum && teamId) {
            empData?.forEach((element, index) => {
                if (element.info.id === teamId) {
                    element.children.push({
                        title: "member",
                        name: name,
                        id: id,
                        phone_number: phoneNum,
                        email_id: email
                    })
                    return;
                }
                else {
                    if (!element.info.title.toLowerCase().includes("team")) {
                        AddMemberFunc(element.children);
                    }
                }
            })
            addLocal('data', empData, true);
            setEmpData(empData);
            handleClose();
        }
        else {
            toast.error('Kindly fill all fields!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        }


    }


    const checkIdAvailable = (id) => {
        setIdAvailable(() => true);
        checkId(empData, id);
        setId(id);

    }

    const checkId = (empData, id) => {
        empData?.forEach((element, index) => {
            if (element.info.title.toLowerCase().includes("team")) {
                if (element.info.id === id) {
                    setIdAvailable(false);
                } else {
                    // Check id of team members
                    element.children.forEach((data) => {
                        if (data.id === id) {
                            setIdAvailable(() => false);
                            return;
                        }
                    })

                }
            }
            else {
                if (element.info.id === id) {
                    setIdAvailable(() => false);
                    return;
                }
                checkId(element.children, id);
            }
        })
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

                        <h1 style={{ marginBottom: '20px' }}>Add New Team Member</h1>
                        <label className='info-label' htmlFor="name">
                            <p style={{ width: "30%" }}>Name :  </p>
                            <input onChange={(e) => setName(e.target.value)} className='info-input' id="name" type="text" />
                        </label>
                        <label className='info-label' htmlFor="id">
                            <p style={{ width: "30%" }}>Id : </p>
                            <input onChange={(e) => checkIdAvailable(e.target.value)} className='info-input' id="id" type="number" />
                        </label>
                        {!idAvailable && <i style={{ color: 'red' }}>id is not available</i>}
                        <label className='info-label' htmlFor="phone">
                            <p style={{ width: "30%" }}>Phone Number : </p>
                            <input onChange={(e) => setPhoneNum(e.target.value)} className='info-input' id="phone" type="text" />
                        </label>
                        <label className='info-label' htmlFor="email">
                            <p style={{ width: "30%" }}>Email : </p>
                            <input onChange={(e) => setEmail(e.target.value)} className='info-input' id="email" type="email" />
                        </label>
                    </div>

                    <select onChange={(e) => setTeamId(e.target.value)} onClick={() => getAllTeamId(empData)} className='input-select' name="" id="">
                        <option selected disabled value="">Select Team</option>
                        {
                            dropdownOption?.map((data) => {
                                return <option value={data.id}>Team - {data.id}</option>
                            })
                        }
                    </select>

                    <div className='modal-btn-div'>
                        <button onClick={() => AddMemberFunc(empData)} className='modal-btn modal-update'>Add</button>
                        {/* <button className='modal-btn modal-delete'>Delete</button> */}
                    </div>
                </Box>
            </Modal>


            <ToastContainer />

        </>
    )
}

export default AddMemberModal;