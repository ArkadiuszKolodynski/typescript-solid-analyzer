export const handleDelete = async (
  idToDelete: string | null,
  baseUrl: string,
  plugins: never[],
  setPlugins: React.Dispatch<React.SetStateAction<never[]>>,
  setShowDeleteDialog: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  if (!idToDelete) return;
  try {
    const response = await fetch(`${baseUrl}/api/v1/plugins/${idToDelete}`, { method: 'DELETE' });
    if (!response.ok) throw new Error((await response.json()).message);
    const newPlugins = plugins.filter((plugin: any) => plugin._id !== idToDelete);
    setPlugins(newPlugins);
    setShowDeleteDialog(false);
  } catch (err) {
    console.log(err);
  }
};
