"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const readlineSync = __importStar(require("readline-sync"));
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "Active";
    StudentStatus["Academic_Leave"] = "Academic_Leave";
    StudentStatus["Graduated"] = "Graduated";
    StudentStatus["Expelled"] = "Expelled";
})(StudentStatus || (StudentStatus = {}));
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "Mandatory";
    CourseType["Optional"] = "Optional";
    CourseType["Special"] = "Special";
})(CourseType || (CourseType = {}));
var Semester;
(function (Semester) {
    Semester["First"] = "First";
    Semester["Second"] = "Second";
})(Semester || (Semester = {}));
var GradeValue;
(function (GradeValue) {
    GradeValue[GradeValue["Excellent"] = 5] = "Excellent";
    GradeValue[GradeValue["Good"] = 4] = "Good";
    GradeValue[GradeValue["Satisfactory"] = 3] = "Satisfactory";
    GradeValue[GradeValue["Unsatisfactory"] = 2] = "Unsatisfactory";
})(GradeValue || (GradeValue = {}));
var Faculty;
(function (Faculty) {
    Faculty["Computer_Science"] = "Computer_Science";
    Faculty["Economics"] = "Economics";
    Faculty["Law"] = "Law";
    Faculty["Engineering"] = "Engineering";
})(Faculty || (Faculty = {}));
class UniversityManagementSystem {
    constructor() {
        this.students = [];
        this.courses = [];
        this.grades = [];
        this.studentIdCounter = 1;
        this.courseIdCounter = 1;
    }
    enrollStudent(student) {
        const newStudent = Object.assign({ id: this.studentIdCounter++ }, student);
        this.students.push(newStudent);
        return newStudent;
    }
    registerForCourse(studentId, courseId) {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        if (!student || !course)
            throw new Error("Недійсний ідентифікатор студента або курсу.");
        if (student.faculty !== course.faculty)
            throw new Error("Студент не може зареєструватися на курс на іншому факультеті.");
        if (this.grades.filter(g => g.courseId === courseId).length >= course.maxStudents) {
            throw new Error("Курс заповнений.");
        }
        this.grades.push({ studentId, courseId, grade: GradeValue.Satisfactory, date: new Date(), semester: course.semester });
    }
    setGrade(studentId, courseId, grade) {
        const gradeEntry = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);
        if (!gradeEntry)
            throw new Error("Студент не зареєстрований за цим курсом.");
        gradeEntry.grade = grade;
        gradeEntry.date = new Date();
    }
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find(s => s.id === studentId);
        if (!student)
            throw new Error("Студент не знайден.");
        student.status = newStatus;
    }
    getStudentsByFaculty(faculty) {
        return this.students.filter(s => s.faculty === faculty);
    }
    getStudentGrades(studentId) {
        return this.grades.filter(g => g.studentId === studentId);
    }
    getAvailableCourses(faculty, semester) {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }
    calculateAverageGrade(studentId) {
        const grades = this.getStudentGrades(studentId).map(g => g.grade);
        if (grades.length === 0)
            return 0;
        return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    }
    getTopStudentsByFaculty(faculty) {
        return this.getStudentsByFaculty(faculty).filter(student => {
            const avgGrade = this.calculateAverageGrade(student.id);
            return avgGrade >= GradeValue.Excellent;
        });
    }
    findStudentById(id) {
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
const programmingCourse = {
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
                faculty: Object.values(Faculty)[faculty],
                year,
                status: StudentStatus.Active,
                enrollmentDate: new Date(),
                groupNumber
            });
            console.log("Студент доданий!");
            break;
        case 3:
            const facultyChoice = readlineSync.keyInSelect(Object.values(Faculty), "Факультет:");
            const students = ums.getStudentsByFaculty(Object.values(Faculty)[facultyChoice]);
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
            const topStudents = ums.getTopStudentsByFaculty(Object.values(Faculty)[topFaculty]);
            console.log("Топ студенти:", JSON.stringify(topStudents, null, 2));
            break;
        case 7:
            console.log("Вихід...");
            process.exit();
        default:
            console.log("Невірний вибір!");
    }
}
