import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {sortCoursesBySeqNo} from '../home/sort-course-by-seq';
import {Course} from '../model/course';
import {setupCourses} from '../common/setup-test-data';




describe('CoursesCardListComponent', () => {

  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;

  beforeEach(async( () => {
    TestBed.configureTestingModule({
      imports: [
        CoursesModule   //we're importing full 'CoursesModule' without defining in 'providers' array as dependency is more like angular material components, etc
      ]
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(CoursesCardListComponent);
      component = fixture.componentInstance;
    });
  }));

  it("should create the component", () => {

    expect(component).toBeTruthy('Component "CoursesCardListComponent" is not created!')

  });


  it("should display the course list", () => {

    pending();

  });


  it("should display the first course", () => {

      pending();

  });


});


