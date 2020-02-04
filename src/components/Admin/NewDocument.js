/* eslint-disable */
import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';
import store from 'store';
import { ADD_POST_REQUEST } from './ducks';
import styled from 'styled-components';

const Div = styled.div`
  input {
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
  }

  button {
    margin-top: 15px;
    padding: 4px;
    border-radius: 5px;
    border: none;
    margin-right: 10px;
  }

  textarea {
    width: 100%;
    height: 150px;
    margin-top: 20px;
  }
`;

export default () => {
  const [name, setName] = useState('');
  const [describe, setDescribe] = useState('');
  const [homeWork, setHomeWork] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const editor = useRef(null);
  const config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({
      type: ADD_POST_REQUEST,
      payload: { name, describe, homeWork, page: 'Document' },
    });
    setName('');
    setDescribe('');
    setHomeWork([]);
  };

  const AddHomeWorkHandler = () => {
    setHomeWork([...homeWork, { question, answer }]);
    setQuestion('');
    setAnswer('');
  };

  const deleteHomeWorkHandler = question => {
    setHomeWork([...homeWork.filter(item => item.question !== question)]);
  };

  return (
    <Div>
      <form onSubmit={e => onSubmitHandler(e)}>
        <p>Name Post</p>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <p>Describe</p>
        <JoditEditor
          ref={editor}
          value={describe}
          config={config}
          tabIndex={1}
          onBlur={newContent => setDescribe(newContent)}
          onChange={newContent => {}}
        />
        <p>Thêm câu hỏi và câu trả lời</p>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="question.."
        />
        <textarea
          type="text"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          style={{ marginBottom: '0' }}
          placeholder="answer.."
        />
        <button type="button" onClick={() => AddHomeWorkHandler()}>
          Thêm
        </button>
        <p>Danh sách các câu hỏi và trả lời</p>
        <div>
          {homeWork.map(item => (
            <div>
              <p style={{ marginTop: '10px' }}>{item.question}</p>
              <p>--> {item.answer}</p>
              <p>
                <button type="button" onClick={() => deleteHomeWorkHandler(item.question)}>
                  Xóa
                </button>
              </p>
              <hr />
            </div>
          ))}
        </div>
        <button type="submit" disabled={name == ''}>
          Cập nhật
        </button>
      </form>
    </Div>
  );
};
