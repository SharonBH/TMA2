
import React, { Component } from 'react';
import InputComp from '../UI/InputComp/InputComp';
import BtnComp from '../UI/BtnComp/BtnComp';
import Register from './Register';
import PropTypes from 'prop-types';
import classes from './RegisterComp.scss';
import { ADD_TOURNAMENT, REGISTER } from '../../configuration/config'





    export const CreateInputsSection = (heading) => {
    switch (heading) {

        case ADD_TOURNAMENT:
            return (
                <div>
                    <InputComp inputType="text" name="tournamentName" placeholder="Tournament Name" onChange={this.onTournamentNameChange}/>
                    <InputComp inputType="date" name="startDate" placeholder="Start Date" onChange={this.onStartDateChange}/>
                    <InputComp inputType="date" name="endDate" placeholder="End Date" onChange={this.onEndDateChange}/>
                    <InputComp inputType="number" name="maxNumOfEvents" placeholder="Maximum number Of Events" onChange={this.onMaxNumChange}/>  
                </div>
            )
            case REGISTER:
            return (
                <div>
                    <InputComp inputType="email" name="email" placeholder="eMail" onChange={this.onEmailChange}/>
                    <InputComp inputType="password" name="password" placeholder="Password" onChange={this.onPasswordChange}/>
                    <InputComp inputType="password" name="ConfirmPassword" placeholder="ConfirmPassword" onChange={this.onConfirmPasswordChange}/>
                    <InputComp inputType="text" name="name" placeholder="Name" onChange={this.onNameChange}/>
                    <InputComp inputType="text" name="userName" placeholder="Username" onChange={this.onUserNameChange}/> 
                </div>
            )
           


        default:
            break;
    }
}    
                 

export default CreateInputsSection



