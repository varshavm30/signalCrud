import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Ipost } from '../models/posts';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  
  private readonly BASE_URL:string = environment.BASE_URL;
  private readonly POST_URL:string = `${this.BASE_URL}/posts.json`;
  private _http = inject(HttpClient)
  postsSignal = signal<Ipost[]>([])
  fetchPosts():Observable<any>{
    return this._http.get(this.POST_URL)
       .pipe(
          map((res:any)=>{
            let postArr:Array<Ipost> =[]
             for(const key in res){
              postArr.push({...res[key],id:key})
             }
             return postArr
          }),
          tap(Posts=>{
            this.postsSignal.set(Posts)
          })
       )
  }
}
