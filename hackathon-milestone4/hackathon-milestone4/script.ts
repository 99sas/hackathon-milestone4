document.getElementById('resumeForm')?.addEventListener('submit', (e: Event) => {
    e.preventDefault(); // Prevent form from submitting

    // Get form data
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Generate resume output
    const resumeOutput = `
        <h2>${name}'s Resume</h2>
        <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
        <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>

        <h3>Education</h3>
        <p id="edit-education" class="editable">${education}</p>

        <h3>Experience</h3>
        <p id="edit-experience" class="editable">${experience}</p>

        <h3>Skills</h3>
        <p id="edit-skills" class="editable">${skills}</p>
    `;

    // Display generated resume
    const outputElement = document.getElementById('resumeOutput');
    if (outputElement) {
        outputElement.innerHTML = resumeOutput;
        makeEditable(); // Make resume editable
    }
});

function makeEditable() {
    const editableElements = document.querySelectorAll('.editable');
    editableElements.forEach((element) => {
        element.addEventListener('click', function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            // Replace content with input field
            if (currentElement.tagName === "P" || currentElement.tagName === 'SPAN') {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');

                // On blur, update the content and remove the input field
                input.addEventListener('blur', function () {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove();
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });
}
