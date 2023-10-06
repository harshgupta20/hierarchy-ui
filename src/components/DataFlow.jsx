import React from 'react';
import TeamField from './TeamField';
import HeadField from './HeadField';

const DataFlow = ({ DATA }) => {

    return (
        <>
            {
                DATA.map((data, key) => {
                    return (
                        <>
                            <div style={{ width: '90%', margin: 'auto' }}>
                                {
                                    data.info.title.toLowerCase().includes("team") ?
                                        <TeamField data={data} key={key} />
                                        :
                                        <HeadField data={data} key={key} />
                                }

                            </div>
                        </>
                    )
                })
            }
        </>
    )
}

export default DataFlow