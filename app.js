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
    console.log('Student Information:');
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



function main() {
    data = loadData();
}

main();
