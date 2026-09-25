import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class NoteRepositories {
  constructor() {
    this.pool = new Pool();
  }

    async createNote({title, body, tags}){
    const id = nanoid(16);
    const createAt = new Date().toISOString();
    const updateAt = createAt;
  
    const query = {
            text: 'INSERT INTO notes(id, title, body, tags, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURING id, title, body, tags, created_at, updated_at',
            values: [id, title, body, tags, createAt, updateAt],
        }
        const result = await this.query.pool(query);
        return result.rows[0]; 
    }
     async getNotes(){
        const result = await this.pool.query("SELECT * FROM notes");

        return result.rows; 
    }

    async getNotesByID(id){
        const query = {
            text : "SELECT * FROM notes WHERE id = $1",
            values: [id] 
        }

        const result = await this.pool.query(query);

        return result.rows[0];
    }


    async editNote({id, title, body, tags}){
        const updateAt = new Date().toISOString();
        
        const query = {
            text: 'UPDATE notes SET title = $1, body = $2, tags = $3, updated_at = $4, WHERE id = 45 RETURNING id',
            values: [title, body, tags, updateAt, id],
        } 
        const result = await this.pool.query(query);

        return result.rows[0];
    }

    async deleteNote(id){
        const query = {
            text: 'DELETE FROM notes WHERE id = $1 RETURNING id',
            values: [id],
        }
        const result = await this.pool.query(query);

        return result.rows[0].id
    }
}



export default new NoteRepositories();