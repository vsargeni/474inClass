import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  public subname: any;
  public postname: any;

  constructor(private route: ActivatedRoute, public db: AngularFirestore) { }

  ngOnInit() {
    this.getComments();
  }

  async getComments() {
    try {
      let id = this.route.snapshot.paramMap.get('id');
      let id2 = this.route.snapshot.paramMap.get('id2');
      this.subname = id;
      this.postname = id2;
      // alert(id);
      // alert(id2);
      // var res = url.split('/')
      // var last = res[res.length-1]
      // var pre_last = res[res.length-2]


      await this.db.collection('subreddits/' + id + '/' + id2).get().toPromise()
        .then(coll => {
          if (coll.empty) {
            console.log('No documents found');
          } else {
            coll.forEach(doc => {
              // alert(JSON.stringify(doc.data().text))
              let text = JSON.stringify(doc.data().text);
              let author = JSON.stringify(doc.data().author);
              let title = JSON.stringify(doc.data().title);

              document.querySelector('#subreddits').innerHTML += `<div  style="border: 2px dashed white; border-radius: 5px;"> <br><h4 style="padding: 20px;"><a href=/comments/${doc.id}/ style="font-size: 50px; position: relative; display: block; top: -30px;">${title.replace(/['"]+/g, '')}</a> <a style="font-size: 20px; display: block;">${text.replace(/['"]+/g, '')}</a> <a style="font-size: 10px; position: relative; bottom: -30px;display: block;">Listed by: ${author.replace(/['"]+/g, '')} </a></h4></br></div>`;
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