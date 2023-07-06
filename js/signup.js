let buttonForUserCreate = document.getElementById('buttonForUserCreate');

buttonForUserCreate.addEventListener('click', ()=>{
    registerUser()
})

let registerUser = () => {

    let name = document.getElementById("nameForUserCreate").value;
    let email = document.getElementById("emailForUserCreate").value;
    let position = document.getElementById("positionForUserCreate").value;
    let password = document.getElementById("passwordForUserCreate").value;
  
    const data = { name, email, password, position };
  
    if (!name && !email && !password && !position) {
      alert("Please, Fill all Field");
    } else {
      axios.post("http://10.0.0.13:8080/register", data).then((res) => {
        alert(res.data.message);
        setTimeout(() => {
          location.replace('../index.html');
        }, 1000);
      });
    }
  };