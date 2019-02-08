import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MuzixHttpService } from '../muzix-http.service';

@Component({
  selector: 'app-search-track',
  templateUrl: './search-track.component.html',
  styleUrls: ['./search-track.component.css']
})
export class SearchTrackComponent implements OnInit {

  trackname: string;
  constructor(private _route: ActivatedRoute, private router: Router, public muzixservice: MuzixHttpService ) { }
  ngOnInit() {
  }
  search(): any {
    this.router.navigate(['/searchtrack', this.trackname]);
  }
}
