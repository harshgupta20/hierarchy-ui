import React, { useState } from 'react'
import "../styles/Navbar.css";

import AddMemberModal from './AddMemberModal';
import SearchModal from './SearchModal';

// Website LOGO
import LOGO from "../img/logo.svg";
import { removeLocal } from '../functions/localstorage';


const Navbar = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [openSearch, setOpenSearch] = useState(false);
  const handleOpenSearch = () => setOpenSearch(true);

  const resetLocal = () => {
    removeLocal('data');

    window.location.reload();
  }

  return (
    <>
      <nav className='navbar'>
        
        <img className='nav-logo' src={LOGO} alt="commutatus logo" />

          <input onClick={handleOpenSearch} className='search-input' type="text" placeholder='Search...' />

        <div className='nav-btn-div'>
          <button className='nav-btn' onClick={resetLocal}>Reset all Data</button>
          <button onClick={handleOpen} className="nav-btn">+ New Member</button>
          {/* <button className="nav-btn">+ New Member</button> */}

          <SearchModal openSearch={openSearch} setOpenSearch={setOpenSearch} />
          <AddMemberModal open={open} setOpen={setOpen}/>
        </div>
      </nav>
    </>
  )
}

export default Navbar