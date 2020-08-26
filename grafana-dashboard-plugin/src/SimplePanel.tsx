import React, { useEffect, useRef, useState } from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { css, cx } from 'emotion';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import { fetchData, handleCreate, handleDelete, handleToggle, handleUpdate, processFile, useStyles } from './utils';

registerPlugin(FilePondPluginFileValidateType);

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const classes = useStyles({ width, height });
  const darkTheme = createMuiTheme({ palette: { type: 'dark' } });
  const filepondNewPlugin = useRef(null);
  const [idToDelete, setIdToDelete] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [plugins, setPlugins] = useState([]);

  useEffect(() => {
    (async () => {
      const plugins = await fetchData(`${options.url}/api/v1/plugins`);
      setPlugins(plugins);
    })();
  }, []);

  // const processFile = (
  //   fieldName: any,
  //   file: any,
  //   metadata: any,
  //   load: any,
  //   error: any,
  //   progress: any,
  //   abort: any,
  //   transfer: any,
  //   opts: any
  // ): any => {
  //   console.log(metadata);
  //   progress(false);
  //   const controller = new AbortController();
  //   const { signal } = controller;
  //   const fileReader = new FileReader();
  //   fileReader.onload = (ev: any) => {
  //     const dataUri = ev.target.result;
  //     console.log(dataUri);
  //     fetch(`${options.url}/api/v1/plugins/upload`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ dataUri }),
  //       signal,
  //     })
  //       .then(response => {
  //         if (!response.ok) throw new Error(response.statusText);
  //         return response.json();
  //       })
  //       .then(response => {
  //         console.log(response);
  //         const { fileName } = response;
  //         load(fileName);
  //       })
  //       .catch(err => {
  //         console.error(err);
  //         error(err);
  //       });
  //   };
  //   fileReader.readAsDataURL(file);

  //   return {
  //     abort: () => {
  //       controller.abort();
  //       abort();
  //     },
  //   };
  // };

  return (
    <div
      className={cx(
        css`
          width: ${width}px;
          height: ${height}px;
        `
      )}
    >
      <ThemeProvider theme={darkTheme}>
        <div className={classes.root}>
          {plugins.map((plugin: any) => (
            <ExpansionPanel key={plugin._id}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls="additional-plugin-content"
                id={plugin._id}
              >
                <FormControlLabel
                  aria-label="Enabled"
                  checked={plugin.is_enabled}
                  onChange={() => handleToggle(plugins, plugin._id, options.url, setPlugins)}
                  onClick={event => event.stopPropagation()}
                  onFocus={event => event.stopPropagation()}
                  control={<Switch color="primary" />}
                  label=""
                  title={plugin.is_enabled ? 'disable' : 'enable'}
                />
                <Typography className={classes.heading}>{plugin.name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography color="textSecondary" style={{ width: '100%' }}>
                  <List component="nav" aria-label="plugins" style={{ width: '100%' }}>
                    <ListItem button>
                      <ListItemIcon>
                        <LibraryBooksIcon />
                      </ListItemIcon>
                      <ListItemText primary={'description: ' + plugin.description} />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <LabelImportantIcon />
                      </ListItemIcon>
                      <ListItemText primary={'version: ' + plugin.version} />
                    </ListItem>
                    <ListItem button>
                      <ListItemIcon>
                        <PermIdentityIcon />
                      </ListItemIcon>
                      <ListItemText primary={'author: ' + plugin.author} />
                    </ListItem>
                    <ListItem>
                      <Button
                        color="primary"
                        variant="contained"
                        startIcon={<SystemUpdateAltIcon />}
                        onClick={() => {
                          setIdToUpdate(plugin._id);
                          setShowUpdateDialog(true);
                        }}
                        style={{ marginRight: '10px' }}
                      >
                        Update plugin
                      </Button>
                      <Button
                        color="secondary"
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setIdToDelete(plugin._id);
                          setShowDeleteDialog(true);
                        }}
                      >
                        Delete
                      </Button>
                    </ListItem>
                  </List>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Upload new plugin</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{ display: 'block' }}>
              <Typography color="textSecondary">{'Drag & drop or browse for plugin below:'}</Typography>
              <FilePond
                name="filepond-new"
                ref={filepondNewPlugin}
                acceptedFileTypes={['application/x-zip-compressed']}
                labelIdle='<span class="filepond--label-action">Upload plugin</span>'
                server={{
                  process: (processFile as Function).bind(null, options.url),
                }}
              />
              <Button
                onClick={() => handleCreate(options.url, plugins, setPlugins, filepondNewPlugin)}
                color="primary"
                variant="contained"
              >
                Save
              </Button>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>

        <Dialog
          open={showUpdateDialog}
          onClose={() => setShowUpdateDialog(false)}
          aria-labelledby="upload-plugin-dialog-title"
          fullWidth={true}
        >
          <DialogTitle id="update-plugin-dialog-title">Update plugin</DialogTitle>
          <DialogContent>
            <DialogContentText>{'Drag & drop or browse for plugin below:'}</DialogContentText>
            <FilePond
              metadata={{ url: `${options.url}/api/v1/plugins/upload` }}
              acceptedFileTypes={['application/x-zip-compressed']}
              labelIdle='<span class="filepond--label-action">Upload plugin</span>'
              server={{
                process: processFile as any,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleUpdate(idToUpdate, options.url, setShowUpdateDialog)}
              color="primary"
              variant="contained"
            >
              Update
            </Button>
            <Button onClick={() => setShowUpdateDialog(false)} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete plugin</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this plugin?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => handleDelete(idToDelete, options.url, plugins, setPlugins, setShowDeleteDialog)}
              color="primary"
              autoFocus
              variant="contained"
            >
              Yes
            </Button>
            <Button onClick={() => setShowDeleteDialog(false)} color="secondary" variant="contained">
              No
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};
