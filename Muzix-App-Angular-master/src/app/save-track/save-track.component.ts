import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MuzixHttpService } from '../muzix-http.service';
import { text } from '@angular/core/src/render3';

@Component({
  selector: 'app-save-track',
  templateUrl: './save-track.component.html',
  styleUrls: ['./save-track.component.css']
})
export class SaveTrackComponent implements OnInit {

  public artist: string;
  public mbid1: string;
  public track: string;
  public image: string;

  public trackinfo = {
    trackID : this.mbid1,
    trackName: this.track,
    trackComments : this.artist,
    imgUrl : this.image
  };
  constructor(private _route: ActivatedRoute, private router: Router, public muzixservice: MuzixHttpService) {
   }
  ngOnInit() {
    this.mbid1 = this._route.snapshot.paramMap.get('mbid');
    this.muzixservice.findtrack(this.mbid1).subscribe(
      data => {
        this.trackinfo.trackName = data.track.name;
        this.trackinfo.trackComments = data.track.artist.name;
        this.trackinfo.trackID = this.mbid1;
        this.trackinfo.imgUrl = data.track.album.image[3]['#text'];
       const m = this.muzixservice.saveTrack(this.trackinfo).subscribe(
        data1 => {
          this.router.navigate(['/myplaylist']);
        }
       );
      }
    );
  }
}
