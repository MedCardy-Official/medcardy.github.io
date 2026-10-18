/* Only confirmed cohort-specific courses belong here; the public archive is separate.
   Add entries using the public course schema plus semester (a positive integer).
   Example fields: category, universities, label, labelEn, link, source, cover, semester.
   Do not assign a public course to this cohort without confirmation. */
const TERMIC_COHORT = {
  university: "beheshti",
  entryYear: 1404,
  semesters: [],
  exams: [],
  courses: []
};

/* Keep the same cohort page across terms.
   semesters: [1, 2, ...] (registered semesters, including those not yet published).
   exams: [{semester: 1, label: "نام درس", labelEn: "Course name",
            date: "YYYY-MM-DD", time: "HH:mm"}]
   Use a confirmed Gregorian ISO date; the page displays it in the Persian calendar
   in Persian and Gregorian in English. An unknown date may be null.
   courses keep their semester field; older semesters remain in this file. */
