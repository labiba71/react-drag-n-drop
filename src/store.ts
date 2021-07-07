import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State } from "./type";
import { v1 as uuid } from "uuid";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import _ from "lodash";

const todoInitialState: State = {
  todo: {
    title: "Todo",
    items: [],
  },
  inProgress: {
    title: "In Progress",
    items: [],
  },
  done: {
    title: "Done",
    items: [],
  },
};

const todoSlice = createSlice({
  name: ".",
  initialState: todoInitialState,
  reducers: {
    createTodo: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{
          id: string;
          title: string;
          details: string;
          color: string;
          date: string;
          done: boolean;
        }>
      ) => {
        state.todo.items.push(payload);
      },
      prepare: ({
        title,
        details,
        color,
        date,
        done,
      }: {
        title: string;
        details: string;
        color: string;
        date: string;
        done: boolean;
      }) => ({
        payload: {
          id: uuid(),
          title,
          details,
          color,
          date,
          done,
        },
      }),
    },
    dragNdrop: (
      state,
      {
        payload,
      }: PayloadAction<{
        destination: { droppableId: string; index: number };
        source: { droppableId: string; index: number };
      }>
    ) => {
      let itemCopy: any;
      _.map(state, (data, key) => {
        if (key === payload.source.droppableId) {
          console.log(key, "found");
          itemCopy = data.items[payload.source.index];
          console.log(itemCopy);
          data.items.splice(payload.source.index, 1);
        }
        if (key === payload.destination.droppableId) {
          data.items.splice(payload.destination.index, 0, itemCopy);
        }
      });
    },
    remove: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        title: string;
        details: string;
        color: string;
      }>
    ) => {
      _.map(state, (data, key) => {
        const index = data.items.findIndex(
          (todo: any) => todo.id === payload.id
        );
        if (index !== -1) {
          data.items.splice(index, 1);
        }
        return;
      });
    },
    edit: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        title: string;
        details: string;
        color: string;
        done: boolean;
      }>
    ) => {
      _.map(state, (data, key) => {
        const todoEdit = data.items.find((todo: any) => todo.id === payload.id);
        if (todoEdit) {
          todoEdit.title = payload.title;
          todoEdit.details = payload.details;
          todoEdit.color = payload.color;
          todoEdit.done = payload.done;
        }
        return;
      });
      // const todoEdit = state.find((todo) => todo.id === payload.id);
      // if (todoEdit) {
      //   todoEdit.title = payload.title;
      //   todoEdit.details = payload.details;
      //   todoEdit.color = payload.color;
      //   todoEdit.done = payload.done;
      // }
    },
  },
});

export const { createTodo, remove, dragNdrop, edit } = todoSlice.actions;

const rootReducer = combineReducers({
  todoRoot: todoSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["todoRoot"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
