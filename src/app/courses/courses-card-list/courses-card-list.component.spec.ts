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
  let el: DebugElement;

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
      el = fixture.debugElement;
    });
  }));

  it("should create the component", () => {

    expect(component).toBeTruthy('Component "CoursesCardListComponent" is not created!')

  });


  it("should display the course list", () => {

    component.courses = setupCourses();
    // console.log(el.nativeElement.outerHTML); // to debug in test
    fixture.detectChanges(); // to modify the data after receiving 

    const cards = el.queryAll(By.css('.course-card'));
    expect(cards).toBeTruthy('Unable to find the cards with class name "course-card"');
    expect(cards.length).toEqual(12, 'Unexpected number of cards'); // total number of courses in test data file

  });


  it("should display the first course", () => {

      pending();

  });


});


