// This function takes an obejct of students and returns an object containing calculated information about their scores
function analyzeStudentPerformance(students) {
    const allScores = students.map(({ scores }) => scores).reduce((acc, scores) => acc.concat(scores), []);
    const highestScore = allScores.reduce((max, score) => (score > max ? score : max), -Infinity);
    const lowestScore = allScores.reduce((min, score) => (score < min ? score : min), Infinity);
    const overallAverage = allScores.reduce((sum, score) => sum + score, 0) / allScores.length;
  
    const studentAverages = students
      .map(({ name, scores }) => ({
        name,
        average: scores.reduce((sum, score) => sum + score, 0) / scores.length
      }))
      .sort((a, b) => b.average - a.average);
  
    return { highestScore, lowestScore, overallAverage, studentAverages };
} 

// This is the main testing function
function main() {
    const students = [
        { name: "Alice", scores: [85, 92, 78] },
        { name: "Bob", scores: [88, 79, 91] },
        { name: "Charlie", scores: [92, 87, 85] }
    ];

    result = analyzeStudentPerformance(students);
    console.log(result);
}

main();