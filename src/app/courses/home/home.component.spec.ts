import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed, waitForAsync} from '@angular/core/testing';
import {CoursesModule} from '../courses.module';
import {DebugElement} from '@angular/core';

import {HomeComponent} from './home.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {CoursesService} from '../services/courses.service';
import {HttpClient} from '@angular/common/http';
import {COURSES} from '../../../../server/db-data';
import {setupCourses} from '../common/setup-test-data';
import {By} from '@angular/platform-browser';
import {of} from 'rxjs';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {click} from '../common/test-utils';




describe('HomeComponent', () => {

  let fixture: ComponentFixture<HomeComponent>;
  let component:HomeComponent;
  let el: DebugElement;
  let coursesService: CoursesService | any;
  const beginnerCourses = setupCourses().filter(course => course.category === 'BEGINNER');
  const advancedCourses = setupCourses().filter(course => course.category === 'ADVANCED');

  beforeEach(waitForAsync( () => { //waitForAsync test utitilty

    const coursesServSpy = jasmine.createSpyObj('CoursesService', ['findAllCourses']);

    TestBed.configureTestingModule({
      imports: [
        CoursesModule,
        NoopAnimationsModule  // imports no operational animations module; it's necessary as component has animation module, but we don't want in testing
      ],
      providers: [
        {provide: CoursesService, useValue: coursesServSpy} // overriding original services by fake spy
      ]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.get(CoursesService);
      });

  }));

  it("should create the component", () => {

    expect(component).toBeTruthy('Home component not created');

  });


  it("should display only beginner courses", () => {

    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1, 'Unexpected number of tabs found!');

  });


  it("should display only advanced courses", () => {

    coursesService.findAllCourses.and.returnValue(of(advancedCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(1, 'Unexpected number of tabs found!');

  });


  it("should display both tabs", () => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    expect(tabs.length).toBe(2, 'Expected is 2 tabs');

  });


  it("should display advanced courses when tab clicked - fakeAsync", fakeAsync(() => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    // el.nativeElement.click();
    click(tabs[1]); // simulating click on the second button (advanced tab)
    fixture.detectChanges();
    flush();

    const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));
    expect(cardTitles.length).toBeGreaterThan(0, 'Could not find titles in advanced tab');
    expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course', 'Course Title is different!');
  }));

  it("should display advanced courses when tab clicked - waitForAsync", waitForAsync(() => {

    coursesService.findAllCourses.and.returnValue(of(setupCourses()));
    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));
    
    click(tabs[1]);
    fixture.detectChanges();
    // to run the assertions when it becomes stable. 'cuz waitForAsync won't allow to get the full control like fakeAsync by using flush or tick
    // Prior to angular 10, waitForAsync was called as async
    // waitForAsync supports actual http call where as fakeAsync doesn't
    fixture.whenStable().then(() => {
      const cardTitles = el.queryAll(By.css('.mat-tab-body-active .mat-card-title'));
      expect(cardTitles.length).toBeGreaterThan(0, 'Could not find titles in advanced tab');
      expect(cardTitles[0].nativeElement.textContent).toContain('Angular Security Course', 'Course Title is different!');
    });

  }));

});


