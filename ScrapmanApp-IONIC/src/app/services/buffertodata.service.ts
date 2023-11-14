import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuffertodataService {

  constructor() { }

  arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
    }
    // console.log(binary);
    return binary;
  }
}
