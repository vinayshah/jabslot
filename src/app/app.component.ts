import { Component, OnInit, VERSION } from '@angular/core';
import { City, Districts, IndiaStates, SState } from './states';
import { Center, Centers } from './centers';
import { StateService } from './state.service';
import { formatDate } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  i = 0;
  states: SState[] = [];
  IndianStates: IndiaStates = Object();

  district: Districts = Object();
  cities: City[] = [];

  districtCenter: Centers = Object();
  centers: Center[] = [];

  selectedStateId = 11;
  selectedCityId = 770;

  constructor(private stateService: StateService) {
    // interval(this.i).subscribe(x => {
    //   this.getSlots();
    // });
  }

  ngOnInit() {
    this.getStates();
    this.onStateChange(this.selectedStateId);
    this.getSlots();
  }

  getStates(): void {
    this.stateService.getIndiaStates().subscribe(states => {
      this.IndianStates = states;
      this.states = this.IndianStates.states;
    });
  }

  onStateChange(stateId: number) {
    this.stateService.getDistrictsById(stateId).subscribe(d => {
      this.district = d;
      this.cities = this.district.districts;
    });
  }

  onDistrictChange(districtId: number) {
    this.selectedCityId = districtId;
    this.getSlots();
  }

  getSlots() {
    const date = formatDate(new Date(), 'dd-MM-yyyy', 'en');
    this.stateService
      .calendarByDistrict(this.selectedCityId, date)
      .subscribe(d => {
        this.districtCenter = d;
        this.centers = this.districtCenter.centers;
        console.log(this.centers);
      });
  }

  ngOnDestruct() {
    this.i = 0;
  }
}
