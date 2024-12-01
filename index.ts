import * as readlineSync from 'readline-sync';

enum StudentStatus {
    Active = "Active",
    Academic_Leave = "Academic_Leave",
    Graduated = "Graduated",
    Expelled = "Expelled"
}

enum CourseType {
    Mandatory = "Mandatory",
    Optional = "Optional",
    Special = "Special"
}

enum Semester {
    First = "First",
    Second = "Second"
}

enum GradeValue {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}

enum Faculty {
    Computer_Science = "Computer_Science",
    Economics = "Economics",
    Law = "Law",
    Engineering = "Engineering"
}

interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

interface Grade {
    studentId: number;
    courseId: number;
    grade: GradeValue;
    date: Date;
    semester: Semester;
}

class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: Grade[] = [];
    private studentIdCounter: number = 1;
    private courseIdCounter: number = 1;

    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = { id: this.studentIdCounter++, ...student };
        this.students.push(newStudent);
        return newStudent;
    }

    registerForCourse(studentId: number, courseId: number): void {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);

        if (!student || !course) throw new Error("Недійсний ідентифікатор студента або курсу.");
        if (student.faculty !== course.faculty) throw new Error("Студент не може зареєструватися на курс на іншому факультеті.");
        if (this.grades.filter(g => g.courseId === courseId).length >= course.maxStudents) {
            throw new Error("Курс заповнений.");
        }

        this.grades.push({ studentId, courseId, grade: GradeValue.Satisfactory, date: new Date(), semester: course.semester });
    }

    setGrade(studentId: number, courseId: number, grade: GradeValue): void {
        const gradeEntry = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);

        if (!gradeEntry) throw new Error("Студент не зареєстрований за цим курсом.");
        gradeEntry.grade = grade;
        gradeEntry.date = new Date();
    }

    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);
        if (!student) throw new Error("Студент не знайден.");
        student.status = newStatus;
    }

    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    getStudentGrades(studentId: number): Grade[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    calculateAverageGrade(studentId: number): number {
        const grades = this.getStudentGrades(studentId).map(g => g.grade);
        if (grades.length === 0) return 0;
        return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    }

    getTopStudentsByFaculty(faculty: Faculty): Student[] {
        return this.getStudentsByFaculty(faculty).filter(student => {
            const avgGrade = this.calculateAverageGrade(student.id);
            return avgGrade >= GradeValue.Excellent;
        });
    }

    findStudentById(id: number): Student | undefined {
        return this.students.find(student => student.id === id);
    }
}

// Создаем экземпляр класса UniversityManagementSystem
const ums = new UniversityManagementSystem();

// Добавляем тестовых студентов
ums.enrollStudent({
    fullName: "Vlad Bero",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "PD-41"
});

ums.enrollStudent({
    fullName: "Blad Vero",
    faculty: Faculty.Computer_Science,
    year: 2,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "PD-42"
});

// Добавляем курс
const programmingCourse: Course = {
    id: ums["courseIdCounter"]++,
    name: "Programming 101",
    type: CourseType.Mandatory,
    credits: 5,
    semester: Semester.First,
    faculty: Faculty.Computer_Science,
    maxStudents: 30
};
ums["courses"].push(programmingCourse);

// Регистрируем студентов на курс и выставляем оценки
ums.registerForCourse(1, programmingCourse.id);
ums.setGrade(1, programmingCourse.id, GradeValue.Excellent);

ums.registerForCourse(2, programmingCourse.id);
ums.setGrade(2, programmingCourse.id, GradeValue.Good);

// Основное меню программы
while (true) {
    console.log(`
Оберіть дію:
1. Знайти студента за ID
2. Додати нового студента
3. Отримати студентів за факультетом
4. Отримати оцінки студента
5. Порахувати середній бал студента
6. Показати топ студентів за факультетом
7. Вихід
`);
    const choice = readlineSync.questionInt("Ваш вибір: ");
    switch (choice) {
        case 1:
            const studentId = readlineSync.questionInt("Введіть ID студента: ");
            const student = ums.findStudentById(studentId);
            console.log(student ? `Студент знайдений: ${JSON.stringify(student, null, 2)}` : "Студента не знайдено.");
            break;
        case 2:
            const fullName = readlineSync.question("Ім'я студента: ");
            const faculty = readlineSync.keyInSelect(Object.values(Faculty), "Факультет:");
            const year = readlineSync.questionInt("Курс: ");
            const groupNumber = readlineSync.question("Номер групи: ");
            ums.enrollStudent({
                fullName,
                faculty: Object.values(Faculty)[faculty] as Faculty,
                year,
                status: StudentStatus.Active,
                enrollmentDate: new Date(),
                groupNumber
            });
            console.log("Студент доданий!");
            break;
        case 3:
            const facultyChoice = readlineSync.keyInSelect(Object.values(Faculty), "Факультет:");
            const students = ums.getStudentsByFaculty(Object.values(Faculty)[facultyChoice] as Faculty);
            console.log("Студенти:", JSON.stringify(students, null, 2));
            break;
        case 4:
            const gradeStudentId = readlineSync.questionInt("Введіть ID студента: ");
            const grades = ums.getStudentGrades(gradeStudentId);
            console.log("Оцінки студента:", JSON.stringify(grades, null, 2));
            break;
        case 5:
            const avgStudentId = readlineSync.questionInt("Введіть ID студента: ");
            const average = ums.calculateAverageGrade(avgStudentId);
            console.log(`Середній бал: ${average}`);
            break;
        case 6:
            const topFaculty = readlineSync.keyInSelect(Object.values(Faculty), "Факультет:");
            const topStudents = ums.getTopStudentsByFaculty(Object.values(Faculty)[topFaculty] as Faculty);
            console.log("Топ студенти:", JSON.stringify(topStudents, null, 2));
            break;
        case 7:
            console.log("Вихід...");
            process.exit();
        default:
            console.log("Невірний вибір!");
    }
}