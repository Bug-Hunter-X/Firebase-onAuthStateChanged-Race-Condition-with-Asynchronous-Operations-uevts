The following code snippet demonstrates a potential issue when using Firebase's `onAuthStateChanged` listener in conjunction with asynchronous operations.  The problem arises when the authentication state changes rapidly, potentially leading to race conditions and unexpected behavior.

```javascript
firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    // User is signed in.
    const userData = await fetchUserData(user.uid); // Asynchronous operation
    console.log('User data:', userData);
  } else {
    // No user is signed in.
    console.log('User signed out.');
  }
});
```

The `fetchUserData` function might take some time to complete. If the authentication state changes again before `fetchUserData` resolves, the listener will trigger again with potentially outdated user information, causing a race condition.