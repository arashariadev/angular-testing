import {async, ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed} from '@angular/core/testing';
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

  beforeEach(async( () => { //async test utitilty

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
      });

  }));

  it("should create the component", () => {

    expect(component).toBeTruthy();

  });


  it("should display only beginner courses", () => {

    pending();

  });


  it("should display only advanced courses", () => {

      pending();

  });


  it("should display both tabs", () => {

    pending();

  });


  it("should display advanced courses when tab clicked", () => {

    pending();

  });

});


