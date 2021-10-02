import { AlbumDetailComponent } from './components/album-detail/album-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from './components/albums/albums.component';
import { RouterModule, Routes } from '@angular/router';
import { NewAlbumComponent } from './components/new-album/new-album.component';

const routes: Routes =[
  { path: "", redirectTo:"/album", pathMatch: 'full' },
  {path : 'album', component:AlbumsComponent},
  {path : 'newAlbum', component:NewAlbumComponent},
  {path : 'album/detail/:id', component:AlbumDetailComponent}

]

@NgModule({
  imports : [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
