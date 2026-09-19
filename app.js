// TalantLand Interactive Engine & Funnel Scripts
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Interactive Quiz Logic
  const quizState = {
    age: null,
    goal: null,
    style: null
  };

  const steps = [
    document.getElementById('quizStep1'),
    document.getElementById('quizStep2'),
    document.getElementById('quizStep3'),
    document.getElementById('quizResult')
  ];

  const quizProgressBar = document.getElementById('quizProgressBar');
  const quizStepIndicator = document.getElementById('quizStepIndicator');

  function updateQuizProgress(stepNum) {
    if (quizProgressBar) {
      quizProgressBar.style.width = (stepNum / 3 * 100) + '%';
    }
    if (quizStepIndicator) {
      quizStepIndicator.textContent = stepNum <= 3 ? `Вопрос ${stepNum} из 3` : 'Ваш персональный результат';
    }
  }

  function showStep(index) {
    steps.forEach((step, idx) => {
      if (step) {
        if (idx === index) {
          step.classList.remove('hidden');
          step.classList.add('block');
        } else {
          step.classList.add('hidden');
          step.classList.remove('block');
        }
      }
    });
    updateQuizProgress(index + 1);
  }

  // Step 1 Click handlers
  document.querySelectorAll('[data-quiz-age]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('[data-quiz-age]').forEach(b => b.classList.remove('selected'));
      const target = e.currentTarget;
      target.classList.add('selected');
      quizState.age = target.getAttribute('data-quiz-age');
      setTimeout(() => showStep(1), 250);
    });
  });

  // Step 2 Click handlers
  document.querySelectorAll('[data-quiz-goal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('[data-quiz-goal]').forEach(b => b.classList.remove('selected'));
      const target = e.currentTarget;
      target.classList.add('selected');
      quizState.goal = target.getAttribute('data-quiz-goal');
      setTimeout(() => showStep(2), 250);
    });
  });

  // Step 3 Click handlers
  document.querySelectorAll('[data-quiz-style]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('[data-quiz-style]').forEach(b => b.classList.remove('selected'));
      const target = e.currentTarget;
      target.classList.add('selected');
      quizState.style = target.getAttribute('data-quiz-style');
      setTimeout(() => calculateQuizResult(), 300);
    });
  });

  // Reset Quiz
  const resetQuizBtn = document.getElementById('resetQuizBtn');
  if (resetQuizBtn) {
    resetQuizBtn.addEventListener('click', () => {
      quizState.age = null;
      quizState.goal = null;
      quizState.style = null;
      document.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
      showStep(0);
    });
  }

  function calculateQuizResult() {
    let recTitle = 'Мини-группа «Школьная программа без слёз»';
    let recPrice = '6 400 ₽ / месяц (8 занятий по 60 мин)';
    let recDesc = 'Идеально для вашего возраста и целей! Ребёнок подтянет грамматику и чтение через подвижные игры и квесты, избавится от страха двоек в школе.';
    let tgPrefill = 'Здравствуйте, Анастасия! Прошли квиз на сайте. Хотим записаться на пробное занятие в мини-группу для 2-4 класса.';

    if (quizState.goal === 'reading') {
      recTitle = 'Интенсив-курс «Читаем за 1 месяц»';
      recPrice = '10 000 ₽ за полный курс (8 уроков)';
      recDesc = 'Специализированный интенсив фонетики и слогового чтения. Ребёнок перестанет спотыкаться на словах и начнет читать легко и уверенно.';
      tgPrefill = 'Здравствуйте, Анастасия! Интересует курс «Читаем за 1 месяц». Хотим записаться на диагностику чтения.';
    } else if (quizState.style === 'individual' || quizState.goal === 'deep') {
      recTitle = 'Индивидуальные занятия с Анастасией';
      recPrice = '10 400 ₽ / месяц (8 занятий)';
      recDesc = 'Персональный темп, 100% внимания педагога, гибкое расписание и программа конкретно под цели вашего ребёнка.';
      tgPrefill = 'Здравствуйте, Анастасия! Нам нужны индивидуальные занятия. Хотим договориться об удобном времени для пробного урока.';
    }

    const recTitleEl = document.getElementById('recTitle');
    const recPriceEl = document.getElementById('recPrice');
    const recDescEl = document.getElementById('recDesc');
    const recTgBtn = document.getElementById('recTgBtn');

    if (recTitleEl) recTitleEl.textContent = recTitle;
    if (recPriceEl) recPriceEl.textContent = recPrice;
    if (recDescEl) recDescEl.textContent = recDesc;
    if (recTgBtn) {
      recTgBtn.href = `https://t.me/on_anastasiia?text=${encodeURIComponent(tgPrefill)}`;
    }

    showStep(3);
    triggerCelebration();
  }

  function triggerCelebration() {
    const confettiContainer = document.getElementById('confettiEffect');
    if (!confettiContainer) return;
    confettiContainer.innerHTML = '';
    const colors = ['#185A56', '#D97706', '#E06D53', '#22C55E', '#3B82F6'];
    for (let i = 0; i < 30; i++) {
      const piece = document.createElement('div');
      piece.style.cssText = `
        position: absolute;
        width: ${Math.random() * 8 + 6}px;
        height: ${Math.random() * 8 + 6}px;
        background-color: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}%;
        top: -10px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        opacity: 0.9;
        transform: rotate(${Math.random() * 360}deg);
        transition: transform 1.5s ease-out, top 1.5s ease-out, opacity 1.5s ease-out;
      `;
      confettiContainer.appendChild(piece);
      setTimeout(() => {
        piece.style.top = `${Math.random() * 80 + 20}%`;
        piece.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 60 - 30}px)`;
        piece.style.opacity = '0';
      }, 50);
    }
  }

  // FAQ Accordion
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling;
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const icon = trigger.querySelector('.faq-icon');

      document.querySelectorAll('.faq-trigger').forEach(other => {
        if (other !== trigger) {
          other.setAttribute('aria-expanded', 'false');
          if (other.nextElementSibling) other.nextElementSibling.classList.add('hidden');
          const otherIcon = other.querySelector('.faq-icon');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      trigger.setAttribute('aria-expanded', !isExpanded);
      if (content) {
        content.classList.toggle('hidden');
      }
      if (icon) {
        icon.style.transform = !isExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  });

  // Booking Form Submission to Telegram
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccessModal = document.getElementById('bookingSuccessModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const parentName = document.getElementById('formParentName')?.value || '';
      const phone = document.getElementById('formPhone')?.value || '';
      const childInfo = document.getElementById('formChildInfo')?.value || '';
      const format = document.getElementById('formFormat')?.value || 'Нужна консультация';

      const message = `Заявка с сайта ТалантЛэнд!\n👤 Родитель: ${parentName}\n📞 Телефон/TG: ${phone}\n👶 Ребёнок: ${childInfo}\n🎯 Формат: ${format}`;
      const tgUrl = `https://t.me/on_anastasiia?text=${encodeURIComponent(message)}`;

      window.open(tgUrl, '_blank');

      if (bookingSuccessModal) {
        bookingSuccessModal.classList.remove('hidden');
        bookingSuccessModal.classList.add('flex');
      }
    });
  }

  if (closeModalBtn && bookingSuccessModal) {
    closeModalBtn.addEventListener('click', () => {
      bookingSuccessModal.classList.add('hidden');
      bookingSuccessModal.classList.remove('flex');
    });
  }
});
