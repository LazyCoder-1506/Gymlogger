import { collection, getDocs, addDoc, doc, updateDoc, query, where } from "firebase/firestore";

import { db } from "../firebase-config";

const workoutCollectionRef = collection(db, "workouts");

class WorkoutDataService {
  addWorkout = (newWorkout) => {
    return addDoc(workoutCollectionRef, newWorkout)
  }

  updateWorkout = (id, newWorkout) => {
    const workoutDoc = doc(db, "workouts", id)
    return updateDoc(workoutDoc, newWorkout)
  }

  getWorkoutForDate = (date) => {
    const q = query(workoutCollectionRef, where("date", "==", date))
    return getDocs(q)
  }
}

const serviceObj = new WorkoutDataService();
export default serviceObj