function ibg(){

let ibg=document.querySelectorAll(".ibg");
for (var i = 0; i < ibg.length; i++) {
if(ibg[i].querySelector('img')){
ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
}
}
}

ibg();

var swiper = new Swiper(".products__swiper", {
	slidesPerView: 4,
   spaceBetween: 50,
   loop: true,
   loopFillGroupWithBlank: true,
 	breakpoints: {
       0: {
         slidesPerView: 1,
         spaceBetween: 30,
       },
       640: {
         slidesPerView: 2,
         spaceBetween: 30,
       },
       965: {
         slidesPerView: 3,
         spaceBetween: 40,
       },
       1250: {
         slidesPerView: 4,
   		spaceBetween: 50,
       },
    },
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
 	},
});

const menuIcon = document.querySelector('.header__icon');
const menuBody = document.querySelector('.header__menu');
  if(menuIcon){
    menuIcon.addEventListener('click',function(e){
      document.body.classList.toggle('_lock');
      menuIcon.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    })
  }
const menuLinks = document.querySelectorAll('.header__link[data-goto]');
  if(menuLinks.length>0){
    menuLinks.forEach(menuLink =>{
      menuLink.addEventListener('click', onMenuLinkClick);
    });
    function onMenuLinkClick(e){
      const menuLink = e.target;
      if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
        const gotoBlock = document.querySelector(menuLink.dataset.goto);
        const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
        
        if(menuIcon.classList.contains('_active')){
          document.body.classList.remove('_lock');
          menuIcon.classList.remove('_active');
          menuBody.classList.remove('_active');
        }
        
        window.scrollTo({
          top: gotoBlockValue,
          behavior: "smooth"
        });
        e.preventDefault();
      }
    }
  }

  "use strict"

  document.addEventListener('DOMContentLoaded', function(){
  		const form = document.getElementById('form');
  		form.addEventListener('submit', formSend);

  		async function formSend(e){
  			e.preventDefault();
  		
  			let error = formValidate(form);
  			let formData = new FormData(form);

  			if (error === 0) {
  				form.classList.add('_sending');
  				let response = await fetch('sendmail.php', {
  					method: 'POST',
  					body: formData
  				});
  				if (response.ok) {
  					let result = await response.json();
  					alert(result.message);
  					formPreview.innerHTML = '';
  					form.reset();
  					form.classList.remove('_sending');
  				} else{
  					alert("Ошибка");
  					form.classList.remove('_sending');
  				}
  			} else {
  				alert("Заполните все поля");
  			}
  		}

  		function formValidate(form) {
  			let error = 0;
  			let formItem = document.querySelectorAll('.subscribe__item');
  			console.log(formItem.length);
  			for (let index = 0; index < formItem.length; index++) {
  				const input = formItem[index];
  				
  				formRemoveError(input);

  				if(input.classList.contains('_email')) {
  						if (emailTest(input)) {
  						formAddError(input);
  						error++;
  					}
  				}else {
  					if(input.value === '') {
  						formAddError(input);
  						error++;
					}  				
  				}
  			}
  			return error;
  		}
		
		function formAddError(input) {
			input.parentElement.classList.add('_error');
			input.classList.add('_error');
		}
		function formRemoveError(input) {
			input.parentElement.classList.remove('_error');
			input.classList.remove('_error');
		}
		function emailTest(input) {
			return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
		}    
  });