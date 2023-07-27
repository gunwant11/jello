import axios from 'axios';
import { setAlert } from './alert';
import {
  CLEAR_BOARD,
  GET_BOARDS,
  GET_BOARD,
  ADD_BOARD,
  BOARD_ERROR,
  RENAME_BOARD,
  GET_LIST,
  ADD_LIST,
  RENAME_LIST,
  ARCHIVE_LIST,
  GET_CARD,
  ADD_CARD,
  EDIT_CARD,
  MOVE_CARD,
  ARCHIVE_CARD,
  DELETE_CARD,
  GET_ACTIVITY,
  ADD_MEMBER,
  MOVE_LIST,
  ADD_CARD_MEMBER,
  ADD_CHECKLIST_ITEM,
  EDIT_CHECKLIST_ITEM,
  COMPLETE_CHECKLIST_ITEM,
  DELETE_CHECKLIST_ITEM,
} from './types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const API_URL = 'http://localhost:5000'

export const getBoards = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_BOARD });

    // const res = await axios.get('/api/boards');
    const res = await axios.get(`${API_URL}/api/boards`);

    dispatch({
      type: GET_BOARDS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get board
export const getBoard = (id) => async (dispatch) => {
  try {
    // const res = await axios.get(`/api/boards/${id}`);
    const res = await axios.get(`${API_URL}/api/boards/${id}`);

    if (res) {
      axios.defaults.headers.common['boardId'] = id;
    } else {
      delete axios.defaults.headers.common['boardId'];
    }

    dispatch({
      type: GET_BOARD,
      payload: { ...res.data, listObjects: [], cardObjects: [] },
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


export const addBoard = (formData, history) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    // const res = await axios.post('/api/boards', body, config);
    const res = await axios.post(`${API_URL}/api/boards`, body, config);
    dispatch({
      type: ADD_BOARD,
      payload: res.data,
    });

    dispatch(setAlert('Board Created', 'success'));

    history.push(`/board/${res.data._id}`);
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Rename board
export const renameBoard = (boardId, formData) => async (dispatch) => {
  try {
    // const res = await axios.patch(`/api/boards/rename/${boardId}`, formData, config);
    const res = await axios.patch(`${API_URL}/api/boards/rename/${boardId}`, formData, config);
    dispatch({
      type: RENAME_BOARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


export const getList = (id) => async (dispatch) => {
  try {
    // const res = await axios.get(`/api/lists/${id}`);
    const res = await axios.get(`${API_URL}/api/lists/${id}`);
    dispatch({
      type: GET_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add list
export const addList = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    // const res = await axios.post('/api/lists', body, config);
    const res = await axios.post(`${API_URL}/api/lists`, body, config);
    dispatch({
      type: ADD_LIST,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Rename list
export const renameList = (listId, formData) => async (dispatch) => {
  try {
    // const res  = await axios.patch(`/api/lists/rename/${listId}`, formData, config);
    const res  = await axios.patch(`${API_URL}/api/lists/rename/${listId}`, formData, config);
    dispatch({
      type: RENAME_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Archive/Unarchive list
export const archiveList = (listId, archive) => async (dispatch) => {
  try {
    // const res = await axios.patch(`/api/lists/archive/${archive}/${listId}`);
    const res = await axios.patch(`${API_URL}/api/lists/archive/${archive}/${listId}`);
    dispatch({
      type: ARCHIVE_LIST,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


export const getCard = (id) => async (dispatch) => {
  try {
    // const res = await axios.get(`/api/cards/${id}`);
    const res = await axios.get(`${API_URL}/api/cards/${id}`);
    dispatch({
      type: GET_CARD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add card
export const addCard = (formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    // const res = await axios.post('/api/cards', body, config);
    const res = await axios.post(`${API_URL}/api/cards`, body, config);
    dispatch({
      type: ADD_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const editCard = (cardId, formData) => async (dispatch) => {
  try {
    // const res = await axios.patch(`/api/cards/edit/${cardId}`, formData, config);
    const res = await axios.patch(`${API_URL}/api/cards/edit/${cardId}`, formData, config);
    dispatch({
      type: EDIT_CARD,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Move card
export const moveCard = (cardId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    // const res = await axios.patch(`/api/cards/move/${cardId}`, body, config);
    const res = await axios.patch(`${API_URL}/api/cards/move/${cardId}`, body, config);
    dispatch({
      type: MOVE_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


export const archiveCard = (cardId, archive) => async (dispatch) => {
  try {
    // const res = await axios.patch(`/api/cards/archive/${archive}/${cardId}`);
    const res = await axios.patch(`${API_URL}/api/cards/archive/${archive}/${cardId}`);
    dispatch({
      type: ARCHIVE_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteCard = (listId, cardId) => async (dispatch) => {
  try {
    // const res = await axios.delete(`/api/cards/${listId}/${cardId}`);
    const res = await axios.delete(`${API_URL}/api/cards/${listId}/${cardId}`);
    dispatch({
      type: DELETE_CARD,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


export const getActivity = () => async (dispatch) => {
  try {
    const boardId = axios.defaults.headers.common['boardId'];

    // const res = await axios.get(`/api/boards/activity/${boardId}`);
    const res = await axios.get(`${API_URL}/api/boards/activity/${boardId}`);
    dispatch({
      type: GET_ACTIVITY,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


export const addMember = (userId) => async (dispatch) => {
  try {
    // const res = await axios.put(`/api/boards/addMember/${userId}`);
    const res = await axios.put(`${API_URL}/api/boards/addMember/${userId}`);
    dispatch({
      type: ADD_MEMBER,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Move list
export const moveList = (listId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    // const res = await axios.patch(`/api/lists/move/${listId}`, body, config);
    const res = await axios.patch(`${API_URL}/api/lists/move/${listId}`, body, config);
    dispatch({
      type: MOVE_LIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


export const addCardMember = (formData) => async (dispatch) => {
  try {
    const { add, cardId, userId } = formData;

    // const res = await axios.put(`/api/cards/addMember/${add}/${cardId}/${userId}`);
    const res = await axios.put(`${API_URL}/api/cards/addMember/${add}/${cardId}/${userId}`);
    dispatch({
      type: ADD_CARD_MEMBER,
      payload: res.data,
    });

    dispatch(getActivity());
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add checklist item
export const addChecklistItem = (cardId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    // const res = await axios.post(`/api/checklists/${cardId}`, body, config);
    const res = await axios.post(`${API_URL}/api/checklists/${cardId}`, body, config);
    dispatch({
      type: ADD_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Edit checklist item
export const editChecklistItem = (cardId, itemId, formData) => async (dispatch) => {
  try {
    const body = JSON.stringify(formData);

    // const res = await axios.patch(`/api/checklists/${cardId}/${itemId}`, body, config);
    const res = await axios.patch(`${API_URL}/api/checklists/${cardId}/${itemId}`, body, config);
    dispatch({
      type: EDIT_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Complete/Uncomplete checklist item
export const completeChecklistItem = (formData) => async (dispatch) => {
  try {
    const { cardId, complete, itemId } = formData;

    // const res = await axios.patch(`/api/checklists/${cardId}/${complete}/${itemId}`);
    const res = await axios.patch(`${API_URL}/api/checklists/${cardId}/${complete}/${itemId}`);
    dispatch({
      type: COMPLETE_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete checklist item
export const deleteChecklistItem = (cardId, itemId) => async (dispatch) => {
  try {
    // const res = await axios.delete(`/api/checklists/${cardId}/${itemId}`);
    const res = await axios.delete(`${API_URL}/api/checklists/${cardId}/${itemId}`);
    dispatch({
      type: DELETE_CHECKLIST_ITEM,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: BOARD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};