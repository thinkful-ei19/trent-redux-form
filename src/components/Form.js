import React from 'react';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import Input from './Input';
import {required, nonEmpty, numberLength, mustBeNumber } from '../validators';



function Form(props) {
    let successMessage;
    if (props.submitSucceeded) {
        successMessage = (
            <div className="message message-success">
                Message submitted successfully
            </div>
        );
    }

    let errorMessage;
    if (props.error) {
        errorMessage = (
            <div className="message message-error">{props.error}</div>
        );
    }
  return (
    <div>
        <h1>Report a Problem with your delivery</h1>
    <form 
        onSubmit={props.handleSubmit(values => {
            return fetch('https://us-central1-delivery-form-api.cloudfunctions.net/api/report', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  trackingNumber: values.trackingNumber,
                  issue: values.issue, // One of "not-delivered", "wrong-item", "missing-part", "damaged", or "other"
                  details: values.details
                })
              })
              .then(res => {
                if (!res.ok) {
                    if (
                        res.headers.has('content-type') &&
                        res.headers
                            .get('content-type')
                            .startsWith('application/json')
                    ) {
                        // It's a nice JSON error returned by us, so decode it
                        return res.json().then(err => Promise.reject(err));
                    }
                    // It's a less informative error returned by express
                    return Promise.reject({
                        code: res.status,
                        message: res.statusText
                    });
                }
                props.reset()
                return;
            })
            .then(() => console.log('Submitted with values', values))
            .catch(err => {
                const {reason, message, location} = err;
                if (reason === 'ValidationError') {
                    // Convert ValidationErrors into SubmissionErrors for Redux Form
                    return Promise.reject(
                        new SubmissionError({
                            [location]: message
                        })
                    );
                }
                return Promise.reject(
                    new SubmissionError({
                        _error: 'Error submitting message'
                    })
                );
            });
              
        })
    }>
        {successMessage}
        {errorMessage}
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
         <option value="not-delivered">My delivery hasnt arrived</option>
         <option value="wrong-item">The wrong item was delivered</option>
         <option value="missing-part">Part of my order was missing</option>
         <option value="damaged">Some of my Order arrived Damaged</option>
         <option value="other">Other (give details below)</option>
        </Field>
        <br/><br/>
        <label htmlFor="message">Give More details</label><br/>
        <Field component='textarea' rows="4" cols="50" name="message"/>
        <button
          type="submit"
          disabled={
          props.pristine ||
          props.submitting
        }>
          Submit
        </button>
    </form>
    </div>
  );
  
}

export default reduxForm({
    form: 'complaint'
})(Form);