// ===========================
// Global Variables & State
// ===========================
let transactions = [];
let recurringTransactions = [];
let notebooks = [];
let categoryChart = null;
let trendChart = null;
let deleteTransactionId = null;
let deleteRecurringId = null;
let deleteNoteId = null;

const CATEGORIES = [
    // Expense Categories
    { id: 'food', name: 'Food', icon: '🍔', type: 'expense', color: '#f59e0b' },
    { id: 'transport', name: 'Transport', icon: '🚗', type: 'expense', color: '#3b82f6' },
    { id: 'utilities', name: 'Utilities', icon: '💡', type: 'expense', color: '#ec4899' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬', type: 'expense', color: '#6366f1' },
    { id: 'shopping', name: 'Shopping', icon: '🛒', type: 'expense', color: '#db2777' },
    { id: 'health', name: 'Health', icon: '🏥', type: 'expense', color: '#10b981' },
    { id: 'education', name: 'Education', icon: '📚', type: 'expense', color: '#0ea5e9' },
    { id: 'rent', name: 'Rent/Mortgage', icon: '🏠', type: 'expense', color: '#8b5cf6' },
    { id: 'insurance', name: 'Insurance', icon: '🛡️', type: 'expense', color: '#14b8a6' },
    { id: 'debt', name: 'Debt/Loan', icon: '💳', type: 'expense', color: '#ef4444' },
    { id: 'savings', name: 'Savings/Investment', icon: '💎', type: 'expense', color: '#06b6d4' },
    { id: 'gifts', name: 'Gifts', icon: '🎁', type: 'expense', color: '#f97316' },
    { id: 'travel', name: 'Travel', icon: '✈️', type: 'expense', color: '#a855f7' },
    { id: 'subscriptions', name: 'Subscriptions', icon: '📱', type: 'expense', color: '#64748b' },
    { id: 'personal', name: 'Personal Care', icon: '💅', type: 'expense', color: '#ec4899' },

    // Income Categories
    { id: 'salary', name: 'Salary', icon: '💰', type: 'income', color: '#22c55e' },
    { id: 'business', name: 'Business/Freelance', icon: '💼', type: 'income', color: '#16a34a' },
    { id: 'investment', name: 'Investment', icon: '📈', type: 'income', color: '#15803d' },
    { id: 'rental', name: 'Rental Income', icon: '🏘️', type: 'income', color: '#84cc16' },
    { id: 'bonus', name: 'Bonus', icon: '🎉', type: 'income', color: '#65a30d' },
    { id: 'gift-received', name: 'Gift Received', icon: '🎀', type: 'income', color: '#a3e635' },
    { id: 'refund', name: 'Refund', icon: '↩️', type: 'income', color: '#84cc16' },

    // Both
    { id: 'other', name: 'Other', icon: '📦', type: 'both', color: '#6b7280' }
];

const SETTINGS_KEY = 'expenseTracker_settings';
const DATA_KEY = 'expenseTracker_data';
const RECURRING_KEY = 'expenseTracker_recurring';
const NOTEBOOK_KEY = 'expenseTracker_notebooks';

// Currency Configuration
const CURRENCIES = {
    LKR: { symbol: 'Rs.', name: 'Sri Lankan Rupee', decimals: 2, flag: '🇱🇰' },
    USD: { symbol: '$', name: 'US Dollar', decimals: 2, flag: '🇺🇸' },
    GBP: { symbol: '£', name: 'British Pound', decimals: 2, flag: '🇬🇧' },
    EUR: { symbol: '€', name: 'Euro', decimals: 2, flag: '🇪🇺' },
    AED: { symbol: 'د.إ', name: 'UAE Dirham', decimals: 2, flag: '🇦🇪' }
};

// Translation Configuration
const TRANSLATIONS = {
    en: {
        'nav.brand': 'Expense Tracker',
        'nav.dashboard': 'Dashboard',
        'nav.allTransactions': 'All Transactions',
        'nav.settings': 'Settings',
        'summary.totalIncome': 'Total Income',
        'summary.totalExpenses': 'Total Expenses',
        'summary.balance': 'Balance',
        'summary.monthlyBudget': 'Monthly Budget',
        'summary.spent': 'spent',
        'btn.addTransaction': 'Add Transaction',
        'btn.downloadReport': 'Download Report',
        'btn.clearAll': 'Clear All',
        'btn.save': 'Save Transaction',
        'btn.cancel': 'Cancel',
        'btn.delete': 'Delete',
        'btn.edit': 'Edit',
        'btn.close': 'Close',
        'btn.apply': 'Apply',
        'btn.saveSettings': 'Save Settings',
        'filter.allTypes': 'All Types',
        'filter.incomeOnly': 'Income Only',
        'filter.expensesOnly': 'Expenses Only',
        'filter.allCategories': 'All Categories',
        'filter.allTime': 'All Time',
        'filter.today': 'Today',
        'filter.thisWeek': 'This Week',
        'filter.thisMonth': 'This Month',
        'filter.thisYear': 'This Year',
        'filter.customRange': 'Custom Range',
        'filter.search': 'Search transactions...',
        'filter.fromDate': 'From Date',
        'filter.toDate': 'To Date',
        'chart.expensesByCategory': 'Expenses by Category',
        'chart.monthlyTrend': 'Monthly Trend',
        'chart.noExpenseData': 'No expense data available',
        'chart.noTrendData': 'No trend data available',
        'table.date': 'Date',
        'table.description': 'Description',
        'table.category': 'Category',
        'table.type': 'Type',
        'table.amount': 'Amount',
        'table.actions': 'Actions',
        'table.recentTransactions': 'Recent Transactions',
        'table.noTransactions': 'No transactions yet. Click "Add Transaction" to get started!',
        'table.noTransactionsFiltered': 'No transactions found. Try adjusting your filters!',
        'modal.addTransaction': 'Add Transaction',
        'modal.editTransaction': 'Edit Transaction',
        'modal.income': 'Income',
        'modal.expense': 'Expense',
        'modal.amount': 'Amount',
        'modal.category': 'Category',
        'modal.description': 'Description',
        'modal.date': 'Date',
        'modal.selectCategory': 'Select a category',
        'modal.enterDescription': 'Enter description',
        'modal.transactionType': 'Transaction Type',
        'delete.title': 'Confirm Delete',
        'delete.message': 'Are you sure you want to delete this transaction?',
        'delete.confirmAll': 'Are you sure you want to delete ALL transactions? This action cannot be undone!',
        'settings.title': 'Settings',
        'settings.currency': 'Currency',
        'settings.currencyHelper': 'Select your preferred currency',
        'settings.theme': 'Theme',
        'settings.themeHelper': 'Choose your preferred theme',
        'settings.language': 'Language',
        'settings.languageHelper': 'Choose your preferred language',
        'settings.lightTheme': '☀️ Light Theme',
        'settings.darkTheme': '🌙 Dark Theme',
        'settings.autoTheme': '🔄 Auto (System Default)',
        'settings.monthlyBudget': 'Monthly Budget',
        'settings.budgetHelper': 'Set your monthly spending limit',
        'settings.notifications': 'Notifications',
        'settings.budgetAlert': 'Budget Alert (80% threshold)',
        'settings.transactionNotifications': 'Transaction Notifications',
        'settings.dataManagement': 'Data Management',
        'settings.exportJSON': 'Export Data (JSON)',
        'settings.importData': 'Import Data',
        'settings.exportCSV': 'Export as CSV',
        'settings.clearAllData': 'Clear All Data',
        'category.food': 'Food',
        'category.transport': 'Transport',
        'category.utilities': 'Utilities',
        'category.entertainment': 'Entertainment',
        'category.shopping': 'Shopping',
        'category.health': 'Health',
        'category.education': 'Education',
        'category.rent': 'Rent/Mortgage',
        'category.insurance': 'Insurance',
        'category.debt': 'Debt/Loan',
        'category.savings': 'Savings/Investment',
        'category.gifts': 'Gifts',
        'category.travel': 'Travel',
        'category.subscriptions': 'Subscriptions',
        'category.personal': 'Personal Care',
        'category.salary': 'Salary',
        'category.business': 'Business/Freelance',
        'category.investment': 'Investment',
        'category.rental': 'Rental Income',
        'category.bonus': 'Bonus',
        'category.gift-received': 'Gift Received',
        'category.refund': 'Refund',
        'category.other': 'Other',
        'toast.transactionAdded': 'added successfully',
        'toast.transactionUpdated': 'Transaction updated successfully',
        'toast.transactionDeleted': 'Transaction deleted successfully',
        'toast.allCleared': 'All transactions cleared',
        'toast.settingsSaved': 'Settings saved successfully',
        'toast.dataExported': 'Data exported successfully',
        'toast.csvExported': 'CSV exported successfully',
        'toast.dataImported': 'Data imported successfully',
        'toast.reportDownloaded': 'Report downloaded successfully! Open the HTML file in your browser.',
        'toast.invalidAmount': 'Please enter a valid amount',
        'toast.selectCategory': 'Please select a category',
        'toast.enterDescription': 'Please enter a description',
        'toast.selectDate': 'Please select a date',
        'toast.budgetExceeded': '⚠️ Budget Exceeded! You have spent more than your monthly budget.',
        'toast.budgetWarning': '⚠️ Budget Warning! You have used 80% of your monthly budget.',
        'type.income': 'Income',
        'type.expense': 'Expense',
        'nav.calculator': 'Calculator',
        'calculator.title': 'Calculator',
        'calculator.clear': 'C',
        'calculator.copy': 'Copy',
        'calculator.copied': 'Result copied to clipboard!',
        'calculator.useInTransaction': 'Use in Transaction',
        'recurring.addTitle': 'Add Recurring Transaction',
        'recurring.editTitle': 'Edit Recurring Transaction',
        'recurring.noRecurring': 'No recurring transactions yet',
        'recurring.frequency': 'Frequency',
        'recurring.daily': 'Daily',
        'recurring.weekly': 'Weekly',
        'recurring.monthly': 'Monthly',
        'recurring.yearly': 'Yearly',
        'recurring.startDate': 'Start Date',
        'recurring.endDate': 'End Date',
        'recurring.endDateHelper': 'Leave empty for no end date',
        'recurring.deleteMessage': 'Are you sure you want to delete this recurring transaction?',
        'settings.recurringTransactions': 'Recurring Transactions',
        'settings.categoryBudgets': 'Category Budgets',
        'settings.categoryBudgetsHelper': 'Set spending limits for each expense category',
        'btn.add': 'Add',
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
        // Calendar & Reminder translations
        'calendar.title': 'Transaction Calendar',
        'calendar.income': 'Income',
        'calendar.expense': 'Expense',
        'calendar.reminder': 'Reminder',
        'calendar.clickToAdd': 'Click on a date to add a transaction',
        'reminder.title': 'Set Reminder',
        'reminder.enable': 'Enable Reminder',
        'reminder.date': 'Reminder Date',
        'reminder.time': 'Reminder Time',
        'reminder.notification': 'Transaction Reminder',
        'reminder.missed': 'Missed Reminder',
        // Notebook translations
        'nav.notebook': 'Notebook',
        'notebook.title': 'Financial Notebook',
        'notebook.addNote': 'Add Note',
        'notebook.editNote': 'Edit Note',
        'notebook.allCategories': 'All Categories',
        'notebook.searchPlaceholder': 'Search notes...',
        'notebook.pinnedNotes': 'Pinned Notes',
        'notebook.noNotes': 'No notes yet',
        'notebook.noNotesDesc': 'Start by adding your financial note!',
        'notebook.noteTitle': 'Title',
        'notebook.noteTitlePlaceholder': 'Enter note title',
        'notebook.noteCategory': 'Category',
        'notebook.noteContent': 'Content',
        'notebook.noteContentPlaceholder': 'Write your note here...',
        'notebook.markdownSupport': 'Supports basic formatting with line breaks',
        'notebook.pinNote': 'Pin this note',
        'notebook.linkedAmount': 'Target Amount (optional)',
        'notebook.linkedAmountHelper': 'For financial goals or budget tracking',
        'notebook.deleteConfirm': 'Are you sure you want to delete this note?',
        'notebook.noteAdded': 'Note added successfully',
        'notebook.noteUpdated': 'Note updated successfully',
        'notebook.noteDeleted': 'Note deleted successfully',
        'notebook.notePinned': 'Note pinned',
        'notebook.noteUnpinned': 'Note unpinned',
        'notebook.errorTitle': 'Please enter a title',
        'notebook.errorContent': 'Please enter note content',
        'notebook.pin': 'Pin',
        'notebook.unpin': 'Unpin',
        'notebook.categoryGeneral': 'General',
        'notebook.categoryGoal': 'Financial Goal',
        'notebook.categoryReminder': 'Reminder',
        'notebook.categoryShopping': 'Shopping List'
    },
    si: {
        'nav.brand': 'වියදම් ලේඛනය',
        'nav.dashboard': 'උපකරණ පුවරුව',
        'nav.allTransactions': 'සියලුම ගනුදෙනු',
        'nav.settings': 'සැකසුම්',
        'summary.totalIncome': 'මුළු ආදායම',
        'summary.totalExpenses': 'මුළු වියදම්',
        'summary.balance': 'ශේෂය',
        'summary.monthlyBudget': 'මාසික අයවැය',
        'summary.spent': 'වියදම් කර ඇත',
        'btn.addTransaction': 'ගනුදෙනුවක් එක් කරන්න',
        'btn.downloadReport': 'වාර්තාව බාගත කරන්න',
        'btn.clearAll': 'සියල්ල ඉවත් කරන්න',
        'btn.save': 'ගනුදෙනුව සුරකින්න',
        'btn.cancel': 'අවලංගු කරන්න',
        'btn.delete': 'මකන්න',
        'btn.edit': 'සංස්කරණය',
        'btn.close': 'වසන්න',
        'btn.apply': 'යොදන්න',
        'btn.saveSettings': 'සැකසුම් සුරකින්න',
        'filter.allTypes': 'සියලුම වර්ග',
        'filter.incomeOnly': 'ආදායම පමණක්',
        'filter.expensesOnly': 'වියදම් පමණක්',
        'filter.allCategories': 'සියලුම කාණ්ඩ',
        'filter.allTime': 'සියලු කාලය',
        'filter.today': 'අද',
        'filter.thisWeek': 'මෙම සතිය',
        'filter.thisMonth': 'මෙම මාසය',
        'filter.thisYear': 'මෙම වසර',
        'filter.customRange': 'අභිරුචි පරාසය',
        'filter.search': 'ගනුදෙනු සොයන්න...',
        'filter.fromDate': 'දින සිට',
        'filter.toDate': 'දින දක්වා',
        'chart.expensesByCategory': 'කාණ්ඩය අනුව වියදම්',
        'chart.monthlyTrend': 'මාසික ප්‍රවණතාව',
        'chart.noExpenseData': 'වියදම් දත්ත නොමැත',
        'chart.noTrendData': 'ප්‍රවණතා දත්ත නොමැත',
        'table.date': 'දිනය',
        'table.description': 'විස්තරය',
        'table.category': 'කාණ්ඩය',
        'table.type': 'වර්ගය',
        'table.amount': 'මුදල',
        'table.actions': 'ක්‍රියාමාර්ග',
        'table.recentTransactions': 'මෑත ගනුදෙනු',
        'table.noTransactions': 'තවමත් ගනුදෙනු නැත. ආරම්භ කිරීමට "ගනුදෙනුවක් එක් කරන්න" ක්ලික් කරන්න!',
        'table.noTransactionsFiltered': 'ගනුදෙනු හමු නොවීය. ඔබේ පෙරහන් සකස් කිරීමට උත්සාහ කරන්න!',
        'modal.addTransaction': 'ගනුදෙනුවක් එක් කරන්න',
        'modal.editTransaction': 'ගනුදෙනුව සංස්කරණය කරන්න',
        'modal.income': 'ආදායම',
        'modal.expense': 'වියදම',
        'modal.amount': 'මුදල',
        'modal.category': 'කාණ්ඩය',
        'modal.description': 'විස්තරය',
        'modal.date': 'දිනය',
        'modal.selectCategory': 'කාණ්ඩයක් තෝරන්න',
        'modal.enterDescription': 'විස්තරය ඇතුළත් කරන්න',
        'modal.transactionType': 'ගනුදෙනු වර්ගය',
        'delete.title': 'මකා දැමීම තහවුරු කරන්න',
        'delete.message': 'ඔබට මෙම ගනුදෙනුව මකා දැමීමට අවශ්‍ය බව විශ්වාසද?',
        'delete.confirmAll': 'ඔබට සියලුම ගනුදෙනු මකා දැමීමට අවශ්‍ය බව විශ්වාසද? මෙම ක්‍රියාව ආපසු හැරවිය නොහැක!',
        'settings.title': 'සැකසුම්',
        'settings.currency': 'මුදල් ඒකකය',
        'settings.currencyHelper': 'ඔබේ කැමති මුදල් ඒකකය තෝරන්න',
        'settings.theme': 'තේමාව',
        'settings.themeHelper': 'ඔබේ කැමති තේමාව තෝරන්න',
        'settings.language': 'භාෂාව',
        'settings.languageHelper': 'ඔබේ කැමති භාෂාව තෝරන්න',
        'settings.lightTheme': '☀️ ආලෝක තේමාව',
        'settings.darkTheme': '🌙 අඳුරු තේමාව',
        'settings.autoTheme': '🔄 ස්වයංක්‍රීය (පද්ධති පෙරනිමිය)',
        'settings.monthlyBudget': 'මාසික අයවැය',
        'settings.budgetHelper': 'ඔබේ මාසික වියදම් සීමාව සකසන්න',
        'settings.notifications': 'දැනුම්දීම්',
        'settings.budgetAlert': 'අයවැය අනතුරු ඇඟවීම (80% සීමාව)',
        'settings.transactionNotifications': 'ගනුදෙනු දැනුම්දීම්',
        'settings.dataManagement': 'දත්ත කළමනාකරණය',
        'settings.exportJSON': 'දත්ත අපනයනය (JSON)',
        'settings.importData': 'දත්ත ආනයනය',
        'settings.exportCSV': 'CSV ලෙස අපනයනය',
        'settings.clearAllData': 'සියලු දත්ත ඉවත් කරන්න',
        'category.food': 'ආහාර',
        'category.transport': 'ප්‍රවාහනය',
        'category.utilities': 'උපයෝගීතා',
        'category.entertainment': 'විනෝදාස්වාදය',
        'category.shopping': 'සාප්පු සවාරි',
        'category.health': 'සෞඛ්‍යය',
        'category.education': 'අධ්‍යාපනය',
        'category.rent': 'කුලිය/උකස',
        'category.insurance': 'රක්ෂණය',
        'category.debt': 'ණය/කර්ජය',
        'category.savings': 'ඉතිරිකිරීම්/ආයෝජන',
        'category.gifts': 'තෑගි',
        'category.travel': 'සංචාරක',
        'category.subscriptions': 'දායකත්ව',
        'category.personal': 'පෞද්ගලික සත්කාර',
        'category.salary': 'වැටුප',
        'category.business': 'ව්‍යාපාර/නිදහස්',
        'category.investment': 'ආයෝජන',
        'category.rental': 'කුලී ආදායම',
        'category.bonus': 'ප්‍රසාද දීමනාව',
        'category.gift-received': 'ලැබුණු තෑගි',
        'category.refund': 'ආපසු ගෙවීම',
        'category.other': 'වෙනත්',
        'toast.transactionAdded': 'සාර්ථකව එකතු කරන ලදී',
        'toast.transactionUpdated': 'ගනුදෙනුව සාර්ථකව යාවත්කාලීන කරන ලදී',
        'toast.transactionDeleted': 'ගනුදෙනුව සාර්ථකව මකා දමන ලදී',
        'toast.allCleared': 'සියලුම ගනුදෙනු ඉවත් කරන ලදී',
        'toast.settingsSaved': 'සැකසුම් සාර්ථකව සුරකින ලදී',
        'toast.dataExported': 'දත්ත සාර්ථකව අපනයනය කරන ලදී',
        'toast.csvExported': 'CSV සාර්ථකව අපනයනය කරන ලදී',
        'toast.dataImported': 'දත්ත සාර්ථකව ආනයනය කරන ලදී',
        'toast.reportDownloaded': 'වාර්තාව සාර්ථකව බාගත කරන ලදී! HTML ගොනුව ඔබේ බ්‍රවුසරයේ විවෘත කරන්න.',
        'toast.invalidAmount': 'කරුණාකර වලංගු මුදලක් ඇතුළත් කරන්න',
        'toast.selectCategory': 'කරුණාකර කාණ්ඩයක් තෝරන්න',
        'toast.enterDescription': 'කරුණාකර විස්තරයක් ඇතුළත් කරන්න',
        'toast.selectDate': 'කරුණාකර දිනයක් තෝරන්න',
        'toast.budgetExceeded': '⚠️ අයවැය ඉක්මවා ඇත! ඔබ ඔබේ මාසික අයවැයට වඩා වියදම් කර ඇත.',
        'toast.budgetWarning': '⚠️ අයවැය අනතුරු ඇඟවීම! ඔබ ඔබේ මාසික අයවැයෙන් 80% ක් භාවිතා කර ඇත.',
        'type.income': 'ආදායම',
        'type.expense': 'වියදම',
        'nav.calculator': 'ගණකය',
        'calculator.title': 'ගණකය',
        'calculator.clear': 'මකන්න',
        'calculator.copy': 'පරිගණය කරන්න',
        'calculator.copied': 'පරිගණය clipboard එක කරන ලදී!',
        'calculator.useInTransaction': 'ගණුදේනුවට භාවිතා කරන්න',
        'recurring.addTitle': 'පුනරාවර්තන ගනුදෙනුවක් එක් කරන්න',
        'recurring.editTitle': 'පුනරාවර්තන ගනුදෙනුව සංස්කරණය කරන්න',
        'recurring.noRecurring': 'තවමත් පුනරාවර්තන ගනුදෙනු නැත',
        'recurring.frequency': 'සංඛ්‍යාතය',
        'recurring.daily': 'දිනපතා',
        'recurring.weekly': 'සතිපතා',
        'recurring.monthly': 'මාසික',
        'recurring.yearly': 'වාර්ෂික',
        'recurring.startDate': 'ආරම්භක දිනය',
        'recurring.endDate': 'අවසාන දිනය',
        'recurring.endDateHelper': 'අවසාන දිනයක් නොමැති නම් හිස් තබන්න',
        'recurring.deleteMessage': 'මෙම පුනරාවර්තන ගනුදෙනුව මකා දැමීමට අවශ්‍ය බව විශ්වාසද?',
        'settings.recurringTransactions': 'පුනරාවර්තන ගනුදෙනු',
        'settings.categoryBudgets': 'කාණ්ඩ අයවැය',
        'settings.categoryBudgetsHelper': 'සෑම වියදම් කාණ්ඩයක් සඳහාම වියදම් සීමා සකසන්න',
        'btn.add': 'එක් කරන්න',
        // Cookie Policy
        'cookie.banner.title': '🍪 අපි කුකීස් භාවිතා කරමු',
        'cookie.banner.text': 'ඔබේ බ්‍රවුස් කිරීමේ අත්දැකීම වැඩිදියුණු කිරීමට, අඩවි තදබදය විශ්ලේෂණය කිරීමට සහ අන්තර්ගතය පුද්ගලීකරණය කිරීමට අපි කුකීස් සහ සමාන තාක්ෂණයන් භාවිතා කරමු.',
        'cookie.banner.settings': 'කුකී සැකසුම්',
        'cookie.banner.essentialOnly': 'අත්‍යවශ්‍ය පමණි',
        'cookie.banner.acceptAll': 'සියල්ල පිළිගන්න',
        'cookie.modal.title': 'කුකී ප්‍රතිපත්තිය සහ සැකසුම්',
        'cookie.modal.intro': 'ඔබේ අත්දැකීම වැඩිදියුණු කිරීමට අපි කුකීස් භාවිතා කරමු. ඔබේ මනාපයන් පහතින් කළමනාකරණය කරන්න.',
        'cookie.modal.aboutTitle': 'කුකීස් ගැන',
        'cookie.modal.aboutText': 'කුකීස් යනු ඔබ වෙබ් අඩවියක් පිවිසෙන විට ඔබේ උපාංගයේ ගබඩා වන කුඩා පෙළ ගොනු වේ. ඔබේ මනාපයන් මතක තබා ගැනීමට, ඔබ අපගේ යෙදුම භාවිතා කරන ආකාරය තේරුම් ගැනීමට සහ ඔබේ සමස්ත අත්දැකීම වැඩිදියුණු කිරීමට ඒවා උපකාර වේ.',
        'cookie.modal.essential.title': 'අත්‍යවශ්‍ය කුකීස්',
        'cookie.modal.essential.subtitle': 'යෙදුම නිසි ලෙස ක්‍රියා කිරීමට අවශ්‍යයි',
        'cookie.modal.essential.text': 'මෙම කුකීස් ඔබේ සැකසුම්, මනාපයන් සහ මූල්‍ය දත්ත දේශීයව සුරැකීම වැනි මූලික ක්‍රියාකාරීත්වය සඳහා අවශ්‍ය වේ. ඒවා අක්‍රිය කළ නොහැක.',
        'cookie.modal.essential.alwaysOn': 'සැමවිටම ක්‍රියාත්මකයි',
        'cookie.modal.analytics.title': 'විශ්ලේෂණ කුකීස්',
        'cookie.modal.analytics.subtitle': 'ඔබ යෙදුම භාවිතා කරන ආකාරය තේරුම් ගැනීමට උපකාර වේ',
        'cookie.modal.analytics.text': 'මෙම කුකීස් නිර්නාමිකව තොරතුරු එකතු කර වාර්තා කිරීමෙන් අමුත්තන් අපගේ යෙදුම සමඟ අන්තර්ක්‍රියා කරන ආකාරය තේරුම් ගැනීමට උපකාර වේ.',
        'cookie.modal.functional.title': 'ක්‍රියාකාරී කුකීස්',
        'cookie.modal.functional.subtitle': 'වැඩිදියුණු කළ ක්‍රියාකාරීත්වය සහ පුද්ගලීකරණය සක්‍රීය කරන්න',
        'cookie.modal.functional.text': 'මෙම කුකීස් ඔබේ භාෂා මනාපය, තේමා සැකසුම් සහ වෙනත් අභිරුචිකරණයන් මතක තබා ගැනීම වැනි වැඩිදියුණු කළ ක්‍රියාකාරීත්වය සක්‍රීය කරයි.',
        'cookie.modal.marketing.title': 'අලෙවිකරණ කුකීස්',
        'cookie.modal.marketing.subtitle': 'වෙළඳ ප්‍රචාරණ අරමුණු සඳහා භාවිතා වේ',
        'cookie.modal.marketing.text': 'මෙම කුකීස් ඔබේ රුචිකත්වයන් පිළිබඳ පැතිකඩක් ගොඩනගා වෙනත් අඩවි වල අදාළ දැන්වීම් පෙන්වීමට වෙළඳ ප්‍රචාරණ හවුල්කරුවන් විසින් අපගේ අඩවිය හරහා සකසනු ලැබිය හැක.',
        'cookie.modal.howWeUse': 'අපි කුකීස් භාවිතා කරන ආකාරය:',
        'cookie.modal.useItem1': 'ඔබේ මනාපයන් ගබඩා කරන්න (තේමාව, මුදල් වර්ගය, භාෂාව)',
        'cookie.modal.useItem2': 'ඔබේ මූල්‍ය දත්ත දේශීයව මතක තබා ගන්න',
        'cookie.modal.useItem3': 'විශේෂාංග වැඩිදියුණු කිරීමට යෙදුම් භාවිතය විශ්ලේෂණය කරන්න',
        'cookie.modal.useItem4': 'පුද්ගලීකරණය කළ අත්දැකීමක් ලබා දෙන්න',
        'cookie.modal.moreInfo': 'වැඩි විස්තර සඳහා, කරුණාකර අපගේ සම්පූර්ණ <a href="privacy-policy.html">පුද්ගලිකත්ව ප්‍රතිපත්තිය</a> කියවන්න.',
        'cookie.modal.cancel': 'අවලංගු කරන්න',
        'cookie.modal.savePreferences': 'මනාපයන් සුරකින්න',
        // Calendar & Reminder translations
        'calendar.title': 'ගනුදෙනු දිනදර්ශනය',
        'calendar.income': 'ආදායම',
        'calendar.expense': 'වියදම',
        'calendar.reminder': 'මතක් කිරීම',
        'calendar.clickToAdd': 'ගනුදෙනුවක් එක් කිරීමට දිනයක් ක්ලික් කරන්න',
        'reminder.title': 'මතක් කිරීමක් සකසන්න',
        'reminder.enable': 'මතක් කිරීම සක්‍රීය කරන්න',
        'reminder.date': 'මතක් කිරීමේ දිනය',
        'reminder.time': 'මතක් කිරීමේ වේලාව',
        'reminder.notification': 'ගනුදෙනු මතක් කිරීම',
        'reminder.missed': 'මඟ හැරුණු මතක් කිරීම',
        // Notebook translations
        'nav.notebook': 'සටහන් පොත',
        'notebook.title': 'මූල්‍ය සටහන් පොත',
        'notebook.addNote': 'සටහන එක් කරන්න',
        'notebook.editNote': 'සටහන සංස්කරණය',
        'notebook.allCategories': 'සියලුම වර්ග',
        'notebook.searchPlaceholder': 'සටහන් සොයන්න...',
        'notebook.pinnedNotes': 'පින් කළ සටහන්',
        'notebook.noNotes': 'සටහන් නැත',
        'notebook.noNotesDesc': 'ඔබේ පළමු මූල්‍ය සටහන එක් කරන්න!',
        'notebook.noteTitle': 'මාතෘකාව',
        'notebook.noteTitlePlaceholder': 'සටහන් මාතෘකාව ඇතුළත් කරන්න',
        'notebook.noteCategory': 'වර්ගය',
        'notebook.noteContent': 'අන්තර්ගතය',
        'notebook.noteContentPlaceholder': 'ඔබේ සටහන මෙහි ලියන්න...',
        'notebook.markdownSupport': 'පේළි බිඳීම් සහිත මූලික ආකෘතිකරණයට සහය දක්වයි',
        'notebook.pinNote': 'මෙම සටහන පින් කරන්න',
        'notebook.linkedAmount': 'ඉලක්ක මුදල (විකල්ප)',
        'notebook.linkedAmountHelper': 'මූල්‍ය ඉලක්ක හෝ අයවැය නිරීක්ෂණය සඳහා',
        'notebook.deleteConfirm': 'ඔබට මෙම සටහන මකා දැමීමට අවශ්‍ය බව විශ්වාසද?',
        'notebook.noteAdded': 'සටහන සාර්ථකව එකතු කරන ලදී',
        'notebook.noteUpdated': 'සටහන සාර්ථකව යාවත්කාලීන කරන ලදී',
        'notebook.noteDeleted': 'සටහන සාර්ථකව මකා දමන ලදී',
        'notebook.notePinned': 'සටහන පින් කරන ලදී',
        'notebook.noteUnpinned': 'සටහන ඉවත් කරන ලදී',
        'notebook.errorTitle': 'කරුණාකර මාතෘකාවක් ඇතුළත් කරන්න',
        'notebook.errorContent': 'කරුණාකර සටහන් අන්තර්ගතය ඇතුළත් කරන්න',
        'notebook.pin': 'පින් කරන්න',
        'notebook.unpin': 'ඉවත් කරන්න',
        'notebook.categoryGeneral': 'සාමාන්‍ය',
        'notebook.categoryGoal': 'මූල්‍ය ඉලක්කය',
        'notebook.categoryReminder': 'මතක් කිරීම',
        'notebook.categoryShopping': 'සාප්පු සවාරි ලැයිස්තුව'
    },
    ta: {
        'nav.brand': 'செலவு கண்காணிப்பாளர்',
        'nav.dashboard': 'முகப்புப் பலகை',
        'nav.allTransactions': 'அனைத்து பரிவர்த்தனைகள்',
        'nav.settings': 'அமைப்புகள்',
        'summary.totalIncome': 'மொத்த வருமானம்',
        'summary.totalExpenses': 'மொத்த செலவுகள்',
        'summary.balance': 'இருப்பு',
        'summary.monthlyBudget': 'மாதாந்திர வரவு செலவுத் திட்டம்',
        'summary.spent': 'செலவிடப்பட்டது',
        'btn.addTransaction': 'பரிவர்த்தனை சேர்',
        'btn.downloadReport': 'அறிக்கையை பதிவிறக்கவும்',
        'btn.clearAll': 'அனைத்தையும் அழி',
        'btn.save': 'பரிவர்த்தனையை சேமி',
        'btn.cancel': 'ரத்துசெய்',
        'btn.delete': 'நீக்கு',
        'btn.edit': 'திருத்து',
        'btn.close': 'மூடு',
        'btn.apply': 'பயன்படுத்து',
        'btn.saveSettings': 'அமைப்புகளை சேமி',
        'filter.allTypes': 'அனைத்து வகைகள்',
        'filter.incomeOnly': 'வருமானம் மட்டும்',
        'filter.expensesOnly': 'செலவுகள் மட்டும்',
        'filter.allCategories': 'அனைத்து வகைகள்',
        'filter.allTime': 'எல்லா நேரமும்',
        'filter.today': 'இன்று',
        'filter.thisWeek': 'இந்த வாரம்',
        'filter.thisMonth': 'இந்த மாதம்',
        'filter.thisYear': 'இந்த ஆண்டு',
        'filter.customRange': 'தனிப்பயன் வரம்பு',
        'filter.search': 'பரிவர்த்தனைகளைத் தேடு...',
        'filter.fromDate': 'தேதியிலிருந்து',
        'filter.toDate': 'தேதி வரை',
        'chart.expensesByCategory': 'வகைவாரியான செலவுகள்',
        'chart.monthlyTrend': 'மாதாந்திர போக்கு',
        'chart.noExpenseData': 'செலவு தரவு இல்லை',
        'chart.noTrendData': 'போக்கு தரவு இல்லை',
        'table.date': 'தேதி',
        'table.description': 'விளக்கம்',
        'table.category': 'வகை',
        'table.type': 'வகை',
        'table.amount': 'தொகை',
        'table.actions': 'செயல்கள்',
        'table.recentTransactions': 'சமீபத்திய பரிவர்த்தனைகள்',
        'table.noTransactions': 'இன்னும் பரிவர்த்தனைகள் இல்லை. தொடங்க "பரிவர்த்தனை சேர்" என்பதைக் கிளிக் செய்யவும்!',
        'table.noTransactionsFiltered': 'பரிவர்த்தனைகள் காணப்படவில்லை. உங்கள் வடிகட்டிகளை சரிசெய்ய முயற்சிக்கவும்!',
        'modal.addTransaction': 'பரிவர்த்தனை சேர்',
        'modal.editTransaction': 'பரிவர்த்தனையை திருத்து',
        'modal.income': 'வருமானம்',
        'modal.expense': 'செலவு',
        'modal.amount': 'தொகை',
        'modal.category': 'வகை',
        'modal.description': 'விளக்கம்',
        'modal.date': 'தேதி',
        'modal.selectCategory': 'ஒரு வகையைத் தேர்ந்தெடுக்கவும்',
        'modal.enterDescription': 'விளக்கத்தை உள்ளிடவும்',
        'modal.transactionType': 'பரிவர்த்தனை வகை',
        'delete.title': 'நீக்குதலை உறுதிப்படுத்து',
        'delete.message': 'இந்த பரிவர்த்தனையை நீக்க விரும்புகிறீர்களா?',
        'delete.confirmAll': 'அனைத்து பரிவர்த்தனைகளையும் நீக்க விரும்புகிறீர்களா? இந்த செயலை மாற்ற முடியாது!',
        'settings.title': 'அமைப்புகள்',
        'settings.currency': 'நாணயம்',
        'settings.currencyHelper': 'உங்கள் விருப்பமான நாணயத்தைத் தேர்ந்தெடுக்கவும்',
        'settings.theme': 'தீம்',
        'settings.themeHelper': 'உங்கள் விருப்பமான தீம் தேர்வு செய்யவும்',
        'settings.language': 'மொழி',
        'settings.languageHelper': 'உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்',
        'settings.lightTheme': '☀️ வெளிச்ச தீம்',
        'settings.darkTheme': '🌙 இருண்ட தீம்',
        'settings.autoTheme': '🔄 தானியங்கி (கணினி இயல்புநிலை)',
        'settings.monthlyBudget': 'மாதாந்திர வரவு செலவுத் திட்டம்',
        'settings.budgetHelper': 'உங்கள் மாதாந்திர செலவு வரம்பை அமைக்கவும்',
        'settings.notifications': 'அறிவிப்புகள்',
        'settings.budgetAlert': 'வரவு செலவுத் திட்ட எச்சரிக்கை (80% வரம்பு)',
        'settings.transactionNotifications': 'பரிவர்த்தனை அறிவிப்புகள்',
        'settings.dataManagement': 'தரவு மேலாண்மை',
        'settings.exportJSON': 'தரவை ஏற்றுமதி செய் (JSON)',
        'settings.importData': 'தரவை இறக்குமதி செய்',
        'settings.exportCSV': 'CSV ஆக ஏற்றுமதி செய்',
        'settings.clearAllData': 'அனைத்து தரவையும் அழி',
        'category.food': 'உணவு',
        'category.transport': 'போக்குவரத்து',
        'category.utilities': 'பயன்பாடுகள்',
        'category.entertainment': 'பொழுதுபோக்கு',
        'category.shopping': 'ஷாப்பிங்',
        'category.health': 'சுகாதாரம்',
        'category.education': 'கல்வி',
        'category.rent': 'வாடகை/அடமானம்',
        'category.insurance': 'காப்பீடு',
        'category.debt': 'கடன்',
        'category.savings': 'சேமிப்பு/முதலீடு',
        'category.gifts': 'பரிசுகள்',
        'category.travel': 'பயணம்',
        'category.subscriptions': 'சந்தாக்கள்',
        'category.personal': 'தனிப்பட்ட பராமரிப்பு',
        'category.salary': 'சம்பளம்',
        'category.business': 'வணிகம்/சுதந்திரம்',
        'category.investment': 'முதலீடு',
        'category.rental': 'வாடகை வருமானம்',
        'category.bonus': 'போனஸ்',
        'category.gift-received': 'பெற்ற பரிசு',
        'category.refund': 'திரும்பப் பெறுதல்',
        'category.other': 'மற்றவை',
        'toast.transactionAdded': 'வெற்றிகரமாக சேர்க்கப்பட்டது',
        'toast.transactionUpdated': 'பரிவர்த்தனை வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
        'toast.transactionDeleted': 'பரிவர்த்தனை வெற்றிகரமாக நீக்கப்பட்டது',
        'toast.allCleared': 'அனைத்து பரிவர்த்தனைகளும் அழிக்கப்பட்டன',
        'toast.settingsSaved': 'அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டன',
        'toast.dataExported': 'தரவு வெற்றிகரமாக ஏற்றுமதி செய்யப்பட்டது',
        'toast.csvExported': 'CSV வெற்றிகரமாக ஏற்றுமதி செய்யப்பட்டது',
        'toast.dataImported': 'தரவு வெற்றிகரமாக இறக்குமதி செய்யப்பட்டது',
        'toast.reportDownloaded': 'அறிக்கை வெற்றிகரமாக பதிவிறக்கப்பட்டது! HTML கோப்பை உங்கள் உலாவியில் திறக்கவும்.',
        'toast.invalidAmount': 'தயவுசெய்து செல்லுபடியாகும் தொகையை உள்ளிடவும்',
        'toast.selectCategory': 'தயவுசெய்து ஒரு வகையைத் தேர்ந்தெடுக்கவும்',
        'toast.enterDescription': 'தயவுசெய்து விளக்கத்தை உள்ளிடவும்',
        'toast.selectDate': 'தயவுசெய்து ஒரு தேதியைத் தேர்ந்தெடுக்கவும்',
        'toast.budgetExceeded': '⚠️ வரவு செலவுத் திட்டம் மீறப்பட்டது! நீங்கள் உங்கள் மாதாந்திர வரவு செலவுத் திட்டத்தை விட அதிகமாக செலவழித்துள்ளீர்கள்.',
        'toast.budgetWarning': '⚠️ வரவு செலவுத் திட்ட எச்சரிக்கை! நீங்கள் உங்கள் மாதாந்திர வரவு செலவுத் திட்டத்தில் 80% பயன்படுத்தியுள்ளீர்கள்.',
        'type.income': 'வருமானம்',
        'type.expense': 'செலவு',
        'nav.calculator': 'கணக்கீடு',
        'calculator.title': 'கணக்கீடு',
        'calculator.clear': 'அழி',
        'calculator.copy': 'நகல்',
        'calculator.copied': 'முடிவு clipboard இல் நகல் செய்யப்பட்டது!',
        'calculator.useInTransaction': 'பரிவர்த்தனையில் பயன்படுத்து',
        'recurring.addTitle': 'தொடர் பரிவர்த்தனை சேர்க்கவும்',
        'recurring.editTitle': 'தொடர் பரிவர்த்தனையைத் திருத்தவும்',
        'recurring.noRecurring': 'தொடர் பரிவர்த்தனைகள் இன்னும் இல்லை',
        'recurring.frequency': 'அதிர்வெண்',
        'recurring.daily': 'தினசரி',
        'recurring.weekly': 'வாரந்தோறும்',
        'recurring.monthly': 'மாதாந்திரம்',
        'recurring.yearly': 'ஆண்டுதோறும்',
        'recurring.startDate': 'தொடக்க தேதி',
        'recurring.endDate': 'முடிவு தேதி',
        'recurring.endDateHelper': 'முடிவு தேதி இல்லை என்றால் காலியாக விடவும்',
        'recurring.deleteMessage': 'இந்த தொடர் பரிவர்த்தனையை நீக்க விரும்புகிறீர்களா?',
        'settings.recurringTransactions': 'தொடர் பரிவர்த்தனைகள்',
        'settings.categoryBudgets': 'வகை வரவு செலவுத் திட்டங்கள்',
        'settings.categoryBudgetsHelper': 'ஒவ்வொரு செலவு வகைக்கும் செலவு வரம்புகளை அமைக்கவும்',
        'btn.add': 'சேர்',
        // Cookie Policy
        'cookie.banner.title': '🍪 நாங்கள் குக்கீகளைப் பயன்படுத்துகிறோம்',
        'cookie.banner.text': 'உங்கள் உலாவல் அனுபவத்தை மேம்படுத்தவும், தள போக்குவரத்தை பகுப்பாய்வு செய்யவும், உள்ளடக்கத்தை தனிப்பயனாக்கவும் குக்கீகள் மற்றும் ஒத்த தொழில்நுட்பங்களைப் பயன்படுத்துகிறோம்.',
        'cookie.banner.settings': 'குக்கீ அமைப்புகள்',
        'cookie.banner.essentialOnly': 'அத்தியாவசியம் மட்டும்',
        'cookie.banner.acceptAll': 'அனைத்தையும் ஏற்கவும்',
        'cookie.modal.title': 'குக்கீ கொள்கை & அமைப்புகள்',
        'cookie.modal.intro': 'உங்கள் அனுபவத்தை மேம்படுத்த குக்கீகளைப் பயன்படுத்துகிறோம். கீழே உங்கள் விருப்பங்களை நிர்வகிக்கவும்.',
        'cookie.modal.aboutTitle': 'குக்கீகள் பற்றி',
        'cookie.modal.aboutText': 'குக்கீகள் என்பது நீங்கள் ஒரு வலைத்தளத்தைப் பார்வையிடும்போது உங்கள் சாதனத்தில் சேமிக்கப்படும் சிறிய உரை கோப்புகள். உங்கள் விருப்பங்களை நினைவில் வைக்கவும், எங்கள் பயன்பாட்டை நீங்கள் எவ்வாறு பயன்படுத்துகிறீர்கள் என்பதைப் புரிந்துகொள்ளவும், உங்கள் ஒட்டுமொத்த அனுபவத்தை மேம்படுத்தவும் அவை எங்களுக்கு உதவுகின்றன.',
        'cookie.modal.essential.title': 'அத்தியாவசிய குக்கீகள்',
        'cookie.modal.essential.subtitle': 'பயன்பாடு சரியாக செயல்பட தேவை',
        'cookie.modal.essential.text': 'இந்த குக்கீகள் உங்கள் அமைப்புகள், விருப்பங்கள் மற்றும் நிதித் தரவை உள்ளூரில் சேமிப்பது போன்ற அடிப்படை செயல்பாட்டிற்கு அவசியம். அவற்றை முடக்க முடியாது.',
        'cookie.modal.essential.alwaysOn': 'எப்போதும் இயங்குகிறது',
        'cookie.modal.analytics.title': 'பகுப்பாய்வு குக்கீகள்',
        'cookie.modal.analytics.subtitle': 'நீங்கள் பயன்பாட்டை எவ்வாறு பயன்படுத்துகிறீர்கள் என்பதைப் புரிந்துகொள்ள உதவுங்கள்',
        'cookie.modal.analytics.text': 'இந்த குக்கீகள் அநாமதேயமாக தகவல்களைச் சேகரித்து அறிக்கையிடுவதன் மூலம் பார்வையாளர்கள் எங்கள் பயன்பாட்டுடன் எவ்வாறு தொடர்பு கொள்கிறார்கள் என்பதைப் புரிந்துகொள்ள எங்களுக்கு உதவுகின்றன.',
        'cookie.modal.functional.title': 'செயல்பாட்டு குக்கீகள்',
        'cookie.modal.functional.subtitle': 'மேம்படுத்தப்பட்ட செயல்பாடு மற்றும் தனிப்பயனாக்கத்தை இயக்கவும்',
        'cookie.modal.functional.text': 'இந்த குக்கீகள் உங்கள் மொழி விருப்பம், தீம் அமைப்புகள் மற்றும் பிற தனிப்பயனாக்கங்களை நினைவில் வைப்பது போன்ற மேம்படுத்தப்பட்ட செயல்பாட்டை இயக்குகின்றன.',
        'cookie.modal.marketing.title': 'சந்தைப்படுத்தல் குக்கீகள்',
        'cookie.modal.marketing.subtitle': 'விளம்பர நோக்கங்களுக்காக பயன்படுத்தப்படுகிறது',
        'cookie.modal.marketing.text': 'இந்த குக்கீகள் உங்கள் ஆர்வங்களின் சுயவிவரத்தை உருவாக்கி மற்ற தளங்களில் தொடர்புடைய விளம்பரங்களைக் காட்ட விளம்பர கூட்டாளர்களால் எங்கள் தளத்தின் வழியாக அமைக்கப்படலாம்.',
        'cookie.modal.howWeUse': 'நாங்கள் குக்கீகளை எவ்வாறு பயன்படுத்துகிறோம்:',
        'cookie.modal.useItem1': 'உங்கள் விருப்பங்களை சேமிக்கவும் (தீம், நாணயம், மொழி)',
        'cookie.modal.useItem2': 'உங்கள் நிதித் தரவை உள்ளூரில் நினைவில் வைக்கவும்',
        'cookie.modal.useItem3': 'அம்சங்களை மேம்படுத்த பயன்பாட்டு பயன்பாட்டை பகுப்பாய்வு செய்யவும்',
        'cookie.modal.useItem4': 'தனிப்பயனாக்கப்பட்ட அனுபவத்தை வழங்கவும்',
        'cookie.modal.moreInfo': 'மேலும் தகவலுக்கு, எங்கள் முழு <a href="privacy-policy.html">தனியுரிமைக் கொள்கையைப்</a> படிக்கவும்.',
        'cookie.modal.cancel': 'ரத்து செய்',
        'cookie.modal.savePreferences': 'விருப்பங்களை சேமி',
        // Calendar & Reminder translations
        'calendar.title': 'பரிவர்த்தனை நாட்காட்டி',
        'calendar.income': 'வருமானம்',
        'calendar.expense': 'செலவு',
        'calendar.reminder': 'நினைவூட்டல்',
        'calendar.clickToAdd': 'பரிவர்த்தனையைச் சேர்க்க தேதியைக் கிளிக் செய்யவும்',
        'reminder.title': 'நினைவூட்டலை அமைக்கவும்',
        'reminder.enable': 'நினைவூட்டலை இயக்கவும்',
        'reminder.date': 'நினைவூட்டல் தேதி',
        'reminder.time': 'நினைவூட்டல் நேரம்',
        'reminder.notification': 'பரிவர்த்தனை நினைவூட்டல்',
        'reminder.missed': 'தவறிய நினைவூட்டல்',
        // Notebook translations
        'nav.notebook': 'குறிப்பேடு',
        'notebook.title': 'நிதி குறிப்பேடு',
        'notebook.addNote': 'குறிப்பு சேர்',
        'notebook.editNote': 'குறிப்பு திருத்து',
        'notebook.allCategories': 'அனைத்து வகைகள்',
        'notebook.searchPlaceholder': 'குறிப்புகளைத் தேடு...',
        'notebook.pinnedNotes': 'பின் செய்த குறிப்புகள்',
        'notebook.noNotes': 'குறிப்புகள் இல்லை',
        'notebook.noNotesDesc': 'உங்கள் முதல் நிதி குறிப்பைச் சேர்க்கவும்!',
        'notebook.noteTitle': 'தலைப்பு',
        'notebook.noteTitlePlaceholder': 'குறிப்பு தலைப்பை உள்ளிடவும்',
        'notebook.noteCategory': 'வகை',
        'notebook.noteContent': 'உள்ளடக்கம்',
        'notebook.noteContentPlaceholder': 'உங்கள் குறிப்பை இங்கே எழுதுங்கள்...',
        'notebook.markdownSupport': 'வரி முறிவுகளுடன் அடிப்படை வடிவமைப்பை ஆதரிக்கிறது',
        'notebook.pinNote': 'இந்த குறிப்பை பின் செய்',
        'notebook.linkedAmount': 'இலக்கு தொகை (விருப்பம்)',
        'notebook.linkedAmountHelper': 'நிதி இலக்குகள் அல்லது பட்ஜெட் கண்காணிப்புக்கு',
        'notebook.deleteConfirm': 'இந்த குறிப்பை நீக்க விரும்புகிறீர்களா?',
        'notebook.noteAdded': 'குறிப்பு வெற்றிகரமாக சேர்க்கப்பட்டது',
        'notebook.noteUpdated': 'குறிப்பு வெற்றிகரமாக புதுப்பிக்கப்பட்டது',
        'notebook.noteDeleted': 'குறிப்பு வெற்றிகரமாக நீக்கப்பட்டது',
        'notebook.notePinned': 'குறிப்பு பின் செய்யப்பட்டது',
        'notebook.noteUnpinned': 'குறிப்பு பின் நீக்கப்பட்டது',
        'notebook.errorTitle': 'தலைப்பை உள்ளிடவும்',
        'notebook.errorContent': 'குறிப்பு உள்ளடக்கத்தை உள்ளிடவும்',
        'notebook.pin': 'பின் செய்',
        'notebook.unpin': 'பின் நீக்கு',
        'notebook.categoryGeneral': 'பொது',
        'notebook.categoryGoal': 'நிதி இலக்கு',
        'notebook.categoryReminder': 'நினைவூட்டல்',
        'notebook.categoryShopping': 'ஷாப்பிங் பட்டியல்'
    }
};

let settings = {
    monthlyBudget: 100000,
    currency: 'LKR',
    theme: 'light',
    language: 'en',
    budgetAlerts: true,
    transactionNotifications: true,
    categoryBudgets: {} // { categoryId: amount }
};

// ===========================
// Initialization
// ===========================
document.addEventListener('DOMContentLoaded', function () {
    loadSettings();
    applyTheme();
    loadData();
    processRecurringTransactions(); // Process recurring transactions on load
    initializeApp();
    setupEventListeners();
    setupReminderToggle(); // Setup reminder toggle in modal
    updateUI();
    checkBudgetAlert();
    initCalendar(); // Initialize the calendar
    initReminderSystem(); // Start checking for reminders
    initNotebook(); // Initialize the notebook
});

// ===========================
// Data Management
// ===========================
function loadData() {
    try {
        const data = localStorage.getItem(DATA_KEY);
        if (data) {
            transactions = JSON.parse(data);
        }

        // Load recurring transactions
        const recurringData = localStorage.getItem(RECURRING_KEY);
        if (recurringData) {
            recurringTransactions = JSON.parse(recurringData);
        }

        // Load notebooks
        const notebookData = localStorage.getItem(NOTEBOOK_KEY);
        if (notebookData) {
            notebooks = JSON.parse(notebookData);
        }
    } catch (error) {
        console.error('Error loading data:', error);
        showToast('Error loading data', 'danger');
        transactions = [];
        recurringTransactions = [];
    }
}

function saveData() {
    try {
        localStorage.setItem(DATA_KEY, JSON.stringify(transactions));
        localStorage.setItem(RECURRING_KEY, JSON.stringify(recurringTransactions));
        localStorage.setItem(NOTEBOOK_KEY, JSON.stringify(notebooks));
    } catch (error) {
        console.error('Error saving data:', error);
        showToast('Error saving data', 'danger');
    }
}

function loadSettings() {
    try {
        const data = localStorage.getItem(SETTINGS_KEY);
        if (data) {
            settings = { ...settings, ...JSON.parse(data) };
        }
    } catch (error) {
        console.error('Error loading settings:', error);
    }
}

function saveSettings() {
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

// ===========================
// Language/Translation Management
// ===========================
function translatePage() {
    const lang = settings.language || 'en';
    const translation = TRANSLATIONS[lang];

    if (!translation) return;

    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translation[key]) {
            if (element.tagName === 'INPUT' && element.type !== 'submit' && element.type !== 'button') {
                element.placeholder = translation[key];
            } else {
                element.textContent = translation[key];
            }
        }
    });

    // Update page title
    document.title = translation['nav.brand'] + ' - ' + (translation['nav.dashboard'] || 'Manage Your Finances');
}

function t(key) {
    const lang = settings.language || 'en';
    return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key] || key;
}

// ===========================
// Initialize Application
// ===========================
function initializeApp() {
    // Set today's date as default
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;

    // Populate category dropdowns
    populateCategoryDropdowns();

    // Set initial form state
    updateCategoryOptions('expense');

    // Load settings into UI
    document.getElementById('monthlyBudget').value = settings.monthlyBudget;
    document.getElementById('currencySelect').value = settings.currency;
    document.getElementById('themeSelect').value = settings.theme;
    document.getElementById('languageSelect').value = settings.language;
    document.getElementById('budgetAlerts').checked = settings.budgetAlerts;
    document.getElementById('transactionNotifications').checked = settings.transactionNotifications;

    updateCurrencyDisplay();
    document.getElementById('budgetAmount').textContent = formatCurrency(settings.monthlyBudget);

    // Render recurring transactions list
    renderRecurringList();

    // Render category budgets list
    renderCategoryBudgets();

    translatePage();
}

function populateCategoryDropdowns() {
    const categorySelect = document.getElementById('category');
    const filterCategory = document.getElementById('filterCategory');

    // Clear existing options (except first one)
    categorySelect.innerHTML = '<option value="">Select a category</option>';
    filterCategory.innerHTML = '<option value="all">All Categories</option>';

    CATEGORIES.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = `${cat.icon} ${cat.name}`;
        option.dataset.type = cat.type;
        categorySelect.appendChild(option);

        const filterOption = document.createElement('option');
        filterOption.value = cat.id;
        filterOption.textContent = `${cat.icon} ${cat.name}`;
        filterCategory.appendChild(filterOption);
    });
}

// ===========================
// Event Listeners
// ===========================
function setupEventListeners() {
    // Transaction form
    document.getElementById('saveTransactionBtn').addEventListener('click', saveTransaction);
    document.querySelectorAll('input[name="type"]').forEach(radio => {
        radio.addEventListener('change', function () {
            updateCategoryOptions(this.value);
        });
    });

    // Delete confirmation
    document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDelete);

    // Filters
    document.getElementById('filterType').addEventListener('change', applyFilters);
    document.getElementById('filterCategory').addEventListener('change', applyFilters);
    document.getElementById('filterPeriod').addEventListener('change', function () {
        if (this.value === 'custom') {
            document.getElementById('customDateRange').classList.remove('d-none');
        } else {
            document.getElementById('customDateRange').classList.add('d-none');
            applyFilters();
        }
    });
    document.getElementById('applyCustomDate').addEventListener('click', applyFilters);
    document.getElementById('searchInput').addEventListener('input', debounce(applyFilters, 300));

    // Settings
    document.getElementById('saveSettingsBtn').addEventListener('click', saveSettingsHandler);
    document.getElementById('currencySelect').addEventListener('change', updateCurrencyDisplay);
    document.getElementById('languageSelect').addEventListener('change', function () {
        settings.language = this.value;
        translatePage();
        updateUI();
    });
    document.getElementById('exportDataBtn').addEventListener('click', exportData);
    document.getElementById('exportCSVBtn').addEventListener('click', exportCSV);
    document.getElementById('importDataBtn').addEventListener('click', () => {
        document.getElementById('importFileInput').click();
    });
    document.getElementById('importFileInput').addEventListener('change', importData);

    // Download Report
    document.getElementById('downloadReportBtn').addEventListener('click', downloadReport);

    // Clear all
    document.getElementById('clearAllBtn').addEventListener('click', clearAllTransactions);

    // Recurring transactions
    document.getElementById('saveRecurringBtn').addEventListener('click', saveRecurringTransaction);
    document.getElementById('confirmDeleteRecurringBtn').addEventListener('click', confirmDeleteRecurring);
    document.querySelectorAll('input[name="recurringType"]').forEach(radio => {
        radio.addEventListener('change', function () {
            updateRecurringCategoryOptions(this.value);
        });
    });

    // Modal reset on close
    document.getElementById('addTransactionModal').addEventListener('hidden.bs.modal', resetTransactionForm);
    document.getElementById('addRecurringModal').addEventListener('hidden.bs.modal', resetRecurringForm);
    document.getElementById('addRecurringModal').addEventListener('shown.bs.modal', function () {
        updateRecurringCategoryOptions('expense');
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('recurringStartDate').value = today;
    });
}

// ===========================
// CRUD Operations
// ===========================
function saveTransaction() {
    const id = document.getElementById('transactionId').value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value.trim();
    const date = document.getElementById('date').value;

    // Get reminder fields
    const reminderEnabled = document.getElementById('enableReminder')?.checked || false;
    const reminderDate = document.getElementById('reminderDate')?.value || '';
    const reminderTime = document.getElementById('reminderTime')?.value || '';

    // Validation
    if (!amount || amount <= 0) {
        showToast('Please enter a valid amount', 'danger');
        return;
    }

    if (!category) {
        showToast('Please select a category', 'danger');
        return;
    }

    if (!description) {
        showToast('Please enter a description', 'danger');
        return;
    }

    if (!date) {
        showToast('Please select a date', 'danger');
        return;
    }

    // Validate reminder if enabled
    if (reminderEnabled && !reminderDate) {
        showToast('Please set a reminder date', 'danger');
        return;
    }

    const transaction = {
        id: id || Date.now().toString(),
        type,
        amount,
        category,
        description,
        date,
        timestamp: new Date(date).getTime(),
        reminder: {
            enabled: reminderEnabled,
            reminderDate: reminderDate,
            reminderTime: reminderTime || '09:00',
            notified: false
        }
    };

    if (id) {
        // Update existing transaction
        const index = transactions.findIndex(t => String(t.id) === String(id));
        if (index !== -1) {
            transaction.id = transactions[index].id; // Keep original ID
            transactions[index] = transaction;
            if (settings.transactionNotifications) {
                showToast('Transaction updated successfully', 'success');
            }
        }
    } else {
        // Add new transaction
        transactions.push(transaction);
        if (settings.transactionNotifications) {
            showToast(`${type === 'income' ? 'Income' : 'Expense'} added: ${formatCurrency(amount)}`, 'success');
        }
    }

    saveData();
    updateUI();
    checkBudgetAlert();
    checkCategoryBudgetAlerts();

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addTransactionModal'));
    modal.hide();
}

function editTransaction(id) {
    const transaction = transactions.find(t => String(t.id) === String(id));
    if (!transaction) return;

    // Populate form
    document.getElementById('transactionId').value = transaction.id;
    document.getElementById(transaction.type === 'income' ? 'typeIncome' : 'typeExpense').checked = true;
    document.getElementById('amount').value = transaction.amount;
    updateCategoryOptions(transaction.type);
    document.getElementById('category').value = transaction.category;
    document.getElementById('description').value = transaction.description;
    document.getElementById('date').value = transaction.date;

    // Populate reminder fields
    const reminderEnabled = document.getElementById('enableReminder');
    const reminderDate = document.getElementById('reminderDate');
    const reminderTime = document.getElementById('reminderTime');
    const reminderFields = document.getElementById('reminderOptions');

    if (transaction.reminder && transaction.reminder.enabled) {
        if (reminderEnabled) reminderEnabled.checked = true;
        if (reminderDate) reminderDate.value = transaction.reminder.reminderDate || '';
        if (reminderTime) reminderTime.value = transaction.reminder.reminderTime || '09:00';
        if (reminderFields) reminderFields.classList.remove('d-none');
    } else {
        if (reminderEnabled) reminderEnabled.checked = false;
        if (reminderDate) reminderDate.value = '';
        if (reminderTime) reminderTime.value = '09:00';
        if (reminderFields) reminderFields.classList.add('d-none');
    }

    // Update modal title
    document.getElementById('modalTitle').innerHTML = '<i class="bi bi-pencil-square"></i> Edit Transaction';

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('addTransactionModal'));
    modal.show();
}

function duplicateTransaction(id) {
    const transaction = transactions.find(t => String(t.id) === String(id));
    if (!transaction) return;

    // Populate form WITHOUT the transaction ID (so it creates a new one)
    document.getElementById('transactionId').value = '';
    document.getElementById(transaction.type === 'income' ? 'typeIncome' : 'typeExpense').checked = true;
    document.getElementById('amount').value = transaction.amount;
    updateCategoryOptions(transaction.type);
    document.getElementById('category').value = transaction.category;
    document.getElementById('description').value = transaction.description;

    // Set today's date for the duplicate
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;

    // Update modal title
    document.getElementById('modalTitle').innerHTML = '<i class="bi bi-copy"></i> Duplicate Transaction';

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('addTransactionModal'));
    modal.show();
}

function deleteTransaction(id) {
    deleteTransactionId = String(id);
    const modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();
}

function confirmDelete() {
    if (deleteTransactionId) {
        transactions = transactions.filter(t => String(t.id) !== String(deleteTransactionId));
        saveData();
        updateUI();
        showToast('Transaction deleted successfully', 'success');

        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
        modal.hide();
        deleteTransactionId = null;
    }
}

function clearAllTransactions() {
    if (transactions.length === 0) {
        showToast('No transactions to clear', 'info');
        return;
    }

    if (confirm('Are you sure you want to delete ALL transactions? This action cannot be undone!')) {
        transactions = [];
        saveData();
        updateUI();
        showToast('All transactions cleared', 'success');
    }
}

// ===========================
// UI Updates
// ===========================
function updateUI() {
    updateSummaryCards();
    updateTransactionsList();
    updateAllTransactionsList();
    updateCharts();
    updateCalendar(); // Update calendar with latest transactions
}

function updateSummaryCards() {
    const filtered = getFilteredTransactions();

    const totalIncome = filtered
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = filtered
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    document.getElementById('totalIncome').textContent = formatCurrency(totalIncome);
    document.getElementById('totalExpense').textContent = formatCurrency(totalExpense);
    document.getElementById('balance').textContent = formatCurrency(balance);

    // Update budget progress
    const budgetPercentage = Math.min((totalExpense / settings.monthlyBudget) * 100, 100);
    const progressBar = document.getElementById('budgetProgress');
    progressBar.style.width = budgetPercentage + '%';
    progressBar.setAttribute('aria-valuenow', budgetPercentage);

    // Change color based on percentage
    progressBar.className = 'progress-bar';
    if (budgetPercentage >= 100) {
        progressBar.classList.add('bg-danger');
    } else if (budgetPercentage >= 80) {
        progressBar.classList.add('bg-warning');
    }

    document.getElementById('budgetText').textContent =
        `${formatCurrency(totalExpense)} of ${formatCurrency(settings.monthlyBudget)} spent (${budgetPercentage.toFixed(1)}%)`;
}

function updateTransactionsList() {
    const tbody = document.getElementById('transactionsList');
    const filtered = getFilteredTransactions();
    const recent = filtered.slice(0, 10); // Show only recent 10

    if (recent.length === 0) {
        tbody.innerHTML = `
            <tr id="noDataRow">
                <td colspan="6" class="text-center py-5 text-muted">
                    <i class="bi bi-inbox" style="font-size: 3rem;"></i>
                    <p class="mt-3">No transactions found. Try adjusting your filters!</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = recent.map(t => createTransactionRow(t)).join('');
}

function updateAllTransactionsList() {
    const tbody = document.getElementById('allTransactionsList');
    const filtered = getFilteredTransactions();

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-5 text-muted">
                    <i class="bi bi-inbox" style="font-size: 3rem;"></i>
                    <p class="mt-3">No transactions found</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map(t => createTransactionRow(t, false)).join('');
}

function createTransactionRow(transaction, showActions = true) {
    const category = CATEGORIES.find(c => c.id === transaction.category) || CATEGORIES[CATEGORIES.length - 1];
    const formattedDate = new Date(transaction.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const actionsColumn = showActions ? `
            <td class="text-center text-nowrap">
                <button class="btn btn-sm btn-outline-primary btn-action" onclick="editTransaction('${transaction.id}')" title="Edit">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-secondary btn-action" onclick="duplicateTransaction('${transaction.id}')" title="Duplicate">
                    <i class="bi bi-copy"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger btn-action" onclick="deleteTransaction('${transaction.id}')" title="Delete">
                    <i class="bi bi-trash"></i>
                </button>
            </td>` : '';

    return `
        <tr class="fade-in">
            <td class="text-nowrap">${formattedDate}</td>
            <td>${transaction.description}</td>
            <td>
                <span class="category-badge category-${category.id}">
                    ${category.icon} ${category.name}
                </span>
            </td>
            <td>
                <span class="badge-${transaction.type}">
                    ${transaction.type === 'income' ? '↓ Income' : '↑ Expense'}
                </span>
            </td>
            <td class="text-end">
                <strong class="amount-${transaction.type}">
                    ${transaction.type === 'income' ? '+' : '-'}${formatCurrency(transaction.amount)}
                </strong>
            </td>${actionsColumn}
        </tr>
    `;
}

// ===========================
// Filtering & Search
// ===========================
function getFilteredTransactions() {
    let filtered = [...transactions];

    // Sort by date (newest first)
    filtered.sort((a, b) => b.timestamp - a.timestamp);

    // Filter by type
    const typeFilter = document.getElementById('filterType').value;
    if (typeFilter !== 'all') {
        filtered = filtered.filter(t => t.type === typeFilter);
    }

    // Filter by category
    const categoryFilter = document.getElementById('filterCategory').value;
    if (categoryFilter !== 'all') {
        filtered = filtered.filter(t => t.category === categoryFilter);
    }

    // Filter by period
    const periodFilter = document.getElementById('filterPeriod').value;
    filtered = filterByPeriod(filtered, periodFilter);

    // Search
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    if (searchTerm) {
        filtered = filtered.filter(t =>
            t.description.toLowerCase().includes(searchTerm) ||
            t.amount.toString().includes(searchTerm)
        );
    }

    return filtered;
}

function filterByPeriod(transactions, period) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    switch (period) {
        case 'today':
            return transactions.filter(t => {
                const transDate = new Date(t.date);
                return transDate >= today;
            });

        case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return transactions.filter(t => new Date(t.date) >= weekAgo);

        case 'month':
            const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
            return transactions.filter(t => new Date(t.date) >= monthStart);

        case 'year':
            const yearStart = new Date(now.getFullYear(), 0, 1);
            return transactions.filter(t => new Date(t.date) >= yearStart);

        case 'custom':
            const dateFrom = document.getElementById('filterDateFrom').value;
            const dateTo = document.getElementById('filterDateTo').value;

            if (!dateFrom || !dateTo) return transactions;

            return transactions.filter(t => {
                const transDate = new Date(t.date);
                return transDate >= new Date(dateFrom) && transDate <= new Date(dateTo);
            });

        default:
            return transactions;
    }
}

function applyFilters() {
    updateUI();
}

// ===========================
// Charts
// ===========================
function updateCharts() {
    updateCategoryChart();
    updateTrendChart();
}

function updateCategoryChart() {
    const canvas = document.getElementById('categoryChart');
    const noDataDiv = document.getElementById('noCategoryData');
    const filtered = getFilteredTransactions();
    const expenses = filtered.filter(t => t.type === 'expense');

    if (expenses.length === 0) {
        canvas.style.display = 'none';
        noDataDiv.classList.remove('d-none');
        if (categoryChart) {
            categoryChart.destroy();
            categoryChart = null;
        }
        return;
    }

    canvas.style.display = 'block';
    noDataDiv.classList.add('d-none');

    // Group by category
    const categoryTotals = {};
    expenses.forEach(t => {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    const labels = [];
    const data = [];
    const colors = [];

    Object.entries(categoryTotals).forEach(([catId, total]) => {
        const category = CATEGORIES.find(c => c.id === catId);
        if (category) {
            labels.push(`${category.icon} ${category.name}`);
            data.push(total);
            colors.push(category.color);
        }
    });

    const chartData = {
        labels,
        datasets: [{
            data,
            backgroundColor: colors,
            borderWidth: 2,
            borderColor: '#fff'
        }]
    };

    if (categoryChart) {
        categoryChart.data = chartData;
        categoryChart.update();
    } else {
        categoryChart = new Chart(canvas, {
            type: 'doughnut',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const label = context.label || '';
                                const value = formatCurrency(context.parsed);
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return `${label}: ${value} (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }
}

function updateTrendChart() {
    const canvas = document.getElementById('trendChart');
    const noDataDiv = document.getElementById('noTrendData');
    const filtered = getFilteredTransactions();

    if (filtered.length === 0) {
        canvas.style.display = 'none';
        noDataDiv.classList.remove('d-none');
        if (trendChart) {
            trendChart.destroy();
            trendChart = null;
        }
        return;
    }

    canvas.style.display = 'block';
    noDataDiv.classList.add('d-none');

    // Get last 6 months
    const months = [];
    const incomeData = [];
    const expenseData = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        months.push(date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }));

        const monthTransactions = transactions.filter(t => t.date.startsWith(monthKey));
        const income = monthTransactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const expense = monthTransactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

        incomeData.push(income);
        expenseData.push(expense);
    }

    const chartData = {
        labels: months,
        datasets: [
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(34, 197, 94, 0.2)',
                borderColor: '#22c55e',
                borderWidth: 2,
                tension: 0.3
            },
            {
                label: 'Expenses',
                data: expenseData,
                backgroundColor: 'rgba(239, 68, 68, 0.2)',
                borderColor: '#ef4444',
                borderWidth: 2,
                tension: 0.3
            }
        ]
    };

    if (trendChart) {
        trendChart.data = chartData;
        trendChart.update();
    } else {
        trendChart = new Chart(canvas, {
            type: 'line',
            data: chartData,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            font: {
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function (value) {
                                return settings.currencySymbol + value;
                            }
                        }
                    }
                }
            }
        });
    }
}

// ===========================
// Settings
// ===========================
function saveSettingsHandler() {
    const budget = parseFloat(document.getElementById('monthlyBudget').value);
    const currency = document.getElementById('currencySelect').value;
    const theme = document.getElementById('themeSelect').value;
    const language = document.getElementById('languageSelect').value;
    const budgetAlerts = document.getElementById('budgetAlerts').checked;
    const transactionNotifications = document.getElementById('transactionNotifications').checked;

    if (budget && budget > 0) {
        settings.monthlyBudget = budget;
    }

    if (currency) {
        settings.currency = currency;
    }

    settings.theme = theme;
    settings.language = language;
    settings.budgetAlerts = budgetAlerts;
    settings.transactionNotifications = transactionNotifications;

    saveSettings();
    applyTheme();
    translatePage();
    updateCurrencyDisplay();
    document.getElementById('budgetAmount').textContent = formatCurrency(settings.monthlyBudget);
    updateUI();
    showToast(t('toast.settingsSaved'), 'success');

    const modal = bootstrap.Modal.getInstance(document.getElementById('settingsModal'));
    modal.hide();
}

// ===========================
// Theme Management
// ===========================
function applyTheme() {
    const theme = settings.theme;

    if (theme === 'auto') {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    } else {
        document.documentElement.setAttribute('data-theme', theme);
    }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (settings.theme === 'auto') {
        applyTheme();
    }
});

// ===========================
// Currency Management
// ===========================
function updateCurrencyDisplay() {
    const currencyInfo = CURRENCIES[settings.currency];
    const symbol = currencyInfo.symbol;

    // Update all currency symbols in the UI
    document.getElementById('budgetCurrencySymbol').textContent = symbol;

    // Update transaction modal currency symbol
    const transactionCurrencySymbol = document.getElementById('transactionCurrencySymbol');
    if (transactionCurrencySymbol) {
        transactionCurrencySymbol.textContent = symbol;
    }

    // Update amount input placeholder
    const amountInput = document.getElementById('amount');
    if (amountInput) {
        amountInput.placeholder = '0.00';
    }
}

// ===========================
// Budget Alert
// ===========================
function checkBudgetAlert() {
    if (!settings.budgetAlerts) return;

    const filtered = getFilteredTransactions();
    const totalExpense = filtered
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const percentage = (totalExpense / settings.monthlyBudget) * 100;

    if (percentage >= 100) {
        showToast('⚠️ Budget Exceeded! You have spent more than your monthly budget.', 'danger');
    } else if (percentage >= 80 && percentage < 100) {
        showToast('⚠️ Budget Warning! You have used 80% of your monthly budget.', 'warning');
    }
}

// ===========================
// Import/Export
// ===========================
function exportData() {
    const dataStr = JSON.stringify({
        transactions,
        settings,
        exportDate: new Date().toISOString(),
        version: '1.0'
    }, null, 2);

    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expense-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    showToast('Data exported successfully', 'success');
}

function exportCSV() {
    if (transactions.length === 0) {
        showToast('No transactions to export', 'info');
        return;
    }

    // CSV Header
    let csv = 'Date,Type,Category,Description,Amount,Currency\n';

    // CSV Rows
    transactions.forEach(t => {
        const category = CATEGORIES.find(c => c.id === t.category) || CATEGORIES[CATEGORIES.length - 1];
        csv += `${t.date},${t.type},${category.name},"${t.description}",${t.amount},${settings.currency}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expense-tracker-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    showToast('CSV exported successfully', 'success');
}

function downloadReport() {
    if (transactions.length === 0) {
        showToast('No transactions to generate report', 'info');
        return;
    }

    const filtered = getFilteredTransactions();
    const totalIncome = filtered.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = filtered.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpense;
    const currencyInfo = CURRENCIES[settings.currency];

    // Generate HTML report
    let reportHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Modern Expense Tracker - Track your income and expenses efficiently">
    <title>Expense Tracker Report - ${new Date().toLocaleDateString()}</title>
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230d6efd'/%3E%3Ctext x='50' y='70' font-size='60' text-anchor='middle' fill='white' font-family='Arial, sans-serif' font-weight='bold'%3E💰%3C/text%3E%3C/svg%3E">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; background: #f8f9fa; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 40px; border-bottom: 3px solid #0d6efd; padding-bottom: 20px; }
        .header h1 { color: #0d6efd; font-size: 2.5em; margin-bottom: 10px; }
        .header .date { color: #6c757d; font-size: 1.1em; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 40px; }
        .summary-card { padding: 25px; border-radius: 8px; text-align: center; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .summary-card.income { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; }
        .summary-card.expense { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; }
        .summary-card.balance { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; }
        .summary-card.budget { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; }
        .summary-card h3 { font-size: 0.9em; margin-bottom: 10px; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px; }
        .summary-card .amount { font-size: 2em; font-weight: bold; }
        .section { margin-bottom: 40px; }
        .section h2 { color: #0d6efd; margin-bottom: 20px; font-size: 1.8em; border-left: 4px solid #0d6efd; padding-left: 15px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        th { background: #0d6efd; color: white; padding: 15px; text-align: left; font-weight: 600; text-transform: uppercase; font-size: 0.85em; letter-spacing: 0.5px; }
        td { padding: 12px 15px; border-bottom: 1px solid #e9ecef; }
        tr:hover { background: #f8f9fa; }
        .badge { padding: 5px 12px; border-radius: 20px; font-size: 0.85em; font-weight: 600; }
        .badge-income { background: #d1fae5; color: #065f46; }
        .badge-expense { background: #fee2e2; color: #991b1b; }
        .category-badge { padding: 4px 10px; border-radius: 15px; font-size: 0.8em; background: #e0e7ff; color: #3730a3; }
        .text-right { text-align: right; }
        .text-center { text-align: center; }
        .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #e9ecef; text-align: center; color: #6c757d; font-size: 0.9em; }
        .no-data { text-align: center; padding: 40px; color: #6c757d; }
        @media print { body { padding: 0; background: white; } .container { box-shadow: none; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💰 Expense Tracker Report</h1>
            <p class="date">Generated on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p class="date">Currency: ${currencyInfo.name} (${currencyInfo.symbol})</p>
        </div>

        <div class="summary">
            <div class="summary-card income">
                <h3>Total Income</h3>
                <div class="amount">${formatCurrency(totalIncome)}</div>
            </div>
            <div class="summary-card expense">
                <h3>Total Expenses</h3>
                <div class="amount">${formatCurrency(totalExpense)}</div>
            </div>
            <div class="summary-card balance">
                <h3>Balance</h3>
                <div class="amount">${formatCurrency(balance)}</div>
            </div>
            <div class="summary-card budget">
                <h3>Monthly Budget</h3>
                <div class="amount">${formatCurrency(settings.monthlyBudget)}</div>
            </div>
        </div>

        <div class="section" style="overflow-x:auto;">
            <h2>📊 Transaction Details</h2>
            ${filtered.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th class="text-center">Type</th>
                        <th class="text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    ${filtered.sort((a, b) => b.timestamp - a.timestamp).map(t => {
        const category = CATEGORIES.find(c => c.id === t.category) || CATEGORIES[CATEGORIES.length - 1];
        return `
                        <tr>
                            <td>${new Date(t.date).toLocaleDateString()}</td>
                            <td>${t.description}</td>
                            <td><span class="category-badge">${category.icon} ${category.name}</span></td>
                            <td class="text-center"><span class="badge badge-${t.type}">${t.type.toUpperCase()}</span></td>
                            <td class="text-right"><strong>${formatCurrency(t.amount)}</strong></td>
                        </tr>`;
    }).join('')}
                </tbody>
            </table>
            ` : '<div class="no-data">No transactions found for the selected period</div>'}
        </div>

        <div class="footer">
            <p><strong>Expense Tracker</strong> - Your Personal Finance Manager</p>
            <p>Report generated automatically on ${new Date().toLocaleString()}</p>
        </div>
    </div>
</body>
</html>`;

    // Create and download the report
    const blob = new Blob([reportHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `expense-report-${new Date().toISOString().split('T')[0]}.html`;
    link.click();
    URL.revokeObjectURL(url);

    showToast('Report downloaded successfully! Open the HTML file in your browser.', 'success');
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const imported = JSON.parse(e.target.result);

            if (imported.transactions) {
                if (confirm('This will replace all existing data. Continue?')) {
                    transactions = imported.transactions;
                    if (imported.settings) {
                        settings = { ...settings, ...imported.settings };
                    }
                    saveData();
                    saveSettings();
                    applyTheme();
                    updateUI();
                    initializeApp();
                    showToast('Data imported successfully', 'success');
                }
            } else {
                showToast('Invalid backup file format', 'danger');
            }
        } catch (error) {
            console.error('Import error:', error);
            showToast('Error importing data', 'danger');
        }

        // Reset file input
        event.target.value = '';
    };
    reader.readAsText(file);
}

// ===========================
// Helper Functions
// ===========================
function formatCurrency(amount) {
    const currencyInfo = CURRENCIES[settings.currency];
    return currencyInfo.symbol + amount.toFixed(currencyInfo.decimals);
}

function updateCategoryOptions(type) {
    const categorySelect = document.getElementById('category');
    const options = categorySelect.querySelectorAll('option');

    options.forEach(option => {
        if (option.value === '') return; // Skip default option

        const catType = option.dataset.type;
        if (catType === 'both' || catType === type) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    });

    // Reset selection if current selection is hidden
    const currentValue = categorySelect.value;
    const currentOption = categorySelect.querySelector(`option[value="${currentValue}"]`);
    if (currentOption && currentOption.style.display === 'none') {
        categorySelect.value = '';
    }
}

function resetTransactionForm() {
    document.getElementById('transactionForm').reset();
    document.getElementById('transactionId').value = '';
    document.getElementById('typeExpense').checked = true;
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;
    document.getElementById('modalTitle').innerHTML = '<i class="bi bi-plus-circle"></i> Add Transaction';
    updateCategoryOptions('expense');

    // Reset reminder fields
    const reminderEnabled = document.getElementById('enableReminder');
    const reminderDate = document.getElementById('reminderDate');
    const reminderTime = document.getElementById('reminderTime');
    const reminderFields = document.getElementById('reminderOptions');

    if (reminderEnabled) reminderEnabled.checked = false;
    if (reminderDate) reminderDate.value = '';
    if (reminderTime) reminderTime.value = '09:00';
    if (reminderFields) reminderFields.classList.add('d-none');
}

function resetRecurringForm() {
    const form = document.getElementById('recurringForm');
    form.reset();
    delete form.dataset.editId;

    document.getElementById('recurringExpense').checked = true;
    document.getElementById('recurringFrequency').value = 'monthly';
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('recurringStartDate').value = today;
    document.getElementById('recurringEndDate').value = '';
    updateRecurringCategoryOptions('expense');

    // Reset modal title
    const modalTitle = document.querySelector('#addRecurringModal .modal-title span');
    if (modalTitle) {
        modalTitle.textContent = t('recurring.addTitle');
    }
}

function saveRecurringTransaction() {
    const form = document.getElementById('recurringForm');
    const editId = form.dataset.editId;

    const type = document.querySelector('input[name="recurringType"]:checked').value;
    const description = document.getElementById('recurringDescription').value.trim();
    const amount = parseFloat(document.getElementById('recurringAmount').value);
    const category = document.getElementById('recurringCategory').value;
    const frequency = document.getElementById('recurringFrequency').value;
    const startDate = document.getElementById('recurringStartDate').value;
    const endDate = document.getElementById('recurringEndDate').value;

    // Validation
    if (!description) {
        showToast('Please enter a description', 'danger');
        return;
    }

    if (!amount || amount <= 0) {
        showToast('Please enter a valid amount', 'danger');
        return;
    }

    if (!category) {
        showToast('Please select a category', 'danger');
        return;
    }

    if (!startDate) {
        showToast('Please select a start date', 'danger');
        return;
    }

    if (editId) {
        // Update existing recurring transaction
        const index = recurringTransactions.findIndex(r => r.id === parseInt(editId));
        if (index !== -1) {
            recurringTransactions[index] = {
                ...recurringTransactions[index],
                type,
                description,
                amount,
                category,
                frequency,
                startDate,
                endDate: endDate || null
            };
            saveData();
            renderRecurringList();
            showToast('Recurring transaction updated successfully', 'success');
        }
    } else {
        // Add new recurring transaction
        const recurring = {
            type,
            description,
            amount,
            category,
            frequency,
            startDate,
            endDate: endDate || null,
            enabled: true
        };

        addRecurringTransaction(recurring);
        showToast('Recurring transaction added successfully', 'success');
    }

    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('addRecurringModal'));
    modal.hide();
}

function confirmDeleteRecurring() {
    if (deleteRecurringId) {
        deleteRecurringTransaction(deleteRecurringId);
        showToast('Recurring transaction deleted successfully', 'success');

        const modal = bootstrap.Modal.getInstance(document.getElementById('deleteRecurringModal'));
        modal.hide();
        deleteRecurringId = null;
    }
}

function updateRecurringCategoryOptions(type) {
    const select = document.getElementById('recurringCategory');
    select.innerHTML = '<option value="" data-i18n="modal.selectCategory">Select a category</option>';

    CATEGORIES.forEach(cat => {
        if (cat.type === type || cat.type === 'both') {
            const option = document.createElement('option');
            option.value = cat.id;
            option.textContent = `${cat.icon} ${cat.name}`;
            select.appendChild(option);
        }
    });

    // Update currency symbol
    const currencySymbol = CURRENCIES[settings.currency].symbol;
    document.getElementById('recurringCurrencySymbol').textContent = currencySymbol;
}

function showToast(message, type = 'success') {
    const toastEl = document.getElementById('toast');
    const toastBody = document.getElementById('toastMessage');

    toastBody.textContent = message;

    // Remove old classes
    toastEl.classList.remove('bg-success', 'bg-danger', 'bg-info', 'bg-warning', 'text-white', 'text-dark');

    // Add new class
    if (type === 'success') {
        toastEl.classList.add('bg-success', 'text-white');
    } else if (type === 'danger') {
        toastEl.classList.add('bg-danger', 'text-white');
    } else if (type === 'info') {
        toastEl.classList.add('bg-info', 'text-white');
    } else if (type === 'warning') {
        toastEl.classList.add('bg-warning', 'text-dark');
    }

    const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 4000
    });
    toast.show();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===========================
// Make functions globally available
// ===========================
window.editTransaction = editTransaction;
window.duplicateTransaction = duplicateTransaction;
window.deleteTransaction = deleteTransaction;

// ===========================
// Calculator Functions
// ===========================
let calcCurrentValue = '0';
let calcPreviousValue = '';
let calcOperation = null;
let calcWaitingForNewValue = false;

function appendCalc(value) {
    const display = document.getElementById('calcDisplay');

    if (calcWaitingForNewValue && !isNaN(value)) {
        calcCurrentValue = value;
        calcWaitingForNewValue = false;
    } else {
        if (calcCurrentValue === '0' && value !== '.') {
            calcCurrentValue = value;
        } else if (value === '.' && calcCurrentValue.includes('.')) {
            return;
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            if (calcOperation !== null) {
                calculateCalc();
            }
            calcPreviousValue = calcCurrentValue;
            calcOperation = value;
            calcWaitingForNewValue = true;
            updateCalcHistory();
            return;
        } else {
            calcCurrentValue += value;
        }
    }

    display.value = calcCurrentValue;
}

function clearCalc() {
    calcCurrentValue = '0';
    calcPreviousValue = '';
    calcOperation = null;
    calcWaitingForNewValue = false;
    document.getElementById('calcDisplay').value = '0';
    document.getElementById('calcHistory').textContent = '';
}

function deleteCalc() {
    if (calcCurrentValue.length > 1) {
        calcCurrentValue = calcCurrentValue.slice(0, -1);
    } else {
        calcCurrentValue = '0';
    }
    document.getElementById('calcDisplay').value = calcCurrentValue;
}

function calculateCalc() {
    const display = document.getElementById('calcDisplay');
    let result;

    const prev = parseFloat(calcPreviousValue);
    const current = parseFloat(calcCurrentValue);

    if (isNaN(prev) || isNaN(current)) {
        return;
    }

    switch (calcOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                showToast('Cannot divide by zero', 'danger');
                clearCalc();
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = (prev * current) / 100;
            break;
        default:
            return;
    }

    calcCurrentValue = result.toString();
    calcOperation = null;
    calcPreviousValue = '';
    calcWaitingForNewValue = true;
    display.value = calcCurrentValue;
    document.getElementById('calcHistory').textContent = '';
}

function updateCalcHistory() {
    const history = document.getElementById('calcHistory');
    const opSymbols = {
        '+': '+',
        '-': '−',
        '*': '×',
        '/': '÷',
        '%': '%'
    };
    history.textContent = `${calcPreviousValue} ${opSymbols[calcOperation] || ''}`;
}

function copyToClipboard() {
    const display = document.getElementById('calcDisplay');
    const value = display.value;

    navigator.clipboard.writeText(value).then(() => {
        showToast(t('calculator.copied'), 'success');
    }).catch(() => {
        showToast('Failed to copy', 'danger');
    });
}

function useInTransaction() {
    const display = document.getElementById('calcDisplay');
    const value = display.value;

    // Close calculator modal
    const calcModal = bootstrap.Modal.getInstance(document.getElementById('calculatorModal'));
    if (calcModal) {
        calcModal.hide();
    }

    // Wait for modal to close, then open transaction modal and set amount
    setTimeout(() => {
        // Set the amount value
        const amountField = document.getElementById('amount');
        if (amountField) {
            amountField.value = parseFloat(value).toFixed(2);

            // Open Add Transaction modal
            const transactionModal = new bootstrap.Modal(document.getElementById('addTransactionModal'));
            transactionModal.show();

            // Focus on the category field after modal opens
            setTimeout(() => {
                const categoryField = document.getElementById('category');
                if (categoryField) {
                    categoryField.focus();
                }
            }, 500);
        }
    }, 300);
}

// Make calculator functions globally available
window.appendCalc = appendCalc;
window.clearCalc = clearCalc;
window.deleteCalc = deleteCalc;
window.calculateCalc = calculateCalc;
window.copyToClipboard = copyToClipboard;
window.useInTransaction = useInTransaction;
// ===========================
// Recurring Transactions
// ===========================

function processRecurringTransactions() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let newTransactionsAdded = 0;

    recurringTransactions.forEach(recurring => {
        if (!recurring.enabled) return;

        const lastProcessed = recurring.lastProcessed ? new Date(recurring.lastProcessed) : null;
        const startDate = new Date(recurring.startDate);
        const endDate = recurring.endDate ? new Date(recurring.endDate) : null;

        // Check if we should process this recurring transaction
        if (endDate && today > endDate) return;
        if (today < startDate) return;

        // Determine if we need to create a transaction today
        let shouldCreate = false;

        if (!lastProcessed || lastProcessed < today) {
            switch (recurring.frequency) {
                case 'daily':
                    shouldCreate = true;
                    break;
                case 'weekly':
                    const daysSinceProcessed = lastProcessed ? Math.floor((today - lastProcessed) / (1000 * 60 * 60 * 24)) : 999;
                    shouldCreate = daysSinceProcessed >= 7;
                    break;
                case 'monthly':
                    if (!lastProcessed ||
                        today.getMonth() !== lastProcessed.getMonth() ||
                        today.getFullYear() !== lastProcessed.getFullYear()) {
                        shouldCreate = true;
                    }
                    break;
                case 'yearly':
                    if (!lastProcessed || today.getFullYear() !== lastProcessed.getFullYear()) {
                        shouldCreate = true;
                    }
                    break;
            }
        }

        if (shouldCreate) {
            // Create new transaction from recurring template
            const newTransaction = {
                id: Date.now() + Math.random(),
                description: recurring.description,
                amount: parseFloat(recurring.amount),
                category: recurring.category,
                type: recurring.type,
                date: today.toISOString().split('T')[0],
                isRecurring: true,
                recurringId: recurring.id
            };

            transactions.push(newTransaction);
            recurring.lastProcessed = today.toISOString();
            newTransactionsAdded++;
        }
    });

    if (newTransactionsAdded > 0) {
        saveData();
        updateUI();
        showToast(`${newTransactionsAdded} recurring transaction(s) added automatically`, 'success');
    }
}

function addRecurringTransaction(recurring) {
    recurring.id = Date.now();
    recurring.lastProcessed = null;
    recurringTransactions.push(recurring);
    saveData();
    renderRecurringList();
}

function deleteRecurringTransaction(id) {
    recurringTransactions = recurringTransactions.filter(r => r.id !== id);
    saveData();
    renderRecurringList();
}

function toggleRecurringTransaction(id) {
    const recurring = recurringTransactions.find(r => r.id === id);
    if (recurring) {
        recurring.enabled = !recurring.enabled;
        saveData();
        renderRecurringList();
    }
}

function renderRecurringList() {
    const container = document.getElementById('recurringList');
    if (!container) return;

    if (recurringTransactions.length === 0) {
        container.innerHTML = `
            <div class="text-center text-muted py-3">
                <i class="bi bi-arrow-repeat" style="font-size: 2rem;"></i>
                <p class="mt-2">${t('recurring.noRecurring')}</p>
            </div>
        `;
        return;
    }

    const currencySymbol = CURRENCIES[settings.currency].symbol;

    container.innerHTML = recurringTransactions.map(recurring => {
        const category = CATEGORIES.find(c => c.id === recurring.category);
        const frequencyText = {
            'daily': t('recurring.daily'),
            'weekly': t('recurring.weekly'),
            'monthly': t('recurring.monthly'),
            'yearly': t('recurring.yearly')
        }[recurring.frequency] || recurring.frequency;

        return `
            <div class="card mb-2 ${recurring.enabled ? '' : 'opacity-50'}">
                <div class="card-body py-2 px-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="flex-grow-1">
                            <div class="d-flex align-items-center gap-2">
                                <span style="font-size: 1.2rem;">${category ? category.icon : '📦'}</span>
                                <div>
                                    <strong>${recurring.description}</strong>
                                    <small class="text-muted d-block">${frequencyText} • ${category ? category.name : 'Other'}</small>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <span class="badge ${recurring.type === 'income' ? 'bg-success' : 'bg-danger'} fs-6">
                                ${currencySymbol}${recurring.amount.toFixed(2)}
                            </span>
                            <div class="form-check form-switch mb-0">
                                <input class="form-check-input" type="checkbox" ${recurring.enabled ? 'checked' : ''} 
                                    onchange="toggleRecurringTransaction(${recurring.id})">
                            </div>
                            <button class="btn btn-sm btn-outline-primary" onclick="editRecurringTransaction(${recurring.id})" title="Edit">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteRecurringTransactionDirect(${recurring.id})" title="Delete">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Edit recurring transaction function
function editRecurringTransaction(id) {
    const recurring = recurringTransactions.find(r => r.id === id);
    if (!recurring) return;

    // Store the ID for updating
    document.getElementById('recurringForm').dataset.editId = id;

    // Populate form
    document.getElementById(recurring.type === 'income' ? 'recurringIncome' : 'recurringExpense').checked = true;
    updateRecurringCategoryOptions(recurring.type);
    document.getElementById('recurringDescription').value = recurring.description;
    document.getElementById('recurringAmount').value = recurring.amount;
    document.getElementById('recurringCategory').value = recurring.category;
    document.getElementById('recurringFrequency').value = recurring.frequency;
    document.getElementById('recurringStartDate').value = recurring.startDate;
    document.getElementById('recurringEndDate').value = recurring.endDate || '';

    // Update modal title
    const modalTitle = document.querySelector('#addRecurringModal .modal-title span');
    if (modalTitle) {
        modalTitle.textContent = t('recurring.editTitle');
    }

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('addRecurringModal'));
    modal.show();
}

// Direct delete function for recurring transactions
function deleteRecurringTransactionDirect(id) {
    if (confirm(t('recurring.deleteMessage'))) {
        recurringTransactions = recurringTransactions.filter(r => r.id !== id);
        saveData();
        renderRecurringList();
        showToast('Recurring transaction deleted successfully', 'success');
    }
}

// Make new functions globally available
window.editRecurringTransaction = editRecurringTransaction;
window.deleteRecurringTransactionDirect = deleteRecurringTransactionDirect;

window.toggleRecurringTransaction = toggleRecurringTransaction;
window.confirmDeleteRecurring = function (id) {
    deleteRecurringId = id;
    const deleteModal = new bootstrap.Modal(document.getElementById('deleteRecurringModal'));
    deleteModal.show();
};
window.editTransaction = editTransaction;
window.deleteTransaction = deleteTransaction;
window.duplicateTransaction = duplicateTransaction;

// ===========================
// Category Budgets
// ===========================

function renderCategoryBudgets() {
    const container = document.getElementById('categoryBudgetsList');
    if (!container) return;

    const currencySymbol = CURRENCIES[settings.currency].symbol;
    const expenseCategories = CATEGORIES.filter(cat => cat.type === 'expense');

    container.innerHTML = expenseCategories.map(category => {
        const currentBudget = settings.categoryBudgets[category.id] || 0;
        const spent = getSpentByCategory(category.id);
        const percentage = currentBudget > 0 ? (spent / currentBudget) * 100 : 0;

        let progressColor = 'bg-success';
        if (percentage >= 100) progressColor = 'bg-danger';
        else if (percentage >= 80) progressColor = 'bg-warning';

        return `
            <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <span>${category.icon} ${category.name}</span>
                    <small class="text-muted">${currencySymbol}${spent.toFixed(2)} / ${currencySymbol}${currentBudget.toFixed(2)}</small>
                </div>
                <div class="input-group input-group-sm mb-1">
                    <span class="input-group-text">${currencySymbol}</span>
                    <input type="number" class="form-control" id="budget_${category.id}" 
                        value="${currentBudget}" min="0" step="100" placeholder="0"
                        onchange="updateCategoryBudget('${category.id}', this.value)">
                </div>
                ${currentBudget > 0 ? `
                    <div class="progress" style="height: 6px;">
                        <div class="progress-bar ${progressColor}" role="progressbar" 
                            style="width: ${Math.min(percentage, 100)}%" 
                            aria-valuenow="${percentage}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    ${percentage >= 80 ? `<small class="text-${percentage >= 100 ? 'danger' : 'warning'}">${Math.round(percentage)}% used</small>` : ''}
                ` : ''}
            </div>
        `;
    }).join('');
}

function getSpentByCategory(categoryId) {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions
        .filter(t => {
            if (t.type !== 'expense' || t.category !== categoryId) return false;
            const tDate = new Date(t.date);
            return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear;
        })
        .reduce((sum, t) => sum + t.amount, 0);
}

function updateCategoryBudget(categoryId, value) {
    const amount = parseFloat(value) || 0;
    settings.categoryBudgets[categoryId] = amount;
    saveSettings();
    renderCategoryBudgets();
    checkCategoryBudgetAlerts();
}

function checkCategoryBudgetAlerts() {
    if (!settings.budgetAlerts) return;

    const expenseCategories = CATEGORIES.filter(cat => cat.type === 'expense');

    expenseCategories.forEach(category => {
        const budget = settings.categoryBudgets[category.id];
        if (!budget || budget === 0) return;

        const spent = getSpentByCategory(category.id);
        const percentage = (spent / budget) * 100;

        if (percentage >= 100) {
            showToast(`⚠️ ${category.name}: Budget exceeded! ${Math.round(percentage)}%`, 'danger');
        } else if (percentage >= 90) {
            showToast(`⚠️ ${category.name}: 90% of budget used`, 'warning');
        } else if (percentage >= 80) {
            showToast(`ℹ️ ${category.name}: 80% of budget used`, 'info');
        }
    });
}

window.updateCategoryBudget = updateCategoryBudget;

// ===========================
// Calendar Management
// ===========================
let transactionCalendar = null;

function initCalendar() {
    const calendarEl = document.getElementById('transactionCalendar');
    if (!calendarEl) return;

    transactionCalendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
        },
        events: getCalendarEvents(),
        eventClick: function (info) {
            // Show transaction details or edit
            const transactionId = info.event.extendedProps.transactionId;
            if (transactionId) {
                editTransaction(transactionId);
            }
        },
        dateClick: function (info) {
            // Open add transaction modal with selected date
            openTransactionModalForDate(info.dateStr);
        },
        eventDidMount: function (info) {
            // Add tooltip
            const props = info.event.extendedProps;
            const category = CATEGORIES.find(c => c.id === props.category);
            const categoryName = category ? `${category.icon} ${category.name}` : props.category;

            info.el.setAttribute('title',
                `${props.description}\n${categoryName}\n${formatCurrency(props.amount)}`
            );
        },
        height: 'auto',
        dayMaxEvents: 3,
        moreLinkClick: 'popover'
    });

    transactionCalendar.render();
}

function getCalendarEvents() {
    const events = [];

    // Add transactions as events
    transactions.forEach(t => {
        const category = CATEGORIES.find(c => c.id === t.category);

        // Main transaction event
        events.push({
            id: `trans-${t.id}`,
            title: `${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}`,
            start: t.date,
            allDay: true,
            classNames: [`fc-event-${t.type}`],
            extendedProps: {
                transactionId: t.id,
                type: t.type,
                amount: t.amount,
                category: t.category,
                description: t.description
            }
        });

        // Add reminder event if enabled and not notified
        if (t.reminder && t.reminder.enabled && !t.reminder.notified) {
            const reminderDateTime = t.reminder.reminderDate + 'T' + (t.reminder.reminderTime || '09:00');
            events.push({
                id: `reminder-${t.id}`,
                title: `⏰ ${t.description}`,
                start: reminderDateTime,
                allDay: false,
                classNames: ['fc-event-reminder', 'reminder-badge'],
                extendedProps: {
                    transactionId: t.id,
                    isReminder: true,
                    type: t.type,
                    amount: t.amount,
                    category: t.category,
                    description: t.description
                }
            });
        }
    });

    return events;
}

function updateCalendar() {
    if (transactionCalendar) {
        transactionCalendar.removeAllEvents();
        transactionCalendar.addEventSource(getCalendarEvents());
    }
}

function openTransactionModalForDate(dateStr) {
    // Reset form first
    resetTransactionForm();

    // Set the selected date
    document.getElementById('date').value = dateStr;

    // Update modal title
    document.getElementById('modalTitle').innerHTML = '<i class="bi bi-plus-circle"></i> ' + t('modal.addTransaction');

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('addTransactionModal'));
    modal.show();
}

// ===========================
// Reminder System
// ===========================
let reminderCheckInterval = null;

function initReminderSystem() {
    // Check for reminders every minute
    checkReminders();
    reminderCheckInterval = setInterval(checkReminders, 60000);

    // Request notification permission
    requestNotificationPermission();
}

function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

function checkReminders() {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toTimeString().slice(0, 5);

    transactions.forEach(t => {
        if (!t.reminder || !t.reminder.enabled || t.reminder.notified) return;

        const reminderDate = t.reminder.reminderDate;
        const reminderTime = t.reminder.reminderTime || '09:00';

        // Check if reminder is due (same date and time has passed)
        if (reminderDate === currentDate && currentTime >= reminderTime) {
            triggerReminder(t);
        }
        // Also check if reminder date is in the past (missed reminder)
        else if (reminderDate < currentDate) {
            triggerReminder(t, true);
        }
    });
}

function triggerReminder(transaction, isMissed = false) {
    const category = CATEGORIES.find(c => c.id === transaction.category);
    const categoryName = category ? `${category.icon} ${category.name}` : transaction.category;
    const title = isMissed ? '⚠️ Missed Reminder' : '⏰ Transaction Reminder';
    const body = `${transaction.type === 'income' ? 'Income' : 'Expense'}: ${transaction.description}\n${categoryName} - ${formatCurrency(transaction.amount)}`;

    // Show browser notification if permission granted
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: transaction.type === 'income' ? '💰' : '💸',
            tag: `reminder-${transaction.id}`,
            requireInteraction: true
        });
    }

    // Also show toast notification
    showToast(`${title}: ${transaction.description} - ${formatCurrency(transaction.amount)}`,
        transaction.type === 'income' ? 'success' : 'warning');

    // Mark reminder as notified
    const index = transactions.findIndex(t => String(t.id) === String(transaction.id));
    if (index !== -1) {
        transactions[index].reminder.notified = true;
        saveData();
        updateCalendar();
    }
}

function setupReminderToggle() {
    const reminderEnabled = document.getElementById('enableReminder');
    const reminderFields = document.getElementById('reminderOptions');

    if (reminderEnabled && reminderFields) {
        reminderEnabled.addEventListener('change', function () {
            if (this.checked) {
                reminderFields.classList.remove('d-none');
                // Set default reminder date to transaction date if not set
                const transactionDate = document.getElementById('date').value;
                const reminderDateInput = document.getElementById('reminderDate');
                if (!reminderDateInput.value && transactionDate) {
                    reminderDateInput.value = transactionDate;
                }
            } else {
                reminderFields.classList.add('d-none');
            }
        });
    }
}

// Make calendar functions globally available
window.updateCalendar = updateCalendar;
window.openTransactionModalForDate = openTransactionModalForDate;

// ===========================
// Notebook Management
// ===========================
const NOTE_CATEGORIES = {
    general: { icon: '📝', name: 'General', color: '#6b7280' },
    goal: { icon: '🎯', name: 'Financial Goal', color: '#22c55e' },
    reminder: { icon: '⏰', name: 'Reminder', color: '#f59e0b' },
    shopping: { icon: '🛒', name: 'Shopping List', color: '#3b82f6' },
    budget: { icon: '💰', name: 'Budget Plan', color: '#8b5cf6' },
    debt: { icon: '💳', name: 'Debt Tracker', color: '#ef4444' },
    investment: { icon: '📈', name: 'Investment', color: '#10b981' },
    idea: { icon: '💡', name: 'Ideas', color: '#eab308' }
};

function initNotebook() {
    setupNotebookEventListeners();
    renderNotes();
}

function setupNotebookEventListeners() {
    // Save note button
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    if (saveNoteBtn) {
        saveNoteBtn.addEventListener('click', saveNote);
    }

    // Confirm delete note button
    const confirmDeleteNoteBtn = document.getElementById('confirmDeleteNoteBtn');
    if (confirmDeleteNoteBtn) {
        confirmDeleteNoteBtn.addEventListener('click', confirmDeleteNote);
    }

    // Category filter
    const categoryFilter = document.getElementById('notebookCategoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function () {
            renderNotes();
        });
    }

    // Search input - use direct event listener for real-time search
    const searchInput = document.getElementById('notebookSearch');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function () {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(function () {
                renderNotes();
            }, 300);
        });
        // Also trigger search on keyup for immediate feedback
        searchInput.addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                clearTimeout(searchTimeout);
                renderNotes();
            }
        });
    }

    // Reset form on modal close
    const addNoteModal = document.getElementById('addNoteModal');
    if (addNoteModal) {
        addNoteModal.addEventListener('hidden.bs.modal', resetNoteForm);
        addNoteModal.addEventListener('show.bs.modal', function () {
            // Update currency symbol when modal opens
            const currencySymbol = CURRENCIES[settings.currency]?.symbol || 'Rs.';
            const currencyEl = document.getElementById('noteCurrencySymbol');
            if (currencyEl) currencyEl.textContent = currencySymbol;
        });
    }

    // Update currency symbol in note modal
    const notebookModal = document.getElementById('notebookModal');
    if (notebookModal) {
        notebookModal.addEventListener('shown.bs.modal', function () {
            renderNotes();
        });
    }

    // Handle Add Note buttons - remove data-bs-toggle to handle manually
    document.querySelectorAll('[data-bs-target="#addNoteModal"]').forEach(btn => {
        btn.removeAttribute('data-bs-toggle');
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            resetNoteForm();
            const addModal = new bootstrap.Modal(document.getElementById('addNoteModal'));
            addModal.show();
        });
    });
}

function saveNote() {
    const id = document.getElementById('noteId').value;
    const title = document.getElementById('noteTitle').value.trim();
    const category = document.getElementById('noteCategory').value;
    const content = document.getElementById('noteContent').value.trim();
    const pinned = document.getElementById('notePinned').checked;
    const amount = parseFloat(document.getElementById('noteAmount').value) || null;

    // Validation
    if (!title) {
        showToast(t('notebook.errorTitle'), 'danger');
        return;
    }

    if (!content) {
        showToast(t('notebook.errorContent'), 'danger');
        return;
    }

    const note = {
        id: id || Date.now().toString(),
        title,
        category,
        content,
        pinned,
        amount,
        createdAt: id ? notebooks.find(n => n.id === id)?.createdAt : new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    if (id) {
        // Update existing note
        const index = notebooks.findIndex(n => String(n.id) === String(id));
        if (index !== -1) {
            note.id = notebooks[index].id;
            note.createdAt = notebooks[index].createdAt;
            notebooks[index] = note;
            showToast(t('notebook.noteUpdated'), 'success');
        }
    } else {
        // Add new note
        notebooks.unshift(note);
        showToast(t('notebook.noteAdded'), 'success');
    }

    saveData();
    renderNotes();

    // Close modal
    const modalEl = document.getElementById('addNoteModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) {
        modal.hide();
    } else {
        // If no instance exists, hide it manually
        modalEl.classList.remove('show');
        modalEl.style.display = 'none';
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
    }
}

function editNote(id) {
    const note = notebooks.find(n => String(n.id) === String(id));
    if (!note) return;

    // Populate form
    document.getElementById('noteId').value = note.id;
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteCategory').value = note.category;
    document.getElementById('noteContent').value = note.content;
    document.getElementById('notePinned').checked = note.pinned || false;
    document.getElementById('noteAmount').value = note.amount || '';

    // Update modal title
    document.getElementById('noteModalTitle').innerHTML = '<i class="bi bi-pencil-square"></i> ' + t('notebook.editNote');

    // Update currency symbol
    const currencySymbol = CURRENCIES[settings.currency]?.symbol || 'Rs.';
    document.getElementById('noteCurrencySymbol').textContent = currencySymbol;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('addNoteModal'));
    modal.show();
}

function deleteNote(id) {
    deleteNoteId = id;
    const modal = new bootstrap.Modal(document.getElementById('deleteNoteModal'));
    modal.show();
}

function confirmDeleteNote() {
    if (deleteNoteId) {
        notebooks = notebooks.filter(n => String(n.id) !== String(deleteNoteId));
        saveData();
        renderNotes();
        showToast(t('notebook.noteDeleted'), 'success');
        deleteNoteId = null;
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('deleteNoteModal'));
    modal.hide();
}

function togglePinNote(id) {
    const note = notebooks.find(n => String(n.id) === String(id));
    if (note) {
        note.pinned = !note.pinned;
        note.updatedAt = new Date().toISOString();
        saveData();
        renderNotes();
        showToast(note.pinned ? t('notebook.notePinned') : t('notebook.noteUnpinned'), 'info');
    }
}

function resetNoteForm() {
    document.getElementById('noteForm').reset();
    document.getElementById('noteId').value = '';
    document.getElementById('noteCategory').value = 'general';
    document.getElementById('notePinned').checked = false;
    document.getElementById('noteModalTitle').innerHTML = '<i class="bi bi-plus-circle"></i> ' + t('notebook.addNote');

    // Update currency symbol
    const currencySymbol = CURRENCIES[settings.currency]?.symbol || 'Rs.';
    document.getElementById('noteCurrencySymbol').textContent = currencySymbol;
}

function renderNotes() {
    const categoryFilter = document.getElementById('notebookCategoryFilter')?.value || 'all';
    const searchQuery = document.getElementById('notebookSearch')?.value.toLowerCase().trim() || '';

    // Filter notes
    let filteredNotes = notebooks.filter(note => {
        const matchesCategory = categoryFilter === 'all' || note.category === categoryFilter;
        const matchesSearch = !searchQuery ||
            note.title.toLowerCase().includes(searchQuery) ||
            note.content.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    // Separate pinned and unpinned
    const pinnedNotes = filteredNotes.filter(n => n.pinned);
    const unpinnedNotes = filteredNotes.filter(n => !n.pinned);

    // Sort by updatedAt (most recent first)
    pinnedNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    unpinnedNotes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    // Render pinned section
    const pinnedSection = document.getElementById('pinnedNotesSection');
    const pinnedList = document.getElementById('pinnedNotesList');

    if (pinnedNotes.length > 0) {
        pinnedSection.classList.remove('d-none');
        pinnedList.innerHTML = pinnedNotes.map(note => renderNoteCard(note)).join('');
    } else {
        pinnedSection.classList.add('d-none');
        pinnedList.innerHTML = '';
    }

    // Render main notes list
    const notesList = document.getElementById('notesList');
    const emptyState = document.getElementById('notesEmptyState');

    if (unpinnedNotes.length > 0) {
        notesList.innerHTML = unpinnedNotes.map(note => renderNoteCard(note)).join('');
        notesList.classList.remove('d-none');
        emptyState.classList.add('d-none');
    } else if (pinnedNotes.length === 0) {
        notesList.innerHTML = '';
        notesList.classList.add('d-none');
        emptyState.classList.remove('d-none');
    } else {
        notesList.innerHTML = '';
        notesList.classList.remove('d-none');
        emptyState.classList.add('d-none');
    }
}

function renderNoteCard(note) {
    const category = NOTE_CATEGORIES[note.category] || NOTE_CATEGORIES.general;
    const formattedDate = new Date(note.updatedAt).toLocaleDateString(settings.language === 'si' ? 'si-LK' : settings.language === 'ta' ? 'ta-LK' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const currencySymbol = CURRENCIES[settings.currency]?.symbol || 'Rs.';
    const amountDisplay = note.amount ? `<span class="badge bg-success-subtle text-success">${currencySymbol}${note.amount.toLocaleString()}</span>` : '';

    // Truncate content for preview
    const contentPreview = note.content.length > 150 ? note.content.substring(0, 150) + '...' : note.content;

    return `
        <div class="col-12 col-md-6">
            <div class="card note-card h-100" style="border-left: 4px solid ${category.color}">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <div class="d-flex align-items-center gap-2">
                            <span class="note-category-icon">${category.icon}</span>
                            <h6 class="card-title mb-0">${escapeHtml(note.title)}</h6>
                        </div>
                        <div class="dropdown">
                            <button class="btn btn-sm btn-link text-muted p-0" data-bs-toggle="dropdown">
                                <i class="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a class="dropdown-item" href="#" onclick="togglePinNote('${note.id}'); return false;">
                                    <i class="bi bi-pin-angle${note.pinned ? '-fill' : ''}"></i> ${note.pinned ? t('notebook.unpin') : t('notebook.pin')}
                                </a></li>
                                <li><a class="dropdown-item" href="#" onclick="editNote('${note.id}'); return false;">
                                    <i class="bi bi-pencil"></i> ${t('btn.edit')}
                                </a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class="dropdown-item text-danger" href="#" onclick="deleteNote('${note.id}'); return false;">
                                    <i class="bi bi-trash"></i> ${t('btn.delete')}
                                </a></li>
                            </ul>
                        </div>
                    </div>
                    <p class="card-text note-content text-muted small mb-2">${escapeHtml(contentPreview).replace(/\n/g, '<br>')}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted"><i class="bi bi-clock"></i> ${formattedDate}</small>
                        <div class="d-flex gap-1 align-items-center">
                            ${amountDisplay}
                            ${note.pinned ? '<i class="bi bi-pin-angle-fill text-warning"></i>' : ''}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make notebook functions globally available
window.editNote = editNote;
window.deleteNote = deleteNote;
window.togglePinNote = togglePinNote;

// ===========================
// Cookie Consent Management
// ===========================
const COOKIE_CONSENT_KEY = 'expenseTracker_cookieConsent';

function initCookieConsent() {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
        // Show cookie banner if no consent recorded
        setTimeout(() => {
            const banner = document.getElementById('cookieConsentBanner');
            if (banner) {
                banner.style.display = 'block';
            }
        }, 1000); // Delay for better UX
    } else {
        // Apply saved preferences
        applyCookiePreferences(JSON.parse(consent));
    }
}

function acceptAllCookies() {
    const preferences = {
        essential: true,
        analytics: true,
        functional: true,
        marketing: true,
        timestamp: new Date().toISOString()
    };
    saveCookieConsent(preferences);
    hideCookieBanner();
    showToast('Cookie preferences saved. Thank you!', 'success');
}

function acceptEssentialCookies() {
    const preferences = {
        essential: true,
        analytics: false,
        functional: false,
        marketing: false,
        timestamp: new Date().toISOString()
    };
    saveCookieConsent(preferences);
    hideCookieBanner();
    closeCookieModal();
    showToast('Essential cookies accepted.', 'info');
}

function saveCookiePreferences() {
    const preferences = {
        essential: true, // Always true
        analytics: document.getElementById('analyticsCookies')?.checked || false,
        functional: document.getElementById('functionalCookies')?.checked || false,
        marketing: document.getElementById('marketingCookies')?.checked || false,
        timestamp: new Date().toISOString()
    };
    saveCookieConsent(preferences);
    hideCookieBanner();
    closeCookieModal();
    showToast('Cookie preferences saved successfully!', 'success');
}

function saveCookieConsent(preferences) {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(preferences));
    applyCookiePreferences(preferences);
}

function applyCookiePreferences(preferences) {
    // Here you would enable/disable various tracking scripts based on preferences
    console.log('Cookie preferences applied:', preferences);

    // Example: Enable analytics if consented
    if (preferences.analytics) {
        // Enable analytics tracking
        console.log('Analytics enabled');
    }

    // Example: Enable functional cookies
    if (preferences.functional) {
        // Enable functional features
        console.log('Functional cookies enabled');
    }

    // Example: Enable marketing cookies
    if (preferences.marketing) {
        // Enable marketing/advertising tracking
        console.log('Marketing cookies enabled');
    }
}

function showCookieSettings() {
    // Load current preferences into the modal
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent) {
        const preferences = JSON.parse(consent);
        const analyticsCookies = document.getElementById('analyticsCookies');
        const functionalCookies = document.getElementById('functionalCookies');
        const marketingCookies = document.getElementById('marketingCookies');

        if (analyticsCookies) analyticsCookies.checked = preferences.analytics || false;
        if (functionalCookies) functionalCookies.checked = preferences.functional || false;
        if (marketingCookies) marketingCookies.checked = preferences.marketing || false;
    }

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('cookieSettingsModal'));
    modal.show();
}

function hideCookieBanner() {
    const banner = document.getElementById('cookieConsentBanner');
    if (banner) {
        banner.style.animation = 'slideDown 0.3s ease-out forwards';
        setTimeout(() => {
            banner.style.display = 'none';
        }, 300);
    }
}

function closeCookieModal() {
    const modalEl = document.getElementById('cookieSettingsModal');
    if (modalEl) {
        const modal = bootstrap.Modal.getInstance(modalEl);
        if (modal) {
            modal.hide();
        }
    }
}

// Make cookie functions globally available
window.acceptAllCookies = acceptAllCookies;
window.acceptEssentialCookies = acceptEssentialCookies;
window.saveCookiePreferences = saveCookiePreferences;
window.showCookieSettings = showCookieSettings;

// Initialize cookie consent on page load
document.addEventListener('DOMContentLoaded', function () {
    initCookieConsent();
});
