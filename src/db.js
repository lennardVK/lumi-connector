import firebase from 'firebase'
import 'firebase/firestore'

// Get a Firestore instance
export const db = firebase.initializeApp({
    apiKey: "AIzaSyCdcmJIJwAK2R_szOKq5wSZRMyHgmlDQB4",
    authDomain: "https://console.firebase.google.com/project/lumi-4cfbe/database/firestore/data~2FTaskClasses",
    projectId: "lumi-4cfbe",
}).firestore();


// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { TimeStamp, GeoPoint } = firebase.firestore
export { TimeStamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
//db.settings({ timestampsInSnapshots: true })