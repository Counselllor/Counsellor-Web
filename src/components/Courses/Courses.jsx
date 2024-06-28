import React from 'react';
import coursesData from './courses.json';

const Courses = () => {
  return (
    <div className="py-20 bg-blue-200 font-poppins">
      <h1 className="text-center mb-12 text-6xl text-blue-900">Available Courses</h1>
      <div className="flex flex-wrap gap-12 justify-center">
        {coursesData.map((course) => (
          <div
            className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-[28rem] transition-transform transform hover:-translate-y-2 cursor-pointer"
            key={course.id}
          >
            <img
              src={course.imageURL}
              alt={course.title}
              className="w-full h-70 object-cover"
            />
            <div className="p-8">
              <h2 className="text-3xl mb-4 text-blue-900">{course.title}</h2>
              <p className="text-xl text-gray-700 mb-6">{course.description}</p>
              <p className="text-xl text-gray-800 mb-3">
                <strong>Instructor:</strong> {course.instructor}
              </p>
              <p className="text-xl text-gray-800 mb-3">
                <strong>Duration:</strong> {course.duration}
              </p>
              <p className="text-xl font-bold text-green-600">
                <strong>Price:</strong> {course.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;