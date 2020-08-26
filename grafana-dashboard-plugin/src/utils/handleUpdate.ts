export const handleUpdate = async (
  idToUpdate: string | null,
  baseUrl: string,
  setShowUpdateDialog: React.Dispatch<React.SetStateAction<boolean>>
): Promise<void> => {
  if (!idToUpdate) return;
  try {
    const fileName = (document.getElementsByName('filepond').item(0) as HTMLInputElement)?.value;
    if (!fileName) return;
    const response = await fetch(`${baseUrl}/api/v1/plugins`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: idToUpdate, fileName }),
    });
    if (!response.ok) throw new Error((await response.json()).message);
  } catch (err) {
    console.log(err);
  }
  setShowUpdateDialog(false);
};
