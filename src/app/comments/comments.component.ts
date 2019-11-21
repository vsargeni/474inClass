import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as $ from 'jquery';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public subname: any;
  public postid: any;

  constructor(private route: ActivatedRoute, public db: AngularFirestore) { }

  ngOnInit() {
    this.getComments();
  }

  onSubmit() {
  
    var commentText= $("#commentText").val();
    
    let id = this.route.snapshot.paramMap.get('id');
    let id2 = this.route.snapshot.paramMap.get('id2');
   


    this.db.collection('subreddits').doc(id2).collection('posts').doc(id).collection("comments").doc(commentText).set({
      author: JSON.parse(localStorage.getItem('user')).displayName,
      text: commentText,
    })
      .then(function () {
        console.log("Document successfully written!");
        document.location.reload(true);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  async getComments() {
    try {
      let id = this.route.snapshot.paramMap.get('id');
      let id2 = this.route.snapshot.paramMap.get('id2');
      this.postid = id;
      this.subname = id2;
      // alert("id: " + id + " --- id2: " + id2);
      // alert(id2);
      // var res = url.split('/')
      // var last = res[res.length-1]
      // var pre_last = res[res.length-2]

    

      await this.db.collection('subreddits').doc(id2).collection('posts').doc(id).collection("comments").get().toPromise()
        .then(coll => {
          if (coll.empty) {
            console.log('No documents found');
          } else {
            coll.forEach(doc => {
              // alert(JSON.stringify(doc.data().text))
              let text = JSON.stringify(doc.data().text);
              let author = JSON.stringify(doc.data().author);
              // let title = JSON.stringify(doc.data().title);

              document.querySelector('#subreddits').innerHTML += `<div  style="border: 2px dashed white; border-radius: 5px;"> <br><h4 style="padding: 20px;"><a style="font-size: 20px; display: block;">${text.replace(/['"]+/g, '')}</a> <a style="font-size: 10px; position: relative; bottom: -30px;display: block;">Listed by: ${author.replace(/['"]+/g, '')} </a></h4></br></div>`;
              document.querySelector('#subreddits').setAttribute( 'class', 'subposts');
              console.log(doc.data().text);
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

}