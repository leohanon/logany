export const GetUserID = () => {
  const stored = localStorage.getItem("USERID");
  const id = stored != null ? JSON.parse(stored) : crypto.randomUUID();
  localStorage.setItem("USERID", JSON.stringify(id));
  return id;
};

export async function delayFunction() {
  return new Promise<string>((resolve) => {
    console.log("start");
    setTimeout(() => {
      console.log("end");
      resolve("hello");
    }, 1000); // 1000 milliseconds = 1 second
  });
}
