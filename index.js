// Function to create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

// Function to create employee records from a nested array
function createEmployeeRecords(employeesArray) {
    return employeesArray.map(employeeData => createEmployeeRecord(employeeData));
}

// Helper function to parse date and hour from timestamp
function parseTimestamp(timestamp) {
    const [date, hour] = timestamp.split(' ');
    return { date, hour: parseInt(hour, 10) };
}

// Function to record an employee's clock-in time
function createTimeInEvent(employee, timestamp) {
    const { date, hour } = parseTimestamp(timestamp);
    employee.timeInEvents.push({ type: "TimeIn", hour, date });
    return employee;
}

// Function to record an employee's clock-out time
function createTimeOutEvent(employee, timestamp) {
    const { date, hour } = parseTimestamp(timestamp);
    employee.timeOutEvents.push({ type: "TimeOut", hour, date });
    return employee;
}

// Function to calculate hours worked on a specific date
function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    
    if (timeIn && timeOut) {
        return (timeOut.hour - timeIn.hour) / 100; // Assuming timestamps are in 24-hour format
    }
    
    return 0;
}

// Function to calculate wages earned on a specific date
function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
}

// Function to calculate total wages for an employee
function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
}

// Function to calculate payroll for all employees
function calculatePayroll(employeesArray) {
    return employeesArray.reduce((totalPayroll, employee) => totalPayroll + allWagesFor(employee), 0);
}
