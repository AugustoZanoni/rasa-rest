import * as React from 'react';
import { AppBar, Box, Container } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Chat from './Chat';

function DrawerAppBar() {
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar sx={{bgcolor: 'rgb(244,236,224)'}} component="nav">
                <Toolbar>
                    <img width='10%' src={process.env.PUBLIC_URL + '/daia_logo.png'} alt='DAIA'/>
                    <Typography
                        color='black'
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Chatbot Lei de Direito Autoral
                    </Typography>

                </Toolbar>
            </AppBar>

            
            <Container sx={{ marginTop: 10, height: 'calc(100% - 48px)', }}>
            
                <Chat />
                
            </Container>
        </Box>
    );
}

export default DrawerAppBar;
