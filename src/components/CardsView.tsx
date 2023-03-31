import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import React from 'react';

export const CardView = () => { 
    return <Box display="flex" alignItems="center">
        <Card variant="outlined" sx={{maxWidth: '30%'}}>
            <CardHeader>hello</CardHeader>
            <CardContent>
                <Typography>
                    Work Experience 
                </Typography>
            </CardContent>
        </Card>
    </Box>
}