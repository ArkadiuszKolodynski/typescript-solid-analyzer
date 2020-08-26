export const handleToggle = async (
  plugins: any[],
  id: string,
  baseUrl: string,
  setPlugins: React.Dispatch<React.SetStateAction<never[]>>
): Promise<void> => {
  try {
    const newPlugins = [...plugins];
    const plugin: any = newPlugins.find((plugin: any) => plugin._id === id);
    if (!plugin) throw new Error('Plugin not found!');
    const response = await fetch(`${baseUrl}/api/v1/plugins/${id}/${plugin.is_enabled ? 'disable' : 'enable'}`, {
      method: 'PATCH',
      headers: { 'X-API-KEY': 'asdf' },
    });
    if (!response.ok) throw new Error(response.statusText);
    plugin.is_enabled = !plugin.is_enabled;
    setPlugins(newPlugins as never[]);
  } catch (err) {
    console.error(err);
  }
};
