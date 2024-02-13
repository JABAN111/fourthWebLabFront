import {Injectable, OnInit} from "@angular/core";
import {Result} from "../Utils/Result";
import {HttpService} from "./HttpService";
import {User} from "../Utils/User";

@Injectable({
  providedIn: 'root'
})
export class ResultKeeperService {

  constructor(private http:HttpService) {
  }

  public static results: Result[] = []

}
