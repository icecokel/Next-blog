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
  updateDoc,
  orderBy,
  startAt,
  limit,
  endAt,
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
interface OrderByCondition {
  fieldPath: string;
  direction: "asc" | "desc";
}

interface SearchCondition {
  fieldPath: string;
  opStr: WhereFilterOp;
  value: any;
  orderByCondition: OrderByCondition;
  page: number;
  rowCount: number;
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
// TODO 색인 추가 확인 - 완료
// startAt page의 수가 아니라, 값을정하는것, ex) startAt(1680194863815)은 1680194863815 이후 부터
// 다음 페이지를 진행하려면 값을 알고 있어야한다.
// asc는 가능함확인
// desc는 왜 불가한지 색인 밑 다른 정보 확인 필요
export const searchData = async (
  collectionName: string,
  { fieldPath, opStr, value, page = 1, rowCount = 10 }: SearchCondition
) => {
  const collectionRef = collection(db, collectionName);
  const startIdx = (page - 1) * rowCount;

  let queryRef = query(
    collectionRef,
    where(fieldPath, opStr, value),
    orderBy("registDate"),
    startAt(1680194863815),
    limit(rowCount)
  );

  const querySnapshot = await getDocs(queryRef);
  const result: any[] = [];

  querySnapshot.forEach((doc) => {
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

// collectionName 지정
export const insertCollection = async (docName: string, collectionName: string, params: any) => {
  await setDoc(doc(db, docName, collectionName), params);
};

// collectionName 랜덤하게 생성
export const insertDoc = async (docName: string, params: any) => {
  await addDoc(collection(db, docName), params);
};

export const updateCollection = async (docName: string, collectionName: string, params: any) => {
  await updateDoc(doc(db, docName, collectionName), params);
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
