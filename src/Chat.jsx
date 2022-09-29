import React, { useState } from 'react';
import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ChatInput from './components/ChatInput';

const Chat = () => {
    const [messages, setMessages] = useState([]);

    const sendMessageBot = async (msg) => {
        const msgId = uuidv4();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({message:msg})
          };

          setMessages(prev => [...prev, {
            id: msgId,            
            sent: false,
            error: false,
            date: new Date(),
            message: msg
          }]);
          
          //https://chatbot-lda.herokuapp.com/webhooks/rest/webhook
          //http://localhost:5005/webhooks/rest/webhook
          fetch('https://chatbot-lda.herokuapp.com/webhooks/rest/webhook', options)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                
                setMessages(prev => {
                    let found = prev.find(msg => msg.id === msgId);
                    let index = prev.indexOf(found);                    
                    found.sent = true;
                    found.answer = response;
                    prev[index] = found;
                    return [...prev];
                });
            })
            .catch(err => {
                console.error(err);
                setMessages(prev => {
                    let found = prev.find(msg => msg.id === msgId);
                    let index = prev.indexOf(found);                    
                    found.error = true;
                    prev[index] = found;
                    return [...prev];
                });
            });
    };
    return (
        <>
            <Box display='flex' flex='1 0 auto'
                flexDirection='column' flexGrow={1} padding={2} height='73vh' maxHeight='80%' justifyContent='end'>

                {messages.map(msg => {
                    return (
                        <Box key={`box${msg.id}`}>
                            <Box width='fit-content' marginBottom={1} marginLeft='auto'> {msg.date?.toLocaleTimeString(undefined, { timeStyle: 'short' })} </Box>
                            <Box key={msg.id} sx={{ wordWrap: 'break-word', textAlign: 'end' }} width='fit-content' bgcolor='lightblue' padding={1} borderRadius='15px 0 15px 15px' marginBottom={1} marginLeft='auto'>{msg.message}</Box>
                            {msg.answer && <Box> {msg.date?.toLocaleTimeString(undefined, { timeStyle: 'short' })} </Box>}
                            {msg.answer?.map((answer, i) => <Box key={`a${i}${msg.id}`} sx={{ wordWrap: 'break-word' }} width='fit-content' bgcolor='lightgrey' padding={1} borderRadius='0 15px 15px 15px' marginBottom={1}>{answer.text}</Box>)}
                        </Box>
                    )
                })}

                {/* <Box sx={{ wordWrap: 'break-word', textAlign: 'end' }} width='fit-content' bgcolor='lightblue' padding={1} borderRadius='15px 0 15px 15px' marginBottom={1} marginLeft='auto'>{'message.text'}</Box>

                <Box sx={{ wordWrap: 'break-word' }} width='fit-content' bgcolor='lightgrey' padding={1} borderRadius='0 15px 15px 15px' marginBottom={1}>{'message.text'}</Box> */}
            </Box>
            <ChatInput onSubmit={(msg) => sendMessageBot(msg)} />
        </>
    )
}

export default Chat