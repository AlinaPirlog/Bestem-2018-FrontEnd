import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ElementRef, ViewChild , Component, OnInit, NgZone } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserService } from '../app.service';
import { Router } from '@angular/router';
import { TokenStorage } from '../core/token.storage';
import { MouseEvent, MapsAPILoader, AgmCoreModule } from '@agm/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MapService } from '../core/map.service';
import { FormControl,FormBuilder, FormGroup } from '@angular/forms';
import { } from 'googlemaps';
@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number ;
    public closeResult: any;
    public radioGroupForm: FormGroup;

    @ViewChild("search")
    public searchElementRef: ElementRef;

  constructor(private router: Router,
              private userService: UserService,
              private tokenStorage: TokenStorage,
              private mapService: MapService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private modalService : NgbModal,
              private formBuilder: FormBuilder ) {
  }


  ngOnInit(): void {

    this.radioGroupForm = this.formBuilder.group({
         'model': 1
       });
     //create search FormControl
      this.searchControl = new FormControl();

     //set current position
      this.setCurrentPosition();

     //load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
      console.log(this.searchElementRef);
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {

       });
       autocomplete.addListener("place_changed", () => {
         this.ngZone.run(() => {
           //get the place result
           let place: google.maps.places.PlaceResult = autocomplete.getPlace();

           //verify result
           if (place.geometry === undefined || place.geometry === null) {
             return;
           }

           //set latitude, longitude and zoom
           this.markersHolder.push({
              lat : place.geometry.location.lat(),
              lng : place.geometry.location.lng(),
              draggable : true
           })
           this.latitude = place.geometry.location.lat();
           this.longitude = place.geometry.location.lng();
           this.zoom = 12;
         });
       });
     });
  }
  private setCurrentPosition() {
     if ("geolocation" in navigator) {
       navigator.geolocation.getCurrentPosition((position) => {
         this.latitude = position.coords.latitude;
         this.longitude = position.coords.longitude;
         this.zoom = 12;

       });
     }
  }

  logOut():void {
    this.tokenStorage.signOut();
    this.router.navigate(['']);
  }



  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

  mapClicked($event: MouseEvent) {
    this.markersHolder.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  removeMarker(index){
    this.markersHolder.splice(index, 1);
  }

  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  markers: marker[] = [];

  markersHolder: markerHolder[] = [];
}
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}
interface markerHolder {
  lat: number;
  lng: number ;
  label?: string;
  draggable: boolean;
}
