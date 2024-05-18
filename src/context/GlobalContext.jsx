import { createContext, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../configs/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData(user);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (userData !== null || fetchStatus === true) {
      fetchBooks();
      setFetchStatus(false);
    }
  }, [userData, fetchStatus]);

  const fetchBooks = async () => {
    await getDocs(collection(db, "bookshelf"))
      .then((querySnapshot) => {
        const books = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        const userBooks = books
          .filter((book) => book.userId === userData.uid)
          .sort((objA, objB) => {
            const titleA = objA.title.toLowerCase();
            const titleB = objB.title.toLowerCase();

            return titleA < titleB ? -1 : 1;
          });

        setData(userBooks);
      })
      .catch((error) => {
        console.log("Error occured: ", error.code, error.message);
      });
  };

  return (
    <GlobalContext.Provider
      value={{
        data,
        userData,
        setUserData,
        setFetchStatus,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
