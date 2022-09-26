import React  from 'react'
import Header from './Header';
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";

export const Home = () => {
	const history = useHistory();
    
  return (
    <>
        <Header />
        <div style={{height:'90vh', widht:'100vw'}} className='flex gap-10 justify-center items-center flex-col'>
            <div className='text-6xl'>Welcome to Food's Kitchen</div>
            <Button variant="contained" onClick={()=>history.push('/items')}>GO TO MENU</Button>
        </div>
    </>
  )
}
