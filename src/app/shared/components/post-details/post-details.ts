import { Component, inject, OnInit } from '@angular/core';
import { Posts } from '../../services/posts';
import { ActivatedRoute, RouterModule, TitleStrategy } from '@angular/router';
import { JsonPipe } from '@angular/common';
import { Ipost } from '../../models/posts';
import { MATERIAL_IMPORTS } from '../../const/material';

@Component({
  selector: 'app-post-details',
  imports: [...MATERIAL_IMPORTS, RouterModule],
  templateUrl: './post-details.html',
  styleUrl: './post-details.scss',
})
export class PostDetails implements OnInit{
  //post !:Ipost
  //get id >> api call >> get object from next method >>store in ts group
  //now we are ot doing functionality in this way by creating proprty 
  postId!:string|null
   private _postService = inject(Posts)
  private _routes = inject(ActivatedRoute)
  ngOnInit(): void {
    this.postId=this._routes.snapshot.paramMap.get('id')
    if(this.postId){
      this._postService.getPostById(this.postId)
       .subscribe({
         next:data=>{
           console.log(data)
         }
       })
    }
  }

  get selectedPost(){
    return this._postService.selctedPost() as Ipost
  }

}
