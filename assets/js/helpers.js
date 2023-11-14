const letters = 'abcdefghijklmnopqrstuvwxyz';
const appendTo = $('#semesters');
var semestersCount = 1;
const addButton = document.getElementsByClassName('js-add-button');
const clearButtons = document.getElementsByClassName('input-field--clear');
const courses = document.getElementsByClassName('input-field__input');
addButton[0].addEventListener('click', addSemester);
for(let i = 0; i < clearButtons.length; i++){
	clearButtons[i].addEventListener('click', removeField);
}
for(let i = 0; i < courses.length; i++){
	courses[i].addEventListener('change', addField);
}

function toggleSemester() {
	const semester = this.parentElement;
	semester.classList.toggle('calculator-content--active');
}

function addSemester(){
	const currentSemester = letters[semestersCount];
	const semesterHtml = `
		<div class="calculator-content calculator-content--options col calculator-content--active" id="semester_${currentSemester}">
			<div class="calculator-content-head calculator-content-head--added row toggle-head">
				<p class="calculator-content-head__title">Semester ${semestersCount + 1}</p>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.7071 7.29289L9.99999 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68341 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z" fill="#9CA3AF"></path>
				</svg>
			</div>
			<div class="calculator-content-body col">
			${getFieldsHtml(currentSemester)}
			</div>
		</div>
		`;
	appendTo.insertAdjacentHTML('beforeend', semesterHtml);
	semestersCount++;
	const semesterHead = document.getElementsByClassName('toggle-head');
	for(let i = 0; i < semesterHead.length; i++){
		semesterHead[i].addEventListener('click', toggleSemester);
	}
	addListener();
}

function getFieldsHtml(semester = 'a', field = 'a'){
	const gradeFormat = input.get('format').raw();
	return `
				<div class="input-wrapper input-wrapper--gpa row" id="field_${semester}_${field}">
				<label class="input col ">
				<p class="input__title">Course</p>
				<div class="input-field row">
				
				<input type="text" class="input-field__input course-name" placeholder="" id="course_${semester}_${field}" value="">
				
				</div>
				</label><label class="input col grade-calculator  ">
				<p class="input__title">Credits</p>
				<div class="input-field row">
				<input type="text" class="input-field__input" id="credits_${semester}_${field}" value="">
				</div>
				
				
				</label><label class="input col format ${gradeFormat === 'letter' ? '' : 'related-item-hidden'} related-to-format-letter">
				<p class="input__title">Grade</p>
				<div class="dropdown-wrapper">
				<div class="input-field row " tabindex="0">
				<select class="input-field__text" onchange="toggleRelatedInputs(this)" id="grade_dropdown_${semester}_${field}">
				<option value="A+">
				A+
				</option>
				<option value="A">
				A
				</option>
				<option value="A-">
				A-
				</option>
				<option value="B+">
				B+
				</option>
				<option value="B">
				B
				</option>
				<option value="B-">
				B-
				</option>
				<option value="C+">
				C+
				</option>
				<option value="C">
				C
				</option>
				<option value="C-">
				C-
				</option>
				<option value="D+">
				D+
				</option>
				<option value="D">
				D
				</option>
				<option value="D-">
				D-
				</option>
				<option value="F">
				F
				</option>
				<option value="P">
				P
				</option>
				<option value="NP">
				NP
				</option>
				</select>
				</div>
				</div>
				</label>
				<label class="input col format ${gradeFormat === 'percent' ? '' : 'related-item-hidden'} related-to-format-percent">
				<p class="input__title">Grade</p>
				<div class="input-field row">
				<input type="text" class="input-field__input" id="grade_percent_${semester}_${field}" value="">
				<span class="input-field__hint">%</span>
				</div>
				
				
				</label><label class="input col format ${gradeFormat === 'point' ? '' : 'related-item-hidden'} related-to-format-point  ">
				<p class="input__title">Grade</p>
				<div class="input-field row">
				<input type="text" class="input-field__input" id="grade_point_${semester}_${field}" value="">
				</div>
				</label><label class="input col">
				<button class="input-field input-field--clear row" id="clear_${semester}_${field}">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z" fill="#9CA3AF"></path>
				</svg>
				</button>
				</label>
				</div>
		`;
}

function addField(el){
	const fieldId = el.target.getAttribute('id');
	if(!fieldId.includes('course_') && fieldId.includes('grade_percent_') && fieldId.includes('credits_') && fieldId.includes('grade_point_')){
		return;
	}
	const fieldArray = fieldId.split('_');
	const semester = fieldArray[1];
	const field = fieldArray[2];
	const nextField = letters[letters.indexOf(field) + 1];
	if(!$(`#field_${semester}_${nextField}`)){
		$(`#semester_${semester} > .calculator-content-body`).insertAdjacentHTML('beforeend', getFieldsHtml(semester, nextField));
		addListener();
	}
}

function addListener(){
	const courses = document.getElementsByClassName('course-name');
	const clearButtons = document.getElementsByClassName('input-field--clear');
	for(let i = 0; i < courses.length; i++){
		courses[i].addEventListener('change', addField);
	}
	for(let i = 0; i < clearButtons.length; i++){
		clearButtons[i].addEventListener('click', removeField);
	}
}


function removeField(el){
	const fieldId = el.target.getAttribute('id');
	const fieldArray = fieldId.split('_');
	const semester = fieldArray[1];
	const field = fieldArray[2];
	if(field === 'a'){
		return;
	}
	else {
		$(`#field_${semester}_${field}`).remove();
	}
}
