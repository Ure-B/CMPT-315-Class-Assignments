// This function takes a list of employees and returns a filtered, sorted list by specific criteria.
function getTopPerformers(employees, criteria) {
    return employees.filter(({department, salary, yearsOfExperience, performanceRating}) => 
        department === criteria.department &&
        salary < criteria.maxSalary &&
        yearsOfExperience >= criteria.minExperience &&
        performanceRating >= criteria.minPerformance
    ).sort((a, b) => 
        b.performanceRating - a.performanceRating || a.salary - b.salary
    );
}

// This is the main testing function
function main() {
    const employees = [
        { id: 1, name: "Alice", department: "Sales", salary: 65000, yearsOfExperience: 5, performanceRating: 85 },
        { id: 2, name: "Bob", department: "Sales", salary: 50000, yearsOfExperience: 4, performanceRating: 90 },
        { id: 3, name: "Charlie", department: "HR", salary: 60000, yearsOfExperience: 6, performanceRating: 88 },
        { id: 4, name: "David", department: "Sales", salary: 70000, yearsOfExperience: 5, performanceRating: 95 },
        { id: 5, name: "Eve", department: "Sales", salary: 55000, yearsOfExperience: 3, performanceRating: 90 }
    ];

    const criteria = {
        department: "Sales", minPerformance: 80, minExperience: 3, maxSalary: 70000
    };

    let topEmployees = getTopPerformers(employees, criteria);
    console.log(topEmployees);
}

main();