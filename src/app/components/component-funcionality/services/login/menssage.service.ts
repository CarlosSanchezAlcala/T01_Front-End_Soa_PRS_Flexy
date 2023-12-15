import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MenssageService {

    private subject = new Subject<any>()

    constructor() { }


    public sendMessage(message: string, logget: boolean) {
        this.subject.next({ text: message, isLogged: logget });
    }

    public getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
