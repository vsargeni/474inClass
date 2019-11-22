import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import * as $ from 'jquery';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from '../shared/services/auth.service';
import {
  AngularFirestore,
  AngularFirestoreModule,
  AngularFirestoreDocument,
  fromDocRef
} from '@angular/fire/firestore';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() subid: string;
  public authService: AuthService;

  constructor(private route: ActivatedRoute, public db: AngularFirestore) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subid = params.get('subid');
    });
    this.getPosts(this.subid);
  }


  onSubmit() {
    const subid = this.route.snapshot.paramMap.get('subid');
    const posttitle = $('#posttitle').val();
    const posttext = $('#posttext').val();

    this.db.collection('subreddits').doc(subid).collection('posts').doc(posttitle).set({
      author: JSON.parse(localStorage.getItem('user')).displayName,
      title: posttitle,
      text: posttext,
    })
      .then(() => {
        console.log('Post submitted!');
        document.location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  }

  async getPosts(subid: string) {
    try {
      await this.db.collection('subreddits').doc(subid).collection('posts').get().toPromise()
        .then(coll => {
          if (coll.empty) {
            console.log('No documents found');
          } else {
            document.querySelector('#subid').innerHTML = `r/${subid}`;
            coll.forEach(doc => {
              const postName = doc.get('title');
              document.querySelector('#posts').innerHTML +=
                `<br><a href='topics/${subid}/posts/${doc.id}'><h4>${postName}</h4></a></br>`;
              console.log(doc.id);
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }n

  /*
  async getTopics() {
    try {
      this.subid = this.route.snapshot.paramMap.get('subid');

      await this.db.collection('subreddits').doc(this.subid).collection('posts').get().toPromise()
        .then(coll => {
          if (coll.empty) {
            console.log('No documents found');
          } else {
            coll.forEach(doc => {
              
              // const text = JSON.stringify(doc.data().text);
              // const author = JSON.stringify(doc.data().author);
              // const title = JSON.stringify(doc.data().title);
              // const docid = doc.id.replace(/ +/g, '');
              
              document.querySelector('#subreddits').innerHTML += `<div  style="border: 2px dashed white; border-radius: 5px;">
              <br><h4 style="padding: 20px;"><a href=/comments/${docid}/${this.subname} style=" font-size: 50px; position: relative; display: block; top: -30px;">
              ${title.replace(/['"]+/g, '')}</a> <a style=" color: inherit; background-color:transparent !important; font-size: 20px; display: block;">
              ${text.replace(/['"]+/g, '')}</a> <a style=" color: inherit; background-color:transparent !important; font-size: 10px; position: relative; 
              bottom: -30px;display: block;">
              Listed by: ${author.replace(/['"]+/g, '')} </a></h4></br></div>`;
              document.querySelector('#subreddits').setAttribute('class', 'subposts');
              console.log(doc.id);
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
  */

}


