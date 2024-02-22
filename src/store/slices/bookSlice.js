import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../configs/firebase-config";

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    book: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksFromFirestore.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase(fetchBookFromFirestore.fulfilled, (state, action) => {
        state.book = action.payload;
      })
      .addCase(deleteBookFromFireStore.fulfilled, (state, action) => {
        state.books = state.books.filter((book) => book.id !== action.payload);
      });
  },
});

// 👉 add book to firestore
export const addBookToFireStore = createAsyncThunk(
  "books/addBookToFireStore",
  async (book) => {
    await addDoc(collection(db, "books"), book);
  },
);

// 👉 delete book
export const deleteBookFromFireStore = createAsyncThunk(
  "books/deleteBookFromFireStore",
  async (id) => {
    await deleteDoc(doc(db, "books", id));
    return id;
  },
);

// 👉 update book
export const updateBookToFireStore = createAsyncThunk(
  "books/updateBookFromFireStore",
  async (payload) => {
    await updateDoc(doc(db, "books", payload.id), {
      title: payload.title,
      author: payload.author,
      year: payload.year,
      totalPages: payload.totalPages,
      currentPages: payload.currentPages,
      isFinished: payload.isFinished,
      endDate: payload.endDate,
    });
  },
);

// 👉 fetch books
export const fetchBooksFromFirestore = createAsyncThunk(
  "books/fetchBooksFromFirestore",
  async (id) => {
    // ✅ get a document
    const querySnapshot = await getDocs(collection(db, "books"));
    const bookList = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    // ✅ filter books by user ID and sort books by the most recently added
    const userBooks = bookList
      .filter((book) => book.userId === id)
      .sort((objA, objB) => {
        const dateA = new Date(objA.endDate.seconds * 1000);
        const dateB = new Date(objB.endDate.seconds * 1000);

        return Number(dateB) - Number(dateA);
      });

    return userBooks;
  },
);

// 👉 fetch selected book
export const fetchBookFromFirestore = createAsyncThunk(
  "books/fetchBookFromFirestore",
  async (id) => {
    const querySnapshot = await getDocs(collection(db, "books"));
    const bookList = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const selectedBook = bookList.filter((book) => book.id === id);
    return selectedBook;
  },
);

export default bookSlice.reducer;
