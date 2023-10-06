import React, { useContext, useState } from 'react'
import "../styles/PopModal.css";
import { Box, Modal } from '@mui/material'
import { DataContext } from '../App';

const SearchModal = ({ openSearch, setOpenSearch }) => {

    const handleClose = () => setOpenSearch(false);

    const { empData } = useContext(DataContext);

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: "fit-content",
        margin: "auto",
        marginTop: "40px",
        bgcolor: '#272727',
        border: '2px solid #00C5FF',
        borderRadius: "20px",
        boxShadow: 24,
        // overflowY:"scroll",
        p: 4,
    };


    const findSearchResults = (search) => {
        findByName(empData, search);
        findByPhone(empData, search);
        findByEmail(empData, search);
    }

    const findByName = (empData, value) => {
        empData?.forEach((element, index) => {
            if (!element.info.title.toLowerCase().includes("team")) {
                if (element.info.name.toLowerCase().includes(value)) {
                    setSearchResult(prev => [...prev, element.info])
                }
                    findByName(element.children, value)
            }
            else {
                element.children.forEach((element) => {
                    if (element.name.toLowerCase().includes(value)) {
                        setSearchResult(prev => [...prev, element]);
                    }
                })
            }
        })
    }
    const findByPhone = (empData, value) => {
        empData?.forEach((element, index) => {
            if (!element.info.title.toLowerCase().includes("team")) {
                if (element.info.phone_number.toString().includes(value)) {
                    setSearchResult(prev => [...prev, element.info])
                }
                    findByPhone(element.children, value)
            }
            else {
                element.children.forEach((element) => {
                    if (element.phone_number.toString().includes(value)) {
                        setSearchResult(prev => [...prev, element]);
                    }
                })
            }
        })
    }
    const findByEmail = (empData, value) => {
        empData?.forEach((element, index) => {
            if (!element.info.title.toLowerCase().includes("team")) {
                if (element.info.email_id.toLowerCase().includes(value)) {
                    setSearchResult(prev => [...prev, element.info])
                }
                    findByEmail(element.children, value)
            }
            else {
                element.children.forEach((element) => {
                    if (element.email_id.toLowerCase().includes(value)) {
                        setSearchResult(prev => [...prev, element]);
                    }
                })
            }
        })
    }

    const resetSearch = () => {
        setSearch("");
        setSearchResult([]);
    }
    return (
        <>
            <Modal
                open={openSearch}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className='modal-info-div'>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h1>Search...</h1>
                            <button onClick={() => resetSearch()} style={{ padding: '10px 20px', borderRadius: '15px', border: 'none', backgroundColor: '#00A6FF' }}>Reset</button>
                        </div>
                        <input onChange={(e) => setSearch(e.target.value)} style={{ margin: '20px 0', width: '100%' }} className='info-input' id="name" type="text" placeholder='Search by name, email or phone' value={search} />
                        <button onClick={() => findSearchResults(search)} style={{ padding: '10px 20px', borderRadius: '15px', border: 'none', backgroundColor: '#00A6FF' }}>Submit</button>

                        <div style={{ paddingTop: '20px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', height:"300px", overflowY:'scroll' }}>
                            {
                                searchResult.length !== 0 ? searchResult.map((data) => {
                                    return (
                                        <div style={{ padding: '10px 20px', border: '2px solid #00A6FF', width: 'fit-content', height:'fit-content' ,borderRadius: '10px', marginLeft: '20px' }}>
                                            <p>Name : {data.name}</p>
                                            <p>Email : {data.email_id}</p>
                                            <p>Phone : {data.phone_number}</p>
                                            <p>Title : <span style={{color:'#00A6FF'}}>{data.title}</span></p>
                                        </div>
                                    )
                                }) : <i>No Results</i>
                            }
                        </div>

                    </div>
                </Box>
            </Modal>
        </>
    )
}

export default SearchModal