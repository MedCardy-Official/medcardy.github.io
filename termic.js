(() => {
  const semester = document.querySelector('#termic-semester');
  const search = document.querySelector('#termic-search');
  const categories = document.querySelector('#termic-category');
  let activeLevel = 'all';
  const normalize = value => value.toLowerCase().replace(/[يى]/g, 'ی').replace(/ك/g, 'ک').replace(/[\s\u200c\u200e\u200fـ]/g, '');
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function render() {
    const selected = semester.value || 'all';
    const semesters = [...new Set(TERMIC_COHORT.courses.map(c => c.semester))].sort((a,b) => a-b);
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
    document.querySelector('#termic-count').textContent = applyTemplate(t('termic.count'), {count:formatNumber(matches.length)});
    document.querySelector('#termic-empty').hidden = matches.length>0;
    const hasCourses = TERMIC_COHORT.courses.length>0;
    document.querySelector('#termic-empty-title').textContent = t(hasCourses?'termic.noMatch':'termic.emptyTitle');
    document.querySelector('#termic-empty-copy').textContent = t(hasCourses?'termic.noMatchCopy':'termic.emptyCopy');
    document.querySelector('#termic-reset').hidden = !search.value && activeLevel==='all' && semester.value==='all';
    document.title = activeLanguage==='fa' ? 'مدکاردی ترمیک | شهید بهشتی، ورودی ۱۴۰۴' : 'MedCardy Termic | Shahid Beheshti, 1404 cohort';
  }
  categories.addEventListener('click', e => {const button=e.target.closest('button');if(button){activeLevel=button.dataset.level;render();}});
  semester.addEventListener('change', render);
  search.addEventListener('input', render);
  document.querySelector('#termic-reset').addEventListener('click', () => {semester.value='all';search.value='';activeLevel='all';render();});
  document.addEventListener('medcardy-language-change', render);
  render();
})();
