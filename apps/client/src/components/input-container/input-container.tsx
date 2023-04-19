import React, { MouseEvent, KeyboardEvent, useState, ChangeEvent } from 'react';
import style from './input-container.module.css';
import { useDispatch } from 'react-redux';

import { ReactComponent as PaperPlane } from '../../assets/paper-plane.svg';
import { saveMessage } from '../../store';

export const InputContainer: React.FC = () => {
  const dispatch = useDispatch();

  
  // const [value, setValue] = useState('');

  // function save(value:string) {
  //   dispatch(saveMessage(value))
  // }

  const handleClick = (value: string) => {
    // alert(value)
    if(value !== "") {
      dispatch(saveMessage(value));
      document.getElementById('input')!.innerText = '';
    }
  };

  // const handleChange = (event: ChangeEvent) => {
  //   const target = event.target as HTMLInputElement;
  //   const newValue = target.value;
  //   setValue(newValue);
  // };

  // const handleChange = (event: ChangeEvent) => {
  //   const target = event.target as HTMLDivElement;
  //   const newValue = target.value;
  //   setValue(newValue);
  // };

  const handleKeyDown = (event: KeyboardEvent, value: string) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleClick(value);
    }
  };

  return (
    <div className={style.container}>
      {/* <input

        className={style.inputField}
        type="text"
        placeholder={'Write something...'}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        
      /> */}
      <div
        id='input'
        className={style.inputField}
        
        placeholder={'Write something...'}
        contentEditable={true}
        // onChange={handleChange}
        onKeyDown={(e) => handleKeyDown(e, document.getElementById('input')!.innerText || '')}
      >
      </div>
      <button className={style.sendButton} onClick={() => handleClick(document.getElementById('input')!.innerText || '')}>
        <PaperPlane className={style.paperPlane} />
      </button>
    </div>
  );
};
