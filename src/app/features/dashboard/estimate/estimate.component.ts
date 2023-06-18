import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { TeamSelectors, UserSelectors } from "../../../planning-poker-store/selectors";

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.scss']
})
export class EstimateComponent implements OnInit {

  team$: Observable<any> = new Observable<any>();
  user$: Observable<any> = new Observable<any>();

  constructor(private readonly store: Store) {}

  ngOnInit() {
    this.team$ = this.store.select(TeamSelectors.selectTeam);
    this.user$ = this.store.select(UserSelectors.selectUser);
  }

}
