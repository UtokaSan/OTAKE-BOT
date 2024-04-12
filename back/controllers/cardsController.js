// const query = `
//   SELECT * FROM cards
//   ORDER BY
//     CASE
//       WHEN quality = 'Legendaire' THEN 1
//       WHEN quality = 'Commun' THEN 2
//       ELSE 3
//     END,
//     id;
// `;