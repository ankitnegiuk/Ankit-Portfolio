import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // default -> about
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', redirectTo: 'home' } // wildcard -> about
];
