const apiUrl = import.meta.env.VITE_API_URL;
export default async function updatetodo(id){
    try {
        const token = localStorage.getItem("token");
        console.log(token);
        const response = await fetch(`${apiUrl}/user/completed`, {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        if (response.ok) {
          alert(`Result is ${data.msg}`);
          return true;
        } else {
          alert(`Error: ${data.msg || "Could not update todo"}`);
          return false;
        }
      } catch (err) {
        console.log("error in updating the todo", err);
      }
}