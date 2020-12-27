

import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import TextField from './TextField';
import Button from './Button';
import { updateUser } from '../../api/fetch';
import { setUserUpdated } from '../../actions';
import './UserDetailsSection.css';

const UserDetailsSection = ({ userId, nameFromState, userNameFromState, emailFromState, setUserUpdated }) => {
  const [ isEditing, setIsEditing ] = useState(null);
  const [ name, setName ] = useState(nameFromState);
  const [ username, setUsername ] = useState(userNameFromState);
  const [ email, setEmail ] = useState(emailFromState);
  const [ isFormValid, setIsFormValid ] = useState(true);

  useEffect(() => {
    setIsFormValid(checkFormValidity());
  }, [name, username, email]);

  const editForm = () => setIsEditing(true);

  const saveForm = async () => {
    if (nameFromState !== name || userNameFromState !== username || emailFromState !== email) {
      const updated = await updateUser(userId, name, username, email);
      if (updated) {
        setUserUpdated(true);
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

  const checkFormValidity = () => name && username && email;

  const renderButtons = () => {
    if (isEditing) {
      return (
        <>
          <Button text='Save' onClick={saveForm} customClass='popup-form-btn' disabled={!isFormValid}/>
          <Button text='Cancel' onClick={cancelEditing} customClass='popup-form-btn'/>
        </>
      ) 
    }
    return <Button text='Edit details' onClick={editForm} customClass='popup-edit-btn'/>
  }

  return (
    <>
      {renderFields()}
      {renderButtons()}
    </>
  )
}


const mapStateToProps = (state) => {
  const { userId, name, username, email } = state.user;
  return { userId, nameFromState: name, userNameFromState: username, emailFromState: email };
};

const mapDispatchToProps = {
  setUserUpdated
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsSection);
