export const processFile = (
  baseUrl: string,
  fieldName: any,
  file: any,
  metadata: any,
  load: any,
  error: any,
  progress: any,
  abort: any,
  transfer: any,
  opts: any
): any => {
  console.log(baseUrl, fieldName);
  progress(false);
  const controller = new AbortController();
  const { signal } = controller;
  const fileReader = new FileReader();
  fileReader.onload = (event: ProgressEvent<FileReader>) => {
    if (!event.target) {
      error('File loading failed!');
      return;
    }
    const dataUri = event.target.result;
    console.log(dataUri);
    console.log(`${baseUrl}/api/v1/plugins/upload`);
    fetch(`${baseUrl}/api/v1/plugins/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataUri }),
      signal,
    })
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(response => {
        console.log(response);
        const { fileName } = response;
        load(fileName);
      })
      .catch(err => {
        console.error(err);
        error(err);
      });
  };
  fileReader.readAsDataURL(file);
  return {
    abort: () => {
      controller.abort();
      abort();
    },
  };
};
