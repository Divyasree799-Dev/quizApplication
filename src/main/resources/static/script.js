const API_BASE = 'http://localhost:8082';

document.getElementById('btnStart').addEventListener('click', async () => {
  const category = document.getElementById('category').value;
  const count = +document.getElementById('numQ').value;
  const title = document.getElementById('title').value.trim();

  if (!count || count < 1) {
    return alert('Please enter a valid number of questions.');
  }

  try {
    // 1) Create the quiz and get its ID
    const params = new URLSearchParams({ title, numQ: count, category });
    const respCreate = await fetch(`${API_BASE}/quiz/create?${params}`, {
      method: 'POST'
    });

    if (!respCreate.ok) throw new Error('Failed to create quiz');

    const quizIdText = await respCreate.text(); // controller returns String ID
    const quizId = parseInt(quizIdText.trim(), 10);

    // 2) Fetch the questions
    const respGet = await fetch(`${API_BASE}/quiz/get/${quizId}`);
    if (!respGet.ok) throw new Error('Failed to load questions');

    const questions = await respGet.json();

    renderQuestions(quizId, questions); // ✅ Correct scope
  } catch (err) {
    console.error(err);
    alert('Error starting quiz: ' + err.message);
  }
});
function renderQuestions(quizId, questions) {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';

  questions.forEach((qw, idx) => {
    // QuestionWrapper probably has: questionId, text, options[]
    const block = document.createElement('div');
    block.className = 'question-block';
    block.dataset.qid = qw.id;
    const options = [
      qw.option1,
      qw.option2,
      qw.option3,
      qw.option4
    ].filter(opt => opt !== undefined && opt !== null);

    block.innerHTML = `
      <p><strong>Q${idx + 1}. ${qw.questionTitle}</strong></p>
      ${options.map(opt => `
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="q${qw.id}"
            id="q${idx}_${opt}"
            value="${opt}"
          >
          <label class="form-check-label" for="q${idx}_${opt}">
            ${opt}
          </label>
        </div>
      `).join('')}
    `;
    container.appendChild(block);
  });

  // swap views
  document.getElementById('setup-card').classList.add('d-none');
  document.getElementById('quiz-form').classList.remove('d-none');
  // attach quizId for later
  document.getElementById('quiz-form').dataset.quizId = quizId;
}


// Submit handler
document.getElementById('quiz-form').addEventListener('submit', async e => {
  e.preventDefault();

  const form = e.target;
  const quizId = form.dataset.quizId;
  const blocks = form.querySelectorAll('.question-block');

  const payload = Array.from(blocks).map(block => {
    // Get the questionId from the data attribute
    const qId = block.dataset.qid;
    const selected = block.querySelector(`input[name="q${qId}"]:checked`);
    return {
      id: parseInt(qId),
      response: selected ? selected.value : ""
    };
  });

  console.log('Submitting payload:', payload);

  try {
    const resp = await fetch(`${API_BASE}/quiz/submit/${quizId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) throw new Error('Submit failed');

    const score = await resp.json();

    const resultEl = document.getElementById('result');
    resultEl.classList.remove('d-none');
    resultEl.textContent = `You scored ${score} out of ${blocks.length}!`;
  } catch (err) {
    console.error(err);
    alert('Error submitting quiz: ' + err.message);
  }
});
