// ===========================
// Pages Translation System
// Shared i18n for Privacy Policy, Terms, FAQ, and Cookie Policy
// ===========================

const SETTINGS_KEY = 'expenseTracker_settings';

// Get current language from localStorage
function getLanguage() {
    try {
        const settings = localStorage.getItem(SETTINGS_KEY);
        if (settings) {
            const parsed = JSON.parse(settings);
            return parsed.language || 'en';
        }
    } catch (e) {
        console.error('Error reading language setting:', e);
    }
    return 'en';
}

// Translation helper
function t(key) {
    const lang = getLanguage();
    return PAGE_TRANSLATIONS[lang]?.[key] || PAGE_TRANSLATIONS['en']?.[key] || key;
}

// Apply translations to all data-i18n elements
function translatePage() {
    const lang = getLanguage();
    const translations = PAGE_TRANSLATIONS[lang] || PAGE_TRANSLATIONS['en'];

    if (!translations) return;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            if (element.tagName === 'INPUT' && element.type !== 'submit' && element.type !== 'button') {
                element.placeholder = translations[key];
            } else {
                element.innerHTML = translations[key];
            }
        }
    });

    // Update page title if available
    if (translations['page.title']) {
        document.title = translations['page.title'];
    }
}

// Language switcher
function setLanguage(lang) {
    try {
        let settings = {};
        const stored = localStorage.getItem(SETTINGS_KEY);
        if (stored) {
            settings = JSON.parse(stored);
        }
        settings.language = lang;
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
        translatePage();
    } catch (e) {
        console.error('Error saving language:', e);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    translatePage();

    // Set up language selector if exists
    const langSelect = document.getElementById('pageLangSelect');
    if (langSelect) {
        langSelect.value = getLanguage();
        langSelect.addEventListener('change', function () {
            setLanguage(this.value);
        });
    }
});

// ===========================
// Page Translations
// ===========================
const PAGE_TRANSLATIONS = {
    en: {
        // Common
        'common.backToApp': 'Back to App',
        'common.lastUpdated': 'Last Updated:',
        'common.copyright': '© 2025 Expense Tracker. All rights reserved.',
        'common.contactEmail': 'Email:',
        'common.contactWebsite': 'Website:',
        'common.returnToApp': 'Return to Application',
        'common.language': 'Language',

        // Privacy Policy
        'page.title.privacy': 'Privacy Policy - Expense Tracker',
        'privacy.title': 'Privacy Policy',
        'privacy.intro': 'Your privacy is important to us. This Privacy Policy explains how Expense Tracker collects, uses, and protects your information.',
        'privacy.section1.title': '1. Information We Collect',
        'privacy.section1.subtitle1': '1.1 Information You Provide',
        'privacy.section1.intro': 'When you use Expense Tracker, you may provide us with:',
        'privacy.section1.item1': '<strong>Financial Data:</strong> Transaction details including amounts, categories, descriptions, and dates that you manually enter',
        'privacy.section1.item2': '<strong>Preferences:</strong> Your chosen settings such as currency, language, theme, and budget limits',
        'privacy.section1.item3': '<strong>Recurring Transactions:</strong> Information about recurring income or expenses you configure',
        'privacy.section1.subtitle2': '1.2 Automatically Collected Information',
        'privacy.section1.auto.intro': 'We may automatically collect:',
        'privacy.section1.auto.item1': '<strong>Device Information:</strong> Browser type, operating system, and device identifiers',
        'privacy.section1.auto.item2': '<strong>Usage Data:</strong> How you interact with the application, features used, and time spent',
        'privacy.section1.auto.item3': '<strong>Cookies:</strong> Small data files stored on your device (see our Cookie Policy)',
        'privacy.section2.title': '2. How We Use Your Information',
        'privacy.section2.intro': 'We use the collected information to:',
        'privacy.section2.item1': '<strong>Provide Services:</strong> Enable expense tracking, budgeting, and financial reporting features',
        'privacy.section2.item2': '<strong>Personalization:</strong> Customize your experience based on your preferences',
        'privacy.section2.item3': '<strong>Data Storage:</strong> Save your financial data locally in your browser\'s storage',
        'privacy.section2.item4': '<strong>Improvements:</strong> Analyze usage patterns to enhance our application',
        'privacy.section2.item5': '<strong>Communication:</strong> Send notifications about budget alerts and transaction summaries',
        'privacy.section3.title': '3. Data Storage and Security',
        'privacy.section3.subtitle1': '3.1 Local Storage',
        'privacy.section3.local.intro': 'Expense Tracker primarily stores your data locally on your device using browser localStorage. This means:',
        'privacy.section3.local.item1': 'Your financial data stays on your device',
        'privacy.section3.local.item2': 'Data is not transmitted to external servers by default',
        'privacy.section3.local.item3': 'Clearing browser data will remove your stored information',
        'privacy.section3.subtitle2': '3.2 Security Measures',
        'privacy.section3.security.intro': 'We implement appropriate security measures including:',
        'privacy.section3.security.item1': 'Data encryption during any transmission',
        'privacy.section3.security.item2': 'Secure coding practices',
        'privacy.section3.security.item3': 'Regular security assessments',
        'privacy.section3.warning': '<strong>Important:</strong> We recommend regularly exporting your data as a backup. Data stored in localStorage can be lost if you clear your browser data or use private/incognito mode.',
        'privacy.section4.title': '4. Data Sharing and Disclosure',
        'privacy.section4.intro': 'We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:',
        'privacy.section4.item1': '<strong>With Your Consent:</strong> When you explicitly authorize us to share your data',
        'privacy.section4.item2': '<strong>Legal Requirements:</strong> When required by law, court order, or governmental authority',
        'privacy.section4.item3': '<strong>Protection of Rights:</strong> To protect our rights, property, or safety, or that of our users',
        'privacy.section5.title': '5. Your Rights and Choices',
        'privacy.section5.intro': 'You have the following rights regarding your data:',
        'privacy.section5.item1': '<strong>Access:</strong> View all your stored data within the application',
        'privacy.section5.item2': '<strong>Export:</strong> Download your data in JSON or CSV format at any time',
        'privacy.section5.item3': '<strong>Delete:</strong> Remove individual transactions or clear all data',
        'privacy.section5.item4': '<strong>Modify:</strong> Edit any transaction or preference settings',
        'privacy.section5.item5': '<strong>Opt-out:</strong> Disable notifications and certain features',
        'privacy.section6.title': '6. Cookies and Tracking',
        'privacy.section6.intro': 'Expense Tracker uses cookies and similar technologies to:',
        'privacy.section6.item1': 'Remember your preferences and settings',
        'privacy.section6.item2': 'Understand how you use our application',
        'privacy.section6.item3': 'Improve user experience',
        'privacy.section6.link': 'For more details, please refer to our <a href="#" data-bs-toggle="modal" data-bs-target="#cookiePolicyModal">Cookie Policy</a>.',
        'privacy.section7.title': '7. Children\'s Privacy',
        'privacy.section7.text': 'Expense Tracker is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.',
        'privacy.section8.title': '8. Changes to This Policy',
        'privacy.section8.intro': 'We may update this Privacy Policy from time to time. We will notify you of any changes by:',
        'privacy.section8.item1': 'Posting the new Privacy Policy on this page',
        'privacy.section8.item2': 'Updating the "Last Updated" date at the top',
        'privacy.section8.item3': 'Providing a notice within the application for significant changes',
        'privacy.section9.title': '9. Contact Us',
        'privacy.section9.intro': 'If you have any questions about this Privacy Policy, please contact us:',
        'privacy.footer': 'By using Expense Tracker, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.',

        // Terms & Conditions
        'page.title.terms': 'Terms & Conditions - Expense Tracker',
        'terms.title': 'Terms and Conditions',
        'terms.intro': 'Please read these Terms and Conditions carefully before using the Expense Tracker application.',
        'terms.section1.title': '1. Acceptance of Terms',
        'terms.section1.text1': 'By accessing or using Expense Tracker ("the Application"), you agree to be bound by these Terms and Conditions ("Terms"). If you disagree with any part of these Terms, you may not access or use the Application.',
        'terms.section1.text2': 'These Terms apply to all visitors, users, and others who access or use the Application.',
        'terms.section2.title': '2. Description of Service',
        'terms.section2.intro': 'Expense Tracker is a personal finance management application that allows users to:',
        'terms.section2.item1': 'Track income and expenses',
        'terms.section2.item2': 'Categorize transactions',
        'terms.section2.item3': 'Set and monitor budgets',
        'terms.section2.item4': 'Generate financial reports and visualizations',
        'terms.section2.item5': 'Export financial data',
        'terms.section2.item6': 'Manage recurring transactions',
        'terms.section2.footer': 'The Application is provided "as is" and is intended for personal, non-commercial use.',
        'terms.section3.title': '3. User Responsibilities',
        'terms.section3.subtitle1': '3.1 Accurate Information',
        'terms.section3.accurate.intro': 'You are responsible for:',
        'terms.section3.accurate.item1': 'Entering accurate financial information',
        'terms.section3.accurate.item2': 'Maintaining the confidentiality of your data',
        'terms.section3.accurate.item3': 'Regularly backing up your data using the export feature',
        'terms.section3.subtitle2': '3.2 Prohibited Uses',
        'terms.section3.prohibited.intro': 'You agree not to use the Application:',
        'terms.section3.prohibited.item1': 'For any unlawful purpose or in violation of any laws',
        'terms.section3.prohibited.item2': 'To attempt to gain unauthorized access to any portion of the Application',
        'terms.section3.prohibited.item3': 'To interfere with or disrupt the Application or servers',
        'terms.section3.prohibited.item4': 'To reverse engineer, decompile, or disassemble the Application',
        'terms.section3.prohibited.item5': 'To use automated systems or software to extract data from the Application',
        'terms.section3.prohibited.item6': 'For commercial purposes without prior written consent',
        'terms.section4.title': '4. Data and Privacy',
        'terms.section4.intro': 'Your use of the Application is also governed by our <a href="privacy-policy.html">Privacy Policy</a>, which is incorporated into these Terms by reference.',
        'terms.section4.subtitle1': '4.1 Data Storage',
        'terms.section4.storage.item1': 'Your data is stored locally on your device using browser localStorage',
        'terms.section4.storage.item2': 'You are responsible for backing up your data regularly',
        'terms.section4.storage.item3': 'We are not responsible for data loss due to browser actions, device issues, or user error',
        'terms.section4.subtitle2': '4.2 Data Ownership',
        'terms.section4.ownership': 'You retain all rights to the financial data you enter into the Application. We do not claim ownership of your data.',
        'terms.section5.title': '5. Intellectual Property',
        'terms.section5.intro': 'The Application, including its original content, features, and functionality, is owned by Expense Tracker and is protected by international copyright, trademark, and other intellectual property laws.',
        'terms.section5.item1': 'The Application\'s logo, name, and branding are our trademarks',
        'terms.section5.item2': 'You may not copy, modify, or distribute the Application without permission',
        'terms.section5.item3': 'Third-party libraries and frameworks are subject to their respective licenses',
        'terms.section6.title': '6. Disclaimer of Warranties',
        'terms.section6.warning': 'THE APPLICATION IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.',
        'terms.section6.intro': 'We do not warrant that:',
        'terms.section6.item1': 'The Application will be uninterrupted, secure, or error-free',
        'terms.section6.item2': 'The results obtained from using the Application will be accurate or reliable',
        'terms.section6.item3': 'Any errors in the Application will be corrected',
        'terms.section6.financial': '<strong>Financial Disclaimer:</strong> Expense Tracker is a tracking tool only. It does not provide financial advice. Consult a qualified financial advisor for financial decisions.',
        'terms.section7.title': '7. Limitation of Liability',
        'terms.section7.intro': 'To the maximum extent permitted by applicable law, Expense Tracker and its developers shall not be liable for:',
        'terms.section7.item1': 'Any indirect, incidental, special, consequential, or punitive damages',
        'terms.section7.item2': 'Loss of profits, data, use, goodwill, or other intangible losses',
        'terms.section7.item3': 'Any damages resulting from unauthorized access to or alteration of your data',
        'terms.section7.item4': 'Any matters beyond our reasonable control',
        'terms.section7.footer': 'In no event shall our total liability exceed the amount you paid for the Application (if any).',
        'terms.section8.title': '8. Indemnification',
        'terms.section8.intro': 'You agree to defend, indemnify, and hold harmless Expense Tracker and its developers from and against any claims, damages, obligations, losses, liabilities, costs, or expenses arising from:',
        'terms.section8.item1': 'Your use of the Application',
        'terms.section8.item2': 'Your violation of these Terms',
        'terms.section8.item3': 'Your violation of any third-party rights',
        'terms.section9.title': '9. Modifications to the Application',
        'terms.section9.intro': 'We reserve the right to:',
        'terms.section9.item1': 'Modify or discontinue the Application at any time without notice',
        'terms.section9.item2': 'Update features and functionality',
        'terms.section9.item3': 'Change the user interface and design',
        'terms.section9.footer': 'We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the Application.',
        'terms.section10.title': '10. Changes to Terms',
        'terms.section10.text1': 'We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the Application following the posting of revised Terms means you accept and agree to the changes.',
        'terms.section10.text2': 'We encourage you to review these Terms periodically for any changes.',
        'terms.section11.title': '11. Governing Law',
        'terms.section11.text1': 'These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Expense Tracker operates, without regard to its conflict of law provisions.',
        'terms.section11.text2': 'Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in that jurisdiction.',
        'terms.section12.title': '12. Severability',
        'terms.section12.text': 'If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that these Terms shall otherwise remain in full force and effect.',
        'terms.section13.title': '13. Contact Information',
        'terms.section13.intro': 'If you have any questions about these Terms, please contact us:',
        'terms.footer': 'By using Expense Tracker, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.',

        // FAQ
        'page.title.faq': 'FAQ - Expense Tracker',
        'faq.title': 'Frequently Asked Questions',
        'faq.subtitle': 'Find answers to common questions about Expense Tracker',
        'faq.searchPlaceholder': 'Search for answers...',
        'faq.category.gettingStarted': 'Getting Started',
        'faq.category.transactions': 'Transactions',
        'faq.category.budgets': 'Budgets',
        'faq.category.dataSecurity': 'Data & Security',
        'faq.category.additional': 'Additional Questions',
        'faq.stillNeedHelp': 'Still have questions?',
        'faq.stillNeedHelpText': 'Can\'t find what you\'re looking for? We\'re here to help!',
        'faq.contactSupport': 'Contact Support',

        // FAQ Questions - Getting Started
        'faq.q1': 'What is Expense Tracker?',
        'faq.q2': 'Do I need to create an account?',
        'faq.q3': 'Is Expense Tracker free to use?',
        'faq.q4': 'How do I get started?',

        // FAQ Questions - Transactions
        'faq.q5': 'How do I add a new transaction?',
        'faq.q6': 'Can I edit or delete a transaction?',
        'faq.q7': 'What categories are available?',
        'faq.q8': 'How do recurring transactions work?',
        'faq.q9': 'How do I filter and search transactions?',

        // FAQ Questions - Budgets
        'faq.q10': 'How do I set a monthly budget?',
        'faq.q11': 'Can I set budgets for individual categories?',
        'faq.q12': 'What do the budget alerts mean?',

        // FAQ Questions - Data & Security
        'faq.q13': 'Where is my data stored?',
        'faq.q14': 'How do I backup my data?',
        'faq.q15': 'How do I restore my data from a backup?',
        'faq.q16': 'Can I use Expense Tracker on multiple devices?',
        'faq.q17': 'Is my financial data secure?',

        // FAQ Questions - Additional
        'faq.q18': 'Can I change the currency?',
        'faq.q19': 'Is there a dark mode?',
        'faq.q20': 'How do I use the calculator feature?',
        'faq.q21': 'Can I download reports?',

        // Cookie Policy
        'cookie.banner.title': '🍪 We use cookies',
        'cookie.banner.text': 'We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies. You can manage your preferences by clicking "Cookie Settings".',
        'cookie.banner.settings': 'Cookie Settings',
        'cookie.banner.essentialOnly': 'Essential Only',
        'cookie.banner.acceptAll': 'Accept All',
        'cookie.modal.title': 'Cookie Policy & Settings',
        'cookie.modal.intro': 'We use cookies to improve your experience. Manage your preferences below.',
        'cookie.modal.aboutTitle': 'About Cookies',
        'cookie.modal.aboutText': 'Cookies are small text files stored on your device when you visit a website. They help us remember your preferences, understand how you use our application, and improve your overall experience.',
        'cookie.modal.essential.title': 'Essential Cookies',
        'cookie.modal.essential.subtitle': 'Required for the application to function properly',
        'cookie.modal.essential.text': 'These cookies are necessary for basic functionality such as saving your settings, preferences, and financial data locally. They cannot be disabled.',
        'cookie.modal.essential.alwaysOn': 'Always On',
        'cookie.modal.analytics.title': 'Analytics Cookies',
        'cookie.modal.analytics.subtitle': 'Help us understand how you use the app',
        'cookie.modal.analytics.text': 'These cookies help us understand how visitors interact with our application by collecting and reporting information anonymously.',
        'cookie.modal.functional.title': 'Functional Cookies',
        'cookie.modal.functional.subtitle': 'Enable enhanced functionality and personalization',
        'cookie.modal.functional.text': 'These cookies enable enhanced functionality such as remembering your language preference, theme settings, and other customizations.',
        'cookie.modal.marketing.title': 'Marketing Cookies',
        'cookie.modal.marketing.subtitle': 'Used for advertising purposes',
        'cookie.modal.marketing.text': 'These cookies may be set through our site by advertising partners to build a profile of your interests and show relevant ads on other sites.',
        'cookie.modal.howWeUse': 'How We Use Cookies:',
        'cookie.modal.useItem1': 'Store your preferences (theme, currency, language)',
        'cookie.modal.useItem2': 'Remember your financial data locally',
        'cookie.modal.useItem3': 'Analyze application usage to improve features',
        'cookie.modal.useItem4': 'Provide a personalized experience',
        'cookie.modal.moreInfo': 'For more information, please read our full <a href="privacy-policy.html">Privacy Policy</a>.',
        'cookie.modal.cancel': 'Cancel',
        'cookie.modal.savePreferences': 'Save Preferences',

        // Footer
        'footer.brand': 'Expense Tracker',
        'footer.description': 'Track your income and expenses efficiently. Take control of your finances with our easy-to-use expense tracking solution.',
        'footer.quickLinks': 'Quick Links',
        'footer.dashboard': 'Dashboard',
        'footer.allTransactions': 'All Transactions',
        'footer.settings': 'Settings',
        'footer.legal': 'Legal',
        'footer.privacyPolicy': 'Privacy Policy',
        'footer.termsConditions': 'Terms & Conditions',
        'footer.cookiePolicy': 'Cookie Policy',
        'footer.faq': 'FAQ'
    },

    si: {
        // Common
        'common.backToApp': 'යෙදුමට ආපසු',
        'common.lastUpdated': 'අවසන් යාවත්කාලීන:',
        'common.copyright': '© 2025 වියදම් ලේඛනය. සියලුම හිමිකම් ඇවිරිණි.',
        'common.contactEmail': 'විද්‍යුත් තැපෑල:',
        'common.contactWebsite': 'වෙබ් අඩවිය:',
        'common.returnToApp': 'යෙදුමට ආපසු යන්න',
        'common.language': 'භාෂාව',

        // Privacy Policy
        'page.title.privacy': 'පුද්ගලිකත්ව ප්‍රතිපත්තිය - වියදම් ලේඛනය',
        'privacy.title': 'පුද්ගලිකත්ව ප්‍රතිපත්තිය',
        'privacy.intro': 'ඔබේ පුද්ගලිකත්වය අපට වැදගත්. වියදම් ලේඛනය ඔබේ තොරතුරු එකතු කරන, භාවිතා කරන සහ ආරක්ෂා කරන ආකාරය මෙම පුද්ගලිකත්ව ප්‍රතිපත්තිය පැහැදිලි කරයි.',
        'privacy.section1.title': '1. අප එකතු කරන තොරතුරු',
        'privacy.section2.title': '2. ඔබේ තොරතුරු භාවිතා කරන ආකාරය',
        'privacy.section3.title': '3. දත්ත ගබඩා කිරීම සහ ආරක්ෂාව',
        'privacy.section4.title': '4. දත්ත බෙදාගැනීම සහ හෙළිදරව් කිරීම',
        'privacy.section5.title': '5. ඔබේ අයිතිවාසිකම් සහ තේරීම්',
        'privacy.section6.title': '6. කුකීස් සහ ලුහුබැඳීම',
        'privacy.section7.title': '7. ළමුන්ගේ පුද්ගලිකත්වය',
        'privacy.section8.title': '8. මෙම ප්‍රතිපත්තියේ වෙනස්කම්',
        'privacy.section9.title': '9. අප අමතන්න',
        'privacy.footer': 'වියදම් ලේඛනය භාවිතා කිරීමෙන්, ඔබ මෙම පුද්ගලිකත්ව ප්‍රතිපත්තිය කියවා තේරුම් ගෙන එහි නියමයන්ට එකඟ වන බව පිළිගනී.',

        // Terms & Conditions
        'page.title.terms': 'නියමයන් සහ කොන්දේසි - වියදම් ලේඛනය',
        'terms.title': 'නියමයන් සහ කොන්දේසි',
        'terms.intro': 'වියදම් ලේඛන යෙදුම භාවිතා කිරීමට පෙර මෙම නියමයන් සහ කොන්දේසි ප්‍රවේශමෙන් කියවන්න.',
        'terms.section1.title': '1. නියමයන් පිළිගැනීම',
        'terms.section2.title': '2. සේවාවේ විස්තරය',
        'terms.section3.title': '3. පරිශීලක වගකීම්',
        'terms.section4.title': '4. දත්ත සහ පුද්ගලිකත්වය',
        'terms.section5.title': '5. බුද්ධිමය දේපල',
        'terms.section6.title': '6. වගකීම් ප්‍රතික්ෂේප කිරීම',
        'terms.section7.title': '7. වගකීම් සීමා කිරීම',
        'terms.section8.title': '8. වන්දි',
        'terms.section9.title': '9. යෙදුමේ වෙනස්කම්',
        'terms.section10.title': '10. නියමයන් වෙනස් කිරීම',
        'terms.section11.title': '11. පාලන නීතිය',
        'terms.section12.title': '12. වෙන්කිරීම',
        'terms.section13.title': '13. සම්බන්ධතා තොරතුරු',
        'terms.footer': 'වියදම් ලේඛනය භාවිතා කිරීමෙන්, ඔබ මෙම නියමයන් සහ කොන්දේසි කියවා, තේරුම් ගෙන, ඒවාට බැඳී සිටීමට එකඟ වන බව පිළිගනී.',

        // FAQ
        'page.title.faq': 'නිතර අසන පැණ - වියදම් ලේඛනය',
        'faq.title': 'නිතර අසන ප්‍රශ්න',
        'faq.subtitle': 'වියදම් ලේඛනය ගැන පොදු ප්‍රශ්නවලට පිළිතුරු සොයන්න',
        'faq.searchPlaceholder': 'පිළිතුරු සොයන්න...',
        'faq.category.gettingStarted': 'ආරම්භ කිරීම',
        'faq.category.transactions': 'ගනුදෙනු',
        'faq.category.budgets': 'අයවැය',
        'faq.category.dataSecurity': 'දත්ත සහ ආරක්ෂාව',
        'faq.category.additional': 'අමතර ප්‍රශ්න',
        'faq.stillNeedHelp': 'තවමත් ප්‍රශ්න තිබේද?',
        'faq.stillNeedHelpText': 'ඔබ සොයන දේ සොයා ගැනීමට නොහැකිද? අපි උදව් කිරීමට මෙහි සිටිමු!',
        'faq.contactSupport': 'සහාය අමතන්න',

        // FAQ Questions
        'faq.q1': 'වියදම් ලේඛනය යනු කුමක්ද?',
        'faq.q2': 'මට ගිණුමක් සෑදීමට අවශ්‍යද?',
        'faq.q3': 'වියදම් ලේඛනය නොමිලේ භාවිතා කළ හැකිද?',
        'faq.q4': 'මම ආරම්භ කරන්නේ කෙසේද?',
        'faq.q5': 'නව ගනුදෙනුවක් එකතු කරන්නේ කෙසේද?',
        'faq.q6': 'මට ගනුදෙනුවක් සංස්කරණය කිරීමට හෝ මකා දැමීමට හැකිද?',
        'faq.q7': 'ලබා ගත හැකි කාණ්ඩ මොනවාද?',
        'faq.q8': 'පුනරාවර්තන ගනුදෙනු ක්‍රියා කරන්නේ කෙසේද?',
        'faq.q9': 'ගනුදෙනු පෙරීමට සහ සෙවීමට කරන්නේ කෙසේද?',
        'faq.q10': 'මාසික අයවැයක් සකසන්නේ කෙසේද?',
        'faq.q11': 'තනි කාණ්ඩ සඳහා අයවැය සැකසිය හැකිද?',
        'faq.q12': 'අයවැය ඇඟවීම් වලින් අදහස් කරන්නේ කුමක්ද?',
        'faq.q13': 'මගේ දත්ත ගබඩා වන්නේ කොහේද?',
        'faq.q14': 'මගේ දත්ත උපස්ථ කරන්නේ කෙසේද?',
        'faq.q15': 'උපස්ථයකින් දත්ත ප්‍රතිස්ථාපනය කරන්නේ කෙසේද?',
        'faq.q16': 'බහු උපාංග මත වියදම් ලේඛනය භාවිතා කළ හැකිද?',
        'faq.q17': 'මගේ මූල්‍ය දත්ත ආරක්ෂිතද?',
        'faq.q18': 'මට මුදල් වර්ගය වෙනස් කළ හැකිද?',
        'faq.q19': 'අඳුරු ප්‍රකාරයක් තිබේද?',
        'faq.q20': 'කැල්කියුලේටර් විශේෂාංගය භාවිතා කරන්නේ කෙසේද?',
        'faq.q21': 'වාර්තා බාගත කළ හැකිද?',

        // Cookie Policy
        'cookie.banner.title': '🍪 අපි කුකීස් භාවිතා කරමු',
        'cookie.banner.text': 'ඔබේ බ්‍රවුස් කිරීමේ අත්දැකීම වැඩිදියුණු කිරීමට, අඩවි තදබදය විශ්ලේෂණය කිරීමට සහ අන්තර්ගතය පුද්ගලීකරණය කිරීමට අපි කුකීස් සහ සමාන තාක්ෂණයන් භාවිතා කරමු.',
        'cookie.banner.settings': 'කුකී සැකසුම්',
        'cookie.banner.essentialOnly': 'අත්‍යවශ්‍ය පමණි',
        'cookie.banner.acceptAll': 'සියල්ල පිළිගන්න',
        'cookie.modal.title': 'කුකී ප්‍රතිපත්තිය සහ සැකසුම්',
        'cookie.modal.intro': 'ඔබේ අත්දැකීම වැඩිදියුණු කිරීමට අපි කුකීස් භාවිතා කරමු. ඔබේ මනාපයන් පහතින් කළමනාකරණය කරන්න.',
        'cookie.modal.aboutTitle': 'කුකීස් ගැන',
        'cookie.modal.essential.title': 'අත්‍යවශ්‍ය කුකීස්',
        'cookie.modal.analytics.title': 'විශ්ලේෂණ කුකීස්',
        'cookie.modal.functional.title': 'ක්‍රියාකාරී කුකීස්',
        'cookie.modal.marketing.title': 'අලෙවිකරණ කුකීස්',
        'cookie.modal.cancel': 'අවලංගු කරන්න',
        'cookie.modal.savePreferences': 'මනාපයන් සුරකින්න',

        // Footer
        'footer.brand': 'වියදම් ලේඛනය',
        'footer.description': 'ඔබේ ආදායම සහ වියදම් කාර්යක්ෂමව නිරීක්ෂණය කරන්න.',
        'footer.quickLinks': 'ඉක්මන් සබැඳි',
        'footer.dashboard': 'උපකරණ පුවරුව',
        'footer.allTransactions': 'සියලුම ගනුදෙනු',
        'footer.settings': 'සැකසුම්',
        'footer.legal': 'නීතිමය',
        'footer.privacyPolicy': 'පුද්ගලිකත්ව ප්‍රතිපත්තිය',
        'footer.termsConditions': 'නියමයන් සහ කොන්දේසි',
        'footer.cookiePolicy': 'කුකී ප්‍රතිපත්තිය',
        'footer.faq': 'නිතර අසන පැණ'
    },

    ta: {
        // Common
        'common.backToApp': 'செயலிக்கு திரும்பு',
        'common.lastUpdated': 'கடைசியாக புதுப்பிக்கப்பட்டது:',
        'common.copyright': '© 2025 செலவு கண்காணி. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
        'common.contactEmail': 'மின்னஞ்சல்:',
        'common.contactWebsite': 'வலைத்தளம்:',
        'common.returnToApp': 'செயலிக்கு திரும்பு',
        'common.language': 'மொழி',

        // Privacy Policy
        'page.title.privacy': 'தனியுரிமைக் கொள்கை - செலவு கண்காணி',
        'privacy.title': 'தனியுரிமைக் கொள்கை',
        'privacy.intro': 'உங்கள் தனியுரிமை எங்களுக்கு முக்கியம். செலவு கண்காணி உங்கள் தகவல்களை எவ்வாறு சேகரிக்கிறது, பயன்படுத்துகிறது மற்றும் பாதுகாக்கிறது என்பதை இந்த தனியுரிமைக் கொள்கை விளக்குகிறது.',
        'privacy.section1.title': '1. நாங்கள் சேகரிக்கும் தகவல்கள்',
        'privacy.section2.title': '2. உங்கள் தகவல்களை நாங்கள் எவ்வாறு பயன்படுத்துகிறோம்',
        'privacy.section3.title': '3. தரவு சேமிப்பு மற்றும் பாதுகாப்பு',
        'privacy.section4.title': '4. தரவு பகிர்வு மற்றும் வெளிப்படுத்தல்',
        'privacy.section5.title': '5. உங்கள் உரிமைகள் மற்றும் தேர்வுகள்',
        'privacy.section6.title': '6. குக்கீகள் மற்றும் கண்காணிப்பு',
        'privacy.section7.title': '7. குழந்தைகளின் தனியுரிமை',
        'privacy.section8.title': '8. இந்தக் கொள்கையில் மாற்றங்கள்',
        'privacy.section9.title': '9. எங்களை தொடர்பு கொள்ளுங்கள்',
        'privacy.footer': 'செலவு கண்காணியைப் பயன்படுத்துவதன் மூலம், இந்த தனியுரிமைக் கொள்கையைப் படித்து புரிந்துகொண்டு அதன் விதிமுறைகளை ஏற்றுக்கொள்கிறீர்கள்.',

        // Terms & Conditions
        'page.title.terms': 'விதிமுறைகள் மற்றும் நிபந்தனைகள் - செலவு கண்காணி',
        'terms.title': 'விதிமுறைகள் மற்றும் நிபந்தனைகள்',
        'terms.intro': 'செலவு கண்காணி செயலியைப் பயன்படுத்துவதற்கு முன் இந்த விதிமுறைகள் மற்றும் நிபந்தனைகளை கவனமாகப் படிக்கவும்.',
        'terms.section1.title': '1. விதிமுறைகளை ஏற்றுக்கொள்ளுதல்',
        'terms.section2.title': '2. சேவை விவரம்',
        'terms.section3.title': '3. பயனர் பொறுப்புகள்',
        'terms.section4.title': '4. தரவு மற்றும் தனியுரிமை',
        'terms.section5.title': '5. அறிவுசார் சொத்து',
        'terms.section6.title': '6. உத்தரவாதங்களை மறுப்பு',
        'terms.section7.title': '7. பொறுப்பு வரம்பு',
        'terms.section8.title': '8. இழப்பீடு',
        'terms.section9.title': '9. செயலியில் மாற்றங்கள்',
        'terms.section10.title': '10. விதிமுறைகளில் மாற்றங்கள்',
        'terms.section11.title': '11. ஆளும் சட்டம்',
        'terms.section12.title': '12. பிரிக்கக்கூடியது',
        'terms.section13.title': '13. தொடர்பு தகவல்',
        'terms.footer': 'செலவு கண்காணியைப் பயன்படுத்துவதன் மூலம், இந்த விதிமுறைகள் மற்றும் நிபந்தனைகளைப் படித்து, புரிந்துகொண்டு, அவற்றால் கட்டுப்படுத்தப்பட ஒப்புக்கொள்கிறீர்கள்.',

        // FAQ
        'page.title.faq': 'அடிக்கடி கேட்கப்படும் கேள்விகள் - செலவு கண்காணி',
        'faq.title': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
        'faq.subtitle': 'செலவு கண்காணி பற்றிய பொதுவான கேள்விகளுக்கான பதில்களைக் கண்டறியுங்கள்',
        'faq.searchPlaceholder': 'பதில்களைத் தேடு...',
        'faq.category.gettingStarted': 'தொடங்குதல்',
        'faq.category.transactions': 'பரிவர்த்தனைகள்',
        'faq.category.budgets': 'பட்ஜெட்டுகள்',
        'faq.category.dataSecurity': 'தரவு & பாதுகாப்பு',
        'faq.category.additional': 'கூடுதல் கேள்விகள்',
        'faq.stillNeedHelp': 'இன்னும் கேள்விகள் உள்ளதா?',
        'faq.stillNeedHelpText': 'நீங்கள் தேடுவதைக் கண்டுபிடிக்க முடியவில்லையா? நாங்கள் உதவ இங்கே இருக்கிறோம்!',
        'faq.contactSupport': 'ஆதரவை தொடர்பு கொள்ளுங்கள்',

        // FAQ Questions
        'faq.q1': 'செலவு கண்காணி என்றால் என்ன?',
        'faq.q2': 'நான் ஒரு கணக்கை உருவாக்க வேண்டுமா?',
        'faq.q3': 'செலவு கண்காணி இலவசமா?',
        'faq.q4': 'நான் எப்படி தொடங்குவது?',
        'faq.q5': 'புதிய பரிவர்த்தனையை எவ்வாறு சேர்ப்பது?',
        'faq.q6': 'பரிவர்த்தனையை திருத்த அல்லது நீக்க முடியுமா?',
        'faq.q7': 'என்ன வகைகள் கிடைக்கின்றன?',
        'faq.q8': 'மீண்டும் மீண்டும் நிகழும் பரிவர்த்தனைகள் எப்படி வேலை செய்கின்றன?',
        'faq.q9': 'பரிவர்த்தனைகளை எவ்வாறு வடிகட்டுவது மற்றும் தேடுவது?',
        'faq.q10': 'மாதாந்திர பட்ஜெட்டை எவ்வாறு அமைப்பது?',
        'faq.q11': 'தனிப்பட்ட வகைகளுக்கு பட்ஜெட்டுகளை அமைக்க முடியுமா?',
        'faq.q12': 'பட்ஜெட் எச்சரிக்கைகள் என்ன அர்த்தம்?',
        'faq.q13': 'எனது தரவு எங்கே சேமிக்கப்படுகிறது?',
        'faq.q14': 'எனது தரவை எவ்வாறு காப்புப் பிரதி எடுப்பது?',
        'faq.q15': 'காப்புப்பிரதியிலிருந்து தரவை எவ்வாறு மீட்டெடுப்பது?',
        'faq.q16': 'பல சாதனங்களில் செலவு கண்காணியைப் பயன்படுத்த முடியுமா?',
        'faq.q17': 'எனது நிதித் தரவு பாதுகாப்பானதா?',
        'faq.q18': 'நாணயத்தை மாற்ற முடியுமா?',
        'faq.q19': 'இருண்ட பயன்முறை உள்ளதா?',
        'faq.q20': 'கால்குலேட்டர் அம்சத்தை எவ்வாறு பயன்படுத்துவது?',
        'faq.q21': 'அறிக்கைகளை பதிவிறக்க முடியுமா?',

        // Cookie Policy
        'cookie.banner.title': '🍪 நாங்கள் குக்கீகளைப் பயன்படுத்துகிறோம்',
        'cookie.banner.text': 'உங்கள் உலாவல் அனுபவத்தை மேம்படுத்தவும், தள போக்குவரத்தை பகுப்பாய்வு செய்யவும், உள்ளடக்கத்தை தனிப்பயனாக்கவும் குக்கீகள் மற்றும் ஒத்த தொழில்நுட்பங்களைப் பயன்படுத்துகிறோம்.',
        'cookie.banner.settings': 'குக்கீ அமைப்புகள்',
        'cookie.banner.essentialOnly': 'அத்தியாவசியம் மட்டும்',
        'cookie.banner.acceptAll': 'அனைத்தையும் ஏற்கவும்',
        'cookie.modal.title': 'குக்கீ கொள்கை & அமைப்புகள்',
        'cookie.modal.intro': 'உங்கள் அனுபவத்தை மேம்படுத்த குக்கீகளைப் பயன்படுத்துகிறோம். கீழே உங்கள் விருப்பங்களை நிர்வகிக்கவும்.',
        'cookie.modal.aboutTitle': 'குக்கீகள் பற்றி',
        'cookie.modal.essential.title': 'அத்தியாவசிய குக்கீகள்',
        'cookie.modal.analytics.title': 'பகுப்பாய்வு குக்கீகள்',
        'cookie.modal.functional.title': 'செயல்பாட்டு குக்கீகள்',
        'cookie.modal.marketing.title': 'சந்தைப்படுத்தல் குக்கீகள்',
        'cookie.modal.cancel': 'ரத்து செய்',
        'cookie.modal.savePreferences': 'விருப்பங்களை சேமி',

        // Footer
        'footer.brand': 'செலவு கண்காணி',
        'footer.description': 'உங்கள் வருமானம் மற்றும் செலவுகளை திறமையாக கண்காணிக்கவும்.',
        'footer.quickLinks': 'விரைவு இணைப்புகள்',
        'footer.dashboard': 'டாஷ்போர்டு',
        'footer.allTransactions': 'அனைத்து பரிவர்த்தனைகள்',
        'footer.settings': 'அமைப்புகள்',
        'footer.legal': 'சட்ட',
        'footer.privacyPolicy': 'தனியுரிமைக் கொள்கை',
        'footer.termsConditions': 'விதிமுறைகள் & நிபந்தனைகள்',
        'footer.cookiePolicy': 'குக்கீ கொள்கை',
        'footer.faq': 'அடிக்கடி கேட்கப்படும் கேள்விகள்'
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PAGE_TRANSLATIONS, t, translatePage, getLanguage, setLanguage };
}
