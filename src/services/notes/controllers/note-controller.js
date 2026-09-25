import response from '../../../utils/response.js';
import noteRepositories from "../repositories/note-repositories.js";

export const createNote = async(req, res, next) => {
    const { title, tags, body } = req.validate;

    const note = await noteRepositories.createNote({
      title, body, tags
    })

    if(!note){
      return next(new InvariantError('Catatan gagal ditambah'))
    }

    return response(res, 201, 'Catatan Berhasil ditambah');
};

export const getAllNotes = async(req,res)=>{
  const notes = await noteRepositories.getNotes()
   return response( res, 200, "Catatan succes di tampilkan", notes);
}


export const getNoteById = async(req, res, next) => {
  const { id } = req.params;
  const note = await noteRepositories.getNotesByID(id);
 
  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }
  return response(res, 200, 'Catatan sukses ditampilkan', note);
};

export const editNoteById = async(req, res, next) => {
  const { id } = req.params;
  const { title, tags, body } = req.validate;
  
  const note = await noteRepositories.editNote({
    id, title, body, tags
  })
 
  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }
 return response(res, 200, 'Catatan berhasil diperbarui', note);
};


export const deleteNoteById = async(req, res, next) => {
  const { id } = req.params;
  const deleteNote = await noteRepositories.deleteNote(id);
 
  if(!deleteNote){
    return next(new NotFoundError('catatan tidak ditemukan'))
  }
 
  return response(res, 200, 'Catatan berhasil dihapus');
};