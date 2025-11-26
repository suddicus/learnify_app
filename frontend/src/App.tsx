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

// Wrapper components to handle routing logic
const CourseDetailsWrapper: React.FC<{ courses: Course[]; lessons: Lesson[] }> = ({ courses, lessons }) => {
  const { id } = useParams<{ id: string }>()
  // if(Number(id) > courses.length){
  //   alert("Sorry, this course does not exist")
  // }
  const courseId = id ? Number(id) : 0
  const course = courses[courseId - 1] || courses[0]

  // The lessons get filtered here
  const courseLessons = lessons.filter(lesson => lesson.courseId === courseId)

  return <CourseDetails course={course} lessons={courseLessons} />
}

const LessonPageWrapper: React.FC<{ lessons: Lesson[] }> = ({ lessons }) => {
  const { id } = useParams<{ id: string }>()
  const lessonId = id ? Number(id) : 0
  const lesson = lessons[lessonId - 1] || lessons[0]
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
        </Routes>
      </main>
      <Footer />
    </div>
    </DarkModeProvider >
  )
}