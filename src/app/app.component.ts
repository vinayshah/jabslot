import { Component, OnInit, VERSION } from '@angular/core';
import {IndiaStates, SState} from './states';
import { StateService } from './state.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  states: SState[] = [];
  IndianStates: IndiaStates = Object();
  selectedStateId = 11;

  constructor(private stateService: StateService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.stateService.getIndiaStates().subscribe(states => {
      this.IndianStates = states;
      this.states = this.IndianStates.states;
    });
  }

  onStateChange(stateId) {
    console.log(stateId);
  }
}
