import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Song } from '../interfaces/song.module';

@Injectable({
  providedIn: 'root'
})
export class SongService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private http:HttpClient) { }

  getSongsByAlbum(idAlbum:number){
    return new Promise<Song[]>((resolve,reject)=>{
      this.http.get(environment.url_base_api+"albums/"+idAlbum+"/songs").subscribe((result:any)=>{
        resolve(result)
      },err=>{
        reject(err)
      })
    })
  }

  createSong(song:Song,idAlbum:number){
    return new Promise((resolve,reject)=>{
      this.http.post(environment.url_base_api+"albums/"+idAlbum+"/songs",song,this.httpOptions).subscribe((result:any)=>{
        resolve(result)
      },error=>{
        reject(error)
      })
    })
  }

  updateAuthorMassive(song:Song,idAlbum:number){
    return new Promise((resolve,reject)=>{
      this.http.put(environment.url_base_api+"albums/"+idAlbum+"/songs",song,this.httpOptions).subscribe((result:any)=>{
        resolve(result)
      },err=>{
        reject(err)
      })
    })
  }

  getSong(idSong:number,idAlbum:number){
    return new Promise((resolve,reject)=>{
      this.http.get(environment.url_base_api+"albums/"+idAlbum+"/songs/"+idSong).subscribe((result:any)=>{
        resolve(result)
      },error=>{
        reject(error)
      })
    })
  }

  updateSong(song:Song,idAlbum:number,idSong:number){
    return new Promise((resolve,reject)=>{
      this.http.put(environment.url_base_api+"albums/"+idAlbum+"/songs/"+idSong,song,this.httpOptions).subscribe((result:any)=>{
        resolve(result)
      },error=>{
        reject(error)
      })
    })
  }

  deleteSong(idAlbum:number,idSong:number){
    return new Promise((resolve,reject)=>{
      this.http.delete(environment.url_base_api+"albums/"+idAlbum+"/songs/"+idSong).subscribe((result:any)=>{
        resolve(result)
      },error=>{
        reject(error)
      })
    })
  }

  deleteAllSongs(idAlbum:number){
    return new Promise((resolve,reject)=>{
      this.http.delete(environment.url_base_api+"albums/"+idAlbum+"/songs").subscribe((result:any)=>{
        resolve(result)
      },error=>{
        reject(error)
      })
    })
  }

}
