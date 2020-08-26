export const handleCreate = async (
  baseUrl: string,
  plugins: never[],
  setPlugins: React.Dispatch<React.SetStateAction<never[]>>,
  filepondNewPlugin: React.MutableRefObject<any | null>
): Promise<void> => {
  try {
    const fileName = (document.getElementsByName('filepond-new').item(0) as HTMLInputElement)?.value;
    if (!fileName) return;
    const response = await fetch(`${baseUrl}/api/v1/plugins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName }),
    });
    if (!response.ok) throw new Error((await response.json()).message);
    const plugin = await response.json();
    const newPlugins = [...plugins, plugin];
    setPlugins(newPlugins.sort((a, b) => a.name.localeCompare(b.name)) as never[]);
    (filepondNewPlugin.current as any)?.removeFiles();
  } catch (err) {
    console.error(err);
  }
};
