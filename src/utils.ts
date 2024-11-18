export const formatDate = (formattedDate: Date) =>
  `${String(formattedDate.getDate()).padStart(2, "0")}/${String(formattedDate.getMonth() + 1).padStart(2, "0")}/${formattedDate.getFullYear()}`;
