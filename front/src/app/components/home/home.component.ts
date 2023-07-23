import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor (
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.activeTab = this.router.url;
  }

  subs: Subscription[] = [];
  faCrown = faCrown;
  activeTab: String = '';

  ngOnInit() {}

  setPanel(tab: String) {
    this.activeTab = tab;
    this.router.navigate([tab]);
  }

  startWith(path: String): Boolean {
    return this.activeTab.startsWith(path.toString(), 0);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
    this.subs = [];
  }

}
