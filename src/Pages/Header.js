import React, { useEffect } from 'react'
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setModal, setUser } from '../redux/reducer';

const Header = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {cartList} = useSelector(state=>state.state)
    const [user, setLoggedUser] = React.useState('')
    useEffect(()=>{
        const data = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('user'))))
        if(!data?.email)
            history.push('/')
        setLoggedUser(data);
    },[])
    
  return (
    <div style={{height:'10vh', width:'100vw', background:'blue'}}>
        <div className='flex justify-between text-white mx-10 items-center h-full'>
            <div className='text-4xl'>
                <RestaurantIcon style={{fontSize:40}}/> Food Restorent
            </div> 
            <div className={`flex justify-center items-center gap-10 cursor-pointer`}>
                <div className='relative' onClick={()=>{
                    dispatch(setModal(true));
                }}>
                    <ShoppingCartIcon className='text-3xl'/>
                    {cartList.length ? 
                        <div className='absolute -top-4 -right-4 rounded-full bg-white w-6 h-6 text-black text-center'>
                            {cartList.length}
                        </div>:''
                    }
                </div>

                <div className='cursor-pointer text-white' onClick={()=>{
                    localStorage.clear();
                    dispatch(setUser(null));
                    history.push('/');
                }}>
                    <p className='text-white capitalize'>{user?.username || ''} &nbsp; <LogoutIcon className='text-3xl'/></p>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default Header