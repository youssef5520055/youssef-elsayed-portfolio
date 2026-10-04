// We are using Firebase Compat libraries so this works directly from file:/// without a local server!

const firebaseConfig = {
  apiKey: "AIzaSyB258Yvgg-1BxSyNdbDiVzQxFJp5tkPlJs",
  authDomain: "youssef-portfolio-e6a82.firebaseapp.com",
  projectId: "youssef-portfolio-e6a82",
  storageBucket: "youssef-portfolio-e6a82.firebasestorage.app",
  messagingSenderId: "276547611373",
  appId: "1:276547611373:web:552dfc522f38712de8fae4",
  measurementId: "G-FRE3V0BVZ5"
};

// Initialize Firebase via compat
if (typeof firebase !== 'undefined') {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  window.firebaseDB = db;
  window.firebaseStorage = firebase.storage();
  
  // We create wrapper functions so your admin.js and script.js still think they are using the new modular syntax!
  window.firebaseDoc = function(database, col, docId) {
      return database.collection(col).doc(docId);
  }
  
  window.firebaseSetDoc = function(docRef, data, options) {
      return docRef.set(data, options);
  }
  
  window.firebaseGetDoc = async function(docRef) {
      const snap = await docRef.get();
      return {
          exists: () => snap.exists, // Wrap property in function
          data: () => snap.data()
      };
  }

  // Tell the rest of the app that Firebase is ready!
  window.dispatchEvent(new Event('firebase-ready'));
} else {
  console.error("Firebase compat libraries not loaded.");
}
