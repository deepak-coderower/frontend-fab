import { useForm, FormProvider } from 'react-hook-form';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import { i18n } from 'src/i18n';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import MaterialLink from '@material-ui/core/Link';
import Content from 'src/view/auth/styles/Content';
import Logo from 'src/view/auth/styles/Logo';
import OtherActions from 'src/view/auth/styles/OtherActions';
import Wrapper from 'src/view/auth/styles/Wrapper';
import I18nFlags from 'src/view/layout/I18nFlags';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import {
  Checkbox,
  FormControlLabel,
  Box,
  Button,
  Tooltip,
} from '@material-ui/core';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import SocialButtons from 'src/view/auth/styles/SocialButtons';
import config from 'src/config';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import Message from 'src/view/shared/message';

const schema = yup.object().shape({
  email: yupFormSchemas.string(i18n('user.fields.email'), {
    required: true,
  }),
  password: yupFormSchemas.string(
    i18n('user.fields.password'),
    {
      required: true,
    },
  ),
  rememberMe: yupFormSchemas.boolean(
    i18n('user.fields.rememberMe'),
  ),
});

function SigninPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const { socialErrorCode } = queryString.parse(
    location.search,
  );
  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  const loading = useSelector(selectors.selectLoading);

  const externalErrorMessage = useSelector(
    selectors.selectErrorMessage,
  );

  useEffect(() => {
    dispatch(actions.doClearErrorMessage());
  }, [dispatch]);

  useEffect(() => {
    if (socialErrorCode) {
      if (socialErrorCode === 'generic') {
        Message.error(i18n('errors.defaultErrorMessage'));
      } else {
        Message.error(
          i18n(`auth.social.errors.${socialErrorCode}`),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [initialValues] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: initialValues,
  });

  const onSubmit = (values) => {
    dispatch(
      actions.doSigninWithEmailAndPassword(
        values.email,
        values.password,
        values.rememberMe,
      ),
    );
  };

  return (
    <Wrapper
      style={{
        backgroundImage: `url(${
          backgroundImageUrl || '/images/signin.jpg'
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

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <InputFormItem
              name="email"
              label={i18n('user.fields.email')}
              autoComplete="email"
              autoFocus
              externalErrorMessage={externalErrorMessage}
            />

            <InputFormItem
              name="password"
              label={i18n('user.fields.password')}
              autoComplete="password"
              type="password"
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Checkbox
                    id={'rememberMe'}
                    name={'rememberMe'}
                    defaultChecked={true}
                    inputRef={form.register}
                    color="primary"
                    size="small"
                  />
                }
                label={i18n('user.fields.rememberMe')}
              />

              <MaterialLink
                style={{ marginBottom: '8px' }}
                component={Link}
                to="/auth/forgot-password"
              >
                {i18n('auth.forgotPassword')}
              </MaterialLink>
            </Box>

            <Button
              style={{ marginTop: '8px' }}
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={loading}
            >
              {i18n('auth.signin')}
            </Button>

            <SocialButtons>
              <Tooltip title="Facebook">
                <a
                  href={`${config.backendUrl}/auth/social/facebook`}
                >
                  <img
                    src="/images/facebook.png"
                    alt="Facebook"
                  />
                </a>
              </Tooltip>

              <Tooltip title="Google">
                <a
                  href={`${config.backendUrl}/auth/social/google`}
                >
                  <img
                    src="/images/google.png"
                    alt="Google"
                  />
                </a>
              </Tooltip>
            </SocialButtons>

            <OtherActions>
              <MaterialLink
                component={Link}
                to="/auth/signup"
              >
                {i18n('auth.createAnAccount')}
              </MaterialLink>
            </OtherActions>

            <I18nFlags style={{ marginTop: '24px' }} />
          </form>
        </FormProvider>
      </Content>
    </Wrapper>
  );
}

export default SigninPage;
