/* ============================================
   Community Volunteer Hub - Main Script
   ============================================ */

/* ============================================
   1. CONFIGURATION & CONSTANTS
   ============================================ */
   const APP_CONFIG = {
    selectors: {
        searchBtn: '.btn-search', // Fixed: Matches HTML class
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
            passwordLength: 'يجب أن لا تقل كلمة المرور عن 8 أحرف',
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
        location: ' الرياض',
        locationDetail: 'منطقة بوليفارد',
        organizer: 'هيئة الموسم',
        description: 'كن جزءاً من أكبر موسم ترفيهي في المنطقة! نحتاج متطوعين لمساعدة في تنظيم الفعاليات وإرشاد الزوار في منطقة بوليفارد.',
        requirements: 'القدرة على الوقوف والمشي لساعات. مهارات تواصل ممتازة. معرفة أساسية باللغة الإنجليزية .'
    },
    {
        id: 3,
        title: 'إرشاد سياحي في جدة التاريخية',
        category: 'السياحة',
        date: '23 نوفمبر 2025',
        datetime: 'الأحد، 23 نوفمبر 2025 من 9:00 صباحاً إلى 5:00 مساءً',
        location: 'جدة ',
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
        location: ' الرياض',
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
        location: 'الرياض'
        locationDetail: 'مراكز الشباب، الرياض ',
        organizer: 'مبادرة عطاء',
        description: 'كن مرشداً للشباب وساعدهم على تطوير مهارات البرمجة والثقة في المستقبل!',
        requirements: 'معرفة جيدة بأحد لغات البرمجة. مهارات تدريس و التواصل جيدة.'
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

// User's registered opportunities for Profile page
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
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Display error message under an input field
 */

function showFieldError(field, message) {
    clearFieldError(field); // Avoid duplicates
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
 * Remove error message and styling
 */
function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
}

/* ============================================
   4. FEATURE: FORM VALIDATION (Auth & Contact)
   ============================================ */

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

function validateRegisterForm(event) {
    const form = event.target;
    const firstName = form.querySelector('#first-name');
    const lastName = form.querySelector('#last-name');
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    const confirmPassword = form.querySelector('#confirm-password');
    let isValid = true;

    // Clear all errors first
    [firstName, lastName, email, password, confirmPassword].forEach(clearFieldError);

    // Names
    if (!firstName.value.trim()) { showFieldError(firstName, APP_CONFIG.messages.validation.nameFirst); isValid = false; }
    if (!lastName.value.trim()) { showFieldError(lastName, APP_CONFIG.messages.validation.nameLast); isValid = false; }

    // Email
    if (!email.value.trim()) {
        showFieldError(email, APP_CONFIG.messages.validation.emailRequired);
        isValid = false;
    } else if (!validateEmail(email.value.trim())) {
        showFieldError(email, APP_CONFIG.messages.validation.emailInvalid);
        isValid = false;
    }

    // Password
    if (!password.value.trim()) {
        showFieldError(password, APP_CONFIG.messages.validation.passwordRequired);
        isValid = false;
    } else if (password.value.length < 6) {
        showFieldError(password, APP_CONFIG.messages.validation.passwordLength);
        isValid = false;
    }

    // Confirm Password
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

function validateContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('#contact-name');
    const email = form.querySelector('#contact-email');
    const subject = form.querySelector('#contact-subject');
    const message = form.querySelector('#contact-message');
    const resultDiv = document.getElementById('contact-message-result');
    let isValid = true;

    [name, email, subject, message].forEach(clearFieldError);

    if (!name.value.trim()) { showFieldError(name, APP_CONFIG.messages.validation.nameFull); isValid = false; }
    if (!email.value.trim()) { showFieldError(email, APP_CONFIG.messages.validation.emailRequired); isValid = false; }
    else if (!validateEmail(email.value.trim())) { showFieldError(email, APP_CONFIG.messages.validation.emailInvalid); isValid = false; }
    if (!subject.value.trim()) { showFieldError(subject, APP_CONFIG.messages.validation.subject); isValid = false; }
    if (!message.value.trim()) { showFieldError(message, APP_CONFIG.messages.validation.message); isValid = false; }

    if (isValid) {
        resultDiv.textContent = APP_CONFIG.messages.contact.success;
        resultDiv.className = 'registration-message success';
        form.reset();
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => {
            resultDiv.textContent = '';
            resultDiv.className = 'registration-message';
        }, 5000);
    }
}

function setupRealtimeValidation(form, formType) {
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                if (input.type === 'email') showFieldError(input, APP_CONFIG.messages.validation.emailRequired);
                else showFieldError(input, APP_CONFIG.messages.validation.required);
            } else if (input.type === 'email' && input.value.trim() && !validateEmail(input.value.trim())) {
                showFieldError(input, APP_CONFIG.messages.validation.emailInvalid);
            } else {
                clearFieldError(input);
            }
        });
    });
}

/* ============================================
   5. FEATURE: SEARCH & FILTERS
   ============================================ */

function filterOpportunities() {
    const searchInput = document.querySelector(APP_CONFIG.selectors.searchInput);
    const categoryFilter = document.querySelector(APP_CONFIG.selectors.categoryFilter);
    const dateFilter = document.querySelector(APP_CONFIG.selectors.dateFilter);
    const opportunityCards = document.querySelectorAll('.opportunity-card');

    if (!searchInput || !categoryFilter) return;

    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    let hasVisibleItems = false;

    opportunityCards.forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
        const description = card.querySelector('p')?.textContent.toLowerCase() || '';
        const category = card.querySelector('.category')?.textContent.toLowerCase() || '';

        const matchesSearch = !searchTerm || title.includes(searchTerm) || description.includes(searchTerm);
        
        // Category mapping checks
        const matchesCategory = !selectedCategory || 
            category.includes(selectedCategory.toLowerCase()) ||
            (selectedCategory === 'environment' && category.includes('البيئة')) ||
            (selectedCategory === 'entertainment' && category.includes('الترفيه')) ||
            (selectedCategory === 'tourism' && category.includes('السياحة')) ||
            (selectedCategory === 'tech' && category.includes('التقنية')) ||
            (selectedCategory === 'education' && category.includes('التعليم')) ||
            (selectedCategory === 'healthcare' && category.includes('الرعاية')) ||
            (selectedCategory === 'community' && category.includes('المجتمع'));

        if (matchesSearch && matchesCategory) {
            card.style.display = 'block';
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.transition = 'opacity 0.3s ease';
                card.style.opacity = '1';
            }, 10);
            hasVisibleItems = true;
        } else {
            card.style.display = 'none';
        }
    });

    toggleNoResultsMessage(!hasVisibleItems);
}

function toggleNoResultsMessage(show) {
    const container = document.querySelector('.opportunities-grid');
    if (!container) return;

    const existingMsg = container.querySelector('.no-results-message');
    if (existingMsg) existingMsg.remove();

    if (show) {
        const message = document.createElement('div');
        message.className = 'no-results-message';
        message.innerHTML = `
            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">${APP_CONFIG.messages.search.noResults}</h3>
        `;
        container.appendChild(message);
    }
}

/* ============================================
   6. FEATURE: OPPORTUNITY DETAILS PAGE
   ============================================ */

function loadOpportunityDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const opportunityId = parseInt(urlParams.get('id'));
    const opportunity = detailedOpportunities.find(opp => opp.id === opportunityId);

    // Elements
    const elTitle = document.getElementById('opportunity-title');
    const elDesc = document.getElementById('opportunity-description');
    const elDate = document.getElementById('opportunity-date');
    const elLoc = document.getElementById('opportunity-location');
    const elCat = document.getElementById('opportunity-category');
    const elDateTime = document.getElementById('opportunity-datetime');
    const elLocDetail = document.getElementById('opportunity-location-detail');
    const elOrganizer = document.getElementById('opportunity-organizer');
    const elReq = document.getElementById('opportunity-requirements');

    if (!opportunity) {
        if (elTitle) elTitle.textContent = APP_CONFIG.messages.registration.notFoundTitle;
        if (elDesc) elDesc.textContent = APP_CONFIG.messages.registration.notFoundDesc;
        return;
    }

    // Populate Data
    if (elTitle) elTitle.textContent = opportunity.title;
    if (elDate) elDate.textContent = opportunity.date;
    if (elLoc) elLoc.textContent = opportunity.location;
    if (elCat) elCat.textContent = opportunity.category;
    if (elDesc) elDesc.textContent = opportunity.description;
    if (elDateTime) elDateTime.textContent = opportunity.datetime;
    if (elLocDetail) elLocDetail.textContent = opportunity.locationDetail;
    if (elOrganizer) elOrganizer.textContent = opportunity.organizer || '-';
    if (elReq) elReq.textContent = opportunity.requirements || '-';
}

function handleRegistration() {
    const registerBtn = document.getElementById('register-btn');
    const messageDiv = document.getElementById('registration-message');
    const urlParams = new URLSearchParams(window.location.search);
    const opportunityId = parseInt(urlParams.get('id'));
    const opportunity = detailedOpportunities.find(opp => opp.id === opportunityId);

    if (!registerBtn || !messageDiv || !opportunity) return;

    // Success UI
    messageDiv.textContent = APP_CONFIG.messages.registration.success(opportunity.title);
    messageDiv.className = 'registration-message success';
    
    registerBtn.disabled = true;
    registerBtn.textContent = APP_CONFIG.messages.registration.buttonSuccess;
    registerBtn.style.opacity = '0.7';
    registerBtn.style.cursor = 'not-allowed';
    
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ============================================
   7. FEATURE: PROFILE PAGE
   ============================================ */

function createRegisteredOpportunityItem(opportunity) {
    const article = document.createElement('article');
    article.className = 'opportunity-item';
    article.style.opacity = '0';
    article.style.transform = 'translateY(10px)';
    
    article.innerHTML = `
        <div class="item-content">
            <h4>${opportunity.title}</h4>
            <div class="item-meta">
                <span class="date">${opportunity.date}</span>
                <span class="location">${opportunity.location}</span>
            </div>
        </div>
    `;

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-danger';
    cancelBtn.textContent = 'إلغاء التسجيل';
    cancelBtn.addEventListener('click', function() {
        if (confirm(`هل أنت متأكد من رغبتك في إلغاء التسجيل في "${opportunity.title}"؟`)) {
            article.style.transition = 'all 0.3s ease';
            article.style.opacity = '0';
            article.style.transform = 'translateX(-20px)';
            setTimeout(() => {
                article.remove();
                const container = document.querySelector('.opportunities-list-profile');
                if (container && container.children.length === 0) {
                    container.innerHTML = `<p class="empty-message">${APP_CONFIG.messages.profile.empty}</p>`;
                }
            }, 300);
        }
    });

    article.appendChild(cancelBtn);
    
    // Animation trigger
    setTimeout(() => {
        article.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        article.style.opacity = '1';
        article.style.transform = 'translateY(0)';
    }, 10);

    return article;
}

function toggleRegisteredOpportunities() {
    const container = document.querySelector('.opportunities-list-profile');
    const loadBtn = document.getElementById('load-events-btn');

    if (!container || !loadBtn) return;

    const isExpanded = loadBtn.classList.contains('active');

    if (isExpanded) {
        // Hide
        container.innerHTML = `<p class="empty-message" style="text-align: center; color: var(--text-light); padding: 2rem; font-style: italic;">${APP_CONFIG.messages.profile.hiddenMsg}</p>`;
        loadBtn.textContent = APP_CONFIG.messages.profile.loadBtnInactive;
        loadBtn.classList.remove('active');
    } else {
        // Show
        container.innerHTML = '';
        if (mockRegisteredOpportunities.length === 0) {
            container.innerHTML = `<p class="empty-message">${APP_CONFIG.messages.profile.empty}</p>`;
        } else {
            mockRegisteredOpportunities.forEach((opp, idx) => {
                const item = createRegisteredOpportunityItem(opp);
                item.style.transitionDelay = `${idx * 0.1}s`;
                container.appendChild(item);
            });
        }
        loadBtn.textContent = APP_CONFIG.messages.profile.loadBtnActive;
        loadBtn.classList.add('active');
    }
}

/* ============================================
   8. NAVIGATION & UI HELPERS
   ============================================ */

function toggleMobileMenu() {
    const navMenu = document.querySelector(APP_CONFIG.selectors.mobileMenu);
    const hamburger = document.querySelector(APP_CONFIG.selectors.hamburger);
    
    if (navMenu && hamburger) {
        const isExpanded = navMenu.classList.contains('active');
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isExpanded);
    }
}

function closeMobileMenuOnClickOutside(event) {
    const navMenu = document.querySelector(APP_CONFIG.selectors.mobileMenu);
    const hamburger = document.querySelector(APP_CONFIG.selectors.hamburger);
    const navContainer = document.querySelector('.nav-container');

    if (navMenu && navContainer && !navContainer.contains(event.target)) {
        navMenu.classList.remove('active');
        if (hamburger) {
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
}

/* ============================================
   9. INITIALIZATION (MAIN)
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    console.log('App initialized.');

    // --- Mobile Menu ---
    const hamburger = document.querySelector(APP_CONFIG.selectors.hamburger);
    if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
    document.addEventListener('click', closeMobileMenuOnClickOutside);

    // --- Forms ---
    const loginForm = document.querySelector('form[action="login.php"]');
    if (loginForm) {
        loginForm.addEventListener('submit', validateLoginForm);
        setupRealtimeValidation(loginForm, 'login');
    }

    const registerForm = document.querySelector('form[action="register.php"]');
    if (registerForm) {
        registerForm.addEventListener('submit', validateRegisterForm);
        setupRealtimeValidation(registerForm, 'register');
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
        setupRealtimeValidation(contactForm, 'contact');
    }

    // --- Search (Fixed Selector & Enter Key) ---
    const searchBtn = document.querySelector(APP_CONFIG.selectors.searchBtn);
    const searchInput = document.querySelector(APP_CONFIG.selectors.searchInput);
    const categoryFilter = document.querySelector(APP_CONFIG.selectors.categoryFilter);
    const dateFilter = document.querySelector(APP_CONFIG.selectors.dateFilter);

    if (searchBtn) searchBtn.addEventListener('click', filterOpportunities);
    if (categoryFilter) categoryFilter.addEventListener('change', filterOpportunities);
    if (dateFilter) dateFilter.addEventListener('change', filterOpportunities);
    
    if (searchInput) {
        searchInput.addEventListener('input', filterOpportunities);
        // Added Enter key support
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                filterOpportunities();
            }
        });
    }

    // --- Detail Page ---
    if (window.location.pathname.includes('opportunity_detail.html')) {
        loadOpportunityDetail();
        const regBtn = document.getElementById('register-btn');
        if (regBtn) regBtn.addEventListener('click', handleRegistration);
    }

    // --- Profile Page ---
    const loadEventsBtn = document.getElementById('load-events-btn');
    if (loadEventsBtn) {
        loadEventsBtn.addEventListener('click', toggleRegisteredOpportunities);
    }
});
