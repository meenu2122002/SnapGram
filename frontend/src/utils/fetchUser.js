export const fetchUser=()=>{
    const userInfo= localStorage.getItem('user') != 'undefined' ? JSON.parse(localStorage.getItem('user')) : undefined;
return userInfo;
}