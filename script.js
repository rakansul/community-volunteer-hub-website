/* ============================================
   Community Volunteer Hub - Main Script
   ============================================ */

/* ============================================
   1. CONFIGURATION & CONSTANTS
   ============================================ */
   const APP_CONFIG = {
    selectors: {
        searchBtn: '.btn-search',
        searchInput: '#search-input',
        categoryFilter: '#category-filter',
        dateFilter: '#date-filter',
        mobileMenu: '.nav-menu',
        hamburger: '.hamburger'
    },
    messages: {
        validation: {
            required: 'هذا الحقل مطلوب',
            emailRequired: 'البريد الإلكتروني مطلوب',
            emailInvalid: 'الرجاء إدخال بريد إلكتروني صحيح',
            passwordRequired: 'كلمة المرور مطلوبة',
            passwordLength: 'يجب أن لا تقل كلمة المرور عن 6 أحرف',
            passwordMatch: 'الرجاء تأكيد كلمة المرور',
            passwordMismatch: 'كلمتا المرور غير متطابقتين',
            nameFirst: 'الاسم الأول مطلوب',
            nameLast: 'الاسم الأخير مطلوب',
            nameFull: 'الاسم الكامل مطلوب',
            subject: 'الموضوع مطلوب',
            message: 'الرسالة مطلوبة'
        },
        registration: {
            success: (title) => `تم التسجيل بنجاح في "${title}"! شكراً لك على التطوع. سيتم التواصل معك قريباً.`,
            buttonSuccess: 'تم التسجيل ✓',
            notFoundTitle: 'الفرصة غير موجودة',
            notFoundDesc: 'عذراً، لم يتم العثور على هذه الفرصة. يرجى العودة إلى صفحة الفرص.'
        },
        contact: {
            success: 'شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.'
        },
        profile: {
            empty: 'ليس لديك أي فرص مسجلة. تصفح الفرص لتبدأ!',
            loadBtnActive: 'إخفاء فُرصي',
            loadBtnInactive: 'عرض فُرصي',
            hiddenMsg: 'انقر على "عرض فُرصي" لعرض الفرص المسجل بها.'
        },
        search: {
            noResults: 'لم يتم العثور على نتائج. جرب تعديل معايير البحث.'
        }
    },
    categoryMapping: {
        'environment': 'البيئة',
        'entertainment': 'الترفيه',
        'tourism': 'السياحة',
        'tech': 'التقنية',
        'education': 'التعليم',
        'healthcare': 'الرعاية',
        'community': 'المجتمع'
    }
};

/* ============================================
   2. DATA 
   ============================================ */
const detailedOpportunities = [
    {
        id: 1,
        title: 'مبادرة السعودية الخضراء',
        category: 'البيئة',
        date: '21 نوفمبر 2025',
        datetime: 'الجمعة، 21 نوفمبر 2025 من 8:00 صباحاً إلى 2:00 مساءً',
        location: 'الرياض - متنزه الملك عبدالله',
        locationDetail: 'متنزه الملك عبدالله، حي العليا، الرياض 12211',
        organizer: 'وزارة البيئة والمياه والزراعة',
        description: 'انضم إلى مبادرة السعودية الخضراء، وهي مبادرة وطنية طموحة تهدف إلى زراعة 10 مليارات شجرة في جميع أنحاء المملكة. سيكون هذا اليوم مخصصاً لزراعة الأشجار المحلية في متنزه الملك عبدالله.',
        requirements: 'لا توجد متطلبات خاصة. سنوفر جميع الأدوات والمعدات اللازمة. يُنصح بارتداء ملابس مريحة وقبعة.'
    },
    {
        id: 2,
        title: 'التطوع في موسم الرياض',
        category: 'الترفيه',
        date: '22 نوفمبر 2025',
        datetime: 'السبت، 22 نوفمبر 2025 من 4:00 مساءً إلى 11:00 مساءً',
        location: 'الرياض',
        locationDetail: 'منطقة بوليفارد',
        organizer: 'هيئة الموسم',
        description: 'كن جزءاً من أكبر موسم ترفيهي في المنطقة! نحتاج متطوعين لمساعدة في تنظيم الفعاليات وإرشاد الزوار في منطقة بوليفارد.',
        requirements: 'القدرة على الوقوف والمشي لساعات. مهارات تواصل ممتازة. معرفة أساسية باللغة الإنجليزية.'
    },
    {
        id: 3,
        title: 'إرشاد سياحي في جدة التاريخية',
        category: 'السياحة',
        date: '23 نوفمبر 2025',
        datetime: 'الأحد، 23 نوفمبر 2025 من 9:00 صباحاً إلى 5:00 مساءً',
        location: 'جدة',
        locationDetail: 'حي البلد، جدة التاريخية',
        organizer: 'هيئة السياحة السعودية',
        description: 'شارك شغفك بالتراث والتاريخ! نحتاج مرشدين سياحيين متطوعين لمساعدة السياح في استكشاف جدة التاريخية (البلد).',
        requirements: 'معرفة جيدة بتاريخ جدة والتراث السعودي. مهارات تواصل ممتازة. إجادة اللغة الإنجليزية.'
    },
    {
        id: 4,
        title: 'مرشد تقني في ملتقى LEAP',
        category: 'التقنية',
        date: '24 نوفمبر 2025',
        datetime: 'الاثنين، 24 نوفمبر 2025 من 7:00 صباحاً إلى 6:00 مساءً',
        location: 'الرياض',
        locationDetail: 'ملهم',
        organizer: 'LEAP',
        description: 'كن جزءاً من أكبر ملتقى تقني في المنطقة! نحتاج مرشدين تقنيين لمساعدة الحضور في التنقل بين الجلسات وتوجيه الشركات الناشئة.',
        requirements: 'اهتمام بالتقنية والابتكار. مهارات تواصل ممتازة. إجادة اللغة الإنجليزية.'
    },
    {
        id: 5,
        title: 'تنظيم مهرجان التمور',
        category: 'الترفيه',
        date: '25 نوفمبر 2025',
        datetime: 'الثلاثاء، 25 نوفمبر 2025 من 10:00 صباحاً إلى 6:00 مساءً',
        location: 'رياض الخبراء',
        locationDetail: 'سوق التمور المركزي، رياض الخبراء',
        organizer: 'بلدية رياض الخبراء',
        description: 'ساهم في مهرجان التمور وساعد في تنظيم الفعاليات والأنشطة الترفيهية المصاحبة للمهرجان.',
        requirements: 'حسن التعامل مع الجمهور. القدرة على العمل الميداني. الالتزام بأوقات العمل.'
    },
    {
        id: 6,
        title: 'حماية شواطئ البحر الأحمر',
        category: 'البيئة',
        date: '26 نوفمبر 2025',
        datetime: 'الأربعاء، 26 نوفمبر 2025 من 6:00 صباحاً إلى 12:00 ظهراً',
        location: 'شاطئ أملج',
        locationDetail: 'شاطئ أملج، محافظة أملج، تبوك',
        organizer: 'جمعية أصدقاء البيئة',
        description: 'انضم إلينا ليوم كامل من تنظيف الشواطئ وحماية الحياة البحرية في شاطئ أملج.',
        requirements: 'القدرة على السباحة.'
    },
    {
        id: 7,
        title: 'تعليم البرمجة للشباب (عطاء)',
        category: 'التقنية',
        date: '27 نوفمبر 2025',
        datetime: 'الخميس، 27 نوفمبر 2025 من 3:00 مساءً إلى 7:00 مساءً',
        location: 'الرياض',
        locationDetail: 'مراكز الشباب، الرياض',
        organizer: 'مبادرة عطاء',
        description: 'كن مرشداً للشباب وساعدهم على تطوير مهارات البرمجة والثقة في المستقبل!',
        requirements: 'معرفة جيدة بأحد لغات البرمجة. مهارات تدريس والتواصل جيدة.'
    },
    {
        id: 8,
        title: 'إرشاد سياحي في العلا',
        category: 'السياحة',
        date: '28 نوفمبر 2025',
        datetime: 'الجمعة، 28 نوفمبر 2025 من 8:00 صباحاً إلى 4:00 مساءً',
        location: 'العلا',
        locationDetail: 'مدينة العلا، محافظة العلا، منطقة المدينة المنورة',
        organizer: 'الهيئة الملكية لمحافظة العلا',
        description: 'شارك في إرشاد السياح في واحدة من أروع الوجهات السياحية في المملكة! العلا موطن لمواقع تاريخية رائعة.',
        requirements: 'معرفة جيدة بتاريخ العلا والمنطقة. إجادة اللغة الإنجليزية ضرورية.'
    },
    {
        id: 9,
        title: 'برنامج قراءة للأطفال',
        category: 'التعليم',
        date: '29 نوفمبر 2025',
        datetime: 'السبت، 29 نوفمبر 2025 من 4:00 مساءً إلى 6:00 مساءً',
        location: 'مكتبة الملك فهد',
        locationDetail: 'مكتبة الملك فهد العامة، حي العليا، الرياض',
        organizer: 'مكتبة الملك فهد العامة',
        description: 'اقرأ للأطفال وساعد في نشر ثقافة القراءة في مجتمعنا! ستقوم بقراءة القصص للأطفال في جلسات قراءة تفاعلية.',
        requirements: 'حب القراءة والكتب. مهارات تواصل جيدة مع الأطفال.'
    },
    {
        id: 10,
        title: 'متطوع في مستشفى',
        category: 'الرعاية الصحية',
        date: '30 نوفمبر 2025',
        datetime: 'الأحد، 30 نوفمبر 2025 من 9:00 صباحاً إلى 1:00 ظهراً',
        location: 'مستشفى الملك فيصل التخصصي',
        locationDetail: 'مستشفى الملك فيصل التخصصي ومركز الأبحاث، حي المعذر، الرياض',
        organizer: 'مستشفى الملك فيصل التخصصي',
        description: 'قدم الدعم والراحة للمرضى وعائلاتهم في أحد أفضل المستشفيات في المنطقة.',
        requirements: 'التعاطف والصبر. مهارات تواصل ممتازة. سيتم إجراء فحص خلفية.'
    }
];

const mockRegisteredOpportunities = [
    { title: 'مبادرة السعودية الخضراء', date: '21 نوفمبر 2025', location: 'الرياض' },
    { title: 'التطوع في موسم الرياض', date: '22 نوفمبر 2025', location: 'موسم الرياض' },
    { title: 'حماية شواطئ البحر الأحمر', date: '26 نوفمبر 2025', location: 'شاطئ أملج' },
    { title: 'جودة الحياة: مساعدة كبار السن', date: '25 نوفمبر 2025', location: 'مراكز مجتمعية' },
    { title: 'تعليم البرمجة للشباب (عطاء)', date: '27 نوفمبر 2025', location: 'مراكز الشباب' }
];

/* ============================================
   3. UTILITY FUNCTIONS
   ============================================ */

/**
 * Validates email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Display error message under an input field
 * @param {HTMLElement} field - Input field element
 * @param {string} message - Error message to display
 */
function showFieldError(field, message) {
    if (!field) return;
    
    clearFieldError(field);
    field.classList.add('error');
    
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--danger-color)';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.display = 'block';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentElement.appendChild(errorElement);
}

/**
 * Remove error message and styling from field
 * @param {HTMLElement} field - Input field element
 */
function clearFieldError(field) {
    if (!field) return;
    
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

/**
 * Get element safely with null check
 * @param {string} selector - CSS selector
 * @returns {HTMLElement|null} - Element or null
 */
function getElement(selector) {
    return document.querySelector(selector);
}

/**
 * Get all elements safely
 * @param {string} selector - CSS selector
 * @returns {NodeList} - NodeList of elements
 */
function getElements(selector) {
    return document.querySelectorAll(selector);
}

/* ============================================
   4. FORM VALIDATION
   ============================================ */

/**
 * Validate login form
 * @param {Event} event - Form submit event
 * @returns {boolean} - Validation result
 */
function validateLoginForm(event) {
    const form = event.target;
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    let isValid = true;

    clearFieldError(email);
    clearFieldError(password);

    if (!email.value.trim()) {
        showFieldError(email, APP_CONFIG.messages.validation.emailRequired);
        isValid = false;
    } else if (!validateEmail(email.value.trim())) {
        showFieldError(email, APP_CONFIG.messages.validation.emailInvalid);
        isValid = false;
    }

    if (!password.value.trim()) {
        showFieldError(password, APP_CONFIG.messages.validation.passwordRequired);
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
        return false;
    }
    
    console.log('Login form valid.');
    return true;
}

/**
 * Validate registration form
 * @param {Event} event - Form submit event
 * @returns {boolean} - Validation result
 */
function validateRegisterForm(event) {
    const form = event.target;
    const firstName = form.querySelector('#first-name');
    const lastName = form.querySelector('#last-name');
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    const confirmPassword = form.querySelector('#confirm-password');
    let isValid = true;

    [firstName, lastName, email, password, confirmPassword].forEach(clearFieldError);

    if (!firstName.value.trim()) {
        showFieldError(firstName, APP_CONFIG.messages.validation.nameFirst);
        isValid = false;
    }
    
    if (!lastName.value.trim()) {
        showFieldError(lastName, APP_CONFIG.messages.validation.nameLast);
        isValid = false;
    }

    if (!email.value.trim()) {
        showFieldError(email, APP_CONFIG.messages.validation.emailRequired);
        isValid = false;
    } else if (!validateEmail(email.value.trim())) {
        showFieldError(email, APP_CONFIG.messages.validation.emailInvalid);
        isValid = false;
    }

    if (!password.value.trim()) {
        showFieldError(password, APP_CONFIG.messages.validation.passwordRequired);
        isValid = false;
    } else if (password.value.length < 8) {
        showFieldError(password, APP_CONFIG.messages.validation.passwordLength);
        isValid = false;
    }

    if (!confirmPassword.value.trim()) {
        showFieldError(confirmPassword, APP_CONFIG.messages.validation.passwordMatch);
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showFieldError(confirmPassword, APP_CONFIG.messages.validation.passwordMismatch);
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault();
        return false;
    }
    
    console.log('Registration form valid.');
    return true;
}

/**
 * Validate contact form
 * @param {Event} event - Form submit event
 */
function validateContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const name = form.querySelector('#contact-name');
    const email = form.querySelector('#contact-email');
    const subject = form.querySelector('#contact-subject');
    const message = form.querySelector('#contact-message');
    const resultDiv = getElement('#contact-message-result');
    let isValid = true;

    [name, email, subject, message].forEach(clearFieldError);

    if (!name.value.trim()) {
        showFieldError(name, APP_CONFIG.messages.validation.nameFull);
        isValid = false;
    }
    
    if (!email.value.trim()) {
        showFieldError(email, APP_CONFIG.messages.validation.emailRequired);
        isValid = false;
    } else if (!validateEmail(email.value.trim())) {
        showFieldError(email, APP_CONFIG.messages.validation.emailInvalid);
        isValid = false;
    }
    
    if (!subject.value.trim()) {
        showFieldError(subject, APP_CONFIG.messages.validation.subject);
        isValid = false;
    }
    
    if (!message.value.trim()) {
        showFieldError(message, APP_CONFIG.messages.validation.message);
        isValid = false;
    }

    if (isValid) {
        if (resultDiv) {
            resultDiv.textContent = APP_CONFIG.messages.contact.success;
            resultDiv.className = 'registration-message success';
            resultDiv.style.display = 'block';
            form.reset();
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            setTimeout(() => {
                resultDiv.textContent = '';
                resultDiv.className = 'registration-message';
                resultDiv.style.display = 'none';
            }, 5000);
        } else {
            console.error('Contact message result div not found');
            alert(APP_CONFIG.messages.contact.success);
            form.reset();
        }
    } else {
        // Scroll to first error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

/**
 * Setup real-time validation for form fields
 * @param {HTMLFormElement} form - Form element
 */
function setupRealtimeValidation(form) {
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            const value = input.value.trim();
            
            if (input.hasAttribute('required') && !value) {
                if (input.type === 'email') {
                    showFieldError(input, APP_CONFIG.messages.validation.emailRequired);
                } else {
                    showFieldError(input, APP_CONFIG.messages.validation.required);
                }
            } else if (input.type === 'email' && value && !validateEmail(value)) {
                showFieldError(input, APP_CONFIG.messages.validation.emailInvalid);
            } else {
                clearFieldError(input);
            }
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                clearFieldError(input);
            }
        });
    });
}

/* ============================================
   5. SEARCH & FILTERS
   ============================================ */

/**
 * Checks if a given category from the opportunity card matches the selected category filter.
 * - Allows for English or Arabic category matching.
 * - If no filter is selected, returns true (all items visible).
 *
 * @param {string} category - The category text from the card (could be in Arabic/English).
 * @param {string} selectedCategory - The currently selected category filter (value from dropdown).
 * @returns {boolean} - True if there's a match, otherwise false.
 */
function categoryMatches(category, selectedCategory) {
    // If no category filter is selected, every card is considered a match
    if (!selectedCategory) return true;

    // Convert card category to lowercase for case-insensitive comparison
    const categoryLower = category.toLowerCase();
    // Get the mapped Arabic category from config, if any
    const arabicCategory = APP_CONFIG.categoryMapping[selectedCategory];

    // Return true if the card's category contains the selected category (in English or Arabic)
    return categoryLower.includes(selectedCategory.toLowerCase()) ||
           (arabicCategory && categoryLower.includes(arabicCategory.toLowerCase()));
}

/**
 * Filters the opportunity cards on the page based on both:
 *  - The user's search input (title/description)
 *  - The selected category (from dropdown)
 * Also handles animation transitions for filtered cards.
 */
function filterOpportunities() {
    // Get search input field, category filter dropdown, and all cards
    const searchInput = getElement(APP_CONFIG.selectors.searchInput);
    const categoryFilter = getElement(APP_CONFIG.selectors.categoryFilter);
    const opportunityCards = getElements('.opportunity-card');

    // If search or filter elements can't be found, stop filtering
    if (!searchInput || !categoryFilter) return;

    // Grab and normalize user input
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    // Track if any visible items remain after filtering
    let hasVisibleItems = false;

    // Loop over each opportunity card to check if it should be displayed
    opportunityCards.forEach(card => {
        // Get the opportunity's title and description text for searching
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent.toLowerCase() || '';
        // Try to get the DOM element holding the category (may be missing on some cards)
        const category = card.querySelector('.category')?.textContent || '';

        // Determine if search input matches either the title/description, or is empty
        const matchesSearch = !searchTerm || title.includes(searchTerm) || description.includes(searchTerm);

        // Determine if category matches filter (using the matching utility)
        const matchesCategory = categoryMatches(category, selectedCategory);

        if (matchesSearch && matchesCategory) {
            // If both search and category filter match, display card with fade-in effect
            card.style.display = 'block';
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease';
                card.style.opacity = '1';
            }, 10);

            hasVisibleItems = true;
        } else {
            // Otherwise (doesn't match), hide the card
            card.style.display = 'none';
        }
    });

    // Show or hide the "no results" message, depending if any cards are visible
    toggleNoResultsMessage(!hasVisibleItems);
}

/**
 * Displays or hides the "no results" message within the opportunities grid.
 * Removes any previous message before displaying a new one.
 *
 * @param {boolean} show - True to show the message, false to hide it
 */
function toggleNoResultsMessage(show) {
    // Get the DOM element containing all opportunity cards
    const container = getElement('.opportunities-grid');
    if (!container) return;

    // Remove any existing "no results" message to avoid stacking
    const existingMsg = container.querySelector('.no-results-message');
    if (existingMsg) {
        existingMsg.remove();
    }

    if (show) {
        // If no cards are visible, create and display the no-results message
        const message = document.createElement('div');
        message.className = 'no-results-message';
        message.innerHTML = `
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">
                ${APP_CONFIG.messages.search.noResults}
            </h3>
        `;
        container.appendChild(message);
    }
}

/* ============================================
   6. OPPORTUNITY DETAILS PAGE
   ============================================ */

/**
 * Load opportunity details from URL parameter
 */
function loadOpportunityDetail() {
    const urlParams = new URLSearchParams(window.location.search); // Get URL parameters from the browser's address bar
    const opportunityId = parseInt(urlParams.get('id')); // Parse the 'id' parameter as an integer
    const opportunity = detailedOpportunities.find(opp => opp.id === opportunityId); // Find the opportunity with matching id

    const elements = { // Get all relevant DOM elements for displaying opportunity details
        title: getElement('#opportunity-title'), // Title element
        description: getElement('#opportunity-description'), // Description element
        date: getElement('#opportunity-date'), // Date element
        location: getElement('#opportunity-location'), // Location element
        category: getElement('#opportunity-category'), // Category element
        datetime: getElement('#opportunity-datetime'), // Datetime element
        locationDetail: getElement('#opportunity-location-detail'), // Location detail element
        organizer: getElement('#opportunity-organizer'), // Organizer element
        requirements: getElement('#opportunity-requirements') // Requirements element
    };

    if (!opportunity) { // If the opportunity wasn't found (invalid or missing ID)
        if (elements.title) { // If the title element exists
            elements.title.textContent = APP_CONFIG.messages.registration.notFoundTitle; // Show not found title message
        }
        if (elements.description) { // If the description element exists
            elements.description.textContent = APP_CONFIG.messages.registration.notFoundDesc; // Show not found description
        }
        return; // Exit the function early
    }

    if (elements.title) elements.title.textContent = opportunity.title; // Set opportunity title
    if (elements.date) elements.date.textContent = opportunity.date; // Set date
    if (elements.location) elements.location.textContent = opportunity.location; // Set location
    if (elements.category) elements.category.textContent = opportunity.category; // Set category
    if (elements.description) elements.description.textContent = opportunity.description; // Set description
    if (elements.datetime) elements.datetime.textContent = opportunity.datetime; // Set datetime
    if (elements.locationDetail) elements.locationDetail.textContent = opportunity.locationDetail; // Set location detail
    if (elements.organizer) elements.organizer.textContent = opportunity.organizer || '-'; // Set organizer or '-'
    if (elements.requirements) elements.requirements.textContent = opportunity.requirements || '-'; // Set requirements or '-'
}

/**
 * Handle opportunity registration
 */
function handleRegistration() {
    const registerBtn = getElement('#register-btn'); // Locate the 'Register' button
    const messageDiv = getElement('#registration-message'); // Locate the registration message div
    const urlParams = new URLSearchParams(window.location.search); // Obtain URL parameters
    const opportunityId = parseInt(urlParams.get('id')); // Parse 'id' from URL
    const opportunity = detailedOpportunities.find(opp => opp.id === opportunityId); // Get relevant opportunity

    if (!registerBtn || !messageDiv || !opportunity) return; // Exit if any required elements/opportunity missing

    messageDiv.textContent = APP_CONFIG.messages.registration.success(opportunity.title); // Show success message
    messageDiv.className = 'registration-message success'; // Set message class for styling
    
    registerBtn.disabled = true; // Disable the register button
    registerBtn.textContent = APP_CONFIG.messages.registration.buttonSuccess; // Change button text to show success
    registerBtn.style.opacity = '0.7'; // Dim the button visually
    registerBtn.style.cursor = 'not-allowed'; // Show not-allowed cursor for disabled button
    
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // Smooth scroll to bring the message into view
}

/* ============================================
   7. PROFILE PAGE
   ============================================ */

/**
 * Create a registered opportunity item element
 * @param {Object} opportunity - Opportunity data
 * @param {number} index - Index for animation delay
 * @returns {HTMLElement} - Article element
 */
function createRegisteredOpportunityItem(opportunity, index = 0) {
    const article = document.createElement('article'); // Create an <article> element
    article.className = 'opportunity-item'; // Add class for styling
    article.style.opacity = '0'; // Set initial opacity for fade-in animation
    article.style.transform = 'translateY(10px)'; // Offset for animation
    
    article.innerHTML = `
        <div class="item-content">
            <h4>${opportunity.title}</h4>
            <div class="item-meta">
                <span class="date">${opportunity.date}</span>
                <span class="location">${opportunity.location}</span>
            </div>
        </div>
    `; // Set inner HTML structure for the opportunity data

    const cancelBtn = document.createElement('button'); // Create a cancel (delete) button
    cancelBtn.className = 'btn btn-danger'; // Danger style class
    cancelBtn.textContent = 'إلغاء التسجيل'; // Button text (cancel registration)
    cancelBtn.addEventListener('click', function() { // Event handler for cancel click
        const confirmed = confirm(`هل أنت متأكد من رغبتك في إلغاء التسجيل في "${opportunity.title}"؟`); // Confirmation dialog
        
        if (confirmed) { // If user confirms cancellation
            article.style.transition = 'all 0.3s ease'; // Animate all property changes
            article.style.opacity = '0'; // Fade out
            article.style.transform = 'translateX(-20px)'; // Slide left
            
            setTimeout(() => { // After animation delay
                article.remove(); // Remove from DOM
                const container = getElement('.opportunities-list-profile'); // Locate the containing list
                
                if (container && container.children.length === 0) { // If no registered opportunities left
                    container.innerHTML = `<p class="empty-message">${APP_CONFIG.messages.profile.empty}</p>`; // Show empty state message
                }
            }, 300); // Wait 300ms for animation to finish
        }
    });

    article.appendChild(cancelBtn); // Add cancel button to the article
    
    setTimeout(() => { // Animate fade-in after slight delay (for staggered appearance)
        article.style.transition = 'opacity 0.3s ease, transform 0.3s ease'; // Set transition style
        article.style.opacity = '1'; // Fade to full opacity
        article.style.transform = 'translateY(0)'; // Reset transform
    }, 10 + (index * 100)); // Slightly stagger each row

    return article; // Return the completed article
}

/**
 * Toggle registered opportunities visibility
 */
function toggleRegisteredOpportunities() {
    const container = getElement('.opportunities-list-profile'); // Locate the opportunities list container
    const loadBtn = getElement('#load-events-btn'); // Locate the load/hide button

    if (!container || !loadBtn) return; // Exit if not found

    const isExpanded = loadBtn.classList.contains('active'); // Check if opportunities are currently shown

    if (isExpanded) { // If already shown, collapse and hide the list
        container.innerHTML = `
            <p class="empty-message" style="text-align: center; color: var(--text-light); padding: 2rem; font-style: italic;">
                ${APP_CONFIG.messages.profile.hiddenMsg}
            </p>
        `; // Insert hidden message
        loadBtn.textContent = APP_CONFIG.messages.profile.loadBtnInactive; // Change button text to "Show My Opportunities"
        loadBtn.classList.remove('active'); // Remove active class
    } else { // If hidden, expand and show the list
        container.innerHTML = ''; // Clear the container
        
        if (mockRegisteredOpportunities.length === 0) { // If there are no registered opportunities
            container.innerHTML = `<p class="empty-message">${APP_CONFIG.messages.profile.empty}</p>`; // Show "empty" message
        } else { // Otherwise, populate with opportunities
            mockRegisteredOpportunities.forEach((opp, idx) => { // For each opportunity
                const item = createRegisteredOpportunityItem(opp, idx); // Create an item element
                container.appendChild(item); // Add it to the container
            });
        }
        
        loadBtn.textContent = APP_CONFIG.messages.profile.loadBtnActive; // Change button text to "Hide My Opportunities"
        loadBtn.classList.add('active'); // Add active class
    }
}

/* ============================================
   8. NAVIGATION & UI
   ============================================ */

/**
 * Toggle mobile menu open/closed
 */
function toggleMobileMenu() {
    const navMenu = getElement(APP_CONFIG.selectors.mobileMenu); // Get mobile menu element
    const hamburger = getElement(APP_CONFIG.selectors.hamburger); // Get hamburger menu icon
    
    if (!navMenu || !hamburger) return; // Exit if any required elements missing
    
    const isExpanded = navMenu.classList.contains('active'); // Is menu currently open?
    
    navMenu.classList.toggle('active'); // Toggle the menu's visibility class
    hamburger.classList.toggle('active'); // Toggle the hamburger's animation/class
    hamburger.setAttribute('aria-expanded', !isExpanded); // Update ARIA attribute for accessibility
}

/**
 * Close mobile menu when clicking outside
 * @param {Event} event - Click event
 */
function closeMobileMenuOnClickOutside(event) {
    const navMenu = getElement(APP_CONFIG.selectors.mobileMenu); // Get mobile menu
    const hamburger = getElement(APP_CONFIG.selectors.hamburger); // Get hamburger icon
    const navContainer = getElement('.nav-container'); // Get container of navigation

    if (!navMenu || !navContainer) return; // Safety check
    
    if (!navContainer.contains(event.target)) { // If click is outside navContainer
        navMenu.classList.remove('active'); // Hide the mobile menu
        
        if (hamburger) { // If hamburger exists
            hamburger.classList.remove('active'); // Deactivate hamburger
            hamburger.setAttribute('aria-expanded', 'false'); // Set ARIA attribute for accessibility
        }
    }
}

/* ============================================
   9. EVENT LISTENERS SETUP
   ============================================ */

/**
 * Initialize mobile navigation
 */
function initMobileNavigation() {
    const hamburger = getElement(APP_CONFIG.selectors.hamburger); // Locate the hamburger menu button
    
    if (hamburger) { // If hamburger button exists
        hamburger.addEventListener('click', toggleMobileMenu); // Add click event to toggle mobile menu
    }
    
    document.addEventListener('click', closeMobileMenuOnClickOutside); // Add global click event to close menu when clicking away
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const loginForm = getElement('form[action="login.php"]'); // Get the login form
    if (loginForm) { // If login form exists
        loginForm.addEventListener('submit', validateLoginForm); // Attach submit validation
        setupRealtimeValidation(loginForm); // Attach real-time field validation
    }

    const registerForm = getElement('form[action="register.php"]'); // Get registration form
    if (registerForm) { // If registration form exists
        registerForm.addEventListener('submit', validateRegisterForm); // Attach validation
        setupRealtimeValidation(registerForm); // Real-time validation for registration
    }

    const contactForm = getElement('#contact-form'); // Get contact form (by id)
    if (contactForm) { // If contact form exists
        contactForm.addEventListener('submit', validateContactForm); // Attach validation
        setupRealtimeValidation(contactForm); // Attach real-time validation
    }
}

/**
 * Initialize search and filter functionality
 */
function initSearchAndFilters() {
    const searchBtn = getElement(APP_CONFIG.selectors.searchBtn); // Get search button
    const searchInput = getElement(APP_CONFIG.selectors.searchInput); // Get search input box
    const categoryFilter = getElement(APP_CONFIG.selectors.categoryFilter); // Get category filter dropdown
    const dateFilter = getElement(APP_CONFIG.selectors.dateFilter); // Get date filter dropdown

    if (searchBtn) { // If search button present
        searchBtn.addEventListener('click', filterOpportunities); // Click triggers filter
    }
    
    if (searchInput) { // If search box present
        searchInput.addEventListener('keypress', (e) => { // Handle pressing Enter in the search box
            if (e.key === 'Enter') { // If Enter is pressed
                e.preventDefault(); // Prevent form submission
                filterOpportunities(); // Run the filter logic
            }
        });
    }
    
    if (categoryFilter) { // If category dropdown present
        categoryFilter.addEventListener('change', filterOpportunities); // Selecting a category re-filters
    }
    
    if (dateFilter) { // If date dropdown present
        dateFilter.addEventListener('change', filterOpportunities); // Selecting a date re-filters
    }
}

/**
 * Initialize opportunity detail page
 */
function initOpportunityDetail() {
    if (window.location.pathname.includes('opportunity_detail.html')) { // If we're on the details page
        loadOpportunityDetail(); // Load details into the page
        
        const registerBtn = getElement('#register-btn'); // Get "Register" button
        if (registerBtn) { // If button exists
            registerBtn.addEventListener('click', handleRegistration); // Attach registration logic
        }
    }
}

/**
 * Initialize profile page
 */
function initProfilePage() {
    const loadEventsBtn = getElement('#load-events-btn'); // Get "load events" button
    
    if (loadEventsBtn) { // If the button exists
        loadEventsBtn.addEventListener('click', toggleRegisteredOpportunities); // Attach click event to toggle profile opportunities
    }
}

/* ============================================
   10. MAIN INITIALIZATION
   ============================================ */

/**
 * Main initialization function
 * Called when DOM is fully loaded
 */
function init() {
    console.log('Community Volunteer Hub initialized'); // Log initialization message to the console
    
    initMobileNavigation(); // Initialize mobile menu logic
    initFormValidation(); // Setup form validation listeners
    initSearchAndFilters(); // Attach search/filter listeners
    initOpportunityDetail(); // Setup opportunity detail page logic if needed
    initProfilePage(); // Setup profile page logic if needed
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', init); // When DOMContentLoaded fires, call main initializer


