function calculate(){
	const priorSemesterGpa = input.get('prior_semester').optional().number().val();
	const priorSemesterCredits = input.get('completed_credits').optional().number().val();
	const gradeFormat = input.get('format').raw();
	let totalCredits = 0;
	let resultTable = [];
	let semesters = [];
	for(let semester = 0; semester < letters.length; semester++){
		const letter = letters[semester];
		if(_(`semester_${letter}`)){
			let sem = [];
			for(let i = 0; i < letters.length; i++){
				const field = letters[i];
				if(_(`field_${letter}_${field}`)){
					let grade;
					switch(gradeFormat){
						case 'letter':
							grade = input.get(`grade_dropdown_${letter}_${field}`).optional().raw();
							break;
						case 'percent':
							grade = input.get(`grade_percent_${letter}_${field}`).optional().lte(100).number().val();
							break;
						default:
							grade = input.get(`grade_point_${letter}_${field}`).optional().lte(100).number().val();
					}
					let weight = input.get(`credits_${letter}_${field}`).optional().lte(100).number().val();
					let name = input.get(`course_${letter}_${field}`).optional().raw();

					if(isNaN(parseInt(grade))){
						grade = grade.toUpperCase();
					}
					if(grade && weight && (!isNaN(parseInt(grade)) || gradesList.includes(grade))){
						sem.push({
							name,
							grade,
							weight,
						});
					}
				}
			}
			if(sem.length){
				semesters.push(sem);
			}
		}
	}

	if(!input.valid()) return;

	let semestersTotal = 0;
	let result = [];
	let cumulativeWeight = 0;
	let cumulativeGrade = 0;
	if(priorSemesterGpa && priorSemesterCredits){
		cumulativeWeight = +(priorSemesterCredits);
		cumulativeGrade = +(priorSemesterGpa);
	}
	semesters.forEach((semester, index) => {
		let semesterTotal = 0;
		let weightTotal = 0;
		let exams = [];
		semester.forEach(exam => {
			const gpa = convertToGpa(exam.grade)
			semesterTotal += (gpa * exam.weight);
			weightTotal += Number(exam.weight);
			exams.push({
				name: exam.name,
				weight: exam.weight,
				grade: exam.grade,
				gradePoint: exam.weight + 'x' + gpa + ' = ' + Number((gpa * exam.weight).toFixed(2)),
			});
		});
		semestersTotal += semesterTotal;
		cumulativeWeight += weightTotal;
		cumulativeGrade += (semesterTotal / weightTotal);
		result.push({
			exams,
			semesterTotal,
			weightTotal,
			semestersTotal,
			cumulativeWeight,
			cumulativeGrade: cumulativeGrade / (index + 1),
			semesterGPA: semesterTotal / weightTotal,
		})
	});
	totalCredits = cumulativeWeight;
	resultTable = result;
	const resultGpa = Number((cumulativeGrade / semesters.length).toFixed(2));
	let resultHtml = '';
	if(priorSemesterGpa && priorSemesterCredits){
		resultHtml += `<tr>
			<th class="semibold">Prior Semester GPA</th>
			<th>${priorSemesterCredits}</th>
			<th>GPA: ${priorSemesterGpa}</th>
			<th>${priorSemesterGpa} x ${priorSemesterCredits} = ${+(priorSemesterGpa * priorSemesterCredits).toFixed(2)}</th>
		</tr>`;
	}
	resultTable.forEach((semester, index) => {
		let examsHtml = '';
		semester.exams.forEach(exam => {
			examsHtml += `<tr>
				<td>${exam.name}</td>
				<td>${exam.weight}</td>
				<td>${exam.grade}</td>
				<td>${exam.gradePoint}</td>
			</tr>`;
		});
		resultHtml += examsHtml;
		if(resultTable.length > 1) {
			resultHtml += `<tr>
				<th class="semibold">Semester</th>
				<th>${semester.cumulativeWeight}</th>
				<th>GPA: ${+semester.semesterGPA.toFixed(3)}</th>
				<th>${+semester.semesterTotal.toFixed(3)}</th>
			</tr>`;
		}
	});
	if(resultTable.length){
		resultHtml += `<tr>
				<th class="semibold">Total/Overall</th>
				<th>${resultTable[resultTable.length - 1].cumulativeWeight}</th>
				<th>GPA: ${+resultTable[resultTable.length - 1].cumulativeGrade.toFixed(3)}</th>
				<th>${+resultTable[resultTable.length - 1].semestersTotal.toFixed(3)}</th>
		</tr>`;
	}

	output.val(resultHtml).set('result-table');
}
const gradesList = ['', 'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'D-', 'F'];

const gpaTable = [
	{
		letter: 'A+',
		points: '100-97',
		gpa: '4.3',
	},
	{
		letter: 'A',
		points: '96-93',
		gpa: '4',
	},
	{
		letter: 'A-',
		points: '92-90',
		gpa: '3.7',
	},
	{
		letter: 'B+',
		points: '89-87',
		gpa: '3.3',
	},
	{
		letter: 'B',
		points: '86-83',
		gpa: '3',
	},
	{
		letter: 'B-',
		points: '82-80',
		gpa: '2.7',
	}, {
		letter: 'C+',
		points: '79-77',
		gpa: '2.3',
	},
	{
		letter: 'C',
		points: '76-73',
		gpa: '2',
	},
	{
		letter: 'C-',
		points: '72-70',
		gpa: '1.7',
	},
	{
		letter: 'D+',
		points: '69-67',
		gpa: '1.3',
	},
	{
		letter: 'D',
		points: '66-63',
		gpa: '1',
	},
	{
		letter: 'D-',
		points: '62-60',
		gpa: '0.7',
	},
	{
		letter: 'F',
		points: '59-0',
		gpa: '0',
	},
];

function convertToGpa(value){
	if(!value) return;
	if(!isNaN(parseInt(value))){
		value = Number(value).toFixed();
		const result = gpaTable.find((x) => {
			let range = x.points.split('-');
			return (value <= parseFloat(range[0]) && value >= parseFloat(range[1]));
		});
		return result.gpa;
	}
	else {
		return gpaTable.find((x) => {
			return x.letter === value.toUpperCase();
		}).gpa;
	}
}
