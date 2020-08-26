import { makeStyles, Theme } from '@material-ui/core/';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    minWidth: 360,
    overflow: 'auto',
    maxHeight: (props: any) => props.height,
  },
  heading: {
    fontSize: theme.typography.pxToRem(18),
    flexBasis: '33.33%',
    flexShrink: 0,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
}));
