// TransporterDashboard.js

import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import{useParams} from 'react-router-dom';
import transcss from './TransporterDashboard.module.css';

const TransporterDashboard = () => {
  const [orderID, setOrderID] = useState('');
  const [price, setPrice] = useState('');
  const[messages,setMessages] = useState([]);
  const{id}=useParams();
useEffect(()=>{
  fetchMessages();
},[])

const fetchMessages = async () => {
  try {
    const response = await axios.get('/api/messages/:id',{
    params: {
      id: id
    },
    headers: {
      authorization:localStorage.getItem('token')
    }
    
  });
    console.log(response.data);
      setMessages(response.data);
  
    }
   catch (error) {
    console.error(error);
  }
};
  const handleReply = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/reply', {
        orderID,
        price,
      });
      console.log(response.data);
      alert('Reply sent successfully');
      // Reset form fields after replying to the message
      setOrderID('');
      setPrice('');
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={transcss.transpage}>
      <h1>Transporter Dashboard</h1>
      <ul className={transcss.msgbox}>
      <h2>Received Messages</h2>
        {messages.map((message) => (
          <li key={message._id}>orderID:{message.orderID} from {message.from} need {message.quantity} tons</li>
        ))}
      </ul>
      
      <form onSubmit={handleReply} className={transcss.replyform}>
      <h2>Reply to Message</h2>
        <select value={orderID} onChange={(e) => setOrderID(e.target.value)} className={transcss.orderID}>
          <option value="">Select Order ID</option>
          { messages.map((message)=>{
            return(
            <option value={message.orderID}>{message.orderID}</option>
            )
          })}
          {/* Populate with order IDs received from the Manufacturer */}
        </select>
        <input
          type="number"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={transcss.price}
        />
        <button type="submit" className={transcss.btn}>Reply</button>
      </form>
    </div>
  );
};

export default TransporterDashboard;
