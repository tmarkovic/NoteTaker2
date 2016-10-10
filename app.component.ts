import { Component } from '@angular/core';

@Component({
    selector: 'note-taker',
    template: `
    <navigation></navigation>
        <router-outlet></router-outlet>
          <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <p>
          <strong>NoteTaker</strong> by <a href="#">Some asshole</a>  with stuff I found on the internet. 
        </p>
      </div>
    </div>
  </footer>
        `
})
export class AppComponent { }
