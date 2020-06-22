const getDate = () => {
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth();
  const yyyy = today.getFullYear();
  const date = mm + "/" + dd + "/" + yyyy;
  return date;
};

export default getDate;
