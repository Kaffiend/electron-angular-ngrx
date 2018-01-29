import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DistrictSocketService {
  public socket: SocketIOClient.Socket;
  private socketUrl: string;

  constructor() {
    this.socket = io('http://localhost:5002');
    this.socket.on('connection', (socket) => {
    });
   }

   public DistrictRead() {
     this.socket.emit('District:Read');
   }

   public DistrictCreate(district) {
     this.socket.emit('District:Create', district);
   }

   public DistrictCreateSuccess(): Observable<any> {
     return new Observable(observer => {
       this.socket.on('District:Create', (payload) => {
         observer.next(payload);
       });
       return () => this.socket.disconnect();
     });
   }

   public DistrictReturn(): Observable<any> {
     return new Observable(observer => {
       this.socket.on('District:Return', (payload) => {
         observer.next(payload);
       });
       return () => this.socket.disconnect();
     });
   }
}
