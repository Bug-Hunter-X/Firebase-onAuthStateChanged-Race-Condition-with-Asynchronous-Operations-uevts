The solution involves using a mechanism (like a promise or a flag) to ensure that only one asynchronous operation is running at a time.  If a new authentication state change occurs while a previous operation is still in progress, the previous operation is canceled or ignored, and the new state is processed.

```javascript
let isFetchingUserData = false;
let userPromise = null;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    if (isFetchingUserData) {
      // Ignore - an operation is already in progress
      console.log('Ignoring auth change - already fetching data');
      return;
    }
    isFetchingUserData = true;
    userPromise = fetchUserData(user.uid).then(userData => {
        isFetchingUserData = false;
        console.log('User data:', userData);
      }).catch(error => {
        isFetchingUserData = false;
        console.error('Error fetching user data:', error);
      });
  } else {
    // No user is signed in.
    console.log('User signed out.');
  }
});
```
This revised code prevents race conditions by ensuring that only one asynchronous operation runs for each authentication state change.