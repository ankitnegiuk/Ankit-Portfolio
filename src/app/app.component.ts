import { Component } from '@angular/core';
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from "./experience/experience.component";
import { ProjectsComponent } from "./projects/projects.component";
import { ContactComponent } from "./contact/contact.component";

@Component({
  selector: 'app-root',
  imports: [HomeComponent, AboutComponent, ExperienceComponent, ProjectsComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // fixed from styleUrl
})
export class AppComponent {
  title = 'ankit portfolio';
}
