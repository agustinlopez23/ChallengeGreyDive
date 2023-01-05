import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase/config";

export const FetchingData = (array, setArray, collectionName = "") => {
  //Fetching Profiles
  const getData = async (_collection, db, callback) => {
    const dataFetch = await getDocs(collection(db, _collection));
    const data = [];

    dataFetch.forEach((doc) => {
      data.push({ ...doc.data() });
    });
    callback(data);
  };

  useEffect(() => {
    getData(collectionName, db, setArray);
  }, []);

  return array
};
