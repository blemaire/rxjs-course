import {Component, OnInit} from '@angular/core';
import {noop} from 'rxjs';
import {map} from 'rxjs/operators';
import {createHttpObservable} from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

    const http$ = createHttpObservable('/api/courses');

    const course$ = http$
      .pipe(
        map(res => Object.values(res['payload']))
      )
    ;

    course$.subscribe(
      courses => console.log(courses),
      noop,
      () => console.log('completed...')
    );
  }

}
