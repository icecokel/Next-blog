import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  writeBatch,
  deleteDoc,
  query,
  where,
} from "firebase/firestore/lite";
import db from "./firebase";

type WhereFilterOp =
  | "<"
  | "<="
  | "=="
  | "!="
  | ">="
  | ">"
  | "array-contains"
  | "in"
  | "array-contains-any"
  | "not-in";
interface Condition {
  fieldPath: string;
  opStr: WhereFilterOp;
  value: unknown;
}

// 모든 문서 가져오기
export const fetchData = async (docName: string) => {
  const querySnapshot = await getDocs(collection(db, docName));

  const result = [] as any;
  querySnapshot.forEach((doc) => {
    let temp = doc.data();
    temp.id = doc.id;
    result.push(temp);
    // console.log(`${doc.id} => ${doc.data()}`);
  });

  return result;
};

export const searchData = async (docName: string, { fieldPath, opStr, value }: Condition) => {
  const q = query(collection(db, docName), where(fieldPath, opStr, value));
  const querySnapshot = await getDocs(q);
  const result: any[] = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    result.push(doc.data());
  });

  return result;
};

export const getData = async (docName: string, keyword: string) => {
  const docRef = doc(db, docName, keyword);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return undefined;
  }
};

export const insertData = async (docName: string, collectionName: string, params: any) => {
  await setDoc(doc(db, docName, collectionName), params);
};

export const insertDoc = async (docName: string, params: any) => {
  await addDoc(collection(db, docName), params);
};

/**
 * @todo 첫번째 배치 작업은 실행가능 두번 째 배치 작업 때 실패함. 원인 분석 필요
 */
const setBatch = async (docName: string, paramList: Array<any>) => {
  // Get a new write batch
  const batch = writeBatch(db);
  paramList.forEach((param) => {
    const docRef = doc(db, docName, param.id);
    const params = { ...param };
    delete params.id;
    batch.set(docRef, params);
  });
  await batch.commit();
};

export const deleteBatch = async (docName: string, paramList: Array<any>) => {
  // Get a new write batch
  const batch = writeBatch(db);

  paramList.forEach((param) => {
    const docRef = doc(db, docName, param.id);
    batch.delete(docRef);
  });
  await batch.commit();
};

export const deleteData = async (docName: string, collectionName: string) => {
  await deleteDoc(doc(db, docName, collectionName));
};
