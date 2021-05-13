import { Component, OnInit, VERSION } from '@angular/core';
import { City, Districts, IndiaStates, SState } from './states';
import { StateService } from './state.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  states: SState[] = [];
  IndianStates: IndiaStates = Object();

  district: Districts = Object();
  cities: City[] = [];

  selectedStateId = 11;
  selectedCityId = 770;

  constructor(private stateService: StateService) {}

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

  getSlots() {
    const date = formatDate(new Date(), 'dd-MM-yyyy', 'en');
    this.stateService.findByDistrictId(this.selectedCityId, date);
  }
}
