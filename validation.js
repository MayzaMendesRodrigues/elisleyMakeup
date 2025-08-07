document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.form__content');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const weddingDateInput = document.getElementById('wedding-date');
    const locationInput = document.getElementById('location');
    const weddingPlannerInput = document.getElementById('wedding-planner');
    const photographerInput = document.getElementById('number-of-guests'); // Assuming this is for number of photographers based on type="number"
    const contactMethodCheckboxes = document.querySelectorAll('input[name="contactMethod[]"]');


    function showError(input, message) {
        const formGroup = input.closest('.form__group');
        let errorDiv = formGroup.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.classList.add('error-message');
            formGroup.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
        input.classList.add('invalid');
    }

    function clearError(input) {
        const formGroup = input.closest('.form__group');
        const errorDiv = formGroup.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
        input.classList.remove('invalid');
    }

    function validateEmail(email) {
        // Simple regex for email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePhoneNumber(phone) {
        // Simple regex for phone number validation (adjust for Italian numbers if needed)
        // This regex allows for numbers with spaces, hyphens, or just digits.
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(String(phone));
    }

    function validateDateNotInPast(dateInput) {
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison
        return selectedDate >= today;
    }

    form.addEventListener('submit', function(event) {
        let isValid = true;

        // Name validation
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Il nome e cognome sono obbligatori.');
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Phone validation
        if (phoneInput.value.trim() === '') {
            showError(phoneInput, 'Il numero di telefono è obbligatorio.');
            isValid = false;
        } else if (!validatePhoneNumber(phoneInput.value)) {
            showError(phoneInput, 'Inserisci un numero di telefono valido.');
            isValid = false;
        } else {
            clearError(phoneInput);
        }

        // Email validation
        if (emailInput.value.trim() === '') {
            showError(emailInput, 'L\'email è obbligatoria.');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Inserisci un\'email valida.');
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Wedding Date validation
        if (weddingDateInput.value === '') {
            showError(weddingDateInput, 'La data del matrimonio è obbligatoria.');
            isValid = false;
        } else if (!validateDateNotInPast(weddingDateInput)) {
            showError(weddingDateInput, 'La data del matrimonio non può essere nel passato.');
            isValid = false;
        } else {
            clearError(weddingDateInput);
        }

        // Location validation
        if (locationInput.value.trim() === '') {
            showError(locationInput, 'Il luogo del matrimonio è obbligatorio.');
            isValid = false;
        } else {
            clearError(locationInput);
        }

        // Wedding Planner validation (assuming required, adjust if not)
        if (weddingPlannerInput.value.trim() === '') {
            showError(weddingPlannerInput, 'Il campo Wedding Planner è obbligatorio.');
            isValid = false;
        } else {
            clearError(weddingPlannerInput);
        }

        // Photographer validation (assuming it's a number and required, adjust if it's a name)
        if (photographerInput.value.trim() === '') {
            showError(photographerInput, 'Il campo Fotografo è obbligatorio.');
            isValid = false;
        } else if (isNaN(photographerInput.value) || parseInt(photographerInput.value) < 0) {
            showError(photographerInput, 'Inserisci un numero valido per Fotografo.');
            isValid = false;
        } else {
            clearError(photographerInput);
        }

        // Contact Method validation (at least one checkbox selected)
        const isContactMethodSelected = Array.from(contactMethodCheckboxes).some(cb => cb.checked);
        if (!isContactMethodSelected) {
            // Find the parent div of the checkboxes to show error message collectively
            const contactMethodGroup = document.querySelector('.form__group input[name="contactMethod[]"]').closest('.form__group');
            showError({ closest: () => contactMethodGroup, classList: { add: () => {}, remove: () => {} } }, 'Seleziona almeno un metodo di contatto.');
            isValid = false;
        } else {
            const contactMethodGroup = document.querySelector('.form__group input[name="contactMethod[]"]').closest('.form__group');
            clearError({ closest: () => contactMethodGroup, classList: { add: () => {}, remove: () => {} } });
        }


        if (!isValid) {
            event.preventDefault(); // Stop form submission if validation fails
        }
    });

    // Add real-time validation for a better user experience
    const inputs = [nameInput, phoneInput, emailInput, weddingDateInput, locationInput, weddingPlannerInput, photographerInput];
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Re-validate on input change
            if (this.value.trim() !== '') {
                clearError(this);
                if (this.id === 'email' && !validateEmail(this.value)) {
                    showError(this, 'Inserisci un\'email valida.');
                } else if (this.id === 'phone' && !validatePhoneNumber(this.value)) {
                    showError(this, 'Inserisci un numero di telefono valido.');
                } else if (this.id === 'wedding-date' && !validateDateNotInPast(this)) {
                    showError(this, 'La data del matrimonio non può essere nel passato.');
                }
            }
        });
    });

    contactMethodCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const isContactMethodSelected = Array.from(contactMethodCheckboxes).some(cb => cb.checked);
            const contactMethodGroup = document.querySelector('.form__group input[name="contactMethod[]"]').closest('.form__group');
            if (isContactMethodSelected) {
                clearError({ closest: () => contactMethodGroup, classList: { add: () => {}, remove: () => {} } });
            }
        });
    });
});

  document.getElementById('form').addEventListener('submit', function(e) {
        // Tenta enviar via JavaScript primeiro
        if (window.FormData && window.fetch) {
          e.preventDefault();

          const form = e.target;
          const formData = new FormData(form);
          const submitButton = document.getElementById('btn');

          // Feedback visual
          submitButton.disabled = true;
          submitButton.textContent = 'Invio in corso...';

          // Cria um iframe invisível como target do form
          const iframe = document.createElement('iframe');
          iframe.name = 'formsubmit-iframe';
          iframe.style.display = 'none';
          document.body.appendChild(iframe);

          // Altera o target do form para o iframe
          form.target = 'formsubmit-iframe';

          // Envia o formulário tradicionalmente (irá carregar no iframe invisível)
          form.submit();

          // Mostra mensagem de sucesso (não esperamos resposta do FormSubmit)
          form.style.display = 'none';
          document.getElementById('successMessage').classList.add('show');

          // Remove o iframe após algum tempo
          setTimeout(() => {
            document.body.removeChild(iframe);
          }, 5000);
        }
        // Se JavaScript falhar, o form será enviado normalmente com redirecionamento
      });