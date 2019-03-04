export const countNotesForFolder = (notes=[], folderid) =>
  notes.filter(note => note.folderid === folderid).length