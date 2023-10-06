import React, { useState } from 'react'
import PopModal from './PopModal';

const MemberField = ({ data, key, isVisible }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    return (
        <>
            {
                isVisible &&
                <fieldset key={key}>
                    <legend style={{ padding: '10px' }}>{data.title} ,<em>{data.id}</em></legend>
                    <div>
                        <p>Name : {data.name}</p>
                        <p>Phone Number : {data.phone_number}</p>
                        <p>Email : {data.email_id}</p>
                    </div>
                    <button onClick={handleOpen} style={{ color: '#00A6FF', padding: '5px 15px', border: 'none', cursor: 'pointer', borderRadius: '20px' }}>Edit</button>
                </fieldset>
            }

            <PopModal open={open} setOpen={setOpen} data={data} />
        </>
    )
}

export default MemberField;