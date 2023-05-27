import { collection, getDocs, addDoc, query, where, doc, updateDoc, getDoc } from "firebase/firestore";

import { db } from "../firebase-config";

const exerciseCollectionRef = collection(db, "exercises");

class ExerciseDataService {
  addExercise = (newExercise) => {
    return addDoc(exerciseCollectionRef, newExercise);
  }

  getAllExercises = () => {
    return getDocs(exerciseCollectionRef);
  }

  getExercisesByBodyPart = (bodyPart) => {
    const q = query(exerciseCollectionRef, where("bodyPart", "==", bodyPart));
    return getDocs(q)
  }

  getExerciseById = (id) => {
    const docRef = doc(db, "exercises", id);
    return getDoc(docRef)
  }

  updateExercise = (id, newExercise) => {
    const exerciseDoc = doc(db, "exercises", id)
    return updateDoc(exerciseDoc, newExercise)
  }
}

const serviceObj = new ExerciseDataService();
export default serviceObj