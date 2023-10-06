import { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { addLocal, getLocal } from "./functions/localstorage";
import { DATA } from "./DATA";

export const DataContext = createContext();

function App() {

  const [empData, setEmpData] = useState([]);


  const updateData = () => {
    const result = getLocal("data", true);
    if (result.success) {
      setEmpData(getLocal('data', true).data);
    }else{
      addLocal("data", DATA, true);
      setEmpData(getLocal("data", true).data);
    }
  }


  useEffect(() => {
  }, [empData])
  
  useEffect(()=> {
    updateData();
  },[])

  return (
    <>
      <DataContext.Provider value={{empData, setEmpData}}>
        <Navbar />
        <Home />
      </DataContext.Provider>
    </>
  );
}

export default App;
