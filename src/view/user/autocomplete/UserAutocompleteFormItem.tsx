import React, { useState } from 'react';
import UserService from 'src/modules/user/userService';
import UserNewFormModal from 'src/view/user/new/UserNewFormModal';
import AutocompleteInMemoryFormItem from 'src/view/shared/form/items/AutocompleteInMemoryFormItem';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/user/userSelectors';

function UserAutocompleteFormItem(props) {
  const { setValue, getValues } = useFormContext();
  const [modalVisible, setModalVisible] = useState(false);

  const hasPermissionToCreate = useSelector(
    selectors.selectPermissionToCreate,
  );

  const doCreateSuccess = (record) => {
    const { name, mode } = props;

    if (mode && mode === 'multiple') {
      setValue(
        name,
        [...(getValues()[name] || []), record],
        { shouldValidate: true, shouldDirty: true },
      );
    } else {
      setValue(name, record, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }

    setModalVisible(false);
  };

  const fetchFn = (value, limit) => {
    return UserService.fetchUserAutocomplete(value, limit);
  };

  const mapper = {
    toAutocomplete(originalValue) {
      if (!originalValue) {
        return null;
      }

      if (originalValue.fullName || originalValue.email) {
        let label = originalValue.email;

        if (originalValue.fullName) {
          label = `${originalValue.fullName} <${originalValue.email}>`;
        }

        return {
          value: originalValue.id,
          label,
        };
      }

      return {
        value: originalValue.id,
        label: originalValue.label,
      };
    },

    toValue(originalValue) {
      if (!originalValue) {
        return null;
      }

      return {
        id: originalValue.value,
        label: originalValue.label,
      };
    },
  };

  return (
    <>
      <AutocompleteInMemoryFormItem
        {...props}
        fetchFn={fetchFn}
        mapper={mapper}
        onOpenModal={() => setModalVisible(true)}
        hasPermissionToCreate={hasPermissionToCreate}
      />

      {modalVisible && (
        <UserNewFormModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSuccess={doCreateSuccess}
        />
      )}
    </>
  );
}

export default UserAutocompleteFormItem;
