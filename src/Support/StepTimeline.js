import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
}));

function getSteps() {
    return ['ใบสั่งซื้อ', 'ยืนยันคำสั่งซื้อ', 'ใบเเจ้งหนี้', 'ใบเสร็จ'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return 'ใบสั่งซื้อถูกต้อง...';
        case 1:
            return 'คำสั่งซื้อถูกต้อง...';
        case 2:
            return 'ใบเเจ้งหนี้ถูกต้อง...';
        default :
            return 'ใบเสร็จถูกต้อง...';
    }
}

export default function HorizontalLinearStepper() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    function handleNext() {
        let newSkipped = skipped;
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        setSkipped(newSkipped);
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography>
                            เสร็จสิ้น
                        </Typography>
                    </div>
                ) : (
                    <div>
                        <Typography>{getStepContent(activeStep)}</Typography>
                        <div>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNext}
                                className={classes.button}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
