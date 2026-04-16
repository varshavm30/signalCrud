import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { Ipost } from '../models/posts';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  
  private readonly BASE_URL:string = environment.BASE_URL;
  private readonly POST_URL:string = `${this.BASE_URL}/posts.json`;
  private _http = inject(HttpClient)
  postsSignal = signal<Ipost[]>([])//store array in signal not creating [property in dasjbpoard ts]
    //  bidefault we do nothave data in it so we pass empty arrayin it.
  
  selctedPost =signal<Ipost|null>(null)//2......
  isLoadingSignal = signal<boolean>(true)//2............
  fetchPosts():Observable<Ipost[]>{
    this.isLoadingSignal.set(true)//2......................
    return this._http.get(this.POST_URL)//get obj of obj
       .pipe(
          map((res:any)=>{
            let postArr:Array<Ipost> =[]//have to convert obj in array
             for(const key in res){
              postArr.push({...res[key],id:key})//noe get array of object
             }
             return postArr  // so this array have to set in signals set(method)
          }),
          tap(Posts=>{//we can do it in map or tap which is not manupulate the array
            this.postsSignal.set(Posts);
            this.isLoadingSignal.set(false)
          }),
          catchError(error=>{
            this.isLoadingSignal.set(false)
            return throwError(()=>error)
          })
       )
  }

  getPostById(id:string){//for post details single page
    this.isLoadingSignal.set(true)
    let POST_URL:string =`${this.BASE_URL}/posts/${id}.json`
    return this._http.get<Ipost>(POST_URL)
       .pipe(
        tap(res=>{
          this.selctedPost.set(res)
          this.isLoadingSignal.set(false)
        }),
        catchError(err=>{
          this.isLoadingSignal.set(false)
          return throwError(()=>err)
        })
       )
  }

  handleError(){

  }

}

//we can check any thing in console using tap or we can also do any functinality
//in that bcoz tap will not 
// whatever map return that same thimg weill give by taps callback functions parameter