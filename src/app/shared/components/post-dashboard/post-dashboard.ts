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
  // postArr:any//from signals >>PostService
 _postService = inject(Posts)//get the posts data here

  ngOnInit(): void {
    this._postService.fetchPosts()
     .subscribe({
      next:data =>{
       console.log(data)
      }
     })
  }

}
