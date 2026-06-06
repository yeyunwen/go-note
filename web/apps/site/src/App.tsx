import { Navigate, Route, Routes } from 'react-router-dom';
import lessonsData from '../../../content/lessons.json';
import { Layout } from './components/Layout.tsx';
import { LessonPage } from './pages/LessonPage.tsx';
import type { LessonsData } from './types.ts';

const { lessons } = lessonsData as LessonsData;
const firstLessonId = lessons.find((l) => l.status === 'ready')?.id ?? lessons[0].id;

export default function App() {
  return (
    <Routes>
      <Route element={<Layout lessons={lessons} />}>
        <Route index element={<Navigate to={`/lesson/${firstLessonId}`} replace />} />
        <Route path="/lesson/:id" element={<LessonPage lessons={lessons} />} />
      </Route>
    </Routes>
  );
}
