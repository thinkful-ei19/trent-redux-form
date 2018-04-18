import React from 'react';
import {reduxForm, Field} from 'redux-form';
import Input from './Input';
import {required, nonEmpty, numberLength, mustBeNumber } from '../validators';



function Form(props) {
  return (
    <div>
        <h1>Report a Problem with your delivery</h1>
    <form onSubmit={props.handleSubmit(values => console.log(values))}>
        <label htmlFor="trackingNumber">Tracking Number</label><br/>
        <Field 
            component={Input} 
            element="input" 
            name="trackingNumber" 
            id="trackingNumber" 
            type="text"
            validate={[required, nonEmpty, numberLength, mustBeNumber]}
        />
        <br/><br/>
        <label htmlFor="issue">What is your issue?</label><br/>
        <Field component='select' name="issue">
         <option value="my delivery hasnt arrived">My delivery hasnt arrived</option>
         <option value="The wrong item was delivered">The wrong item was delivered</option>
         <option value="Part of my order was missing">Part of my order was missing</option>
         <option value="Some of my Order arrived Damaged">Some of my Order arrived Damaged</option>
         <option value="Other (give details below)">Other (give details below)</option>
        </Field>
        <br/><br/>
        <label htmlFor="message">Give More details</label><br/>
        <Field component='textarea' rows="4" cols="50" name="message"/>
        <button>Submit</button>
    </form>
    </div>
  );
  
}

export default reduxForm({
    form: 'complaint'
})(Form);