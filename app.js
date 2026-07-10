const screen = document.querySelector('#screen');
const app = document.querySelector('#app');
const toast = document.querySelector('#toast');
const sheet = document.querySelector('#bottom-sheet');
const backdrop = document.querySelector('#sheet-backdrop');

const icons = {
  phone: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 3.5 4.8 4.7c-1.1.6-1.5 1.9-1 3 2.3 5.7 6.8 10.2 12.5 12.5 1.1.5 2.4.1 3-1l1.2-2.4c.4-.8.1-1.8-.7-2.3l-2.7-1.6c-.7-.4-1.5-.3-2.1.3l-1.2 1.2a15.1 15.1 0 0 1-4.2-4.2L10.8 9c.6-.6.7-1.4.3-2.1L9.5 4.2c-.5-.8-1.5-1.1-2.3-.7Z"/></svg>`,
  mic: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="3" width="8" height="12" rx="4"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"/></svg>`,
  home: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/></svg>`,
  calendar: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>`,
  user: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>`,
  pill: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8.5 17.5 9-9a4.2 4.2 0 0 0-6-6l-9 9a4.2 4.2 0 0 0 6 6Z"/><path d="m8 6 6 6"/></svg>`,
  pulse: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>`,
  shield: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>`,
  battery: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 10v4M6 10v4M10 10v4M14 10v4"/></svg>`,
  settings: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>`
};

let state = {
  role: localStorage.getItem('lumiq-role') || 'elder',
  medicationTaken: localStorage.getItem('lumiq-medication') === 'taken',
  checkedIn: localStorage.getItem('lumiq-checkin') === new Date().toDateString(),
  activeNav: 'home'
};

const names = { elder: 'Grandma', kid: 'Mike', admin: 'Jing' };

function header(role) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const label = role === 'elder' ? greeting : role === 'kid' ? 'Hey there' : 'Family space';
  const avatar = role === 'elder' ? 'G' : role === 'kid' ? 'M' : 'J';
  return `<header class="app-header">
    <div><p class="hello">${label}</p><h2>${names[role]}</h2></div>
    <button class="profile-button ${role}" data-action="profiles" aria-label="Open profile and switch mode">${avatar}</button>
  </header>`;
}

function nav(role) {
  const items = role === 'admin'
    ? [['home','Home',icons.home],['family','Family',icons.user],['settings','Settings',icons.settings]]
    : role === 'kid'
      ? [['home','Home',icons.home],['talk','Lumi',icons.mic],['profile','Me',icons.user]]
      : [['home','Home',icons.home],['today','Today',icons.calendar],['family','Family',icons.user]];
  return `<nav class="simple-nav" aria-label="Main navigation">${items.map(([id,label,icon]) => `<button type="button" data-nav="${id}" class="${state.activeNav === id ? 'active' : ''}">${icon}${label}</button>`).join('')}</nav>`;
}

function elderHome() {
  const today = new Intl.DateTimeFormat([], { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());
  return `${header('elder')}
    <section class="weather-hello" aria-label="Today's greeting and weather">
      <p>${today}</p>
      <strong>${state.checkedIn ? 'Your family knows<br>you’re doing well.' : 'It’s a lovely day<br>to take it easy.'}</strong>
      <span class="sun-orb" aria-hidden="true"></span>
      <div class="weather"><b>27°</b><small>Sunny</small></div>
    </section>
    <div class="section-label"><h3>What would you like?</h3></div>
    <section class="primary-actions" aria-label="Main actions">
      <button class="action-card call" type="button" data-action="call">
        <span class="action-icon">${icons.phone}</span><span><strong>Call family</strong><small>See and talk to someone</small></span>
      </button>
      <button class="action-card talk" type="button" data-action="talk">
        <span class="action-icon">${icons.mic}</span><span><strong>Talk to Lumi</strong><small>Ask me anything</small></span>
      </button>
      <button class="action-card help" type="button" data-action="help">
        <span class="action-icon">${icons.heart}</span><span><strong>I need help</strong><small>Let your family know</small></span><span class="chevron">›</span>
      </button>
    </section>
    <div class="section-label"><h3>One reminder</h3><span>10:00 AM</span></div>
    <article class="reminder-card">
      <span class="reminder-icon">${icons.pill}</span>
      <div class="reminder-copy"><strong>Morning medicine</strong><span>1 white tablet · after food</span></div>
      <button class="tiny-button ${state.medicationTaken ? 'done' : ''}" type="button" data-action="medication">${state.medicationTaken ? 'Done ✓' : 'I took it'}</button>
    </article>${nav('elder')}`;
}

function adminHome() {
  return `${header('admin')}
    <section class="family-summary">
      <div class="summary-top"><div><p>Household today</p><strong>Everyone’s okay</strong></div><span class="sync-pill">● Live</span></div>
      <div class="family-faces" aria-label="Four family members"><span>J</span><span>G</span><span>M</span><span>+1</span></div>
    </section>
    <div class="section-label"><h3>At a glance</h3><span>Updated now</span></div>
    <section class="metric-grid">
      <article class="metric-card">${icons.shield}<strong>3 of 3</strong><span>Daily check-ins</span></article>
      <article class="metric-card">${icons.battery}<strong>86%</strong><span>LumiqPal battery</span></article>
      <article class="metric-card">${icons.pulse}<strong>Calm</strong><span>Home activity</span></article>
      <article class="metric-card">${icons.calendar}<strong>2</strong><span>Reminders today</span></article>
    </section>
    <div class="section-label"><h3>Your family</h3><span>View all</span></div>
    <section aria-label="Family status">
      <article class="family-row"><span class="family-avatar">G</span><div class="family-row-copy"><strong>Grandma</strong><span>Checked in · medicine taken</span></div><i class="status-ok" aria-label="All okay"></i></article>
      <article class="family-row"><span class="family-avatar">M</span><div class="family-row-copy"><strong>Mike</strong><span>Reading with Lumi · 18 min</span></div><i class="status-ok" aria-label="All okay"></i></article>
      <article class="family-row"><span class="family-avatar">L</span><div class="family-row-copy"><strong>Lawrence</strong><span>Home · device online</span></div><i class="status-ok" aria-label="All okay"></i></article>
    </section>${nav('admin')}`;
}

function kidHome() {
  return `${header('kid')}
    <section class="kid-hero">
      <p>Today’s adventure</p><h3>The secret garden needs you!</h3>
      <button type="button" data-action="story">Keep reading · 18 min</button><span class="sparkles" aria-hidden="true">✦</span>
    </section>
    <div class="section-label"><h3>Pick something fun</h3><span>12 stars</span></div>
    <section class="kid-actions">
      <button class="kid-card" type="button" data-action="talk"><span>🎙️</span><strong>Talk to Lumi</strong></button>
      <button class="kid-card" type="button" data-action="draw"><span>✏️</span><strong>Make a picture</strong></button>
      <button class="kid-card" type="button" data-action="quiz"><span>🧠</span><strong>Try today’s brain game</strong></button>
    </section>
    <div class="section-label"><h3>My progress</h3><span>Great job!</span></div>
    <article class="reminder-card"><span class="reminder-icon">🏆</span><div class="reminder-copy"><strong>Five-day learning streak</strong><span>Come back tomorrow for a new badge</span></div></article>${nav('kid')}`;
}

function listeningView() {
  return `<section class="listening-view">
    <div class="listen-orb"><span class="wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span></div>
    <h2>I’m listening.</h2>
    <p>Take your time. You can ask a question or simply have a chat.</p>
    <button class="stop-listening" type="button" data-action="stop-listening">I’m finished</button>
  </section>`;
}

function render() {
  app.dataset.role = state.role;
  const content = state.role === 'admin' ? adminHome() : state.role === 'kid' ? kidHome() : elderHome();
  screen.innerHTML = content;
  document.querySelectorAll('[data-role-switch]').forEach(button => button.classList.toggle('active', button.dataset.roleSwitch === state.role));
  screen.scrollTop = 0;
}

function changeRole(role) {
  state.role = role;
  state.activeNav = 'home';
  localStorage.setItem('lumiq-role', role);
  closeSheet();
  render();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('show'), 2600);
}

function openSheet(kind) {
  const sharedHeader = (title, subtitle) => `<div class="sheet-handle"></div><header class="sheet-header"><div><h2 id="sheet-title">${title}</h2><p>${subtitle}</p></div><button class="sheet-close" type="button" data-action="close-sheet" aria-label="Close">×</button></header>`;
  if (kind === 'call') {
    sheet.innerHTML = `${sharedHeader('Who would you like to call?', 'Your favorites are here.')}
      <div class="contact-list">
        ${[['J','Jing','Daughter'],['L','Lawrence','Grandson'],['M','Mike','Grandson']].map(([initial,name,relation]) => `<button class="contact-button" type="button" data-call-name="${name}"><span>${initial}</span><span><strong>${name}</strong><small>${relation}</small></span>${icons.phone}</button>`).join('')}
      </div>`;
  } else if (kind === 'help') {
    sheet.innerHTML = `${sharedHeader('We’re here with you.', 'This sends a high-priority alert.')}
      <div class="help-confirm"><strong>Send “I need help”?</strong>Jing and Lawrence will be notified right away. If this is a medical emergency, call your local emergency number.</div>
      <button class="sheet-primary" type="button" data-action="send-help">Yes, tell my family</button>`;
  } else {
    sheet.innerHTML = `${sharedHeader('Preview a family mode', 'In the real app, each person stays in their own simple view.')}
      <div class="role-list">
        <button class="role-choice ${state.role === 'admin' ? 'active' : ''}" type="button" data-role-choice="admin"><span>⌂</span>Family</button>
        <button class="role-choice ${state.role === 'kid' ? 'active' : ''}" type="button" data-role-choice="kid"><span>✦</span>Kids</button>
        <button class="role-choice ${state.role === 'elder' ? 'active' : ''}" type="button" data-role-choice="elder"><span>♡</span>Grandma</button>
      </div>`;
  }
  backdrop.hidden = false;
  sheet.hidden = false;
  requestAnimationFrame(() => sheet.querySelector('.sheet-close')?.focus());
}

function closeSheet() {
  sheet.hidden = true;
  backdrop.hidden = true;
}

function handleAction(action) {
  if (action === 'call' || action === 'help' || action === 'profiles') return openSheet(action);
  if (action === 'talk') {
    screen.innerHTML = listeningView();
    return;
  }
  if (action === 'stop-listening') return render();
  if (action === 'medication') {
    state.medicationTaken = !state.medicationTaken;
    localStorage.setItem('lumiq-medication', state.medicationTaken ? 'taken' : '');
    render();
    showToast(state.medicationTaken ? 'Medicine marked as taken' : 'Medicine reminder restored');
    return;
  }
  const messages = {
    story: 'Opening The Secret Garden…',
    draw: 'Lumi is getting the drawing canvas ready…',
    quiz: 'Today’s brain game is ready!'
  };
  if (messages[action]) showToast(messages[action]);
}

document.addEventListener('click', event => {
  const roleSwitch = event.target.closest('[data-role-switch]');
  if (roleSwitch) return changeRole(roleSwitch.dataset.roleSwitch);
  const roleChoice = event.target.closest('[data-role-choice]');
  if (roleChoice) return changeRole(roleChoice.dataset.roleChoice);
  const callButton = event.target.closest('[data-call-name]');
  if (callButton) {
    const name = callButton.dataset.callName;
    closeSheet();
    showToast(`Calling ${name}…`);
    return;
  }
  const action = event.target.closest('[data-action]');
  if (action) {
    if (action.dataset.action === 'close-sheet') closeSheet();
    else if (action.dataset.action === 'send-help') {
      closeSheet();
      state.checkedIn = true;
      localStorage.setItem('lumiq-checkin', new Date().toDateString());
      render();
      showToast('Jing and Lawrence have been alerted');
    } else handleAction(action.dataset.action);
    return;
  }
  const navButton = event.target.closest('[data-nav]');
  if (navButton) {
    state.activeNav = navButton.dataset.nav;
    if (state.activeNav === 'home') render();
    else showToast(`${navButton.textContent.trim()} is ready for the next prototype round`);
  }
});

backdrop.addEventListener('click', closeSheet);
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !sheet.hidden) closeSheet(); });

function updateTime() {
  const time = new Intl.DateTimeFormat([], { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date());
  document.querySelector('#status-time').textContent = time;
}

render();
updateTime();
setInterval(updateTime, 60000);

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
}
