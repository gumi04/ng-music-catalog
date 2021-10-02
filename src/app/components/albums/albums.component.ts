import { AlbumService } from './../../services/album.service';
import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/interfaces/album.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums: Album[] = [];
  album: Album = {
    albumId: 0,
    title: '',
    launch: new Date,
    company: '',
    singer: '',
    gender: '',
    image: ''
  };
  idAlbum: number = 0;
  companyAlbumForm: FormGroup;
  albumForm: FormGroup;


  constructor(private albumService: AlbumService) {
    this.companyAlbumForm = new FormGroup({
      companyName: new FormControl('', Validators.required)
    })
    this.albumForm = new FormGroup({
      title: new FormControl('', Validators.required),
      singer: new FormControl('', Validators.required),
      company: new FormControl('', Validators.required),
      gender: new FormControl('', [Validators.required]),
      launch: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.getAllAlbums();
  }


  getAllAlbums() {
    this.albumService.getAllAlbums().then(resolve => {
      this.albums = resolve;
      console.log(this.albums);
    }).catch(error => {
      console.log(error)
    })
  }

  updateCompanyMassive({ value, valid }: { value: any, valid: boolean }) {
    this.album.company = value.companyName;
    if (valid) {
      this.albumService.updateCompanyMassive(this.album).then(result => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Se actualizo la disquera de manera masiva',
          showConfirmButton: false,
          timer: 1500
        })
        this.companyAlbumForm.reset();
        this.getAllAlbums();
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


  create({ value, valid }: { value: Album, valid: boolean }) {
    value.launch = this.getformaterDate(value.launch);
    if (valid) {
      this.albumService.createAlbum(value).then(result => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Album creado',
          showConfirmButton: false,
          timer: 1500
        })
        this.albumForm.reset()
        this.getAllAlbums()
      }).catch(errror => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se puedo crear el album intente mas tarde',
          showConfirmButton: false,
          timer: 1500
        })
      })
    }
  }

  deleteAlbum(id: number) {
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
        this.albumService.deleteAlbum(id).then(result => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Album Eliminado',
            showConfirmButton: false,
            timer: 1500
          })
          this.getAllAlbums();
        }).catch(error => {
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

  getAlbum(id: number) {
    this.albumService.getAlbum(id).then(result => {
      this.album = result as Album;
      this.idAlbum = id;
      this.formData();
    }).catch(error => {
      console.log(error)
    })
  }
  update({ value, valid }: { value: Album, valid: boolean }) {
    value.launch = this.getformaterDate(value.launch);
    value.albumId = this.idAlbum;
    this.albumService.updateAlbum(value, this.idAlbum).then(result => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Album Actualizado',
        showConfirmButton: false,
        timer: 1500
      })
      this.albumForm.reset()
      this.getAllAlbums()
    }).catch(error => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No se puedo actualizar el album intente mas tarde',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  deletedAllAlbums() {
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
        this.albumService.deleteAllAlbums().then(result => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Album Eliminado',
            showConfirmButton: false,
            timer: 1500
          })
          this.getAllAlbums();
        }).catch(error => {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No se pudo eliminar los album',
            showConfirmButton: false,
            timer: 1500
          })
        })

      }
    })
  }

  getformaterDate(date: Date) {
    const datePipe = new DatePipe('en-US')
    return datePipe.transform(date, "yyyy-MM-ddTHH:mm:ss");
  }

  getformaterDateForm(date: Date) {
    const datePipe = new DatePipe('en-US')
    return datePipe.transform(date, "yyyy-MM-dd");
  }

  get formAltaControls(): any {
    return this.companyAlbumForm['controls']
  }

  get formAlbum(): any {
    return this.albumForm['controls']
  }

  cleanFormAlbum() {
    this.albumForm.reset();
  }

  formData() {
    let date = this.getformaterDateForm(this.album.launch)
    this.albumForm.setValue({
      title: this.album.title,
      launch: date,
      company: this.album.company,
      singer: this.album.singer,
      gender: this.album.singer,
      image: this.album.image
    })
  }

}
