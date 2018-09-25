import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe-shopper';
  loadedFeature = 'recipe';

  onFeatureNavigation(feature: string) {
  	this.loadedFeature = feature;
  }
}
