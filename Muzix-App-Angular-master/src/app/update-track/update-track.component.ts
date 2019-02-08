import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MuzixHttpService } from '../muzix-http.service';

@Component({
 selector: 'app-update-track',
 templateUrl: './update-track.component.html',
 styleUrls: ['./update-track.component.css']
})
export class UpdateTrackComponent implements OnInit {

 public artist: string;
 public mbid1: string;
 public track: string;
 public img: string;
 public trackinfo = {
   trackID : this.mbid1,
   trackName: this.track,
   trackComments : this.artist,
   imgUrl: this.img
 };
 public tracks;
 constructor(private _route: ActivatedRoute, private router: Router, public muzixservice: MuzixHttpService) {
 }
ngOnInit() {
  this.mbid1 = this._route.snapshot.paramMap.get('mbid');
  this.artist = this._route.snapshot.paramMap.get('comment');
  this.muzixservice.findtrack(this.mbid1).subscribe(
   data => {
     this.trackinfo.trackName=data.track.name;
     this.trackinfo.trackComments=this.artist;
     this.trackinfo.trackID=this.mbid1;
     this.trackinfo.imgUrl=this.img;
     this.trackinfo.imgUrl=data.track.album.image[3]['#text'];
     this.tracks = this.muzixservice.updateTrack(this.trackinfo).subscribe(
       (data1) => {
         this.tracks=data1;
         this.router.navigate(['/myplaylist']);
       }
     );
   }
  );
}
}