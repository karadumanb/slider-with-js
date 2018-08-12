/*    ***********************************************   */
/*    ***********************************************   */
/*    ************** SLIDER CHALLENGE ***************   */
/*    ***********************************************   */
/*    ***********************************************   */

//global variables
var elements,
  dots,
  timer,
  sliderIndex = 0,
  animated = false
  autoSlide = true,
  defaultTime = 4000,
  rewind = false;

var getListElementsOfSlider = function () {
  return document.getElementById('challenge-slider').getElementsByTagName('li');
};

var getDots = function () {
  return document.getElementById('scrolling-dots').getElementsByClassName('dot');
};

//get all elements as global variable
elements = getListElementsOfSlider();

//html dots into html
dots = getDots();

//set event listener for all dots
document.getElementById('scrolling-dots').addEventListener('click', (event) => {
  if (event.srcElement.classList.contains('dot')) {
    if (event.srcElement.classList.contains('active')) return;

    //get id of clicked child
    //since it has id like dot-3, we will split it in two with '-'
    //then get the second element of the array as integer
    var clickedDotIndex = parseInt(event.srcElement.attributes.id.value.split('-')[1]);
    changeSlide(clickedDotIndex);
  }
});

var nextSlide = function (next) {
  next ? changeSlide(sliderIndex + 1) : changeSlide(sliderIndex - 1);
};

var changeSlide = function (activeIndex) {
  if (!animated) {
    //In case user keeps clicking before animation ends
    animated = true;
    //global variable in the func
    var animationOut, animationIn;

    //error handling just in case
    if (elements[sliderIndex].classList.contains('active')) {

      //see if we will go to next element or previous and will go to the right or left
      if (sliderIndex < activeIndex) {
        animationOut = 'fadeOutRight';
        animationIn = 'fadeInLeft';
      } else {
        animationOut = 'fadeOutLeft';
        animationIn = 'fadeInRight';
      }

      //add animation out
      elements[sliderIndex].classList.add('animated', animationOut);
      setTimeout(() => {
        //wait for animation ends and remove all classes
        elements[sliderIndex].className = '';
        dots[sliderIndex].classList.remove('active');

        sliderIndex = activeIndex;
        if (elements[activeIndex]) {
          elements[activeIndex].classList.add('active', 'animated', animationIn);
          setTimeout(() => {
            elements[activeIndex].className = 'active';
            dots[activeIndex].classList.add('active');
            animated = false;
          }, 200);
        } else {
          if (activeIndex >= elements.length) {
            sliderIndex = 0;
          } else {
            sliderIndex = elements.length - 1;
          }
          elements[sliderIndex].classList.add('active');
          dots[sliderIndex].classList.add('active');
          animated = false;
        }
      }, 200);
      return;
    }
  }
};


//start autoSlide
var autoSlider = function () {
  if (autoSlide) {
    if (!rewind) {
      nextSlide(true);
    } else {
      nextSlide(false);
    }
  }
}

//start or restarting timer
var startTimer = function () {
  timer = setInterval(autoSlider, defaultTime);
}
var restartTimer = function () {
  clearInterval(timer);
  startTimer();
}
//start on init
startTimer();


//filters start
var toggleContents = function (contents) {
  for (var content of contents) {
    if (content.style.display === 'none') {
      content.style.display = 'block'
    } else {
      content.style.display = 'none';
    }
  }
}

var toggleSlider = function () {
  autoSlide = !autoSlide;
  var toggleSliderContent = document.getElementsByClassName('toggle-slider')[0].getElementsByTagName('p');
  toggleContents(toggleSliderContent);
}

var toggleRewind = function () {
  rewind = !rewind;
  var rewindSliderContent = document.getElementsByClassName('rewind-slider')[0].getElementsByTagName('p');
  toggleContents(rewindSliderContent);
}

var setAutostart = function () {
  if (document.getElementById('autostart-option').checked) {
    localStorage.setItem('autostart', 'true');
  } else {
    localStorage.setItem('autostart', 'false');
  }
}

var setToDefault = function () {
  autoSlide = true;
  rewind = false;
  defaultTime = 4000;
  restartTimer();
  for (var content of document.getElementsByClassName('defaulted-content')) {
    content.getElementsByTagName('p')[0].style.display = 'block';
    content.getElementsByTagName('p')[1].style.display = 'none';
  }
  document.getElementById('default-time').value = '';
}

var setDefaultTime = function () {
  if (document.getElementById('default-time').value === '') {
    setToDefault();
  }
  var value = parseInt(document.getElementById('default-time').value);
  if (value === 0 || typeof (value) !== 'number') {
    return;
  }
  defaultTime = value * 1000;
  restartTimer();
}
//filters end

//image resizing
var resizeImage = function () {
  var resizedElement = document.getElementById('challenge-slider').classList;
  resizedElement.toggle('full-screen');
  if (resizedElement.contains('full-screen')) {
    document.getElementsByTagName('html')[0].style.overflow = 'hidden';
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    document.getElementById('home').style.display = 'none';
    document.getElementById('quotations').style.zIndex = '-1';
    document.getElementById('contact').style.zIndex = '-1';
  } else {
    document.getElementsByTagName('html')[0].style.overflow = 'auto';
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
    document.getElementById('home').style.display = 'block';
    document.getElementById('quotations').style.zIndex = '1';
    document.getElementById('contact').style.zIndex = '1';
  }
}

var onPhotoUpload = function (event) {
  var filePath,
    files = event.target.files;

  if (files[0].type === 'image/png' || files[0].type === 'image/jpeg' || files[0].type === 'image/jpg') {
    var fileReader = new FileReader();
    fileReader.onload = function () {
      filePath = fileReader.result;

      //add image
      var uploadedPhotoElement = createNewImageElement(filePath);
      document.getElementById('challenge-slider').insertAdjacentElement('beforeend', uploadedPhotoElement);

      //Add dot
      var newDot = createNewDotElement(elements.length - 1);
      document.getElementById('scrolling-dots').insertAdjacentElement('beforeend', newDot);

      changeSlide(elements.length - 1);
    }
    fileReader.readAsDataURL(files[0]);
  } else {
    throwError('File types have to be jpg, jpeg or png.');
  }

}

var createNewImageElement = function (imageSrc) {
  var newImageElement = document.createElement("li");
  var child = document.createElement("figure");
  var image = document.createElement("img");
  child.classList.add('slider-photo');
  image.src = imageSrc;
  child.appendChild(image);
  newImageElement.appendChild(child);
  return newImageElement;
}

var createNewDotElement = function (dotId) {
  var newDot = document.createElement("span");
  newDot.classList.add('dot');
  newDot.id = 'dot-' + dotId;
  return newDot;
}

//check autostart from local storage on init
if (localStorage.getItem('autostart') !== null) {
  if (localStorage.getItem('autostart') === 'false') {
    toggleSlider();
    document.getElementById('autostart-option').checked = false;
  }
}

var removing = false;
var removeImage = function () {
  if(elements.length === 1) {
    throwError('You are not allowed to delete all in slider');
    return;
  }
  if(!removing) {
    removing = true;
    var currentIndex = sliderIndex;
    nextSlide(true);
    setTimeout(()=>{
      var parent = document.getElementById('challenge-slider');
      parent.removeChild(elements[currentIndex]);
      var parent = document.getElementById('scrolling-dots');
      parent.removeChild(dots[currentIndex]);
      for(var i = 0; i < dots.length; i++) {
        dots[i].id = 'dot-' + i;
      }
      if(sliderIndex => elements.length) {
        sliderIndex = 0;
      } else {
        sliderIndex--;
      }
      removing = false;
    }, 900);
  }
}

var throwError = function(errorText) {
  document.getElementById('error-message').innerHTML = errorText;
  setTimeout(() => {
    document.getElementById('error-message').innerHTML = '';
  }, 4000)
}