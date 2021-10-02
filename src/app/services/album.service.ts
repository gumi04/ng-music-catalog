import { Album } from 'src/app/interfaces/album.module';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }


  getAllAlbums() {
    return new Promise<Album[]>((resolve, reject) => {
      this.http.get(environment.url_base_api + "albums").subscribe((result: any) => {
        resolve(result)
      }, err => {
        reject(err)
      })
    })
  }

  updateCompanyMassive(album: Album) {
    return new Promise((resolve, reject) => {
      this.http.put(environment.url_base_api + "albums", album, this.httpOptions).subscribe((result: any) => {
        resolve(result)
      }, err => {
        reject(err)
      })
    })
  }

  createAlbum(album: Album) {
    return new Promise((resolve, reject) => {
      this.http.post(environment.url_base_api + "albums", album, this.httpOptions).subscribe((result: any) => {
        resolve(result)
      }, error => {
        reject(error)
      })
    })
  }

  deleteAlbum(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.url_base_api + "albums/" + id).subscribe((result: any) => {
        resolve(result)
      }, error => {
        reject(error)
      })
    })
  }

  getAlbum(id: number) {
    return new Promise((resolve, reject) => {
      this.http.get(environment.url_base_api + "albums/" + id).subscribe((result: any) => {
        resolve(result)
      }, error => {
        reject(error)
      })
    })
  }

  updateAlbum(album: Album, id: number) {
    return new Promise((resolve, reject) => {
      this.http.put(environment.url_base_api + "albums/" + id, album, this.httpOptions).subscribe((result: any) => {
        resolve(result)
      }, error => {
        reject(error)
      })
    })
  }

  deleteAllAlbums() {
    return new Promise((resolve, reject) => {
      this.http.delete(environment.url_base_api + "albums/").subscribe((result: any) => {
        resolve(result)
      }, error => {
        reject(error)
      })
    })
  }
}
