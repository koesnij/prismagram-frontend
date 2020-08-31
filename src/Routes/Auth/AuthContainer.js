import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';

import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN,
} from './AuthQueries';

export default () => {
  const [action, setAction] = useState('logIn');
  const username = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const email = useInput('');
  const secret = useInput('');

  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value },
    // const requestSecret = useMutation(LOG_IN, { variables: { email } });
    // : useInput이 value와 onChange 쌍을 반환하는 것 주의!
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastName: lastName.value,
    },
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value,
    },
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (action === 'logIn') {
      if (email !== '') {
        try {
          const {
            data: { requestSecret },
          } = await requestSecretMutation();
          if (requestSecret) {
            toast.success('Check your mailbox for your login secret!');
            setAction('confirm');
          } else {
            toast.error("Can't find the account, create one!");
          }
        } catch {
          toast.error("Can't request secret, try again.");
        }
      } else {
        toast.error('Email is required.');
      }
    } else if (action === 'signUp') {
      if (
        email.value !== '' &&
        username.value !== '' &&
        firstName.value !== '' &&
        lastName.value !== ''
      ) {
        try {
          const {
            data: { createAccount },
          } = await createAccountMutation();
          if (createAccount) {
            toast.success('Account created. Log in now!');
            setTimeout(() => setAction('logIn'), 2000);
          } else {
            toast.error("Can't create account");
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error('All fields are required.');
      }
    } else if (action === 'confirm') {
      if (secret.value !== '') {
        try {
          const {
            data: { confirmSecret: token },
          } = await confirmSecretMutation();
          if (token !== '' && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else {
            throw Error();
          }
        } catch (error) {
          toast.error("Can't comfirm secret, check again.");
        }
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
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
