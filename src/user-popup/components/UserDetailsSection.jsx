

import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import TextField from './TextField';
import Button from './Button';
import { updateUser } from '../../api/fetch';
import { setShouldLoadUsers } from '../../actions';
import './UserDetailsSection.css';

const UserDetailsSection = ({ userId, nameFromState, userNameFromState, emailFromState, setShouldLoadUsers }) => {
  const [ isEditing, setIsEditing ] = useState(null);
  const [ name, setName ] = useState(nameFromState);
  const [ username, setUsername ] = useState(userNameFromState);
  const [ email, setEmail ] = useState(emailFromState);
  const [ isFormValid, setIsFormValid ] = useState(true);
  let checkFormValidity;

  useEffect(() => {
    setIsFormValid(checkFormValidity());
  }, [name, username, email, checkFormValidity]);

  const editForm = () => setIsEditing(true);
  checkFormValidity = () => name && username && email;

  const saveForm = async () => {
    if (nameFromState !== name || userNameFromState !== username || emailFromState !== email) {
      const updated = await updateUser(userId, name, username, email);
      if (updated) {
        setShouldLoadUsers(true);
      } else {
        resetFields();
      }
    }
    setIsEditing(false);
  }

  const cancelEditing = () => { 
    resetFields();
    setIsEditing(false);
  }

  const resetFields = () => {
    setName(nameFromState);
    setUsername(userNameFromState);
    setEmail(emailFromState);
  }

  const renderFields = () => {
    return (
      <div className='text-field-wrap'>
        <TextField customClass='title-field' id='name' originalValue={name} isEditing={isEditing} handleChange={setName} />
        <TextField customClass='subtitle-field' id='username' originalValue={username} isEditing={isEditing} handleChange={setUsername} />
        <TextField customClass='subtitle-field' id='email' originalValue={email} isEditing={isEditing} handleChange={setEmail} />
      </div>
    )
  }

  const renderButtons = () => {
    if (isEditing) {
      return (
        <>
          <Button text='Save' onClick={saveForm} customClass='form-btn' disabled={!isFormValid}/>
          <Button text='Cancel' onClick={cancelEditing} customClass='form-btn'/>
        </>
      ) 
    }
    return <Button text='Edit details' onClick={editForm} customClass='edit-btn'/>
  }

  return (
    <div className='user-details-section-wrap'>
      {renderFields()}
      {renderButtons()}
    </div>
  )
}


const mapStateToProps = (state) => {
  const { userId, name, username, email } = state.user;
  return { userId, nameFromState: name, userNameFromState: username, emailFromState: email };
};

const mapDispatchToProps = {
  setShouldLoadUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsSection);
