export const GetUserID = () => {
  const stored = localStorage.getItem("USERID");
  const id = stored != null ? JSON.parse(stored) : crypto.randomUUID();
  localStorage.setItem("USERID", JSON.stringify(id));
  return id;
};
