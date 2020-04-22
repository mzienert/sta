import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getContent() {
    return this.http.get(`${this.baseUrl}/get-content`);
  }

  public updateBlock(b: string, data: string) {
    let encoded = encodeURI(data);
    let body = {
      id: b,
      body: encoded
    }
    console.log(body)
    this.http.post(`${this.baseUrl}/update-content`, body).subscribe(res => {
      console.log(res)
    })
  }

}

//https://1pkijuj0ih.execute-api.us-west-2.amazonaws.com/latest/get-content
