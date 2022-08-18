import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';

export default function CustomizedInputBase({ onChange, onSubmit }) {
    const [text, setText] = useState('');
    const handleChange = (text) => {
        setText(text);
        onChange?.(text);
    },
        handleSubmit = () => {
            onSubmit?.(text);
            setText('');
        };

    return (
        <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1, flexGrow: 1 }}
                placeholder="Digite sua mensagem"
                value={text}
                inputProps={{ 'aria-label': 'Digite sua mensagem' }}
                onChange={(ev) => handleChange(ev.target.value)}
                onKeyUp={(ev) => { if (ev.key === 'Enter' && text.trim()) handleSubmit() }}
            />
            <IconButton
                disabled={!text.trim()}
                onClick={(ev) => handleSubmit(text)}
                type="button" sx={{ p: '10px' }} aria-label="Send">
                <SendIcon />
            </IconButton>
        </Paper>
    );
}
