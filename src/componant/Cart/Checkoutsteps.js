import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { Typography } from '@mui/material';
const steps = [
  {item:<Typography>shiping details</Typography>,
icon:<LocalShippingIcon/>
},{item:<Typography>Confirm Order</Typography>,
icon:<ThumbUpOffAltIcon/>
},{item:<Typography>Payment</Typography>,
icon:<AssuredWorkloadIcon/>
},
];

export default function Checkoutsteps(props) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={props.activeStep} alternativeLabel>
        {steps.map((label,index) => (
          <Step key={index} acitve={props.activeStep===index?true:false}
          completed={props.activeStep>=index?true:false}
          >
            <StepLabel icon={label.icon}
            style={{
                
                color:props.activeStep>=index?"blue":"rgba(0,0,0,0.649)"
            }}
            >{label.item}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}