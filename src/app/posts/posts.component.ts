
import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
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

//abaldwin
  constructor(private route: ActivatedRoute, public db: AngularFirestore) {  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.subid = params.get('subid');
    });
    this.getPosts(this.subid);
//=======
  public subname: any;
  public authService: AuthService;

  constructor(private route: ActivatedRoute, public db: AngularFirestore) { }

  ngOnInit() {
    this.getTopics();

  }

  onSubmit() {
  
    var posttitle= $("#posttitle").val();
    var posttext= $("#posttext").val();
    
    let id = this.route.snapshot.paramMap.get('id');
   


    this.db.collection("subreddits").doc(id).collection("posts").doc(posttitle).set({
      author: JSON.parse(localStorage.getItem('user')).displayName,
      text: posttext,
      title : posttitle
    })
      .then(function () {
        console.log("Document successfully written!");
        document.location.reload(true);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  async getTopics() {
    try {
      let id = this.route.snapshot.paramMap.get('id');
      this.subname = id;


  

      await this.db.collection('subreddits').doc(id).collection('posts').get().toPromise()
        .then(coll => {
          if (coll.empty) {
            console.log('No documents found');
          } else {
            coll.forEach(doc => {
              // alert(JSON.stringify(doc.data().text))
              let text = JSON.stringify(doc.data().text);
              let author = JSON.stringify(doc.data().author);
              let title = JSON.stringify(doc.data().title);
              let docid = doc.id.replace(/ +/g, "")
            

              document.querySelector('#subreddits').innerHTML += `<div  style="border: 2px dashed white; border-radius: 5px;"> <br><h4 style="padding: 20px;"><a href=/comments/${docid}/${this.subname} style=" font-size: 50px; position: relative; display: block; top: -30px;">${title.replace(/['"]+/g, '')}</a> <a style=" color: inherit; background-color:transparent !important; font-size: 20px; display: block;">${text.replace(/['"]+/g, '')}</a> <a style=" color: inherit; background-color:transparent !important; font-size: 10px; position: relative; bottom: -30px;display: block;">Listed by: ${author.replace(/['"]+/g, '')} </a></h4></br></div>`;
              document.querySelector('#subreddits').setAttribute( 'class', 'subposts');
              console.log(doc.id);
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
//master
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
  }
}


