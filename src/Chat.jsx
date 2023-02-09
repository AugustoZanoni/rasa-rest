import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ChatInput from './components/ChatInput';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const boxMessages = useRef();
    
    useEffect(() => {
        if (boxMessages.current) boxMessages.current.scrollTop = boxMessages.current.scrollHeight;
    }, [messages]);

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
            <Box ref={boxMessages} display='flex' flex='1 0 auto' sx={{
                overflow: 'auto',
                "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
                    backgroundColor: 'initial',
                    width: "7px"
                },
                "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
                    borderRadius: 1,
                    backgroundColor: "#0AB0AB",
                },
                "&::-webkit-scrollbar-button": {
                    display: "none"
                },
            }}
                flexDirection='column' flexGrow={1} padding={2} height='73vh' maxHeight='80%' >

                <Box>
                    <Box sx={{ wordWrap: 'break-word' }} width='fit-content' bgcolor='lightgrey' padding={1} borderRadius='0 15px 15px 15px' marginBottom={1}>
                        Olá! Eu sou DAIA - Direito Autoral de Inteligência Artificial. Posso tirar suas dúvidas relacionadas a lei n. 9.610/98 - Lei brasileira sobre Direitos autorais.
                    </Box>
                </Box>
                {messages.map(msg => {
                    return (
                        <Box key={`box${msg.id}`}>
                            <Box width='fit-content' marginBottom={1} marginLeft='auto'> {msg.date?.toLocaleTimeString(undefined, { timeStyle: 'short' })} </Box>
                            <Box key={msg.id} sx={{ wordWrap: 'break-word', textAlign: 'end' }} width='fit-content' bgcolor='#0AB0AB' padding={1} borderRadius='15px 0 15px 15px' marginBottom={1} marginLeft='auto'>{msg.message}</Box>
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