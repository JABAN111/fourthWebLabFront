import {Injectable, OnInit} from "@angular/core";
import {Result} from "../../mainPage/main/Result";
import {HttpService} from "./HttpService";
import {User} from "../../startPage/User";

@Injectable({
  providedIn: 'root'
})
export class ResultKeeperService {

  constructor(private http:HttpService) {
  }

  public static results: Result[] = []

}
