import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import { toast } from 'react-toastify';

import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import { LOG_IN, CREATE_ACCOUNT } from './AuthQueries';

export default () => {
  const [action, setAction] = useState('logIn');
  const username = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  // const requestSecret = useMutation(LOG_IN, { variables: { email } });
  // : useInput이 value와 onChange 쌍을 반환하는 것 주의!
  const [requestSecret] = useMutation(LOG_IN, {
    update: (_, { data }) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        toast.error("You don't have an account yet, create one!");
      }
    },
    variables: { email: email.value },
  });

  const [createAccount] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (action === 'logIn') {
      if (email !== '') {
        requestSecret();
      } else {
        toast.error('');
      }
    } else if (action === 'signUp') {
      if (
        email.value !== '' &&
        username.value !== '' &&
        firstName.value !== '' &&
        lastName.value !== ''
      ) {
        createAccount();
      } else {
        toast.error('All fields are required.');
      }
    }
  };
  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      onSubmit={onSubmit}
    />
  );
};
