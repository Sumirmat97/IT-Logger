import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLog } from '../../actions/logActions';
import M from 'materialize-css/dist/js/materialize';

const AddLogModal = ({addLog}) => {
    const [message, setMessage] = useState('');
    const [tech, setTech] = useState('');
    const [attention, setAttention] = useState(false);
    
    const onSubmit = () => {
        if(message === '' || tech === '') {
            M.toast({html: 'Please enter a message and tech'});
        } else {
            const newLog = {message, attention, tech, date: new Date()};

            addLog(newLog);

            M.toast({html: `Log added by ${tech}`});

            //Clear state
            setMessage('');
            setTech('');
            setAttention(false);
        }
    }

  
    return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
        <div className='modal-content'>
            <h4> Enter Sytem Log</h4>
            <div className='row'>
                <div className='input-field'>
                    <input type="text" name='message' value={message} onChange={e => setMessage(e.target.value)}/>
                    <label htmlFor='message' className='active'>
                        Log Message
                    </label>
                </div>
            </div>
            <div className='row'>
                <div className='input-field'>
                    <select name="tech" value={tech} className='browser-default' onChange={e => setTech(e.target.value)}> 
                        <option disabled value=''> Select Technician</option>
                        <option value="John Smith"> John Smith</option>
                        <option value="ABC"> ABC</option>
                    </select>
                </div>
            </div>
            <div className='row'>
                <div className='input-field'>
                    <p>
                        <label> 
                            <input type="checkbox" className='filled-in' checked={attention} value={attention} onChange={e => setAttention(!attention)}/>
                            <span>Needs Attention</span>
                        </label>

                    </p>
                </div>
            </div>
        </div>
        <div className='modal-footer'>
            <a href="#!" onClick={onSubmit} className='modal-close waves-effect blue waves-light btn'> Enter </a>
        </div>
    </div>
  )
}

const modalStyle = {
    width: '75%',
    height: '75%'
}

AddLogModal.propTypes = {
    addLog: PropTypes.func.isRequired
}

export default connect(null, {addLog}) (AddLogModal);