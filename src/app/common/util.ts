import {Observable} from 'rxjs';

export const createHttpObservable = (url: string) => {
  return Observable.create(observer => {
    const controller = new AbortController();
    const signal = controller.signal;


    fetch(url, {signal})
      .then(response => {
        return response.json();
      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
      })
    ;

    return () => {
      controller.abort();
    };
  });
};
