import React, { useState, useEffect } from 'react'
import M from 'materialize-css/dist/js/materialize';
import { updateLog, clearCurrent } from '../../actions/logActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const EditLogModal = ({current, updateLog, clearCurrent }) => {
    const [message, setMessage] = useState('');
    const [tech, setTech] = useState('');
    const [attention, setAttention] = useState(false);
    
    useEffect(() => {
        if(current) {
            setMessage(current.message);
            setTech(current.tech);
            setAttention(current.attention);
        }
    }, [current]); 


    const onSubmit = async () => {
        if(message === '' || tech === '') {
            M.toast({html: 'Please enter a message and tech'});
        } else {
            const updatedLog = { 
                id: current.id, 
                message, 
                tech, 
                attention, 
                date: new Date() };
            await updateLog(updatedLog);
            M.toast({ html: `Log updated by ${tech}` });
            //Clear state
            setMessage('');
            setTech('');
            setAttention(false);
            clearCurrent();
        }
    }
  
    return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
        <div className='modal-content'>
            <h4> Update Sytem Log </h4>
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

const mapStateToProps = state => ({
    current: state.log.current
})

EditLogModal.propTypes = {
    current: PropTypes.object.isRequired,
    updateLog: PropTypes.func.isRequired,
    clearCurrent: PropTypes.func.isRequired
}


export default connect(
    mapStateToProps, 
    { updateLog, clearCurrent}
)(EditLogModal);