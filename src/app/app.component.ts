import { Component, OnInit, VERSION } from '@angular/core';
import { SState } from './states';
import { StateService } from './state.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  states: SState[] = [];

  constructor(private stateService: StateService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.stateService.getStates().subscribe(states => {
      this.states = states['states'];
    });
  }
}
