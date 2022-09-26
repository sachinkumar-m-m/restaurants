import React from 'react'
import Header from './Header'
import Grid from '@mui/material/Grid';
import config from '../config';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { cart, setModal } from '../redux/reducer';
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
const Items = () => {
    const dispatch = useDispatch();
    const {cartList, modal} = useSelector(state=>state.state);
    const [checkOut, setCheckOut] = React.useState(false)
    const [items, setItems] = React.useState([])
    const getItems = async() =>{
        const response = await axios.get(config.url.items);
        setItems(response.data)
    }
    React.useEffect(() => {
        getItems();
    }, [])
    const cartOperation = (type, data) =>{
        let CartData = [];
        if(type === 'add')
        {
            if(cartList.filter(e=>e.name == data.name)?.length)
            {
                CartData = cartList.map(e=>{
                    if(e.name === data.name)
                    {
                        return {...e, count:e?.count ? e?.count+1 : 1}
                    }  
                    return e;
                })
            }else{
                CartData = [...cartList, {...data, count:1}]
            }
        }
        if(type === 'remove')
        {
            if(cartList.filter(e=>e.name === data.name && e.count > 1)?.length)
            {
                CartData = cartList.map(e=>{
                    if(e.name === data.name)
                    {
                        return {...e, count:e?.count ? e?.count-1 : 1}
                    }  
                    return e;
                })
            }else{
                CartData = cartList.filter(e=>e.name!==data?.name)
            }
        }
        dispatch(cart(CartData))
    }
    console.log('KC cartList',cartList);
    
  return (
    <>
        <Header />
        <div className='my-5 flex justify-center'>
            <div className='w-full md:w-7/12 sm:w-full flex justify-center'>
                <Grid container spacing={2} justifyContent='center'>
                    {
                        items.map((e,i)=>
                        <Grid item xs={12} sm={12} md={4} lg={6} key={i}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={config.logoURL+e.image}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                    {e.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                    Price : {e.price}
                                    </Typography>
                                    {cartList?.filter(ee=>ee?.name === e?.name && ee.count)?.length ? 
                                        <Typography variant="body2" color="text.secondary">
                                            Cost (INR) : {cartList?.filter(ee=>ee?.name === e?.name && ee.count)[0].count * e.price}
                                        </Typography>
                                    :''}
                                </CardContent>
                                <CardActions>
                                    <Button size="small" onClick={()=>{cartOperation('add',e)}} variant='contained' color='primary'>+</Button>
                                    <Button size="small" disabled={cartList?.filter(ee=>ee?.name === e?.name && ee.count)?.length ? false : true } onClick={()=>{cartOperation('remove',e)}} variant='contained' color='error'>-</Button>
                                </CardActions>
                                </Card>
                            </Grid>                            
                        )
                    }
                </Grid>
            </div>
        </div>
        {modal && 
            <Modal
                open={modal}
                onClose={()=>{
                    dispatch(setModal(false))
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <div style={{width:'100vw',height:'100vh'}} className='flex justify-center items-center'>
                    <div className='bg-white p-6 rounded-md w-full md:w-6/12'>
                        <Typography variant="h5" color="text.primary">{checkOut ? 'Checkout' : 'Order Summay'}</Typography>
                        <Divider />
                        {checkOut ?
                            <>
                                <Typography variant="h5" className='my-10 py-10' color="text.primary">Thank you for your order</Typography>
                                <div className='flex justify-end'>
                                    <Button size="small" onClick={()=>{dispatch(setModal(false)); setCheckOut(false)}} variant='outlined' color='secondary'>Cancel</Button>
                                </div>
                            </>
                            : 
                        cartList.length ? 
                            <>
                                <div className='my-10'>
                                    {cartList.map((e,i)=>
                                        <div key={i} className='flex w-full my-5'>
                                            <p className='w-6/12'>{e.name}</p>
                                            <p className='w-1/12'>{e.count}</p>
                                            <p className='w-2/12'>{e.price * e.count}</p>
                                            <div className='flex gap-2'>
                                                <Button size="small" onClick={()=>{cartOperation('add',e)}} variant='contained' color='primary'>+</Button>
                                                <Button size="small" disabled={cartList?.filter(ee=>ee?.name === e?.name && ee.count)?.length ? false : true } onClick={()=>{cartOperation('remove',e)}} variant='contained' color='error'>-</Button>
                                            </div>
                                        </div>
                                    )}
                                    <div className='mt-20'>
                                        Total (INR) : {cartList.map(e=>e.count*e.price).reduce((partialSum, a) => partialSum + a, 0)}
                                    </div>
                                </div>
                                <Divider />
                                <div className='flex justify-end gap-5 mt-5'>
                                    <Button size="small" onClick={()=>dispatch(setModal(false))} variant='outlined' color='secondary'>Cancel</Button>
                                    <Button size="small" variant='contained' color='primary'
                                        onClick={()=>{
                                            setCheckOut(true);
                                            dispatch(cart([]))
                                        }}
                                    >Save and Checkout</Button>
                                </div>
                            </>
                        :
                        <>
                            <Typography variant="h5" className='my-10 py-10' color="text.primary" >Items Not added to the Cart</Typography>
                            <div className='flex justify-end'>
                                <Button size="small" onClick={()=>dispatch(setModal(false))} variant='outlined' color='secondary'>Cancel</Button>
                            </div>
                        </>
                        }
                    </div>
                </div>
            </Modal>
        }
    </>
  )
}

export default Items