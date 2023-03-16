import React, { MouseEvent, KeyboardEvent, useState, ChangeEvent } from 'react';
import style from './input-container.module.css';
import { useDispatch } from 'react-redux';

import { ReactComponent as PaperPlane } from '../../assets/paper-plane.svg';
import { saveMessage } from '../../store';

export const InputContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  // function save(value:string) {
  //   dispatch(saveMessage(value))
  // }

  const handleClick = () => {
    // alert(value)
    if (value != '') {
      dispatch(saveMessage(value));
      setValue('');
    }
  };

  const handleChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    setValue(newValue);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div className={style.container}>
      <input
        className={style.inputField}
        type="text"
        placeholder={'Write something...'}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button className={style.sendButton} onClick={handleClick}>
        <PaperPlane className={style.paperPlane} />
      </button>
    </div>
  );
};
