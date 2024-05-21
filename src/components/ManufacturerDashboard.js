// ManufacturerDashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import manucss from './ManufacturerDashboard.module.css';

const ManufacturerDashboard = () => {
  const [messages, setMessages] = useState([]);
  const [orderID, setOrderID] = useState('');
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [quantity, setQuantity] = useState('');
  const [address, setAddress] = useState('');
  const [transporter, setTransporter] = useState('');
  const[allTrans,setAllTrans]=useState(['']);
  const {id}=useParams();
  console.log(id);

  useEffect(() => {
    fetchMessages();
  }, [id]);

  useEffect(()=>{
    async function getTransporters(){
    const res= await axios.get('/alltrans');
    setAllTrans(res.data);
    }
    getTransporters();

  },[]);

  const fetchMessages = async () => {
    try {
      const orders=await axios.get('/api/orders',
      {
        params:{
          id:id
        },
        headers:{
          authorization:localStorage.getItem('token')

        }
      });
      // console.log(orders);
      const orderIDs = orders.data.map((order) => order.orderID).join(',');
      // console.log(orderIDs);
      const response = await axios.get('/api/reply',
      {
        params:{
          orderIDs:orderIDs
        }
      });
      setMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async (e) => {
    
    e.preventDefault();
    try {
      const response = await axios.post('/api/messages/:id', {
        sender:id,
        orderID,
        to,
        from,
        quantity,
        address,
        transporter,
  
      });
      // console.log(response.data);
      alert("Message sent successfully");
      // Reset form fields after sending the message
      setOrderID('');
      setTo('');
      setFrom('');
      setQuantity('');
      setAddress('');
      setTransporter('');
      // Fetch updated messages
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={manucss.manupage}>
    {console.log('hello')}
      <h1>Manufacturer Dashboard</h1>
      
      <ul className={manucss.repbox}>
      <h2>Received Messages</h2>
        {messages.map((message) => (
          <li key={message._id}>orderID:{message.orderID}price:{message.price}</li>
        ))}
      </ul>
      
      <form onSubmit={handleSend} className={manucss.msgform}>
      <h2>Send Message</h2>
        <input
          type="text"
          placeholder="Order ID"
          value={orderID}
          onChange={(e) => setOrderID(e.target.value)}
          className={manucss.orderID}
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className={manucss.to}
        />
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className={manucss.from}
        />
        <select value={quantity} onChange={(e) => setQuantity(e.target.value)} className={manucss.quantity}>
          <option value="">Select Quantity</option>
          <option value="1">1 ton</option>
          <option value="2">2 tons</option>
          <option value="3">3 tons</option>
        </select>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={manucss.address}
        />
        <select
          value={transporter}
          onChange={(e) => setTransporter(e.target.value)}
          className={manucss.transporter}
        >
          <option value="">Select Transporter</option>
           { allTrans.map((transporter)=>{
            return(
            <option value={transporter._id}>{transporter.username}</option>
            )
          })}
        </select>
        <button type="submit" className={manucss.btn}>Send</button>
      </form>
    </div>
  );
};

export default ManufacturerDashboard;
