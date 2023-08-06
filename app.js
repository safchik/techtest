const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let data

function loadData() {
    const jsonData = fs.readFileSync('./Data/Students/students.json', 'utf8');
    return JSON.parse(jsonData);
}

function searchStudent(studentName) {
    return data.students.find(student => student.name.toLowerCase() === studentName.toLowerCase());
}

function displayStudentInfo(student) {
    console.log("Student Information:");
    console.log(`Name: ${student.name}`);
    console.log(`University: ${student.university}`);
    console.log(`Major: ${student.major}`);
    console.log(`Student ID: ${student.student_id}`);
    console.log("Grades:");
    student.grades.subjects.forEach(subject => {
        console.log(`  ${subject.name}: ${subject.score}`);
    });
    console.log("Attendance:");
    student.attendance.subjects.forEach(subject => {
        console.log(`  ${subject.name}: ${subject.score}`);
    });
}

function updateStudentInfo(student) {
    rl.question("Enter new attendance (comma-separated name:score pairs): ", newAttendanceInput => {
        const newAttendancePairs = newAttendanceInput.split(',');
        const newAttendance = newAttendancePairs.map(pair => {
            const [name, score] = pair.split(':');
            return { name, score: parseInt(score) };
        });
        student.attendance.subjects = newAttendance;

        rl.question("Enter new grades (comma-separated name:score pairs): ", newGradesInput => {
            const newGradesPairs = newGradesInput.split(',');
            const newGrades = newGradesPairs.map(pair => {
                const [name, score] = pair.split(':');
                return { name, score: parseInt(score) };
            });
            student.grades.subjects = newGrades;

            console.log("Student information updated.");
            rl.close();
        });
    });
}

function searchMultipleStudents(studentNames) {
    return studentNames.map(studentName => searchStudent(studentName)).filter(student => student !== undefined);
}

function findHighestLowestPerformers() {
    let highestPerformer = data.students[0];
    let lowestPerformer = data.students[0];

    data.students.forEach(student => {
        const avgGrade = calculateAverageGrade(student.grades.subjects);
        const avgAttendance = calculateAverageAttendance(student.attendance.subjects);

        if (avgGrade > calculateAverageGrade(highestPerformer.grades.subjects)) {
            highestPerformer = student;
        }

        if (avgGrade < calculateAverageGrade(lowestPerformer.grades.subjects)) {
            lowestPerformer = student;
        }
    });

    return { highestPerformer, lowestPerformer };
}

function calculateAverageGrade(subjects) {
    const totalScore = subjects.reduce((sum, subject) => sum + subject.score, 0);
    return totalScore / subjects.length;
}

function calculateAverageAttendance(subjects) {
    const totalScore = subjects.reduce((sum, subject) => sum + subject.score, 0);
    return totalScore / subjects.length;
}

function main() {
    data = loadData();

    rl.question("\nUniversity Management System\n1. Search for a student\n2. Search for multiple students\n3. Find highest and lowest performers\n4. Exit\nEnter your choice: ", choice => {
        switch (choice) {
            case '1':
                rl.question("Enter student name: ", studentName => {
                    const student = searchStudent(studentName);
                    if (student) {
                        displayStudentInfo(student);
                        rl.question("Do you want to update this student's information? (yes/no): ", updateChoice => {
                            if (updateChoice.toLowerCase() === 'yes') {
                                updateStudentInfo(student);
                            } else {
                                rl.close();
                            }
                        });
                    } else {
                        console.log("Student not found.");
                        rl.close();
                    }
                });
                break;

            case '2':
                rl.question("Enter student names (comma-separated): ", studentNamesInput => {
                    const studentNames = studentNamesInput.split(',');
                    const students = searchMultipleStudents(studentNames);
                    students.forEach(student => displayStudentInfo(student));
                    rl.close();
                });
                break;

            case '3':
                const { highestPerformer, lowestPerformer } = findHighestLowestPerformers();
                console.log("Highest Performer:");
                displayStudentInfo(highestPerformer);
                console.log("\nLowest Performer:");
                displayStudentInfo(lowestPerformer);
                rl.close();
                break;

            case '4':
                console.log("Exiting...");
                rl.close();
                break;

            default:
                console.log("Invalid choice. Please try again.");
                rl.close();
                break;
        }
    });
}

main();
