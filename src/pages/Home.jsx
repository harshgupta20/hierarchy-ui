import { useContext, useEffect, useState } from 'react'
import DataFlow from '../components/DataFlow'
import WelcomeModal from '../components/WelcomeModal';
import { DataContext } from '../App';
import { addLocal, getLocal } from '../functions/localstorage';


const Home = () => {
    const {empData} = useContext(DataContext);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    useEffect(()=> {
        const result = getLocal("welcomeMsg", true);
        if(!result?.success){
            addLocal("welcomeMsg", true, true)
            handleOpen();
        }
    },[])

    return (
        <>
            {
                (empData && empData?.length !== 0) ?
                    <DataFlow count={1} DATA={empData} />
                    :
                    <h1>Loading...</h1>

            }

            <WelcomeModal open={open} setOpen={setOpen}/>
        </>
    )
}

export default Home