import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"

import { CoursesService } from "./courses.service";
import { COURSES } from "../../../../server/db-data";


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
      httpTestingController.verify(); //to verify only intented req is going, not other
  });

  it('should find a course by ID', () => {
    coursesService.findCourseById(12)
      .subscribe(course => {

        expect(course).toBeTruthy('No course with ID 12');

        expect(course).toBe(12, 'Course ID is not 12');

      });

      const req = httpTestingController.expectOne('api/courses/12');
      expect(req.request.method).toEqual('GET', 'findAllCourses is not GET method');
      req.flush(COURSES[12]);
      httpTestingController.verify();
  });

});