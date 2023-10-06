import React, { useContext, useState } from 'react'
import MemberField from './MemberField';
import { DataContext } from '../App';
import { addLocal } from '../functions/localstorage';
import SimpleModal from './SimpleModal';

const TeamField = ({ data, key }) => {

    const { empData, setEmpData } = useContext(DataContext);

    const [isVisible, setIsvisible] = useState(false);
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const visibleContentFunc = (data) => {
        setIsvisible((prev) => (!prev));
    }

    const deleteTeam = (empData, teamId) => {
        deleteFunc(empData, teamId);
        addLocal('data', empData, true);
        setEmpData(empData);
        handleOpen();
    }

    const deleteFunc = (empData, teamId) => {
        empData?.forEach((element, index) => {
            if (element.info.title.toLowerCase().includes("team")) {
                if (element.info.id === teamId) {
                    empData.splice(index, 1)
                    return;
                }
            }
            else {
                deleteTeam(element.children, teamId);
            }
        })
    }

    return (
        <>
            <fieldset key={key} style={{ marginTop: "30px", padding: '10px' }}>
                <legend>Team ({data.info.id})</legend>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                    {
                        isVisible ?
                            <button style={{ backgroundColor: '#00A6FF', color: '#fff', padding: '5px 15px', border: 'none', cursor: 'pointer', borderRadius: '20px' }} onClick={() => visibleContentFunc(data.info.id)}>Shrink</button>
                            :
                            <button onClick={() => visibleContentFunc(data.info.id)} style={{ color: '#fff', padding: '5px 15px', border: '1px solid #00A6FF', cursor: 'pointer', borderRadius: '20px' }}>Expand</button>
                    }
                    <SimpleModal text={"Deleted Success 💹, Kindly refresh the page."} open={open} setOpen={setOpen} />
                    <button onClick={() => deleteTeam(empData, data.info.id)} style={{ color: '#fe0000', padding: '5px 15px', border: 'none', cursor: 'pointer', borderRadius: '20px' }}>Delete Team</button>
                </div>

                {
                    data.children.length !== 0 ?
                        data.children.map((data, key) => {
                            return (
                                <MemberField isVisible={isVisible} data={data} key={key} />
                            )
                        })
                        :
                        isVisible &&
                        <i style={{ fontSize: "12px", color: "#007fc4" }}>No team Member at the moment</i>
                }

            </fieldset>
        </>
    )
}

export default TeamField