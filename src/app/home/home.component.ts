import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {UserService} from '../app.service';
import {Router} from '@angular/router';
import {TokenStorage} from '../core/token.storage';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    // google maps zoom level
    zoom: number = 8;
  
    // initial center position for the map
    lat: number = 51.673858;
    lng: number = 7.815982;
  

  constructor(private router: Router,
              private userService: UserService,
              private tokenStorage:TokenStorage ) {
  }
  ngOnInit(): void {


  }

  logOut():void {
    this.tokenStorage.signOut();
    this.router.navigate(['']);
  }



  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  removeMarker(index){
    this.markers.splice(index, 1);
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]
}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
