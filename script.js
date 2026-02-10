// ============================================
//   العفرون أونلاين - El Affroun Online
//   Main JavaScript File
//   Developed with ❤️ in Algeria
// ============================================

// ========== Firebase Configuration ==========
const firebaseConfig = {
    apiKey: "AIzaSyAaXp-gUOQ_G2s-kM8JhaqW8TJcJ4Nqcuo",
    authDomain: "comondi-fae4b.firebaseapp.com",
    projectId: "comondi-fae4b",
    storageBucket: "comondi-fae4b.firebasestorage.app",
    messagingSenderId: "932777870241",
    appId: "1:932777870241:web:78b0cf3a3cf14046be01e0",
    measurementId: "G-M09RX0V18S"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// ========== App State ==========
const AppState = {
    lang: localStorage.getItem('lang') || 'ar',
    user: null,
    currentPage: 'home',
    ads: [],
    sliders: [],
    messages: [],
    reports: [],
    users: [],
    selectedAd: null,
    selectedProfile: null,
    selectedChat: null,
    bannerIndex: 0,
    categoryIndex: 0,
    filters: {
        category: '',
        city: '',
        priceMin: '',
        priceMax: '',
        search: ''
    }
};

// ========== Data ==========
const categories = [
    { id: 'cars', name: { ar: 'سيارات ومركبات', fr: 'Véhicules' }, icon: 'fa-car', img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200&h=200&fit=crop' },
    { id: 'realestate', name: { ar: 'عقارات', fr: 'Immobilier' }, icon: 'fa-home', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=200&h=200&fit=crop' },
    { id: 'phones', name: { ar: 'هواتف وإلكترونيات', fr: 'Téléphones' }, icon: 'fa-mobile-alt', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop' },
    { id: 'jobs', name: { ar: 'فرص عمل', fr: 'Emploi' }, icon: 'fa-briefcase', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=200&fit=crop' },
    { id: 'services', name: { ar: 'خدمات', fr: 'Services' }, icon: 'fa-concierge-bell', img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=200&h=200&fit=crop' },
    { id: 'appliances', name: { ar: 'أجهزة كهرومنزلية', fr: 'Électroménager' }, icon: 'fa-tv', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop' },
    { id: 'fashion', name: { ar: 'ألبسة وموضة', fr: 'Mode' }, icon: 'fa-tshirt', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop' },
    { id: 'equipment', name: { ar: 'معدات مهنية', fr: 'Équipement pro' }, icon: 'fa-tools', img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=200&h=200&fit=crop' },
    { id: 'sweets', name: { ar: 'حلويات', fr: 'Pâtisseries' }, icon: 'fa-birthday-cake', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=200&h=200&fit=crop' },
    { id: 'sewing', name: { ar: 'خياطة', fr: 'Couture' }, icon: 'fa-cut', img: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=200&h=200&fit=crop' },
    { id: 'beauty', name: { ar: 'تجميل وعناية', fr: 'Beauté' }, icon: 'fa-spa', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&h=200&fit=crop' },
    { id: 'other', name: { ar: 'أخرى', fr: 'Autres' }, icon: 'fa-ellipsis-h', img: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=200&h=200&fit=crop' }
];

const cities = [
    { id: 'elaffroun', name: { ar: 'العفرون', fr: 'El Affroun' } },
    { id: 'mouzaia', name: { ar: 'موزاية', fr: 'Mouzaia' } },
    { id: 'chiffa', name: { ar: 'شفة', fr: 'Chiffa' } },
    { id: 'ouedjer', name: { ar: 'واد جر', fr: 'Oued Jer' } },
    { id: 'ahmerlaain', name: { ar: 'أحمر العين', fr: 'Ahmer El Ain' } },
    { id: 'hatatba', name: { ar: 'حطاطبة', fr: 'Hatatba' } }
];

const defaultSliders = [
    {
        title: { ar: '🎉 عروض خاصة على الهواتف الذكية', fr: '🎉 Offres spéciales sur les smartphones' },
        desc: { ar: 'خصومات تصل إلى 30% على أحدث الموديلات', fr: 'Réductions jusqu\'à 30% sur les derniers modèles' },
        img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=500&fit=crop',
        link: ''
    },
    {
        title: { ar: '🏠 عقارات للبيع والإيجار', fr: '🏠 Immobilier à vendre et à louer' },
        desc: { ar: 'أفضل العروض العقارية في المنطقة', fr: 'Les meilleures offres immobilières de la région' },
        img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=500&fit=crop',
        link: ''
    },
    {
        title: { ar: '🚗 سيارات بأسعار مناسبة', fr: '🚗 Voitures à prix abordables' },
        desc: { ar: 'سيارات جديدة ومستعملة بأفضل الأسعار', fr: 'Voitures neuves et d\'occasion aux meilleurs prix' },
        img: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&h=500&fit=crop',
        link: ''
    },
    {
        title: { ar: '👕 أحدث صيحات الموضة', fr: '👕 Dernières tendances mode' },
        desc: { ar: 'تشكيلة واسعة من الملابس والأزياء', fr: 'Large collection de vêtements et mode' },
        img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=500&fit=crop',
        link: ''
    }
];

// ========== Translations ==========
const translations = {
    ar: {
        home: 'الرئيسية',
        login: 'تسجيل الدخول',
        register: 'إنشاء حساب',
        logout: 'تسجيل الخروج',
        myAds: 'إعلاناتي',
        messages: 'الرسائل',
        profile: 'الملف الشخصي',
        editProfile: 'تعديل الملف',
        allAds: 'جميع الإعلانات',
        categories: 'الفئات',
        addAd: 'نشر إعلان جديد',
        filter: 'فلترة النتائج',
        search: 'بحث',
        searchPlaceholder: 'ابحث عن...',
        category: 'الفئة',
        title: 'العنوان',
        description: 'الوصف',
        price: 'السعر',
        city: 'المدينة',
        phone: 'رقم الهاتف',
        image: 'الصورة',
        publish: 'نشر الإعلان',
        publishing: 'جاري النشر...',
        showPhone: 'إظهار رقم الهاتف',
        sendMessage: 'مراسلة البائع',
        report: 'الإبلاغ عن هذا الإعلان',
        reportTitle: 'الإبلاغ',
        reportReason: 'سبب البلاغ',
        reportSubmit: 'إرسال البلاغ',
        back: 'رجوع',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        confirmPassword: 'تأكيد كلمة المرور',
        name: 'الاسم',
        loginBtn: 'دخول',
        registerBtn: 'تسجيل',
        noAccount: 'ليس لديك حساب؟',
        hasAccount: 'لديك حساب بالفعل؟',
        aboutUs: 'من نحن',
        privacy: 'سياسة الخصوصية',
        contact: 'اتصل بنا',
        reportProblem: 'الإبلاغ عن مشكل',
        selectCategory: 'اختر الفئة',
        selectCity: 'اختر المدينة',
        allCategories: 'جميع الفئات',
        allCities: 'جميع المدن',
        priceRange: 'نطاق السعر',
        minPrice: 'أدنى سعر',
        maxPrice: 'أقصى سعر',
        applyFilter: 'تطبيق الفلتر',
        resetFilter: 'إعادة تعيين',
        featuredAds: 'إعلانات مميزة',
        latestAds: 'أحدث الإعلانات',
        viewAll: 'عرض الكل',
        seller: 'البائع',
        memberSince: 'عضو منذ',
        inbox: 'الواردة',
        archive: 'الأرشيف',
        noMessages: 'لا توجد رسائل',
        typeMessage: 'اكتب رسالتك...',
        send: 'إرسال',
        da: 'دج',
        browseAds: 'تصفح الإعلانات',
        uploadImage: 'انقر لرفع صورة',
        requiredLogin: 'يجب تسجيل الدخول أولاً',
        adPublished: 'تم نشر الإعلان بنجاح!',
        messageSent: 'تم إرسال الرسالة بنجاح!',
        reportSent: 'تم إرسال البلاغ بنجاح!',
        profileUpdated: 'تم تحديث الملف الشخصي بنجاح!',
        errorOccurred: 'حدث خطأ، يرجى المحاولة مرة أخرى',
        fillAllFields: 'يرجى ملء جميع الحقول المطلوبة',
        passwordMismatch: 'كلمات المرور غير متطابقة',
        welcomeBack: 'مرحباً بعودتك!',
        accountCreated: 'تم إنشاء الحساب بنجاح!',
        loggedOut: 'تم تسجيل الخروج',
        noResults: 'لا توجد نتائج',
        totalAds: 'إجمالي الإعلانات',
        totalUsers: 'المستخدمين',
        cities: 'المدن',
        categoriesCount: 'الفئات',
        viewProfile: 'عرض الملف الشخصي',
        copyLink: 'نسخ الرابط',
        linkCopied: 'تم نسخ الرابط!'
    },
    fr: {
        home: 'Accueil',
        login: 'Connexion',
        register: 'Inscription',
        logout: 'Déconnexion',
        myAds: 'Mes annonces',
        messages: 'Messages',
        profile: 'Profil',
        editProfile: 'Modifier le profil',
        allAds: 'Toutes les annonces',
        categories: 'Catégories',
        addAd: 'Publier une annonce',
        filter: 'Filtrer les résultats',
        search: 'Rechercher',
        searchPlaceholder: 'Rechercher...',
        category: 'Catégorie',
        title: 'Titre',
        description: 'Description',
        price: 'Prix',
        city: 'Ville',
        phone: 'Téléphone',
        image: 'Image',
        publish: 'Publier l\'annonce',
        publishing: 'Publication...',
        showPhone: 'Afficher le téléphone',
        sendMessage: 'Contacter le vendeur',
        report: 'Signaler cette annonce',
        reportTitle: 'Signalement',
        reportReason: 'Raison du signalement',
        reportSubmit: 'Envoyer le signalement',
        back: 'Retour',
        email: 'Email',
        password: 'Mot de passe',
        confirmPassword: 'Confirmer le mot de passe',
        name: 'Nom',
        loginBtn: 'Connexion',
        registerBtn: 'S\'inscrire',
        noAccount: 'Pas de compte?',
        hasAccount: 'Déjà inscrit?',
        aboutUs: 'À propos de nous',
        privacy: 'Politique de confidentialité',
        contact: 'Contactez-nous',
        reportProblem: 'Signaler un problème',
        selectCategory: 'Choisir une catégorie',
        selectCity: 'Choisir une ville',
        allCategories: 'Toutes les catégories',
        allCities: 'Toutes les villes',
        priceRange: 'Fourchette de prix',
        minPrice: 'Prix minimum',
        maxPrice: 'Prix maximum',
        applyFilter: 'Appliquer le filtre',
        resetFilter: 'Réinitialiser',
        featuredAds: 'Annonces vedettes',
        latestAds: 'Dernières annonces',
        viewAll: 'Voir tout',
        seller: 'Vendeur',
        memberSince: 'Membre depuis',
        inbox: 'Boîte de réception',
        archive: 'Archives',
        noMessages: 'Aucun message',
        typeMessage: 'Tapez votre message...',
        send: 'Envoyer',
        da: 'DA',
        browseAds: 'Parcourir les annonces',
        uploadImage: 'Cliquez pour télécharger une image',
        requiredLogin: 'Connexion requise',
        adPublished: 'Annonce publiée avec succès!',
        messageSent: 'Message envoyé avec succès!',
        reportSent: 'Signalement envoyé avec succès!',
        profileUpdated: 'Profil mis à jour avec succès!',
        errorOccurred: 'Une erreur est survenue, veuillez réessayer',
        fillAllFields: 'Veuillez remplir tous les champs requis',
        passwordMismatch: 'Les mots de passe ne correspondent pas',
        welcomeBack: 'Bienvenue!',
        accountCreated: 'Compte créé avec succès!',
        loggedOut: 'Déconnecté',
        noResults: 'Aucun résultat',
        totalAds: 'Total des annonces',
        totalUsers: 'Utilisateurs',
        cities: 'Villes',
        categoriesCount: 'Catégories',
        viewProfile: 'Voir le profil',
        copyLink: 'Copier le lien',
        linkCopied: 'Lien copié!'
    }
};

// ========== Helper Functions ==========
const getText = (key) => translations[AppState.lang][key] || key;
const getCategoryName = (catId) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.name[AppState.lang] : catId;
};
const getCityName = (cityId) => {
    const city = cities.find(c => c.id === cityId);
    return city ? city.name[AppState.lang] : cityId;
};
const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString(AppState.lang === 'ar' ? 'ar-DZ' : 'fr-FR');
};
const formatPrice = (price) => {
    return `${parseInt(price).toLocaleString()} ${getText('da')}`;
};

// ========== Toast Notifications ==========
function showToast(message, type = 'info', duration = 4000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${icons[type]}"></i></div>
        <div class="toast-content">
            <span class="toast-message">${message}</span>
        </div>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;
    
    container.appendChild(toast);
    
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => removeToast(toast));
    
    setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
}

// ========== Loading Screen ==========
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1000);
}

// ========== Language ==========
function initLanguage() {
    document.documentElement.lang = AppState.lang;
    document.documentElement.dir = AppState.lang === 'ar' ? 'rtl' : 'ltr';
    document.getElementById('lang-text').textContent = AppState.lang === 'ar' ? 'FR' : 'عربي';
    updateTranslations();
}

function toggleLanguage() {
    AppState.lang = AppState.lang === 'ar' ? 'fr' : 'ar';
    localStorage.setItem('lang', AppState.lang);
    initLanguage();
    renderCategories();
    renderAds();
    renderBannerSlider();
}

function updateTranslations() {
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[AppState.lang][key]) {
            el.textContent = translations[AppState.lang][key];
        }
    });
    
    document.querySelectorAll('[data-translate-placeholder]').forEach(el => {
        const key = el.getAttribute('data-translate-placeholder');
        if (translations[AppState.lang][key]) {
            el.placeholder = translations[AppState.lang][key];
        }
    });
}

// ========== Side Menu ==========
function openSideMenu() {
    document.getElementById('side-menu').classList.add('open');
    document.getElementById('side-menu-overlay').classList.add('open');
    document.body.classList.add('modal-open');
}

function closeSideMenu() {
    document.getElementById('side-menu').classList.remove('open');
    document.getElementById('side-menu-overlay').classList.remove('open');
    document.body.classList.remove('modal-open');
}

// ========== Modals ==========
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('open');
    document.body.classList.add('modal-open');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('open');
    document.body.classList.remove('modal-open');
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('open');
    });
    document.body.classList.remove('modal-open');
}

// ========== Page Navigation ==========
function navigateTo(page) {
    AppState.currentPage = page;
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show target page
    const targetPage = document.getElementById(`page-${page}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update side menu active state
    document.querySelectorAll('.side-menu-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === page) {
            item.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Close side menu
    closeSideMenu();
    
    // Load page specific content
    switch (page) {
        case 'ads':
            renderAllAds();
            break;
        case 'messages':
            renderMessagesPage();
            break;
        case 'my-ads':
            renderMyAds();
            break;
    }
}

// ========== Auth ==========
function updateAuthUI(user) {
    const loginBtn = document.getElementById('login-btn');
    const userMenu = document.getElementById('user-menu');
    const notificationsBtn = document.getElementById('notifications-btn');
    const messagesBtn = document.getElementById('messages-btn');
    const authRequiredBtns = document.querySelectorAll('.auth-required-btn');
    const authRequiredItems = document.querySelectorAll('.auth-required');
    const menuUserSection = document.getElementById('menu-user-section');
    
    if (user) {
        loginBtn.style.display = 'none';
        userMenu.style.display = 'block';
        authRequiredBtns.forEach(btn => btn.style.display = 'flex');
        authRequiredItems.forEach(item => item.style.display = 'block');
        menuUserSection.style.display = 'flex';
        
        // Update user info
        const avatar = user.name ? user.name.charAt(0).toUpperCase() : 'U';
        document.getElementById('header-user-avatar').textContent = avatar;
        document.getElementById('dropdown-user-name').textContent = user.name || 'المستخدم';
        document.getElementById('dropdown-user-email').textContent = user.email;
        document.getElementById('menu-user-avatar').textContent = avatar;
        document.getElementById('menu-user-name').textContent = user.name || 'المستخدم';
        document.getElementById('menu-user-email').textContent = user.email;
        
        // Load messages count
        loadUnreadMessagesCount();
    } else {
        loginBtn.style.display = 'flex';
        userMenu.style.display = 'none';
        authRequiredBtns.forEach(btn => btn.style.display = 'none');
        authRequiredItems.forEach(item => item.style.display = 'none');
        menuUserSection.style.display = 'none';
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span>';
    btn.disabled = true;
    
    try {
        await auth.signInWithEmailAndPassword(email, password);
        closeModal('auth-modal');
        showToast(getText('welcomeBack'), 'success');
        form.reset();
    } catch (error) {
        console.error(error);
        let message = getText('errorOccurred');
        if (error.code === 'auth/wrong-password') message = 'كلمة المرور غير صحيحة';
        else if (error.code === 'auth/user-not-found') message = 'المستخدم غير موجود';
        else if (error.code === 'auth/invalid-email') message = 'البريد الإلكتروني غير صالح';
        showToast(message, 'error');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    
    if (password !== confirmPassword) {
        showToast(getText('passwordMismatch'), 'error');
        return;
    }
    
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span>';
    btn.disabled = true;
    
    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        await db.collection('users').doc(result.user.uid).set({
            name,
            email,
            phone,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            isActive: true
        });
        closeModal('auth-modal');
        showToast(getText('accountCreated'), 'success');
        form.reset();
    } catch (error) {
        console.error(error);
        let message = getText('errorOccurred');
        if (error.code === 'auth/email-already-in-use') message = 'البريد الإلكتروني مستخدم بالفعل';
        else if (error.code === 'auth/weak-password') message = 'كلمة المرور ضعيفة جداً';
        showToast(message, 'error');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

async function handleLogout() {
    try {
        await auth.signOut();
        AppState.user = null;
        navigateTo('home');
        showToast(getText('loggedOut'), 'info');
    } catch (error) {
        console.error(error);
        showToast(getText('errorOccurred'), 'error');
    }
}

// ========== Banner Slider ==========
let bannerInterval;

function renderBannerSlider() {
    const allSliders = [
        ...AppState.sliders.map(s => ({
            title: { ar: s.title, fr: s.title },
            desc: { ar: s.description, fr: s.description },
            img: s.imageUrl,
            link: s.link
        })),
        ...defaultSliders
    ];
    
    const slidesContainer = document.getElementById('banner-slides');
    const dotsContainer = document.getElementById('banner-dots');
    
    slidesContainer.innerHTML = allSliders.map((slide, index) => `
        <div class="banner-slide ${index === AppState.bannerIndex ? 'active' : ''}">
            <img src="${slide.img}" alt="${slide.title[AppState.lang]}">
            <div class="banner-overlay">
                <h2 class="banner-title">${slide.title[AppState.lang]}</h2>
                <p class="banner-desc">${slide.desc[AppState.lang]}</p>
                <div class="banner-cta">
                    <button class="btn" onclick="navigateTo('ads')">
                        <i class="fas fa-search"></i> ${getText('browseAds')}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    dotsContainer.innerHTML = allSliders.map((_, index) => `
        <button class="banner-dot ${index === AppState.bannerIndex ? 'active' : ''}" data-index="${index}"></button>
    `).join('');
    
    // Start auto-slide
    startBannerSlider(allSliders.length);
}

function startBannerSlider(totalSlides) {
    if (bannerInterval) clearInterval(bannerInterval);
    
    bannerInterval = setInterval(() => {
        AppState.bannerIndex = (AppState.bannerIndex + 1) % totalSlides;
        updateBannerSlide();
    }, 4000);
}

function updateBannerSlide() {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.banner-dot');
    
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === AppState.bannerIndex);
    });
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === AppState.bannerIndex);
    });
}

function nextBannerSlide() {
    const totalSlides = document.querySelectorAll('.banner-slide').length;
    AppState.bannerIndex = (AppState.bannerIndex + 1) % totalSlides;
    updateBannerSlide();
    startBannerSlider(totalSlides);
}

function prevBannerSlide() {
    const totalSlides = document.querySelectorAll('.banner-slide').length;
    AppState.bannerIndex = (AppState.bannerIndex - 1 + totalSlides) % totalSlides;
    updateBannerSlide();
    startBannerSlider(totalSlides);
}

// ========== Categories Slider ==========
let categoryInterval;

function renderCategories() {
    const track = document.getElementById('categories-track');
    const dotsContainer = document.getElementById('cat-dots');
    const totalSlides = Math.ceil(categories.length / 4);
    
    // Create slides
    let slidesHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const slideCategories = categories.slice(i * 4, (i + 1) * 4);
        slidesHTML += `
            <div class="categories-slide">
                ${slideCategories.map(cat => `
                    <div class="category-card" data-category="${cat.id}">
                        <img src="${cat.img}" alt="${cat.name[AppState.lang]}" class="category-img">
                        <span class="category-name">${cat.name[AppState.lang]}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    track.innerHTML = slidesHTML;
    
    // Create dots
    dotsContainer.innerHTML = Array(totalSlides).fill(0).map((_, i) => `
        <button class="cat-dot ${i === AppState.categoryIndex ? 'active' : ''}" data-index="${i}"></button>
    `).join('');
    
    // Update track position
    updateCategorySlide();
    
    // Start auto-slide
    startCategorySlider(totalSlides);
    
    // Render footer categories
    renderFooterCategories();
    
    // Render filter categories
    renderFilterCategories();
    
    // Render add ad form categories
    renderFormCategories();
}

function startCategorySlider(totalSlides) {
    if (categoryInterval) clearInterval(categoryInterval);
    
    categoryInterval = setInterval(() => {
        AppState.categoryIndex = (AppState.categoryIndex + 1) % totalSlides;
        updateCategorySlide();
    }, 5000);
}

function updateCategorySlide() {
    const track = document.getElementById('categories-track');
    const dots = document.querySelectorAll('.cat-dot');
    const direction = AppState.lang === 'ar' ? 1 : -1;
    
    track.style.transform = `translateX(${direction * AppState.categoryIndex * 100}%)`;
    
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === AppState.categoryIndex);
    });
}

function nextCategorySlide() {
    const totalSlides = Math.ceil(categories.length / 4);
    AppState.categoryIndex = (AppState.categoryIndex + 1) % totalSlides;
    updateCategorySlide();
    startCategorySlider(totalSlides);
}

function prevCategorySlide() {
    const totalSlides = Math.ceil(categories.length / 4);
    AppState.categoryIndex = (AppState.categoryIndex - 1 + totalSlides) % totalSlides;
    updateCategorySlide();
    startCategorySlider(totalSlides);
}

function renderFooterCategories() {
    const container = document.getElementById('footer-categories');
    container.innerHTML = categories.slice(0, 6).map(cat => `
        <li><a href="#" data-category="${cat.id}"><i class="fas fa-chevron-left"></i> ${cat.name[AppState.lang]}</a></li>
    `).join('');
}

function renderFilterCategories() {
    const container = document.getElementById('filter-categories');
    container.innerHTML = `
        <button class="filter-option ${!AppState.filters.category ? 'active' : ''}" data-value="">${getText('allCategories')}</button>
        ${categories.map(cat => `
            <button class="filter-option ${AppState.filters.category === cat.id ? 'active' : ''}" data-value="${cat.id}">${cat.name[AppState.lang]}</button>
        `).join('')}
    `;
    
    const citiesContainer = document.getElementById('filter-cities');
    citiesContainer.innerHTML = `
        <button class="filter-option ${!AppState.filters.city ? 'active' : ''}" data-value="">${getText('allCities')}</button>
        ${cities.map(city => `
            <button class="filter-option ${AppState.filters.city === city.id ? 'active' : ''}" data-value="${city.id}">${city.name[AppState.lang]}</button>
        `).join('')}
    `;
}

function renderFormCategories() {
    const categorySelect = document.querySelector('#add-ad-form select[name="category"]');
    const citySelect = document.querySelector('#add-ad-form select[name="city"]');
    
    if (categorySelect) {
        categorySelect.innerHTML = `
            <option value="">${getText('selectCategory')}</option>
            ${categories.map(cat => `<option value="${cat.id}">${cat.name[AppState.lang]}</option>`).join('')}
        `;
    }
    
    if (citySelect) {
        citySelect.innerHTML = `
            <option value="">${getText('selectCity')}</option>
            ${cities.map(city => `<option value="${city.id}">${city.name[AppState.lang]}</option>`).join('')}
        `;
    }
}

// ========== Ads ==========
async function loadAds() {
    try {
        const snapshot = await db.collection('ads')
            .where('isActive', '==', true)
            .orderBy('createdAt', 'desc')
            .get();
        
        AppState.ads = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        renderAds();
        updateStats();
    } catch (error) {
        console.error('Error loading ads:', error);
    }
}

function renderAds() {
    renderFeaturedAds();
    renderLatestAds();
}

function renderFeaturedAds() {
    const container = document.getElementById('featured-ads');
    const section = document.getElementById('featured-section');
    const featuredAds = AppState.ads.filter(ad => ad.isFeatured);
    
    if (featuredAds.length > 0) {
        section.style.display = 'block';
        container.innerHTML = featuredAds.slice(0, 4).map(ad => createAdCard(ad, true)).join('');
    } else {
        section.style.display = 'none';
    }
}

function renderLatestAds() {
    const container = document.getElementById('latest-ads');
    const latestAds = AppState.ads.slice(0, 8);
    container.innerHTML = latestAds.map(ad => createAdCard(ad)).join('');
}

function renderAllAds() {
    const container = document.getElementById('all-ads');
    const noResults = document.getElementById('no-results');
    const filteredAds = getFilteredAds();
    
    if (filteredAds.length > 0) {
        container.innerHTML = filteredAds.map(ad => createAdCard(ad)).join('');
        noResults.style.display = 'none';
    } else {
        container.innerHTML = '';
        noResults.style.display = 'block';
    }
    
    renderActiveFilters();
}

function renderMyAds() {
    if (!AppState.user) return;
    
    const container = document.getElementById('my-ads-grid');
    const myAds = AppState.ads.filter(ad => ad.userId === AppState.user.uid);
    
    if (myAds.length > 0) {
        container.innerHTML = myAds.map(ad => createAdCard(ad)).join('');
    } else {
        container.innerHTML = `
            <div class="no-results" style="grid-column: 1/-1;">
                <i class="fas fa-bullhorn"></i>
                <p>لا توجد إعلانات</p>
                <button class="btn btn-primary" onclick="openModal('add-ad-modal')">
                    <i class="fas fa-plus"></i> ${getText('addAd')}
                </button>
            </div>
        `;
    }
}

function createAdCard(ad, featured = false) {
    const isFeatured = featured || ad.isFeatured;
    return `
        <div class="ad-card ${isFeatured ? 'featured' : ''}" data-id="${ad.id}">
            ${isFeatured ? '<div class="ad-featured-badge"><i class="fas fa-star"></i> مميز</div>' : ''}
            <div class="ad-image-container">
                <img src="${ad.imageUrl || 'https://via.placeholder.com/400x300'}" alt="${ad.title}" class="ad-image">
                <div class="ad-image-overlay"></div>
                <div class="ad-quick-actions">
                    ${AppState.user && AppState.user.uid !== ad.userId ? `
                        <button class="ad-quick-btn" onclick="event.stopPropagation(); openMessageModal('${ad.id}')">
                            <i class="fas fa-comment"></i> مراسلة
                        </button>
                    ` : ''}
                    <button class="ad-quick-btn report" onclick="event.stopPropagation(); openReportModal('${ad.id}')">
                        <i class="fas fa-flag"></i>
                    </button>
                </div>
            </div>
            <div class="ad-content">
                <span class="ad-category">${getCategoryName(ad.category)}</span>
                <h3 class="ad-title">${ad.title}</h3>
                <p class="ad-price">${formatPrice(ad.price)}</p>
                <p class="ad-location"><i class="fas fa-map-marker-alt"></i> ${getCityName(ad.city)}</p>
            </div>
            <div class="ad-footer">
                <span class="ad-date"><i class="far fa-clock"></i> ${formatDate(ad.createdAt)}</span>
                <div class="ad-actions">
                    ${AppState.user && AppState.user.uid !== ad.userId ? `
                        <button class="ad-action-btn message" onclick="event.stopPropagation(); openMessageModal('${ad.id}')" title="مراسلة">
                            <i class="fas fa-comment"></i>
                        </button>
                    ` : ''}
                    <button class="ad-action-btn report" onclick="event.stopPropagation(); openReportModal('${ad.id}')" title="إبلاغ">
                        <i class="fas fa-flag"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getFilteredAds() {
    let filtered = [...AppState.ads];
    
    if (AppState.filters.category) {
        filtered = filtered.filter(ad => ad.category === AppState.filters.category);
    }
    
    if (AppState.filters.city) {
        filtered = filtered.filter(ad => ad.city === AppState.filters.city);
    }
    
    if (AppState.filters.priceMin) {
        filtered = filtered.filter(ad => ad.price >= parseInt(AppState.filters.priceMin));
    }
    
    if (AppState.filters.priceMax) {
        filtered = filtered.filter(ad => ad.price <= parseInt(AppState.filters.priceMax));
    }
    
    if (AppState.filters.search) {
        const query = AppState.filters.search.toLowerCase();
        filtered = filtered.filter(ad => 
            ad.title.toLowerCase().includes(query) ||
            ad.description.toLowerCase().includes(query)
        );
    }
    
    return filtered;
}

function renderActiveFilters() {
    const container = document.getElementById('active-filters');
    let filtersHTML = '';
    
    if (AppState.filters.category) {
        filtersHTML += `
            <span class="active-filter">
                ${getCategoryName(AppState.filters.category)}
                <button onclick="removeFilter('category')"><i class="fas fa-times"></i></button>
            </span>
        `;
    }
    
    if (AppState.filters.city) {
        filtersHTML += `
            <span class="active-filter">
                ${getCityName(AppState.filters.city)}
                <button onclick="removeFilter('city')"><i class="fas fa-times"></i></button>
            </span>
        `;
    }
    
    if (AppState.filters.priceMin || AppState.filters.priceMax) {
        const range = `${AppState.filters.priceMin || '0'} - ${AppState.filters.priceMax || '∞'} ${getText('da')}`;
        filtersHTML += `
            <span class="active-filter">
                ${range}
                <button onclick="removeFilter('price')"><i class="fas fa-times"></i></button>
            </span>
        `;
    }
    
    if (AppState.filters.search) {
        filtersHTML += `
            <span class="active-filter">
                "${AppState.filters.search}"
                <button onclick="removeFilter('search')"><i class="fas fa-times"></i></button>
            </span>
        `;
    }
    
    container.innerHTML = filtersHTML;
}

function removeFilter(type) {
    if (type === 'price') {
        AppState.filters.priceMin = '';
        AppState.filters.priceMax = '';
    } else {
        AppState.filters[type] = '';
    }
    renderAllAds();
    renderFilterCategories();
}

function applyFilters() {
    AppState.filters.priceMin = document.getElementById('filter-price-min').value;
    AppState.filters.priceMax = document.getElementById('filter-price-max').value;
    closeModal('filter-modal');
    navigateTo('ads');
}

function resetFilters() {
    AppState.filters = {
        category: '',
        city: '',
        priceMin: '',
        priceMax: '',
        search: ''
    };
    document.getElementById('filter-price-min').value = '';
    document.getElementById('filter-price-max').value = '';
    renderFilterCategories();
    renderAllAds();
}

// ========== Ad Detail ==========
function openAdDetail(adId) {
    const ad = AppState.ads.find(a => a.id === adId);
    if (!ad) return;
    
    AppState.selectedAd = ad;
    
    const container = document.getElementById('ad-detail-content');
    container.innerHTML = `
        <button class="back-btn" onclick="navigateTo('ads')">
            <i class="fas fa-arrow-right"></i> ${getText('back')}
        </button>
        
        <img src="${ad.imageUrl || 'https://via.placeholder.com/800x400'}" alt="${ad.title}" class="ad-detail-image" onclick="openImageViewer('${ad.imageUrl}')">
        
        <div class="ad-detail-content">
            <div class="ad-detail-header">
                <div class="ad-detail-info">
                    <span class="ad-detail-category"><i class="fas fa-tag"></i> ${getCategoryName(ad.category)}</span>
                    <h1 class="ad-detail-title">${ad.title}</h1>
                </div>
                <div class="ad-detail-price">${formatPrice(ad.price)}</div>
            </div>
            
            <div class="ad-detail-meta">
                <span class="ad-detail-meta-item"><i class="fas fa-map-marker-alt"></i> ${getCityName(ad.city)}</span>
                <span class="ad-detail-meta-item"><i class="far fa-calendar-alt"></i> ${formatDate(ad.createdAt)}</span>
                <span class="ad-detail-meta-item"><i class="far fa-eye"></i> ${ad.views || 0} مشاهدة</span>
            </div>
            
            <div class="ad-detail-desc">
                <h3><i class="fas fa-align-left"></i> الوصف</h3>
                <p>${ad.description}</p>
            </div>
            
            <div class="ad-detail-actions">
                <button class="ad-detail-btn phone" onclick="showPhone('${ad.phone}')">
                    <i class="fas fa-phone"></i> ${getText('showPhone')}
                </button>
                <button class="ad-detail-btn message" onclick="openMessageModal('${ad.id}')">
                    <i class="fas fa-comment"></i> ${getText('sendMessage')}
                </button>
                <button class="ad-detail-btn report" onclick="openReportModal('${ad.id}')">
                    <i class="fas fa-flag"></i> ${getText('report')}
                </button>
            </div>
            
            <div class="ad-seller" onclick="openUserProfile('${ad.userId}')">
                <div class="ad-seller-avatar">${ad.userName ? ad.userName.charAt(0).toUpperCase() : 'U'}</div>
                <div class="ad-seller-info">
                    <h4>${ad.userName || 'مستخدم'}</h4>
                    <p><i class="fas fa-bullhorn"></i> عرض جميع إعلاناته</p>
                </div>
                <i class="fas fa-chevron-left ad-seller-arrow"></i>
            </div>
            
            <div class="ad-share">
                <h4><i class="fas fa-share-alt"></i> مشاركة الإعلان</h4>
                <div class="share-buttons">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn twitter"><i class="fab fa-twitter"></i></a>
                    <a href="https://wa.me/?text=${encodeURIComponent(ad.title + ' - ' + window.location.href)}" target="_blank" class="share-btn whatsapp"><i class="fab fa-whatsapp"></i></a>
                    <a href="https://t.me/share/url?url=${encodeURIComponent(window.location.href)}" target="_blank" class="share-btn telegram"><i class="fab fa-telegram-plane"></i></a>
                    <button class="share-btn copy" onclick="copyAdLink()"><i class="fas fa-link"></i></button>
                </div>
            </div>
        </div>
    `;
    
    navigateTo('ad-detail');
    
    // Increment views
    db.collection('ads').doc(adId).update({
        views: firebase.firestore.FieldValue.increment(1)
    }).catch(console.error);
}

function showPhone(phone) {
    if (!AppState.user) {
        showToast(getText('requiredLogin'), 'warning');
        openModal('auth-modal');
        return;
    }
    
    showToast(`📞 ${phone}`, 'info', 10000);
}

function copyAdLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast(getText('linkCopied'), 'success');
    });
}

function openImageViewer(imageUrl) {
    const viewer = document.getElementById('image-viewer');
    const img = document.getElementById('image-viewer-img');
    img.src = imageUrl;
    openModal('image-viewer');
}

// ========== User Profile ==========
async function openUserProfile(userId) {
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        const userData = userDoc.exists ? userDoc.data() : { name: 'مستخدم' };
        const userAds = AppState.ads.filter(ad => ad.userId === userId);
        
        AppState.selectedProfile = { id: userId, ...userData };
        
        const container = document.getElementById('profile-content');
        container.innerHTML = `
            <button class="back-btn" onclick="navigateTo('home')">
                <i class="fas fa-arrow-right"></i> ${getText('back')}
            </button>
            
            <div class="profile-header">
                <div class="profile-avatar">${userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}</div>
                <h1 class="profile-name">${userData.name || 'مستخدم'}</h1>
                <p class="profile-email">${getText('memberSince')} ${formatDate(userData.createdAt)}</p>
                <div class="profile-stats">
                    <div class="profile-stat">
                        <div class="profile-stat-value">${userAds.length}</div>
                        <div class="profile-stat-label">${getText('allAds')}</div>
                    </div>
                </div>
            </div>
            
            <h2 style="margin: 30px 0 20px; font-size: 1.5rem;">${getText('allAds')}</h2>
            
            <div class="ads-grid">
                ${userAds.length > 0 ? userAds.map(ad => createAdCard(ad)).join('') : `
                    <div class="no-results" style="grid-column: 1/-1;">
                        <i class="fas fa-bullhorn"></i>
                        <p>لا توجد إعلانات</p>
                    </div>
                `}
            </div>
        `;
        
        navigateTo('profile');
    } catch (error) {
        console.error(error);
        showToast(getText('errorOccurred'), 'error');
    }
}

// ========== Add Ad ==========
async function handleAddAd(e) {
    e.preventDefault();
    
    if (!AppState.user) {
        showToast(getText('requiredLogin'), 'warning');
        closeModal('add-ad-modal');
        openModal('auth-modal');
        return;
    }
    
    const form = e.target;
    const category = form.category.value;
    const title = form.title.value;
    const description = form.description.value;
    const price = form.price.value;
    const city = form.city.value;
    const phone = form.phone.value;
    const imageInput = form.image;
    
    if (!category || !title || !description || !price || !city || !phone) {
        showToast(getText('fillAllFields'), 'error');
        return;
    }
    
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="spinner"></span> ${getText('publishing')}`;
    btn.disabled = true;
    
    try {
        let imageUrl = 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop';
        
        // Handle image upload
        if (imageInput.files && imageInput.files[0]) {
            const file = imageInput.files[0];
            const reader = new FileReader();
            imageUrl = await new Promise((resolve, reject) => {
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }
        
        // Add ad to Firestore
        await db.collection('ads').add({
            category,
            title,
            description,
            price: parseInt(price),
            city,
            phone,
            imageUrl,
            userId: AppState.user.uid,
            userName: AppState.user.name || AppState.user.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            isActive: true,
            isFeatured: false,
            views: 0
        });
        
        showToast(getText('adPublished'), 'success');
        closeModal('add-ad-modal');
        form.reset();
        document.getElementById('image-upload').classList.remove('has-image');
        
        // Reload ads
        await loadAds();
        
    } catch (error) {
        console.error(error);
        showToast(getText('errorOccurred'), 'error');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// ========== Messages ==========
function openMessageModal(adId) {
    if (!AppState.user) {
        showToast(getText('requiredLogin'), 'warning');
        openModal('auth-modal');
        return;
    }
    
    const ad = AppState.ads.find(a => a.id === adId);
    if (!ad) return;
    
    AppState.selectedAd = ad;
    
    document.getElementById('message-to-name').textContent = ad.userName || 'البائع';
    document.getElementById('message-about-ad').textContent = ad.title;
    
    openModal('message-modal');
}

async function handleSendMessage(e) {
    e.preventDefault();
    
    if (!AppState.user || !AppState.selectedAd) return;
    
    const form = e.target;
    const message = form.message.value.trim();
    
    if (!message) return;
    
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span>';
    btn.disabled = true;
    
    try {
        await db.collection('messages').add({
            senderId: AppState.user.uid,
            senderName: AppState.user.name || AppState.user.email,
            receiverId: AppState.selectedAd.userId,
            receiverName: AppState.selectedAd.userName,
            adId: AppState.selectedAd.id,
            adTitle: AppState.selectedAd.title,
            message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            isRead: false
        });
        
        showToast(getText('messageSent'), 'success');
        closeModal('message-modal');
        form.reset();
        
    } catch (error) {
        console.error(error);
        showToast(getText('errorOccurred'), 'error');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

async function loadMessages() {
    if (!AppState.user) return;
    
    try {
        const [sent, received] = await Promise.all([
            db.collection('messages').where('senderId', '==', AppState.user.uid).orderBy('createdAt', 'desc').get(),
            db.collection('messages').where('receiverId', '==', AppState.user.uid).orderBy('createdAt', 'desc').get()
        ]);
        
        const allMessages = [
            ...sent.docs.map(d => ({ id: d.id, ...d.data() })),
            ...received.docs.map(d => ({ id: d.id, ...d.data() }))
        ];
        
        AppState.messages = allMessages.sort((a, b) => 
            (b.createdAt?.toDate() || 0) - (a.createdAt?.toDate() || 0)
        );
        
    } catch (error) {
        console.error('Error loading messages:', error);
    }
}

async function loadUnreadMessagesCount() {
    if (!AppState.user) return;
    
    try {
        const snapshot = await db.collection('messages')
            .where('receiverId', '==', AppState.user.uid)
            .where('isRead', '==', false)
            .get();
        
        const count = snapshot.size;
        
        const badges = [
            document.getElementById('messages-badge'),
            document.getElementById('notification-badge'),
            document.getElementById('menu-messages-badge')
        ];
        
        badges.forEach(badge => {
            if (badge) {
                if (count > 0) {
                    badge.textContent = count;
                    badge.style.display = 'flex';
                } else {
                    badge.style.display = 'none';
                }
            }
        });
        
    } catch (error) {
        console.error('Error loading messages count:', error);
    }
}

function renderMessagesPage() {
    if (!AppState.user) {
        navigateTo('home');
        return;
    }
    
    loadMessages().then(() => {
        const container = document.getElementById('messages-content');
        const inboxMessages = AppState.messages.filter(m => m.receiverId === AppState.user.uid && !m.isRead);
        const archiveMessages = AppState.messages.filter(m => m.receiverId === AppState.user.uid && m.isRead);
        
        container.innerHTML = `
            <button class="back-btn" onclick="navigateTo('home')">
                <i class="fas fa-arrow-right"></i> ${getText('back')}
            </button>
            
            <div class="messages-container">
                <div class="messages-tabs">
                    <button class="messages-tab active" data-tab="inbox">
                        <i class="fas fa-inbox"></i> ${getText('inbox')} (${inboxMessages.length})
                    </button>
                    <button class="messages-tab" data-tab="archive">
                        <i class="fas fa-archive"></i> ${getText('archive')} (${archiveMessages.length})
                    </button>
                </div>
                
                <div class="messages-list" id="messages-list">
                    ${renderMessagesList(inboxMessages)}
                </div>
            </div>
        `;
        
        // Tab click handlers
        container.querySelectorAll('.messages-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                container.querySelectorAll('.messages-tab').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                const tabName = this.getAttribute('data-tab');
                const list = document.getElementById('messages-list');
                
                if (tabName === 'inbox') {
                    list.innerHTML = renderMessagesList(inboxMessages);
                } else {
                    list.innerHTML = renderMessagesList(archiveMessages);
                }
            });
        });
    });
}

function renderMessagesList(messages) {
    if (messages.length === 0) {
        return `
            <div class="no-results" style="padding: 60px 20px;">
                <i class="fas fa-inbox"></i>
                <p>${getText('noMessages')}</p>
            </div>
        `;
    }
    
    return messages.map(msg => `
        <div class="message-item ${!msg.isRead ? 'unread' : ''}" data-id="${msg.id}" onclick="openChat('${msg.id}')">
            <div class="message-avatar">${msg.senderName?.charAt(0).toUpperCase() || 'U'}</div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">${msg.senderName || 'مستخدم'}</span>
                    <span class="message-time">${formatDate(msg.createdAt)}</span>
                </div>
                <p class="message-text">${msg.message}</p>
                <p class="message-about-ad"><i class="fas fa-bullhorn"></i> ${msg.adTitle}</p>
            </div>
            ${!msg.isRead ? '<div class="message-unread-dot"></div>' : ''}
        </div>
    `).join('');
}

async function openChat(messageId) {
    const message = AppState.messages.find(m => m.id === messageId);
    if (!message) return;
    
    // Mark as read
    if (!message.isRead && message.receiverId === AppState.user.uid) {
        await db.collection('messages').doc(messageId).update({ isRead: true });
        loadUnreadMessagesCount();
    }
    
    // For now, show the message in a toast
    showToast(message.message, 'info', 10000);
}

// ========== Reports ==========
function openReportModal(adId = null) {
    if (!AppState.user) {
        showToast(getText('requiredLogin'), 'warning');
        openModal('auth-modal');
        return;
    }
    
    if (adId) {
        const ad = AppState.ads.find(a => a.id === adId);
        AppState.selectedAd = ad;
        document.getElementById('report-about').innerHTML = ad ? `
            <i class="fas fa-bullhorn"></i> حول الإعلان: <strong>${ad.title}</strong>
        ` : '';
    } else {
        AppState.selectedAd = null;
        document.getElementById('report-about').innerHTML = '<i class="fas fa-flag"></i> إبلاغ عام';
    }
    
    openModal('report-modal');
}

async function handleReport(e) {
    e.preventDefault();
    
    if (!AppState.user) return;
    
    const form = e.target;
    const reason = form.reason.value;
    const details = form.details?.value || '';
    
    if (!reason) {
        showToast(getText('fillAllFields'), 'error');
        return;
    }
    
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span>';
    btn.disabled = true;
    
    try {
        await db.collection('reports').add({
            reporterId: AppState.user.uid,
            reporterName: AppState.user.name || AppState.user.email,
            adId: AppState.selectedAd?.id || null,
            adTitle: AppState.selectedAd?.title || 'بلاغ عام',
            reason,
            details,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showToast(getText('reportSent'), 'success');
        closeModal('report-modal');
        form.reset();
        AppState.selectedAd = null;
        
    } catch (error) {
        console.error(error);
        showToast(getText('errorOccurred'), 'error');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// ========== Edit Profile ==========
function openEditProfile() {
    if (!AppState.user) return;
    
    document.getElementById('edit-name').value = AppState.user.name || '';
    document.getElementById('edit-phone').value = AppState.user.phone || '';
    
    openModal('edit-profile-modal');
}

async function handleEditProfile(e) {
    e.preventDefault();
    
    if (!AppState.user) return;
    
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span>';
    btn.disabled = true;
    
    try {
        await db.collection('users').doc(AppState.user.uid).update({
            name,
            phone
        });
        
        AppState.user.name = name;
        AppState.user.phone = phone;
        updateAuthUI(AppState.user);
        
        showToast(getText('profileUpdated'), 'success');
        closeModal('edit-profile-modal');
        
    } catch (error) {
        console.error(error);
        showToast(getText('errorOccurred'), 'error');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// ========== Search ==========
function handleSearch(query) {
    AppState.filters.search = query;
    navigateTo('ads');
}

// ========== Stats ==========
async function updateStats() {
    document.getElementById('stat-ads').textContent = AppState.ads.length;
    
    try {
        const usersSnapshot = await db.collection('users').get();
        document.getElementById('stat-users').textContent = usersSnapshot.size;
    } catch (error) {
        console.error(error);
    }
}

// ========== Sliders from Firebase ==========
async function loadSliders() {
    try {
        const snapshot = await db.collection('sliders')
            .where('isActive', '==', true)
            .get();
        
        AppState.sliders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        
        renderBannerSlider();
    } catch (error) {
        console.error('Error loading sliders:', error);
        renderBannerSlider(); // Use default sliders
    }
}

// ========== Image Upload Preview ==========
function handleImageUpload(input) {
    const container = document.getElementById('image-upload');
    const preview = document.getElementById('image-preview');
    
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            container.classList.add('has-image');
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// ========== Contact Form ==========
async function handleContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const subject = form.subject.value;
    const message = form.message.value;
    
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span>';
    btn.disabled = true;
    
    try {
        await db.collection('contacts').add({
            name,
            email,
            subject,
            message,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showToast('تم إرسال رسالتك بنجاح!', 'success');
        form.reset();
        
    } catch (error) {
        console.error(error);
        showToast(getText('errorOccurred'), 'error');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// ========== Event Listeners ==========
function initEventListeners() {
    // Menu toggle
    document.getElementById('menu-toggle').addEventListener('click', openSideMenu);
    document.getElementById('close-menu').addEventListener('click', closeSideMenu);
    document.getElementById('side-menu-overlay').addEventListener('click', closeSideMenu);
    
    // Language switch
    document.getElementById('lang-switch').addEventListener('click', toggleLanguage);
    
    // Auth
    document.getElementById('login-btn').addEventListener('click', () => openModal('auth-modal'));
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    
    // Logout
    document.querySelectorAll('.logout-btn').forEach(btn => {
        btn.addEventListener('click', handleLogout);
    });
    
    // Auth tabs
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            document.getElementById(`${tabName}-form`).classList.add('active');
        });
    });
    
    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
    
    // User dropdown
    document.getElementById('user-avatar-btn')?.addEventListener('click', function() {
        document.getElementById('user-dropdown').classList.toggle('show');
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-menu')) {
            document.getElementById('user-dropdown')?.classList.remove('show');
        }
    });
    
    // Close modals
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) closeAllModals();
        });
    });
    
    // Page navigation
    document.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateTo(page);
        });
    });
    
    // Category click
    document.addEventListener('click', function(e) {
        const categoryCard = e.target.closest('.category-card');
        if (categoryCard) {
            const category = categoryCard.getAttribute('data-category');
            AppState.filters.category = category;
            navigateTo('ads');
        }
    });
    
    // Ad card click
    document.addEventListener('click', function(e) {
        const adCard = e.target.closest('.ad-card');
        if (adCard && !e.target.closest('.ad-action-btn') && !e.target.closest('.ad-quick-btn')) {
            const adId = adCard.getAttribute('data-id');
            openAdDetail(adId);
        }
    });
    
    // Banner navigation
    document.getElementById('banner-prev').addEventListener('click', prevBannerSlide);
    document.getElementById('banner-next').addEventListener('click', nextBannerSlide);
    
    document.getElementById('banner-dots').addEventListener('click', function(e) {
        if (e.target.classList.contains('banner-dot')) {
            AppState.bannerIndex = parseInt(e.target.getAttribute('data-index'));
            updateBannerSlide();
        }
    });
    
    // Category navigation
    document.getElementById('cat-prev').addEventListener('click', prevCategorySlide);
    document.getElementById('cat-next').addEventListener('click', nextCategorySlide);
    
    document.getElementById('cat-dots').addEventListener('click', function(e) {
        if (e.target.classList.contains('cat-dot')) {
            AppState.categoryIndex = parseInt(e.target.getAttribute('data-index'));
            updateCategorySlide();
        }
    });
    
    // Add ad
    document.getElementById('add-ad-btn').addEventListener('click', function() {
        if (!AppState.user) {
            showToast(getText('requiredLogin'), 'warning');
            openModal('auth-modal');
            return;
        }
        openModal('add-ad-modal');
    });
    
    document.getElementById('add-ad-form').addEventListener('submit', handleAddAd);
    
    // Image upload
    document.getElementById('image-input').addEventListener('change', function() {
        handleImageUpload(this);
    });
    
    // Filter
    document.getElementById('filter-btn').addEventListener('click', () => openModal('filter-modal'));
    document.getElementById('apply-filter').addEventListener('click', applyFilters);
    document.getElementById('reset-filter').addEventListener('click', resetFilters);
    
    // Filter options click
    document.getElementById('filter-categories').addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-option')) {
            document.querySelectorAll('#filter-categories .filter-option').forEach(o => o.classList.remove('active'));
            e.target.classList.add('active');
            AppState.filters.category = e.target.getAttribute('data-value');
        }
    });
    
    document.getElementById('filter-cities').addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-option')) {
            document.querySelectorAll('#filter-cities .filter-option').forEach(o => o.classList.remove('active'));
            e.target.classList.add('active');
            AppState.filters.city = e.target.getAttribute('data-value');
        }
    });
    
    // Search
    document.getElementById('float-search-btn').addEventListener('click', () => openModal('search-modal'));
    
    document.getElementById('header-search-btn').addEventListener('click', function() {
        const query = document.getElementById('header-search-input').value;
        if (query) handleSearch(query);
    });
    
    document.getElementById('header-search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch(this.value);
        }
    });
    
    document.getElementById('modal-search-btn').addEventListener('click', function() {
        const query = document.getElementById('modal-search-input').value;
        closeModal('search-modal');
        handleSearch(query);
    });
    
    document.getElementById('modal-search-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            closeModal('search-modal');
            handleSearch(this.value);
        }
    });
    
    // Messages
    document.getElementById('messages-btn')?.addEventListener('click', () => navigateTo('messages'));
    document.getElementById('message-form').addEventListener('submit', handleSendMessage);
    
    // Report
    document.getElementById('report-problem-btn').addEventListener('click', () => {
        closeSideMenu();
        openReportModal();
    });
    document.getElementById('report-form').addEventListener('submit', handleReport);
    
    // Edit profile
    document.getElementById('edit-profile-form').addEventListener('submit', handleEditProfile);
    
    // Contact form
    document.getElementById('contact-form')?.addEventListener('submit', handleContactForm);
    
    // Footer category links
    document.getElementById('footer-categories').addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link) {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            AppState.filters.category = category;
            navigateTo('ads');
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
            closeSideMenu();
        }
    });
}

// ========== Auth State Listener ==========
auth.onAuthStateChanged(async (user) => {
    if (user) {
        try {
            const userDoc = await db.collection('users').doc(user.uid).get();
            AppState.user = {
                uid: user.uid,
                email: user.email,
                ...userDoc.data()
            };
        } catch (error) {
            console.error(error);
            AppState.user = {
                uid: user.uid,
                email: user.email
            };
        }
    } else {
        AppState.user = null;
    }
    
    updateAuthUI(AppState.user);
});

// ========== Initialize App ==========
async function initApp() {
    initLanguage();
    initEventListeners();
    renderCategories();
    
    await Promise.all([
        loadAds(),
        loadSliders()
    ]);
    
    hideLoadingScreen();
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', initApp);

// Handle hash navigation for admin
if (window.location.hash === '#admin') {
    // Redirect to admin page or show admin login
    console.log('Admin mode');
}
