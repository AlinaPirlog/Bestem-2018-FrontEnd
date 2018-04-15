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
import { AuthService } from '../core/auth.service';
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
    public currentItinerary = {
      itineraryId: Number,
      name: String
    };
    public itineraries = [];
    public newItineraryName = "";
    public newEventName = "";

    @ViewChild("search")
    public searchElementRef: ElementRef;

  constructor(private router: Router,
              private userService: UserService,
              private tokenStorage: TokenStorage,
              private mapService: MapService,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private modalService : NgbModal,
              private formBuilder: FormBuilder,
              private authService: AuthService ) {
  }


  ngOnInit(): void {

    //get all the itineraries for a user
    this.authService.getItineraries().subscribe(data =>{
      console.log(data);
      this.itineraries = data;
      if(data){
        this.currentItinerary = data[0];
      }
    });

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
     } else {
       this.latitude = 45;
       this.longitude = 45;
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
      if(result==='ok'){
        this.authService.createNewEvent(this.currentItinerary.itineraryId, this.newEventName).subscribe(data =>{
          console.log(data);
        });
      }
    }, (reason) => {
    });
  }

  openNewItineraryModal(newItinerary) {
    this.modalService.open(newItinerary).result.then((result) => {
      console.log('result is' + result);
      if(result == 'ok'){
        console.log('intra aici');
        this.authService.createNewItinerary({itineraryName:this.newItineraryName}).subscribe(data=>{
          if(data.itineraryId){
            this.itineraries.push(data);
          }
        }, (err) => {
          console.log(err);
        });
      }
    }, (reason) => {
      console.log('reason is' + reason);
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
