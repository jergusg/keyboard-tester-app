import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDEytzLvvrN26ynmzVB24wrMlw9OBxzG50",
  authDomain: "keyboard-tester-app.firebaseapp.com",
  databaseURL: "https://keyboard-tester-app.firebaseio.com",
  projectId: "keyboard-tester-app",
  storageBucket: "keyboard-tester-app.appspot.com",
  messagingSenderId: "84245441557"
};
const fire = firebase.initializeApp(config);
export default fire;