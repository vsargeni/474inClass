import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Reactive Form
import { ReactiveFormsModule } from '@angular/forms';

// Shared Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Angular & Firebase + Environment
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

//  Custom Components
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { TopicsComponent } from './topics/topics.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    TopicsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
