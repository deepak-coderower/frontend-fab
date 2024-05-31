import { styled } from '@material-ui/core/styles';

const FilterWrapper = styled('div')({
  marginBottom: '16px',

  '& form': {
    width: '100%',
  },
});

export const FilterButtons = styled('div')({
  paddingTop: '16px',
  textAlign: 'right',

  '& > *': {
    marginLeft: '8px',
    marginBottom: '8px',
  },
});

export default FilterWrapper;
