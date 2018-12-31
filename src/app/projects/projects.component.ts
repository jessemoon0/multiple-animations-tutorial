import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnimationEvent } from '@angular/animations';

import { Project } from './project.model';

import { ProjectsService } from './projects.service';

import { markedStateTrigger, itemStateTrigger, slideStateTrigger } from '../animations/animations';
import { routeFadeStateTrigger, routeSlideStateTrigger } from '../animations/route-animations';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [markedStateTrigger, itemStateTrigger, slideStateTrigger, routeFadeStateTrigger, routeSlideStateTrigger]
})
export class ProjectsComponent implements OnInit, OnDestroy {
  // Route Animations: Bind to the component element in the DOM, like a CSS class
  // We attach the trigger
  @HostBinding('@routeFadeState') routeAnimations = true;
  // @HostBinding('@routeSlideState') routeAnimations = true;
  projects: Project[];
  displayedProjects: Project[] = []; // A 2nd array that will hold the data of our animation
  markedPrjIndex = 0;
  progress = 'progressing';
  createNew = false;
  projSubscription: Subscription;

  constructor(private prjService: ProjectsService) { }

  ngOnInit() {
    this.projSubscription = this.prjService.loadProjects()
      .subscribe(
        (prj: Project[]) => {
          this.progress = 'finished';
          this.projects = prj;
          // Animations part
          if (this.projects.length >= 1) {
            this.displayedProjects.push(this.projects[0]);
          }
        }
      );
  }

  onStatusUpdated(newStatus: string, id: number) {
    this.projects[id].status = newStatus;
  }

  onProjectDeleted(index: number) {
    this.projects.splice(index, 1);
  }

  onProjectCreated(project: Project) {
    this.createNew = false;
    // A timeout to give time for slide up before inserting this animation
    // Timeout should be the same time as animation time at least
    setTimeout(() => {
      this.projects.unshift(project);
    }, 350);
  }

  ngOnDestroy() {
    this.projSubscription.unsubscribe();
  }

  onAnimateListItem(event: AnimationEvent, lastProjectID: number) {
    // If another event or animation was fired
    if (event.fromState !== 'void') {
      return;
    }
    // If there are still projects to be added, we check the original array
    if (this.projects.length > lastProjectID + 1) {
      this.displayedProjects.push(this.projects[lastProjectID + 1]);
    } else {
      // Sync both project arrays
      this.projects = this.displayedProjects;
    }
  }

}
