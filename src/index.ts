type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

type Professor = {
    id: number;
    name: string;
    department: string;
};

type Classroom = {
    number: string;
    capacity: number;
    hasProjector: boolean;
};

type Course = {
    id: number;
    name: string;
    type: CourseType;
};

type Lesson = {
    courseId: number;
    professorId: number;
    classroomNumber: string;
    dayOfWeek: DayOfWeek;
    timeSlot: TimeSlot;
};

let professors: Professor[] = [];
let classrooms: Classroom[] = [];
let courses: Course[] = [];
let schedule: Lesson[] = [];

function addProfessor(professor: Professor): void {
    professors.push(professor);
}

function addLesson(lesson: Lesson): boolean {
    for (const existingLesson of schedule) {
        if (
            existingLesson.classroomNumber === lesson.classroomNumber &&
            existingLesson.dayOfWeek === lesson.dayOfWeek &&
            existingLesson.timeSlot === lesson.timeSlot
        ) {
            return false;
        }
    }
    schedule.push(lesson);
    return true;
}

function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.dayOfWeek === dayOfWeek && lesson.timeSlot === timeSlot)
        .map(lesson => lesson.classroomNumber);
    
    return classrooms
        .filter(classroom => !occupiedClassrooms.includes(classroom.number))
        .map(classroom => classroom.number);
}

function getProfessorSchedule(professorId: number): Lesson[] {
    return schedule.filter(lesson => lesson.professorId === professorId);
}

type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};

function validateLesson(lesson: Lesson): ScheduleConflict | null {
    for (const existingLesson of schedule) {
        if (existingLesson.dayOfWeek === lesson.dayOfWeek && existingLesson.timeSlot === lesson.timeSlot) {
            if (existingLesson.professorId === lesson.professorId) {
                return {
                    type: "ProfessorConflict",
                    lessonDetails: existingLesson
                };
            }

            if (existingLesson.classroomNumber === lesson.classroomNumber) {
                return {
                    type: "ClassroomConflict",
                    lessonDetails: existingLesson
                };
            }
        }
    }

    return null;
}

function getClassroomUtilization(classroomNumber: string): number {
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timeSlots = ["8:30-10:00", "10:15-11:45", "12:15-13:45", "14:00-15:30", "15:45-17:15"];
    const totalPossibleLessons = daysOfWeek.length * timeSlots.length;

    const actualLessonsInClassroom = schedule.filter(lesson => lesson.classroomNumber === classroomNumber).length;

    return (actualLessonsInClassroom / totalPossibleLessons) * 100;
}

function getMostPopularCourseType(): CourseType {
    const courseTypeCount: { [key in CourseType]?: number } = {};

    for (const lesson of schedule) {
        const course = courses.find(course => course.id === lesson.courseId);
        if (course) {
            courseTypeCount[course.type] = (courseTypeCount[course.type] || 0) + 1;
        }
    }

    let mostPopularType: CourseType | null = null;
    let maxCount = 0;
    for (const courseType in courseTypeCount) {
        if (courseTypeCount[courseType as CourseType]! > maxCount) {
            maxCount = courseTypeCount[courseType as CourseType]!;
            mostPopularType = courseType as CourseType;
        }
    }

    return mostPopularType!;
}

function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
    const lesson = schedule.find(lesson => lesson.courseId === lessonId);

    if (!lesson) {
        return false;
    }

    const conflict = schedule.some(existingLesson =>
        existingLesson.classroomNumber === newClassroomNumber &&
        existingLesson.dayOfWeek === lesson.dayOfWeek &&
        existingLesson.timeSlot === lesson.timeSlot
    );

    if (conflict) {
        return false;
    }
    lesson.classroomNumber = newClassroomNumber;
    return true;
}

function cancelLesson(lessonId: number): void {
    const lessonIndex = schedule.findIndex(lesson => lesson.courseId === lessonId);

    if (lessonIndex !== -1) {
        schedule.splice(lessonIndex, 1);
    }
}