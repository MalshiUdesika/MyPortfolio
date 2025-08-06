document.addEventListener('DOMContentLoaded' , function()) {
    //set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    //mobile menu toggle
    const mobileMenuBtn = document.querySelector(' .mobile-menu');
    const nav = document.querySelector('nav');

    mobileMenuBtn.addEventListener('click',function(){
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
}

//header scroll effect
window.addEventListener('scroll', function(){
    const header = this.document.querySelector('header');
    header.classList.toggle('scrolled', this.window.scrollY > 50);
});

//Skills data 
const skillsData = [
    { icon: 'fab fa-html5', name:'HTML5'},
    {icon: 'fab fa-css3-alt', name:'CSS3'},
    {icon: 'fab fa-js', name:'JavaScript'}
]; 


//dark mde 
  const toggleBtn = document.getElementById("darkModeToggle");
  const body = document.body;

  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    // Change icon when toggled
    if (body.classList.contains("dark-mode")) {
      toggleBtn.textContent = "☀️"; // Light mode icon
    } else {
      toggleBtn.textContent = "🌙"; // Dark mode icon
    }
  });


