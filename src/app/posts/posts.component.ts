import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';
import { AuthService } from '../shared/services/auth.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

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

              document.querySelector('#subreddits').innerHTML += `<div  style="border: 2px dashed white; border-radius: 5px;"> <br><h4 style="padding: 20px;"><a href=/comments/${doc.id}/${this.subname} style="font-size: 50px; position: relative; display: block; top: -30px;">${title.replace(/['"]+/g, '')}</a> <a style="font-size: 20px; display: block;">${text.replace(/['"]+/g, '')}</a> <a style="font-size: 10px; position: relative; bottom: -30px;display: block;">Listed by: ${author.replace(/['"]+/g, '')} </a></h4></br></div>`;
              document.querySelector('#subreddits').setAttribute( 'class', 'subposts');
              console.log(doc.id);
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

}


