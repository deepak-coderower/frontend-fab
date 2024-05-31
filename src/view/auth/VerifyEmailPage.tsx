import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Content from 'src/view/auth/styles/Content';
import Logo from 'src/view/auth/styles/Logo';
import { i18n } from 'src/i18n';
import queryString from 'query-string';
import Wrapper from 'src/view/auth/styles/Wrapper';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { getHistory } from 'src/modules/store';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';

function VerifyEmailPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const token = queryString.parse(location.search).token;

  const signedIn = useSelector(selectors.selectSignedIn);
  const errorMessage = useSelector(
    selectors.selectErrorMessageVerifyEmail,
  );
  const loading = useSelector(
    selectors.selectLoadingVerifyEmail,
  );

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  useEffect(() => {
    dispatch(actions.doVerifyEmail(token));
  }, [dispatch, token]);

  const doSignout = async () => {
    await dispatch(actions.doSignout());
    getHistory().push('/');
  };

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${
          backgroundImageUrl ||
          '/images/emailUnverified.jpg'
        })`,
      }}
    >
      <Content>
        <Logo>
          {logoUrl ? (
            <img
              src={logoUrl}
              width="240px"
              alt={i18n('app.title')}
            />
          ) : (
            <h1>{i18n('app.title')}</h1>
          )}
        </Logo>

        {loading && (
          <h3 style={{ textAlign: 'center' }}>
            {i18n('auth.verifyEmail.message')}
          </h3>
        )}
        {!loading && !errorMessage && (
          <h3
            style={{
              textAlign: 'center',
              color: green[500],
            }}
          >
            {i18n('auth.verifyEmail.success')}
          </h3>
        )}
        {!loading && errorMessage && (
          <h3
            style={{
              textAlign: 'center',
              color: red[500],
            }}
          >
            {errorMessage}
          </h3>
        )}
        {!loading && errorMessage && (
          <Button
            style={{ marginTop: '24px' }}
            variant="contained"
            color="primary"
            type="button"
            fullWidth
            onClick={doSignout}
          >
            {i18n('auth.signout')}
          </Button>
        )}
        {!loading && !errorMessage && !signedIn && (
          <Button
            style={{ marginTop: '24px' }}
            component={Link}
            to="/auth/signin"
            variant="contained"
            color="primary"
            type="button"
            fullWidth
          >
            {i18n('auth.signin')}
          </Button>
        )}
      </Content>
    </Wrapper>
  );
}

export default VerifyEmailPage;
