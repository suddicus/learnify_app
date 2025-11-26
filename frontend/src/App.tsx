import { Routes, Route, useParams } from 'react-router-dom'
import LessonPage from './pages/LessonPage'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import { DarkModeProvider } from './context/DarkModeContext'
import { CourseDetails } from './pages/CourseDetails'
import { Home } from './pages/Home'
import courses from './dummydata/courses'
import lessons from './dummydata/lessons'
import type { Course } from './types/course'
import type { Lesson } from './types/lesson'
import { NotFound } from './components/NotFound'

// Wrapper components to handle routing logic
const CourseDetailsWrapper: React.FC<{ courses: Course[]; lessons: Lesson[] }> = ({ courses, lessons }) => {
  const { id } = useParams<{ id: string }>()

  if (!id){
    return <NotFound
      message="The course you are looking for doesn't exist or has been removed."
      redirectTo="/"
      redirectText="Browse all courses"
    />
  }
  const courseId = Number(id)

  if(isNaN(courseId) || (courseId >= courses.length)){
    return <NotFound
    message="The course you are looking for doesn't exist or has been removed."
    redirectTo="/"
    redirectText="Browse all courses"
  />
  }
  const course = courses[courseId - 1]

  // The lessons get filtered here
  const courseLessons = lessons.filter(lesson => lesson.courseId === courseId)

  return <CourseDetails course={course} lessons={courseLessons} />
}

const LessonPageWrapper: React.FC<{ lessons: Lesson[] }> = ({ lessons }) => {
  const { id } = useParams<{ id: string }>()

  if (!id){
    return <NotFound
      message="The lesson you are looking for doesn't exist or has been removed."
      redirectTo="/"
      redirectText="Browse all courses"
    />
  }
  const lessonId = Number(id)

  if(isNaN(lessonId) || (lessonId >= lessons.length)){
    return <NotFound
    message="The lesson you are looking for doesn't exist or has been removed."
    redirectTo="/"
    redirectText="Browse all courses"
  />
  }

  const lesson = lessons[lessonId - 1]
  return <LessonPage lesson={lesson} />
}

export default function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main className="container mx-auto px-4 py-6 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/courses/:id"
              element={<CourseDetailsWrapper courses={courses} lessons={lessons} />}
            />

            <Route
              path="/lessons/:id"
              element={<LessonPageWrapper lessons={lessons} />}
            />

            <Route
              path="*"
              element={
                <NotFound />
              }
            />
        </Routes>
      </main>
      <Footer />
    </div>
    </DarkModeProvider >
  )
}