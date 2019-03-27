import {Component, OnInit} from '@angular/core';
import {interval, noop, of} from 'rxjs';
import {concat} from 'rxjs/internal/observable/concat';
import {take} from 'rxjs/operators';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    const source1$ = interval(1000).pipe(take(3));
    const source2$ = of(4, 5, 6);
    const source3$ = of(7, 8, 9);

    const results$ = concat(source1$, source2$, source3$);

    results$.subscribe(
      value => console.log(value),
      noop,
      () => console.log('completed')
    );
  }

}
