export const fetchFiles = async () => {
  const response = await fetch('http://localhost:3001/userfiles/', {
    credentials: 'include'
  });
  const files = await response.json();
  return files
}