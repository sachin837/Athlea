export const OnHandleFirebaseMessageError = (FirebaseCode: string) => {
  return (
    {
      'auth/email-already-in-use': 'Your account has been created',
      'auth/invalid-email':
        'Entered email/password is not correct, Please try again',
      'auth/wrong-password':
        'Entered password is not correct, Please try again',
      'auth/too-many-requests': '',
      'auth/user-not-found': '',
      'auth/requires-recent-login': 'You need to login again',
    }[FirebaseCode] || 'Something went wrong, Please try again'
  );
};
