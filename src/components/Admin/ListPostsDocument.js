/* eslint-disable */
import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import JoditEditor from 'jodit-react';
import { REMOVE_POST_REQUEST, UPDATE_POST_REQUEST } from './ducks';
import store from 'store';

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin: 0 5px;
    padding: 3px 5px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.5);
  }
`;

const Div = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
  z-index: 999;
  top: 0;
  left: 0;
  padding: 0 3%;
  overflow-y: scroll;
  display: block;

  p {
    color: white;
    margin: 20px 0;
  }

  button {
    margin-top: 15px;
    padding: 4px;
    border-radius: 5px;
    border: none;
    margin-right: 10px;
  }

  input {
    width: 100%;
    padding: 5px;
    border-radius: 8px;
    border: none;
  }

  textarea {
    width: 100%;
    height: 150px;
    margin-top: 20px;
  }

  ${props => (props.isVisible ? 'display: flex;' : 'display: none;')}
`;

const List = ({ listDocument, dispatch }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [describe, setDescribe] = useState('');
  const [id, setId] = useState('');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [visibleAddQuestion, setVisibleAddQuestion] = useState(false);
  const [homeWork, setHomeWork] = useState([]);
  const editor = useRef(null);
  const config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  const deletePostHandler = id => {
    store.dispatch({ type: REMOVE_POST_REQUEST, payload: { id, item: 'Document' } });
  };

  const editPostHandler = (name, describe, homeWork, id) => {
    setIsVisible(!isVisible);
    setName(name);
    setDescribe(describe);
    setId(id);
    setHomeWork(homeWork);
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    store.dispatch({
      type: UPDATE_POST_REQUEST,
      payload: { name, describe, homeWork, id, item: 'Document' },
    });
    setDescribe('');
    setName('');
    setHomeWork([]);
    setQuestion('');
    setAnswer('');
    setIsVisible(!isVisible);
  };

  const deleteHomeWorkHandler = question => {
    setHomeWork([...homeWork.filter(item => item.question !== question)]);
  };
  const onAddQuestionHandler = () => {
    setVisibleAddQuestion(true);
  };

  const onAddQuestionAnswerHandler = () => {
    setHomeWork([...homeWork, { question, answer }]);
    setVisibleAddQuestion(false);
    setQuestion('');
    setAnswer('');
  };

  return (
    <div>
      <Div isVisible={isVisible}>
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
          <p>
            Danh sách các câu hỏi và trả lời{' '}
            <button type="button" onClick={() => onAddQuestionHandler()}>
              Thêm
            </button>
          </p>
          {visibleAddQuestion && (
            <div>
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
              <button type="button" onClick={() => onAddQuestionAnswerHandler()}>
                Thêm
              </button>
              <button type="button" onClick={() => setVisibleAddQuestion(false)}>
                Hủy
              </button>
            </div>
          )}
          <div>
            {homeWork.map((item, index) => (
              <div>
                <p>{index + 1}.</p>
                <p style={{ marginTop: '10px' }}>{item.question}</p>
                <p>--> {item.answer}</p>
                <p>
                  <button type="button" onClick={() => deleteHomeWorkHandler(item.question)}>
                    Xóa
                  </button>
                </p>
                <hr style={{ width: '30%' }} />
              </div>
            ))}
          </div>
          <button type="submit">Cập nhật</button>
          <button type="button" onClick={() => setIsVisible(false)}>
            Close
          </button>
        </form>
      </Div>
      {listDocument.map((item, index) => (
        <Item key={index.toString()}>
          <p style={{ width: '30%' }}>{item.name}</p>
          <p style={{ fontSize: '15px' }}>{new Date(item.updated_at).toLocaleString()}</p>
          <p>
            <button
              type="button"
              onClick={() => editPostHandler(item.name, item.describe, item.homeWork, item._id)}
            >
              Edit
            </button>
            <button type="button" onClick={() => deletePostHandler(item._id)}>
              Delete
            </button>
          </p>
        </Item>
      ))}
    </div>
  );
};
export default connect(state => ({
  listDocument: state.listDocument,
}))(List);
