import React from 'react';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { i18n } from 'src/i18n';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  values: {
    marginLeft: 8,
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function FilterPreview(props) {
  const classes = useStyles();

  const { values, renders, onRemove } = props;

  const itemsNotEmpty = Object.keys(values || {})
    .map((key) => {
      if (!renders[key]) {
        return {
          value: null,
        };
      }

      return {
        key: key,
        label: renders[key].label,
        value: renders[key].render(values[key]),
      };
    })
    .filter(
      (item) =>
        item.value ||
        item.value === 0 ||
        item.value === false,
    );

  if (!itemsNotEmpty.length || props.expanded) {
    return i18n('common.filters');
  }

  return (
    <div className={classes.root}>
      {i18n('common.filters')}:
      <span className={classes.values}>
        {itemsNotEmpty.map((item) => (
          <Chip
            key={item.key}
            size="small"
            label={`${item.label}: ${item.value}`}
            onDelete={
              onRemove
                ? () => onRemove(item.key)
                : undefined
            }
          />
        ))}
      </span>
    </div>
  );
}
