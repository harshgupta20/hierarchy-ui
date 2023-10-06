import React, { useState } from 'react'
import PopModal from './PopModal';
import DataFlow from './DataFlow';
import CreateNewTeamModal from './CreateNewTeamModal';

const HeadField = ({ data, key }) => {


    const [isVisible, setIsvisible] = useState(false);
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const [openNewTeam, setOpenNewTeam] = useState(false);
    const handleOpenNewTeam = () => setOpenNewTeam(true);



    const visibleContentFunc = () => {
        setIsvisible((prev) => (!prev));
    }


    return (
        <>
            <fieldset key={key} style={{ marginTop: "30px", padding: '20px' }}>
                <legend>{data.info.title} ,<em>{data.info.id}</em></legend>

                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {
                            isVisible ?
                                <button style={{ backgroundColor: '#00A6FF', color: '#fff', padding: '5px 15px', border: 'none', cursor: 'pointer', borderRadius: '20px' }} onClick={() => visibleContentFunc(data.info.id)}>Shrink</button>
                                :
                                <button onClick={() => visibleContentFunc(data.info.id)} style={{ color: '#fff', padding: '5px 15px', border: '1px solid #00A6FF', cursor: 'pointer', borderRadius: '20px' }}>Expand</button>
                        }
                        <PopModal open={open} setOpen={setOpen} data={data.info} />
                        <div>
                            {/* "CREATE TEAM" only visible to Head of departments */}
                            <CreateNewTeamModal data={data} setOpenNewTeam={setOpenNewTeam} openNewTeam={openNewTeam} />
                            {data.info.title && data.info.title.toLowerCase().includes('head') && <button onClick={handleOpenNewTeam} style={{ color: '#00A6FF', padding: '5px 15px', border: 'none', cursor: 'pointer', borderRadius: '20px' }}>Create Team</button>}
                            <button onClick={handleOpen} style={{ color: '#00A6FF', padding: '5px 15px', border: 'none', cursor: 'pointer', borderRadius: '20px' }}>Edit</button>
                        </div>
                    </div>
                    <div>
                        <p>Name : {data.info.name}</p>
                        <p>Phone Number : {data.info.phone_number}</p>
                        <p>Email : {data.info.email_id}</p>
                    </div>
                </div>
                <>
                    <div style={{ display: isVisible ? "flex" : "none", flexDirection: 'column' }}>
                        <DataFlow key={key} DATA={data.children} />
                    </div>
                </>

            </fieldset>
        </>
    )
}

export default HeadField