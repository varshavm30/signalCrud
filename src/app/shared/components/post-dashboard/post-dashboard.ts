import { Component, inject, OnInit } from '@angular/core';
import { Posts } from '../../services/posts';
import { JsonPipe } from '@angular/common';
import { PostCard } from '../post-card/post-card';

@Component({
  selector: 'app-post-dashboard',
  // imports: [JsonPipe],
  imports:[PostCard],
  templateUrl: './post-dashboard.html',
  styleUrl: './post-dashboard.scss',
})
export class PostDashboard implements OnInit {
  // postArr:any //we wil not tke data from property
  // we get it from the signals//from signals >>PostService
 _postService = inject(Posts)//inject postsevice here to get  fetch method

  ngOnInit(): void {
    this._postService.fetchPosts()
     .subscribe({
      next:data =>{
       console.log(data) 
      }
     })
  }

}

//if we are using http client methods  get post put patch and that return observable we do not need to unsubcribs
// /it bt is using pipable operator at that time we nned tounsubscribe that
//bcoz that was ann custom obsrvable so nned to unsubscribe.

//here signal based change detection is worked befoe we write property and that changes
//values that hvappen change detection which update whole htrml tree
//here signal only update the required part