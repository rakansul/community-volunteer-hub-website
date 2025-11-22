/* ============================================
   Community Volunteer Hub - JavaScript (Arabic)
   ============================================ */

// ============================================
// Form Validation Functions
// ============================================

/**
 * Validates email format using regular expression
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Shows error message for a form field
 * @param {HTMLElement} field - The input field element
 * @param {string} message - Error message to display
 */
function showFieldError(field, message) {
    // Remove any existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }

    // Add error class to field
    field.classList.add('error');
    
    // Create and insert error message
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
 * Removes error styling and message from a field
 * @param {HTMLElement} field - The input field element
 */
function clearFieldError(field) {
    field.classList.remove('error');
    const errorMessage = field.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

/**
 * Validates login form
 * @param {Event} event - Form submit event
 */
function validateLoginForm(event) {
    const form = event.target;
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    let isValid = true;

    // Clear previous errors
    clearFieldError(email);
    clearFieldError(password);

    // Validate email - check if empty
    if (!email.value.trim()) {
        showFieldError(email, 'البريد الإلكتروني مطلوب');
        isValid = false;
    } 
    // Validate email format
    else if (!validateEmail(email.value.trim())) {
        showFieldError(email, 'الرجاء إدخال بريد إلكتروني صحيح');
        isValid = false;
    }

    // Validate password - check if empty
    if (!password.value.trim()) {
        showFieldError(password, 'كلمة المرور مطلوبة');
        isValid = false;
    }

    // Prevent form submission if validation fails
    if (!isValid) {
        event.preventDefault();
        return false;
    }

    // If validation passes, allow form submission
    console.log('Login form is valid. Submitting...');
    return true;
}

/**
 * Validates registration form
 * @param {Event} event - Form submit event
 */
function validateRegisterForm(event) {
    const form = event.target;
    const firstName = form.querySelector('#first-name');
    const lastName = form.querySelector('#last-name');
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    const confirmPassword = form.querySelector('#confirm-password');
    let isValid = true;

    // Clear previous errors
    clearFieldError(firstName);
    clearFieldError(lastName);
    clearFieldError(email);
    clearFieldError(password);
    clearFieldError(confirmPassword);

    // Validate first name
    if (!firstName.value.trim()) {
        showFieldError(firstName, 'الاسم الأول مطلوب');
        isValid = false;
    }

    // Validate last name
    if (!lastName.value.trim()) {
        showFieldError(lastName, 'الاسم الأخير مطلوب');
        isValid = false;
    }

    // Validate email - check if empty
    if (!email.value.trim()) {
        showFieldError(email, 'البريد الإلكتروني مطلوب');
        isValid = false;
    } 
    // Validate email format
    else if (!validateEmail(email.value.trim())) {
        showFieldError(email, 'الرجاء إدخال بريد إلكتروني صحيح');
        isValid = false;
    }

    // Validate password - check if empty
    if (!password.value.trim()) {
        showFieldError(password, 'كلمة المرور مطلوبة');
        isValid = false;
    } 
    // Check password length (optional enhancement)
    else if (password.value.length < 6) {
        showFieldError(password, 'يجب أن لا تقل كلمة المرور عن 6 أحرف');
        isValid = false;
    }

    // Validate confirm password - check if empty
    if (!confirmPassword.value.trim()) {
        showFieldError(confirmPassword, 'الرجاء تأكيد كلمة المرور');
        isValid = false;
    } 
    // Check if passwords match
    else if (password.value !== confirmPassword.value) {
        showFieldError(confirmPassword, 'كلمتا المرور غير متطابقتين');
        isValid = false;
    }

    // Prevent form submission if validation fails
    if (!isValid) {
        event.preventDefault();
        return false;
    }

    // If validation passes, allow form submission
    console.log('Registration form is valid. Submitting...');
    return true;
}

/**
 * Setup real-time validation for form fields
 * @param {HTMLFormElement} form - The form element
 * @param {string} formType - Type of form ('login' or 'register')
 */
function setupRealtimeValidation(form, formType) {
    const emailField = form.querySelector('#email');
    const passwordField = form.querySelector('#password');
    
    if (emailField) {
        emailField.addEventListener('blur', function() {
            if (emailField.value.trim() && !validateEmail(emailField.value.trim())) {
                showFieldError(emailField, 'الرجاء إدخال بريد إلكتروني صحيح');
            } else if (emailField.value.trim()) {
                clearFieldError(emailField);
            }
        });
    }
    
    if (passwordField) {
        passwordField.addEventListener('blur', function() {
            if (!passwordField.value.trim()) {
                showFieldError(passwordField, 'كلمة المرور مطلوبة');
            } else {
                clearFieldError(passwordField);
            }
        });
    }
    
    if (formType === 'register') {
        const firstNameField = form.querySelector('#first-name');
        const lastNameField = form.querySelector('#last-name');
        const confirmPasswordField = form.querySelector('#confirm-password');
        
        if (firstNameField) {
            firstNameField.addEventListener('blur', function() {
                if (!firstNameField.value.trim()) {
                    showFieldError(firstNameField, 'الاسم الأول مطلوب');
                } else {
                    clearFieldError(firstNameField);
                }
            });
        }
        
        if (lastNameField) {
            lastNameField.addEventListener('blur', function() {
                if (!lastNameField.value.trim()) {
                    showFieldError(lastNameField, 'الاسم الأخير مطلوب');
                } else {
                    clearFieldError(lastNameField);
                }
            });
        }
        
        if (passwordField) {
            passwordField.addEventListener('blur', function() {
                if (!passwordField.value.trim()) {
                    showFieldError(passwordField, 'كلمة المرور مطلوبة');
                } else if (passwordField.value.length < 6) {
                    showFieldError(passwordField, 'يجب أن لا تقل كلمة المرور عن 6 أحرف');
                } else {
                    clearFieldError(passwordField);
                }
            });
        }
        
        if (confirmPasswordField && passwordField) {
            confirmPasswordField.addEventListener('blur', function() {
                if (!confirmPasswordField.value.trim()) {
                    showFieldError(confirmPasswordField, 'الرجاء تأكيد كلمة المرور');
                } else if (passwordField.value !== confirmPasswordField.value) {
                    showFieldError(confirmPasswordField, 'كلمتا المرور غير متطابقتين');
                } else {
                    clearFieldError(confirmPasswordField);
                }
            });
            
            // Real-time password matching check
            confirmPasswordField.addEventListener('input', function() {
                if (confirmPasswordField.value && passwordField.value) {
                    if (passwordField.value !== confirmPasswordField.value) {
                        showFieldError(confirmPasswordField, 'كلمتا المرور غير متطابقتين');
                    } else {
                        clearFieldError(confirmPasswordField);
                    }
                }
            });
        }
    }
}

/**
 * Initialize forms with proper detection
 */
function initializeForms() {
    // Login form - check by page URL
    if (window.location.pathname.includes('login.html')) {
        const loginForm = document.querySelector('form.auth-form');
        if (loginForm) {
            loginForm.addEventListener('submit', validateLoginForm);
            setupRealtimeValidation(loginForm, 'login');
        }
    }
    
    // Register form - check by page URL
    if (window.location.pathname.includes('register.html')) {
        const registerForm = document.querySelector('form.auth-form');
        if (registerForm) {
            registerForm.addEventListener('submit', validateRegisterForm);
            setupRealtimeValidation(registerForm, 'register');
        }
    }
}

// ============================================
// Detailed Opportunities Data
// ============================================

/**
 * Mock detailed opportunities data
 * Each object contains comprehensive information for the detail page
 */
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
        description: 'انضم إلى مبادرة السعودية الخضراء، وهي مبادرة وطنية طموحة تهدف إلى زراعة 10 مليارات شجرة في جميع أنحاء المملكة. سيكون هذا اليوم مخصصاً لزراعة الأشجار المحلية في متنزه الملك عبدالله. ستحصل على تدريب كامل على تقنيات الزراعة المستدامة، وستتعلم عن أهمية الحفاظ على البيئة. هذه فرصة رائعة للمساهمة في مستقبل أكثر خضرة لمملكتنا الحبيبة.',
        requirements: 'لا توجد متطلبات خاصة. سنوفر جميع الأدوات والمعدات اللازمة. يُنصح بارتداء ملابس مريحة وقبعة. المشروع مناسب لجميع الأعمار.'
    },
    {
        id: 2,
        title: 'التطوع في موسم الرياض',
        category: 'الترفيه',
        date: '22 نوفمبر 2025',
        datetime: 'السبت، 22 نوفمبر 2025 من 4:00 مساءً إلى 11:00 مساءً',
        location: 'موسم الرياض - منطقة بوليفارد',
        locationDetail: 'منطقة بوليفارد، طريق الملك فهد، الرياض',
        organizer: 'هيئة الموسم',
        description: 'كن جزءاً من أكبر موسم ترفيهي في المنطقة! نحتاج متطوعين نشطين لمساعدة في تنظيم الفعاليات وإرشاد الزوار في منطقة بوليفارد. ستكون مسؤولاً عن مساعدة الزوار في العثور على الفعاليات، الإجابة على الأسئلة، وضمان تجربة ممتعة وآمنة للجميع. ستحصل على شارة متطوع خاصة وستحضر فعاليات حصرية.',
        requirements: 'القدرة على الوقوف والمشي لساعات. مهارات تواصل ممتازة. معرفة أساسية باللغة الإنجليزية مفيدة. يجب أن يكون عمرك 18 عاماً أو أكثر.'
    },
    {
        id: 3,
        title: 'إرشاد سياحي في جدة التاريخية',
        category: 'السياحة',
        date: '23 نوفمبر 2025',
        datetime: 'الأحد، 23 نوفمبر 2025 من 9:00 صباحاً إلى 5:00 مساءً',
        location: 'جدة التاريخية (البلد)',
        locationDetail: 'حي البلد، جدة التاريخية، جدة 21431',
        organizer: 'هيئة السياحة السعودية',
        description: 'شارك شغفك بالتراث والتاريخ! نحتاج مرشدين سياحيين متطوعين لمساعدة السياح في استكشاف جدة التاريخية (البلد)، أحد مواقع التراث العالمي لليونسكو. ستقوم بإرشاد مجموعات صغيرة عبر الأزقة التاريخية، شرح تاريخ المنازل التقليدية، ومساعدة الزوار في فهم أهمية هذا الموقع الثقافي الفريد.',
        requirements: 'معرفة جيدة بتاريخ جدة والتراث السعودي. مهارات تواصل ممتازة. القدرة على المشي لمسافات طويلة. إجادة اللغة الإنجليزية مفيدة جداً.'
    },
    {
        id: 4,
        title: 'مرشد تقني في ملتقى LEAP',
        category: 'التقنية',
        date: '24 نوفمبر 2025',
        datetime: 'الاثنين، 24 نوفمبر 2025 من 7:00 صباحاً إلى 6:00 مساءً',
        location: 'واجهة الرياض',
        locationDetail: 'واجهة الرياض، طريق الملك فهد، الرياض',
        organizer: 'هيئة تطوير منطقة الرياض',
        description: 'كن جزءاً من أكبر ملتقى تقني في المنطقة! نحتاج مرشدين تقنيين لمساعدة الحضور في التنقل بين الجلسات، توجيه الشركات الناشئة، وضمان سير الملتقى بسلاسة. ستتعرف على أحدث الابتكارات التقنية، تلتقي برواد الأعمال والمستثمرين، وتحصل على شارة خاصة تمنحك وصولاً حصرياً لبعض الجلسات.',
        requirements: 'اهتمام بالتقنية والابتكار. مهارات تواصل ممتازة. إجادة اللغة الإنجليزية ضرورية. يجب أن يكون عمرك 20 عاماً أو أكثر.'
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
        description: 'ساهم في مهرجان التمور وساعد في تنظيم الفعاليات والأنشطة الترفيهية المصاحبة للمهرجان. ستكون جزءاً من فريق العمل المسؤول عن استقبال الزوار، تنظيم حركة الدخول والخروج، والمساعدة في الأنشطة التراثية. فرصة رائعة للتعرف على الثقافة المحلية ودعم المزارعين.',
        requirements: 'حسن التعامل مع الجمهور. القدرة على العمل الميداني. الالتزام بأوقات العمل. جميع الأعمار مرحب بها.'
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
        description: 'انضم إلينا ليوم كامل من تنظيف الشواطئ وحماية الحياة البحرية في شاطئ أملج الجميل. سنقوم بجمع النفايات البلاستيكية والمواد الضارة الأخرى التي تهدد الحياة البحرية والشعاب المرجانية النادرة في البحر الأحمر. بعد التنظيف، سنستمتع بجولة غوص سطحية لمراقبة الحياة البحرية. هذه فعالية عائلية مناسبة لجميع الأعمار.',
        requirements: 'القدرة على المشي على الرمال. سنوفر جميع معدات التنظيف. يُنصح بارتداء ملابس سباحة تحت الملابس. لا حاجة لخبرة في الغوص.'
    },
    {
        id: 7,
        title: 'تعليم البرمجة للشباب (عطاء)',
        category: 'التقنية',
        date: '27 نوفمبر 2025',
        datetime: 'الخميس، 27 نوفمبر 2025 من 3:00 مساءً إلى 7:00 مساءً',
        location: 'مراكز الشباب',
        locationDetail: 'مراكز الشباب، أحياء مختلفة في الرياض وجدة',
        organizer: 'مبادرة عطاء',
        description: 'كن مرشداً للشباب وساعدهم على تطوير مهارات البرمجة والثقة في المستقبل! ستعمل مع مجموعات صغيرة من الشباب (12-18 سنة) لتعليمهم أساسيات البرمجة باستخدام لغات مثل Python أو JavaScript. ستحصل على مواد تعليمية جاهزة وستعمل في بيئة داعمة. هذه فرصة رائعة لتمرير المعرفة وإلهام الجيل القادم من المبرمجين.',
        requirements: 'معرفة جيدة بأحد لغات البرمجة (Python, JavaScript, أو Java). مهارات تدريس أو تواصل جيدة. الصبر مع المتعلمين. يجب أن يكون عمرك 18 عاماً أو أكثر.'
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
        description: 'شارك في إرشاد السياح في واحدة من أروع الوجهات السياحية في المملكة! العلا موطن لمواقع تاريخية رائعة مثل مدائن صالح (الحجر) والمنطقة القديمة. ستقوم بإرشاد مجموعات سياحية عبر المواقع الأثرية، شرح التاريخ والثقافة، ومساعدة الزوار في فهم أهمية هذه المنطقة الفريدة. ستحصل على تدريب شامل قبل البدء.',
        requirements: 'معرفة جيدة بتاريخ العلا والمنطقة. مهارات تواصل ممتازة. القدرة على المشي لمسافات طويلة. إجادة اللغة الإنجليزية ضرورية.'
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
        description: 'اقرأ للأطفال وساعد في نشر ثقافة القراءة في مجتمعنا! ستقوم بقراءة القصص للأطفال (5-12 سنة) في جلسات قراءة تفاعلية. ستحصل على مجموعة مختارة من الكتب العربية والإنجليزية المناسبة للأعمار المختلفة. هدفنا هو إلهام حب القراءة لدى الأطفال وجعل المكتبة مكاناً مرحباً وممتعاً لهم.',
        requirements: 'حب القراءة والكتب. مهارات تواصل جيدة مع الأطفال. القدرة على القراءة بصوت واضح ومعبر. جميع الأعمار مرحب بها.'
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
        description: 'قدم الدعم والراحة للمرضى وعائلاتهم في أحد أفضل المستشفيات في المنطقة. ستساعد في إرشاد الزوار، توصيل الهدايا والزهور للمرضى، المساعدة في المهام الإدارية البسيطة، وتقديم الدعم العاطفي للمرضى وعائلاتهم. هذه تجربة مجزية جداً ستتعلم منها الكثير عن التعاطف والخدمة الإنسانية.',
        requirements: 'التعاطف والصبر. مهارات تواصل ممتازة. القدرة على التعامل مع المواقف العاطفية. يجب أن يكون عمرك 18 عاماً أو أكثر. سيتم إجراء فحص خلفية.'
    }
];

// ============================================
// Opportunity Detail Page Functions
// ============================================

/**
 * Loads and populates the opportunity detail page based on URL parameter
 */
function loadOpportunityDetail() {
    // Get the opportunity ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const opportunityId = parseInt(urlParams.get('id'));

    // Find the opportunity in the data array
    const opportunity = detailedOpportunities.find(opp => opp.id === opportunityId);

    if (!opportunity) {
        // If opportunity not found, show error message
        const titleElement = document.getElementById('opportunity-title');
        if (titleElement) {
            titleElement.textContent = 'الفرصة غير موجودة';
        }
        const descriptionElement = document.getElementById('opportunity-description');
        if (descriptionElement) {
            descriptionElement.textContent = 'عذراً، لم يتم العثور على هذه الفرصة. يرجى العودة إلى صفحة الفرص.';
        }
        return;
    }

    // Populate the page with opportunity data
    const titleElement = document.getElementById('opportunity-title');
    if (titleElement) {
        titleElement.textContent = opportunity.title;
    }

    const dateElement = document.getElementById('opportunity-date');
    if (dateElement) {
        dateElement.textContent = ` ${opportunity.date}`;
    }

    const locationElement = document.getElementById('opportunity-location');
    if (locationElement) {
        locationElement.textContent = ` ${opportunity.location}`;
    }

    const categoryElement = document.getElementById('opportunity-category');
    if (categoryElement) {
        categoryElement.textContent = opportunity.category;
    }

    const descriptionElement = document.getElementById('opportunity-description');
    if (descriptionElement) {
        descriptionElement.textContent = opportunity.description;
    }

    const datetimeElement = document.getElementById('opportunity-datetime');
    if (datetimeElement) {
        datetimeElement.textContent = opportunity.datetime;
    }

    const locationDetailElement = document.getElementById('opportunity-location-detail');
    if (locationDetailElement) {
        locationDetailElement.textContent = opportunity.locationDetail;
    }

    const organizerElement = document.getElementById('opportunity-organizer');
    if (organizerElement) {
        organizerElement.textContent = opportunity.organizer;
    }

    const requirementsElement = document.getElementById('opportunity-requirements');
    if (requirementsElement) {
        requirementsElement.textContent = opportunity.requirements;
    }

    // Hide sections if data is not available (optional fields)
    const organizerSection = document.getElementById('organizer-section');
    const requirementsSection = document.getElementById('requirements-section');
    
    if (!opportunity.organizer && organizerSection) {
        organizerSection.style.display = 'none';
    }
    if (!opportunity.requirements && requirementsSection) {
        requirementsSection.style.display = 'none';
    }
}

/**
 * Handles the registration button click
 */
function handleRegistration() {
    const registerBtn = document.getElementById('register-btn');
    const messageDiv = document.getElementById('registration-message');

    if (!registerBtn || !messageDiv) {
        return;
    }

    // Get opportunity ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const opportunityId = parseInt(urlParams.get('id'));
    const opportunity = detailedOpportunities.find(opp => opp.id === opportunityId);

    if (!opportunity) {
        return;
    }

    // Show success message
    messageDiv.textContent = `تم التسجيل بنجاح في "${opportunity.title}"! شكراً لك على التطوع. سيتم التواصل معك قريباً عبر البريد الإلكتروني.`;
    messageDiv.className = 'registration-message success';
    
    // Disable the button to prevent multiple registrations
    registerBtn.disabled = true;
    registerBtn.textContent = 'تم التسجيل ✓';
    registerBtn.style.opacity = '0.7';
    registerBtn.style.cursor = 'not-allowed';

    // Scroll to the message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============================================
// Search and Filter Functionality
// ============================================

/**
 * Filters opportunities based on search query and filters
 */
function filterOpportunities() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const dateFilter = document.getElementById('date-filter');
    const opportunityCards = document.querySelectorAll('.opportunity-card');

    if (!searchInput || !categoryFilter || !dateFilter) {
        return;
    }

    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedDate = dateFilter.value;

    opportunityCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent.toLowerCase() || '';
        const category = card.querySelector('.category')?.textContent.toLowerCase() || '';
        
        // Check search term
        const matchesSearch = !searchTerm || 
            title.includes(searchTerm) || 
            description.includes(searchTerm);
        
        // Check category
        const matchesCategory = !selectedCategory || 
            category.includes(selectedCategory.toLowerCase()) ||
            (selectedCategory === 'environment' && category.includes('البيئة')) ||
            (selectedCategory === 'entertainment' && category.includes('الترفيه')) ||
            (selectedCategory === 'tourism' && category.includes('السياحة')) ||
            (selectedCategory === 'tech' && category.includes('التقنية')) ||
            (selectedCategory === 'education' && category.includes('التعليم')) ||
            (selectedCategory === 'healthcare' && category.includes('الرعاية')) ||
            (selectedCategory === 'community' && category.includes('المجتمع'));
        
        // Show/hide card based on filters
        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            // Smooth fade in
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease';
                card.style.opacity = '1';
            }, 10);
        } else {
            card.style.display = 'none';
        }
    });

    // Show "no results" message if needed
    showNoResultsMessage(opportunityCards);
}

/**
 * Shows message when no opportunities match filters
 * @param {NodeList} cards - NodeList of opportunity cards
 */
function showNoResultsMessage(cards) {
    const container = document.querySelector('.opportunities-grid');
    if (!container) return;

    const visibleCards = Array.from(cards).filter(card => 
        card.style.display !== 'none'
    );

    // Remove existing message
    const existingMsg = container.querySelector('.no-results-message');
    if (existingMsg) {
        existingMsg.remove();
    }

    // Add message if no results
    if (visibleCards.length === 0) {
        const message = document.createElement('div');
        message.className = 'no-results-message';
        message.style.gridColumn = '1 / -1';
        message.style.textAlign = 'center';
        message.style.padding = '3rem';
        message.style.color = 'var(--text-light)';
        message.innerHTML = `
            <h3 style="margin-bottom: 1rem; color: var(--primary-color);">
                لم يتم العثور على نتائج
            </h3>
            <p>جرب تعديل معايير البحث أو الفلاتر</p>
        `;
        container.appendChild(message);
    }
}

// ============================================
// Dynamic Opportunities Loading (Profile Page)
// ============================================

/**
 * Mock data for registered opportunities (Localized for Saudi Arabia)
 */
const mockOpportunities = [
    {
        title: 'مبادرة السعودية الخضراء',
        date: '21 نوفمبر 2025',
        location: 'الرياض'
    },
    {
        title: 'التطوع في موسم الرياض',
        date: '22 نوفمبر 2025',
        location: 'موسم الرياض'
    },
    {
        title: 'حماية شواطئ البحر الأحمر',
        date: '26 نوفمبر 2025',
        location: 'شاطئ أملج'
    },
    {
        title: 'جودة الحياة: مساعدة كبار السن',
        date: '25 نوفمبر 2025',
        location: 'مراكز مجتمعية'
    },
    {
        title: 'تعليم البرمجة للشباب (عطاء)',
        date: '27 نوفمبر 2025',
        location: 'مراكز الشباب'
    }
];

/**
 * Creates an opportunity item element
 * @param {Object} opportunity - Opportunity data object
 * @returns {HTMLElement} - Created opportunity item element
 */
function createOpportunityItem(opportunity) {
    const article = document.createElement('article');
    article.className = 'opportunity-item';
    article.style.opacity = '0';
    article.style.transform = 'translateY(10px)';
    article.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    const itemContent = document.createElement('div');
    itemContent.className = 'item-content';

    const h4 = document.createElement('h4');
    h4.textContent = opportunity.title;

    const itemMeta = document.createElement('div');
    itemMeta.className = 'item-meta';

    const dateSpan = document.createElement('span');
    dateSpan.className = 'date';
    dateSpan.textContent = ` ${opportunity.date}`;

    const locationSpan = document.createElement('span');
    locationSpan.className = 'location';
    locationSpan.textContent = ` ${opportunity.location}`;

    itemMeta.appendChild(dateSpan);
    itemMeta.appendChild(locationSpan);
    itemContent.appendChild(h4);
    itemContent.appendChild(itemMeta);

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-danger';
    cancelBtn.textContent = 'إلغاء التسجيل';
    cancelBtn.addEventListener('click', function() {
        if (confirm(`هل أنت متأكد من رغبتك في إلغاء التسجيل في "${opportunity.title}"؟`)) {
            article.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            article.style.opacity = '0';
            article.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                article.remove();
                // If no opportunities left, show empty message
                const container = document.querySelector('.opportunities-list-profile');
                if (container && container.children.length === 0) {
                    showEmptyMessage(container);
                }
            }, 300);
        }
    });

    article.appendChild(itemContent);
    article.appendChild(cancelBtn);

    // Animate in
    setTimeout(() => {
        article.style.opacity = '1';
        article.style.transform = 'translateY(0)';
    }, 10);

    return article;
}

/**
 * Shows empty message when no opportunities are registered
 * @param {HTMLElement} container - Container element
 */
function showEmptyMessage(container) {
    const emptyMsg = document.createElement('p');
    emptyMsg.className = 'empty-message';
    emptyMsg.textContent = 'ليس لديك أي فرص مسجلة. تصفح الفرص لتبدأ!';
    emptyMsg.style.textAlign = 'center';
    emptyMsg.style.color = 'var(--text-light)';
    emptyMsg.style.padding = '2rem';
    emptyMsg.style.fontStyle = 'italic';
    container.appendChild(emptyMsg);
}

/**
 * Loads and displays registered opportunities
 */
function loadRegisteredOpportunities() {
    const container = document.querySelector('.opportunities-list-profile');
    const loadBtn = document.getElementById('load-events-btn');

    if (!container || !loadBtn) {
        return;
    }

    // Check if opportunities are already loaded
    const isLoaded = container.querySelector('.opportunity-item') !== null;
    const isEmptyMessage = container.querySelector('.empty-message') !== null;

    if (isLoaded || isEmptyMessage) {
        // Hide opportunities
        container.innerHTML = '<p class="empty-message" style="text-align: center; color: var(--text-light); padding: 2rem; font-style: italic;">انقر على "عرض فُرصي" لعرض الفرص المسجل بها.</p>';
        loadBtn.textContent = 'عرض فُرصي';
        loadBtn.classList.remove('active');
    } else {
        // Load opportunities
        container.innerHTML = '';
        
        if (mockOpportunities.length === 0) {
            showEmptyMessage(container);
        } else {
            mockOpportunities.forEach((opportunity, index) => {
                const item = createOpportunityItem(opportunity);
                // Stagger animation
                item.style.transitionDelay = `${index * 0.1}s`;
                container.appendChild(item);
            });
        }

        loadBtn.textContent = 'إخفاء فُرصي';
        loadBtn.classList.add('active');
    }
}

// ============================================
// Mobile Menu Toggle with Accessibility
// ============================================

/**
 * Enhanced mobile menu toggle with ARIA attributes
 */
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (navMenu && hamburger) {
        const isExpanded = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Update ARIA attribute
        hamburger.setAttribute('aria-expanded', !isExpanded);
        
        // Trap focus in menu when open
        if (!isExpanded) {
            const firstLink = navMenu.querySelector('a');
            if (firstLink) {
                setTimeout(() => firstLink.focus(), 100);
            }
        }
    }
}

/**
 * Closes mobile menu when clicking outside
 * @param {Event} event - Click event
 */
function closeMobileMenuOnClickOutside(event) {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    const navContainer = document.querySelector('.nav-container');

    if (navMenu && navContainer && !navContainer.contains(event.target)) {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
}

// ============================================
// Initialize on DOM Load
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // Form Validation Setup (Enhanced)
    // ============================================
    initializeForms();

    // ============================================
    // Search and Filter Functionality
    // ============================================
    const searchBtn = document.querySelector('.search-btn');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const dateFilter = document.getElementById('date-filter');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', filterOpportunities);
    }
    
    if (searchInput) {
        searchInput.addEventListener('input', filterOpportunities);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterOpportunities);
    }
    
    if (dateFilter) {
        dateFilter.addEventListener('change', filterOpportunities);
    }

    // ============================================
    // Opportunity Detail Page - Load Detail
    // ============================================
    if (window.location.pathname.includes('opportunity_detail.html')) {
        loadOpportunityDetail();

        // Set up registration button
        const registerBtn = document.getElementById('register-btn');
        if (registerBtn) {
            registerBtn.addEventListener('click', handleRegistration);
        }
    }

    // ============================================
    // Profile Page - Load Events Button
    // ============================================
    const loadEventsBtn = document.getElementById('load-events-btn');
    if (loadEventsBtn) {
        loadEventsBtn.addEventListener('click', loadRegisteredOpportunities);
    }

     // ============================================
     // Contact Form Handling
     // ============================================
     const contactForm = document.getElementById('contact-form');
     if (contactForm) {
         contactForm.addEventListener('submit', function(event) {
             event.preventDefault();
             
             const nameField = contactForm.querySelector('#contact-name');
             const emailField = contactForm.querySelector('#contact-email');
             const subjectField = contactForm.querySelector('#contact-subject');
             const messageField = contactForm.querySelector('#contact-message');
             const resultDiv = document.getElementById('contact-message-result');
             
             let isValid = true;
             
             // Clear previous errors
             clearFieldError(nameField);
             clearFieldError(emailField);
             clearFieldError(subjectField);
             clearFieldError(messageField);
             
             // Validate name
             if (!nameField.value.trim()) {
                 showFieldError(nameField, 'الاسم الكامل مطلوب');
                 isValid = false;
             }
             
             // Validate email
             if (!emailField.value.trim()) {
                 showFieldError(emailField, 'البريد الإلكتروني مطلوب');
                 isValid = false;
             } else if (!validateEmail(emailField.value.trim())) {
                 showFieldError(emailField, 'الرجاء إدخال بريد إلكتروني صحيح');
                 isValid = false;
             }
             
             // Validate subject
             if (!subjectField.value.trim()) {
                 showFieldError(subjectField, 'الموضوع مطلوب');
                 isValid = false;
             }
             
             // Validate message
             if (!messageField.value.trim()) {
                 showFieldError(messageField, 'الرسالة مطلوبة');
                 isValid = false;
             }
             
             if (isValid) {
                 // Show success message
                 resultDiv.textContent = 'شكراً لك! تم إرسال رسالتك بنجاح. سنتواصل معك قريباً.';
                 resultDiv.className = 'registration-message success';
                 
                 // Reset form
                 contactForm.reset();
                 
                 // Scroll to message
                 resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                 
                 // Hide message after 5 seconds
                 setTimeout(() => {
                     resultDiv.textContent = '';
                     resultDiv.className = 'registration-message';
                 }, 5000);
             }
         });
         
         // Real-time validation for contact form
         const emailField = contactForm.querySelector('#contact-email');
         if (emailField) {
             emailField.addEventListener('blur', function() {
                 if (emailField.value.trim() && !validateEmail(emailField.value.trim())) {
                     showFieldError(emailField, 'الرجاء إدخال بريد إلكتروني صحيح');
                 } else if (emailField.value.trim()) {
                     clearFieldError(emailField);
                 }
             });
         }
     }

     // ============================================
     // Mobile Menu Toggle Setup (Enhanced)
     // ============================================
     const hamburger = document.querySelector('.hamburger');
     if (hamburger) {
         // Set initial ARIA attribute
         hamburger.setAttribute('aria-expanded', 'false');
         hamburger.addEventListener('click', toggleMobileMenu);
     }

    // Close menu when clicking outside
    document.addEventListener('click', closeMobileMenuOnClickOutside);

    // Close menu when clicking on a nav link (mobile)
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu && window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                if (hamburger) {
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
});