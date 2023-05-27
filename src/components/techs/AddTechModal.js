import React, { useState } from 'react'
import M from 'materialize-css/dist/js/materialize';
import { connect } from 'react-redux';
import { addTech } from '../../actions/techActions';
import PropTypes from 'prop-types'

const AddTechModal = ({ addTech }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    
    const onSubmit = async () => {
        if(firstName === '' || lastName === '') {
            M.toast({html: 'Please enter First Name and Last Name'});
        } else {

            await addTech({
                firstName,
                lastName
            });
            M.toast({html: `${firstName} ${lastName} was added as a technician`});
            //Clear state
            setFirstName('');
            setLastName('');
        }
    }

    return (
    <div id='add-tech-modal' className='modal'>
        <div className='modal-content'>
            <h4> New Technician </h4>
            <div className='row'>
                <div className='input-field'>
                    <input type="text" name='firstName' value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    <label htmlFor='firstName' className='active'>
                        First Name
                    </label>
                </div>
            </div>
            <div className='row'>
                <div className='input-field'>
                    <input type="text" name='lastName' value={lastName} onChange={e => setLastName(e.target.value)}/>
                    <label htmlFor='lastName' className='active'>
                        Last Name
                    </label>
                </div>
            </div>
        </div>
        <div className='modal-footer'>
            <a href="#!" onClick={onSubmit} className='modal-close waves-effect blue waves-light btn'> Enter </a>
        </div>
    </div>
  )
}

AddTechModal.propTypes = {
    addTech: PropTypes.func.isRequired
}


export default connect(null, { addTech })(AddTechModal);