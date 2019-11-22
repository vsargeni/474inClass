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
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() subid: string;
  @Input() postid: string;

  constructor(private route: ActivatedRoute, public db: AngularFirestore) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subid = params.get('subid');
      this.postid = params.get('postid');
    });
    this.getPostInfo(this.subid, this.postid);
  }

  onSubmit() {
    const commentText = $('#commentText').val();
    const subid = this.route.snapshot.paramMap.get('subid');
    const postid = this.route.snapshot.paramMap.get('postid');

    this.db.collection('subreddits').doc(subid).collection('posts').doc(postid).collection('comments').doc(commentText).set({
      author: JSON.parse(localStorage.getItem('user')).displayName,
      text: commentText,
    })
      .then(() => {
        console.log('Document submitted!');
        document.location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  }

  async getPostInfo(subid: string, postid: string) {
    try {
      await this.db.collection('subreddits').doc(subid).collection('posts').doc(postid).get().toPromise()
        .then(async doc => {
          if (!doc.exists) {
            console.log('Document does not exist');
          } else {
            document.querySelector('#title').innerHTML = `<b><h1>Title: ${doc.get('title')}</h1></b>`;
            document.querySelector('#author').innerHTML = `<b><h2>Author: ${doc.get('author')}</h2></b>`;
            document.querySelector('#image').innerHTML = `<b><a href=${doc.get('image')}><h2>Image: ${doc.get('image')}</h2></a></b>`;
            document.querySelector('#link').innerHTML = `<b><a href=${doc.get('link')}><h2>Link: ${doc.get('link')}</h2></a></b>`;
            document.querySelector('#text').innerHTML = `<b><h2>Text: ${doc.get('text')}</h2></b>`;
            console.log(postid);
            try {
              await this.db.collection('subreddits').doc(subid).collection('posts').doc(postid).collection('comments').get().toPromise()
                .then(coll => {
                  if (coll.empty) {
                    console.log('No documents found');
                  } else {
                    coll.forEach(comment => {
                      document.querySelector('#comments').innerHTML +=
                        `<br><p id="comment">${comment.get('text')}</p>
                        <p id="author">By: ${comment.get('author')}</p></br>`;
                      console.log(comment.id);
                    });
                  }
                });
            } catch (err) {
              console.log(err);
            }
          }
        });
      } catch (err) {
        console.log(err);
      }
  }

/*
    this.getComments();
  }
*/

/*
  async; getComments(); {
    try {
      const id = this.route.snapshot.paramMap.get('id');
      const id2 = this.route.snapshot.paramMap.get('id2');
      this.postid = id;
      this.subname = id2;
      // alert("id: " + id + " --- id2: " + id2);
      // alert(id2);
      // var res = url.split('/')
      // var last = res[res.length-1]
      // var pre_last = res[res.length-2]

      await this.db.collection('subreddits').doc(id2).collection('posts').doc(id).collection('comments').get().toPromise()
        .then(coll => {
          if (coll.empty) {
            console.log('No documents found');
          } else {
            coll.forEach(doc => {
              // alert(JSON.stringify(doc.data().text))
              const text = JSON.stringify(doc.data().text);
              const author = JSON.stringify(doc.data().author);
              // let title = JSON.stringify(doc.data().title);

              document.querySelector('#subreddits').innerHTML += `<div  style=" color: inherit; background-color:transparent !important;
              border: 2px dashed white; border-radius: 5px;"> <br><h4 style="color: inherit; background-color:transparent !important;
              padding: 20px;"><a style=" color: inherit; background-color:transparent !important; font-size: 20px; display: block;">
              ${text.replace(/['"]+/g, '')}</a> <a style=" color: inherit; background-color:transparent !important; font-size: 10px;
              position: relative; bottom: -30px;display: block;">Listed by: ${author.replace(/['"]+/g, '')} </a></h4></br></div>`;
              document.querySelector('#subreddits').setAttribute( 'class', 'subposts');
              console.log(doc.data().text);
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }
*/

}
