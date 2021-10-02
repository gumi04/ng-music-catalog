import { AlbumService } from './../../services/album.service';
import { SongService } from './../../services/song.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Song } from 'src/app/interfaces/song.module';
import { Album } from 'src/app/interfaces/album.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-album-detail',
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {



  idAlbum:any=0;
  songs:Song[]=[];
  album: Album = {
    albumId: 0,
    title: '',
    launch: new Date,
    company: '',
    singer: '',
    gender: '',
    image: ''
  };
  song: Song={
    songId: 0,
  title: '',
  albumId: 0,
  author: '',
  length: 0
  }
  showForm:boolean=false;
  songForm: FormGroup;
  authorForm: FormGroup;
  constructor(private route:ActivatedRoute, private songService:SongService,private albumService:AlbumService) {
    this.idAlbum= this.route.snapshot.paramMap.get('id');
    this.songForm = new FormGroup({
      title: new FormControl('',Validators.required),
      author: new FormControl('',Validators.required),
      length: new FormControl('',[Validators.required,Validators.pattern('^[0-9]{1,2}[.][0-9]{1,2}\d*?$')])
    })
    this.authorForm= new FormGroup({
      author: new FormControl('',Validators.required)
    })

  }

  ngOnInit(): void {
    this.getAllSongsByAlbums()
    this.getAlbum()
  }

  getAllSongsByAlbums() {
    this.songService.getSongsByAlbum(this.idAlbum).then(resolve => {
      this.songs = resolve;
    }).catch(error => {
      console.log(error)
    })
  }

  getAlbum(){
    this.albumService.getAlbum(this.idAlbum).then(result=>{
      this.album=result as Album;

    }).catch(error=>{
      console.log(error)
    })
  }
  getSong(idSong:number){
    this.songService.getSong(idSong,this.idAlbum).then(result=>{
      this.song=result as Song;
      this.formData();
    }).catch(error=>{
      console.log(error)
    })
  }
  updateAuthor({ value, valid }: { value: any, valid: boolean }) {

    this.song.author = value.author;
    if (valid) {
      this.songService.updateAuthorMassive(this.song,this.idAlbum).then(result => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se actualizo el autor de manera masiva',
          showConfirmButton: false,
          timer: 1500
        })
        this.authorForm.reset();
        this.getAllSongsByAlbums();
        this.showForm= !this.showForm
      }).catch(error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ups, ocurrio un error, intente mas tarde',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
  }

  create({ value, valid }: { value: Song, valid: boolean }) {
    if (valid) {
      this.songService.createSong(value,this.idAlbum).then(result=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cancion creada',
          showConfirmButton: false,
          timer: 1500
        })
        this.songForm.reset()
        this.getAllSongsByAlbums()
      }).catch(errror=>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se puedo crear la cancion, intente mas tarde',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
  }


  updateSong({ value, valid }: { value: Song, valid: boolean }) {
    if(valid){
      this.songService.updateSong(value,this.idAlbum,this.song.songId).then(result=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cancion Actualizada',
          showConfirmButton: false,
          timer: 1500
        })
        this.songForm.reset()
        this.getAllSongsByAlbums()
      }).catch(error=>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se pudo actualizar la cancion intente mas tarde',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
  }

  deletSong(idSong:number){
    Swal.fire({
      title: '¿Estas Seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.songService.deleteSong(this.idAlbum,idSong).then(result=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Cancion Eliminado',
            showConfirmButton: false,
            timer: 1500
          })
          this.getAllSongsByAlbums();
        }).catch(error=>{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No se pudo eliminar el album',
            showConfirmButton: false,
            timer: 1500
          })
        })

      }
    })
  }

  deletedAllSongs(){
    Swal.fire({
      title: '¿Estas Seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.songService.deleteAllSongs(this.idAlbum).then(result=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Canciones Eliminadas',
            showConfirmButton: false,
            timer: 1500
          })
          this.getAllSongsByAlbums();
        }).catch(error=>{
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No se pudo eliminar las canciones',
            showConfirmButton: false,
            timer: 1500
          })
        })

      }
    })
  }

  formData() {
    this.songForm.setValue({
      title: this.song.title,
      author: this.song.author,
      length: this.song.length,
    })
  }

get formSong(): any{
    return this.songForm['controls']
  }
  cleanFormSong() {
    this.songForm.reset();
  }

enableForm(){
  this.showForm=!this.showForm;
}

get formAuthor(): any{
  return this.authorForm['controls']
}
}
