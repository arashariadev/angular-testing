import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { HttpErrorResponse } from "@angular/common/http";

import { CoursesService } from "./courses.service";
import { COURSES, findLessonsForCourse } from "../../../../server/db-data";
import { Course } from "../model/course";


describe('coursesService', () => {
  let coursesService: CoursesService,
      httpTestingController: HttpTestingController // for http test data

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CoursesService
      ]
    });

    coursesService = TestBed.get(CoursesService);
    httpTestingController = TestBed.get(HttpTestingController);

  });

  it('should retrieve all courses', () => {
    coursesService.findAllCourses()
      .subscribe(courses => {

        expect(courses).toBeTruthy('No courses returned');

        expect(courses.length).toBe(12, 'Incorrect number of courses');

        const course = courses.find(course => course.id == 12);
        expect(course.titles.description).toBe('Angular Testing Course', 'Course Title is not same');
        
      });

      const req = httpTestingController.expectOne('/api/courses');
      expect(req.request.method).toEqual('GET', 'findAllCourses is not GET method');
      req.flush({payload: Object.values(COURSES)});
      
  });

  it('should find a course by ID', () => {
    coursesService.findCourseById(12)
      .subscribe(course => {

        expect(course).toBeTruthy('No course with ID 12');

        expect(course.id).toBe(12, 'Course ID is not 12');

      });

      const req = httpTestingController.expectOne('/api/courses/12');
      expect(req.request.method).toEqual('GET', 'findAllCourses is not GET method');
      req.flush(COURSES[12]);

  });

  it('should save the course data', () => {

    const changes: Partial<Course> = {titles: {description: 'Testing course is this'}};

    coursesService.saveCourse(12, changes)
      .subscribe(course => {

        expect(course.id).toBe(12);
      
      });

      const req = httpTestingController.expectOne('/api/courses/12');
      expect(req.request.method).toEqual('PUT', 'findAllCourses is not PUT method');
      expect(req.request.body.titles.description).toEqual(changes.titles.description);
      req.flush({
        ...COURSES[12],
        ...changes
      });
  });

  it('should give an "error", if save course fails', () => {

    const changes: Partial<Course> = {titles: {description: 'Testing course is this'}};

    coursesService.saveCourse(12, changes)
      .subscribe( () => fail('The save course operation has failed!'),
      (error: HttpErrorResponse) => {
        expect(error.status).toBe(500, 'Error status code is not 500');
      }
      );

      const req = httpTestingController.expectOne('/api/courses/12');
      expect(req.request.method).toEqual('PUT');
      req.flush('Save course failed', {status: 500, statusText: 'Internal Server Error'});

  });

  it('should give list of all lessons', () => {

    coursesService.findLessons(12)
      .subscribe(lessons => {

        expect(lessons).toBeTruthy();
        expect(lessons.length).toBe(3, 'length is not 3');

      });

    const req = httpTestingController.expectOne(req => req.url == '/api/lessons'); //as it has more complex url like query parms etc
    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('courseId')).toEqual('12');
    expect(req.request.params.get('filter')).toEqual('');
    expect(req.request.params.get('sortOrder')).toEqual('asc');
    expect(req.request.params.get('pageNumber')).toEqual('0');
    expect(req.request.params.get('pageSize')).toEqual('3', 'page size is 3');

    req.flush({
      payload: findLessonsForCourse(12).slice(0, 3)
    })

  });

  afterEach(() => {

    httpTestingController.verify(); //to verify only intented req is going, not other

  });

});