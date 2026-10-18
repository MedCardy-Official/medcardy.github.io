(() => {
  const university = document.querySelector('#termic-university-filter');
  const entry = document.querySelector('#termic-entry-filter');
  const cards = [...document.querySelectorAll('#termic .termic-cohort')];
  const reset = document.querySelector('#termic-directory-reset');
  function populate(select, values, label, allLabel) {
    const previous = select.value || 'all';
    select.replaceChildren();
    select.add(new Option(allLabel, 'all'));
    values.forEach(value => select.add(new Option(label(value), value)));
    select.value = values.includes(previous) ? previous : 'all';
  }
  function render() {
    const universities = [...new Set(cards.map(c => c.dataset.university))];
    const entries = [...new Set(cards.map(c => c.dataset.entry))].sort((a,b) => Number(b)-Number(a));
    populate(university, universities, value => t('archive.universities.'+value), t('termic.allUniversities'));
    populate(entry, entries, value => applyTemplate(t('termic.entryLabel'), {year:formatNumber(Number(value))}), t('termic.allEntries'));
    let count = 0;
    cards.forEach(card => {
      card.hidden = !((university.value==='all'||card.dataset.university===university.value) && (entry.value==='all'||card.dataset.entry===entry.value));
      if (!card.hidden) count++;
    });
    document.querySelector('#termic-directory-count').textContent = applyTemplate(t('termic.directoryCount'), {count:formatNumber(count)});
    document.querySelector('#termic-directory-empty').hidden = count>0;
    reset.hidden = university.value==='all' && entry.value==='all';
  }
  university.addEventListener('change', render);
  entry.addEventListener('change', render);
  reset.addEventListener('click', () => {university.value='all';entry.value='all';render();});
  document.addEventListener('medcardy-language-change', render);
  render();
})();
