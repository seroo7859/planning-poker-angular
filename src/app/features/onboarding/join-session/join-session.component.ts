import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { SessionActions } from "../../../planning-poker-store/actions";
import { Observable } from "rxjs";
import { SessionSelectors } from "../../../planning-poker-store/selectors";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-session-join',
  templateUrl: './join-session.component.html',
  styleUrls: ['./join-session.component.scss']
})
export class JoinSessionComponent implements OnInit {

  session$: Observable<any> = new Observable<any>();

  constructor(private readonly store: Store, public route: ActivatedRoute) {}

  ngOnInit() {
    this.session$ = this.store.select(SessionSelectors.selectSession);
  }

  onSubmit(form: NgForm) {
    if(form.valid) {
      this.store.dispatch(SessionActions.joinSession({ session: form.value }))
    }
  }
}
