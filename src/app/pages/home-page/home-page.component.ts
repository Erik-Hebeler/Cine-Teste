import { Component } from '@angular/core';
import { LeftBarComponent } from '../../components/left-bar/left-bar.component';
import { BodyContentComponent } from '../../components/body-content/body-content.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [LeftBarComponent, BodyContentComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {}
