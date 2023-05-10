export const fetchUser = async () =>{
  const response = await fetch("http://localhost:3001/auth/",
      {
        credentials: 'include'
      }
      );
      const user = await response.json();
      return user
}
