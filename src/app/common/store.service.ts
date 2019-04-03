import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Course } from '../model/course';
import { createHttpObservable } from './util';
import { tap, map, shareReplay, retryWhen, delayWhen } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class Store {
    private subject = new BehaviorSubject<Course[]>([]);

    public courses$: Observable<Course[]> = this.subject.asObservable();

    init() {
        const http$ = createHttpObservable('/api/courses');

        http$
            .pipe(
                tap(() => console.log("HTTP request executed")),
                map(res => Object.values(res["payload"])),
            )
            .subscribe(course => this.subject.next(course))
            ;
    }

    selectBeginnerCourses() {
        return this.filterByCategory('BEGINNER');
    }

    selectAdvancedCourse() {
        return this.filterByCategory('ADVANCED');
    }

    filterByCategory(category: string) {
        return this.courses$
            .pipe(
                map(courses => courses
                    .filter(course => course.category === category))
            );
    }
}