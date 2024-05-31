import { Button, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import UndoIcon from '@material-ui/icons/Undo';
import { useForm, FormProvider } from 'react-hook-form';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputFormItem from 'src/view/shared/form/items/InputFormItem';
import FormWrapper, {
  FormButtons,
} from 'src/view/shared/styles/FormWrapper';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  oldPassword: yupFormSchemas.string(
    i18n('user.fields.oldPassword'),
    {
      required: true,
    },
  ),
  newPassword: yupFormSchemas.string(
    i18n('user.fields.newPassword'),
    {
      required: true,
    },
  ),
  newPasswordConfirmation: yupFormSchemas
    .string(i18n('user.fields.newPasswordConfirmation'), {
      required: true,
    })
    .oneOf(
      [yup.ref('newPassword'), null],
      i18n('auth.passwordChange.mustMatch'),
    ),
});

function PasswordChangeFormPage(props) {
  const dispatch = useDispatch();

  const [initialValues] = useState(() => ({
    oldPassword: '',
    newPassword: '',
    newPasswordConfirmation: '',
  }));

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: initialValues,
  });

  const saveLoading = useSelector(
    selectors.selectLoadingPasswordChange,
  );

  const onSubmit = (values) => {
    dispatch(
      actions.doChangePassword(
        values.oldPassword,
        values.newPassword,
      ),
    );
  };

  const onReset = () => {
    Object.keys(initialValues).forEach((key: any) => {
      form.setValue(key, initialValues[key]);
    });
  };

  return (
    <FormWrapper>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Grid spacing={2} container>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <InputFormItem
                type="password"
                name="oldPassword"
                label={i18n('user.fields.oldPassword')}
                autoComplete="old-password"
                autoFocus
              />
            </Grid>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <InputFormItem
                type="password"
                name="newPassword"
                label={i18n('user.fields.newPassword')}
                autoComplete="new-password"
              />
            </Grid>
            <Grid item lg={7} md={8} sm={12} xs={12}>
              <InputFormItem
                type="password"
                name="newPasswordConfirmation"
                label={i18n(
                  'user.fields.newPasswordConfirmation',
                )}
                autoComplete="new-password"
              />
            </Grid>
          </Grid>

          <FormButtons>
            <Button
              variant="contained"
              color="primary"
              disabled={saveLoading}
              type="button"
              onClick={form.handleSubmit(onSubmit)}
              startIcon={<SaveIcon />}
              size="small"
            >
              {i18n('common.save')}
            </Button>

            <Button
              disabled={saveLoading}
              onClick={onReset}
              type="button"
              startIcon={<UndoIcon />}
              size="small"
            >
              {i18n('common.reset')}
            </Button>

            {props.onCancel ? (
              <Button
                disabled={saveLoading}
                onClick={() => props.onCancel()}
                type="button"
                startIcon={<CloseIcon />}
                size="small"
              >
                {i18n('common.cancel')}
              </Button>
            ) : null}
          </FormButtons>
        </form>
      </FormProvider>
    </FormWrapper>
  );
}

export default PasswordChangeFormPage;
