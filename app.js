const fs = require('fs');

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


