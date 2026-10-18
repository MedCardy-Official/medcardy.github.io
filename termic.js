(() => {
  const semester = document.querySelector('#termic-semester');
  const search = document.querySelector('#termic-search');
  const categories = document.querySelector('#termic-category');
  let activeLevel = 'all';
  const savedSemester = new URLSearchParams(location.search).get('semester');
  const normalize = value => value.toLowerCase().replace(/[يى]/g, 'ی').replace(/ك/g, 'ک').replace(/[\s\u200c\u200e\u200fـ]/g, '');
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function saveSemester() {
    try {const url=new URL(location.href);if(semester.value==='all')url.searchParams.delete('semester');else url.searchParams.set('semester',semester.value);history.replaceState(null,'',url);} catch {}
  }
  function render() {
    const selected = semester.value || savedSemester || String(TERMIC_COHORT.defaultSemester || 'all');
    const semesters = [...new Set([...(TERMIC_COHORT.semesters || []), ...TERMIC_COHORT.courses.map(c => c.semester), ...(TERMIC_COHORT.exams || []).map(e => e.semester)])].sort((a,b) => a-b);
    semester.innerHTML = `<option value="all">${t('termic.allSemesters')}</option>` + semesters.map(n => `<option value="${n}">${applyTemplate(t('termic.semesterLabel'), {number: formatNumber(n)})}</option>`).join('');
    semester.value = semesters.map(String).includes(selected) ? selected : 'all';
    const levels = CATEGORIES.filter(key => TERMIC_COHORT.courses.some(c => c.category === key));
    if (!levels.includes(activeLevel)) activeLevel = 'all';
    categories.innerHTML = ['all', ...levels].map(key => `<button class="filter-button${activeLevel===key?' active':''}" data-level="${key}" type="button" aria-pressed="${activeLevel===key}">${key==='all'?t('termic.allCategories'):t('archive.categories.'+key)}</button>`).join('');
    categories.setAttribute('aria-label', t('labels.categoryFilters'));
    search.placeholder = t('termic.placeholder');
    const term = normalize(search.value);
    const matches = TERMIC_COHORT.courses.filter(c => (semester.value==='all'||String(c.semester)===semester.value) && (activeLevel==='all'||c.category===activeLevel) && normalize([c.label,c.labelEn,c.source?.fa||'',c.source?.en||''].join(' ')).includes(term));
    document.querySelector('#termic-grid').innerHTML = matches.map(c => {
      const safe = {...c, label: escape(c.label), labelEn: escape(c.labelEn), source: c.source ? {fa:escape(c.source.fa), en:escape(c.source.en)} : null};
      return courseCard(safe);
    }).join('');
    const exams = (TERMIC_COHORT.exams || []).filter(e => semester.value==='all' || String(e.semester)===semester.value).slice().sort((a,b) => (a.date||'9999').localeCompare(b.date||'9999') || (a.time||'').localeCompare(b.time||''));
    document.querySelector('#termic-exam-list').innerHTML = exams.map(exam => {
      let dateLabel = t('termic.dateUnknown');
      if (exam.date && /^\d{4}-\d{2}-\d{2}$/.test(exam.date)) {
        const date = new Date(exam.date + 'T12:00:00Z');
        if (!Number.isNaN(date.getTime())) dateLabel = new Intl.DateTimeFormat(activeLanguage==='fa'?'fa-IR':'en-GB', {weekday:'long',year:'numeric',month:'long',day:'numeric',timeZone:'UTC'}).format(date);
      }
      const examName = activeLanguage==='fa' ? exam.label : (exam.labelEn || exam.label);
      const termLabel = applyTemplate(t('termic.semesterLabel'), {number:formatNumber(exam.semester)});
      return `<article class="termic-exam"><div><h4>${escape(examName)}</h4><span>${escape(termLabel)}</span></div><div class="termic-exam-date"><strong>${escape(dateLabel)}</strong>${exam.time?`<span dir="ltr">${escape(activeLanguage==='fa'?exam.time.replace(/\d/g,d=>'۰۱۲۳۴۵۶۷۸۹'[d]):exam.time)}</span>`:`<span>${activeLanguage==='fa'?'ساعت اعلام نشده':'Time not announced'}</span>`}</div></article>`;
    }).join('');
    document.querySelector('#termic-exam-empty').hidden = exams.length>0;
    document.querySelector('#termic-exam-count').textContent = applyTemplate(t('termic.examCount'), {count:formatNumber(exams.length)});
    document.querySelector('#termic-count').textContent = applyTemplate(t('termic.count'), {count:formatNumber(matches.length)});
    document.querySelector('#termic-empty').hidden = matches.length>0;
    const hasCourses = TERMIC_COHORT.courses.length>0;
    document.querySelector('#termic-empty-title').textContent = t(hasCourses?'termic.noMatch':'termic.emptyTitle');
    document.querySelector('#termic-empty-copy').textContent = t(hasCourses?'termic.noMatchCopy':'termic.emptyCopy');
    document.querySelector('#termic-reset').hidden = !search.value && activeLevel==='all' && semester.value==='all';
    document.title = activeLanguage==='fa' ? 'مدکاردی ترمیک | شهید بهشتی، ورودی ۱۴۰۴' : 'MedCardy Termic | Shahid Beheshti, 1404 cohort';
  }
  categories.addEventListener('click', e => {const button=e.target.closest('button');if(button){activeLevel=button.dataset.level;render();}});
  semester.addEventListener('change', () => {render();saveSemester();});
  search.addEventListener('input', render);
  document.querySelector('#termic-reset').addEventListener('click', () => {semester.value='all';search.value='';activeLevel='all';render();saveSemester();});
  document.addEventListener('medcardy-language-change', render);
  render();
})();
