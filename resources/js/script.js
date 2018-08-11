//in contact section you can email me
function sendMail(e) {
  //prevent refreshing the page
  e.preventDefault();

  //gel inputs value of from
  var inputs = document.getElementsByClassName('form-input');
  var obj = {};
  //object value will be like { name: 'baturay', ...}
  for (var i = 0; i < inputs.length; i++) {
    var item = inputs.item(i);
    obj[item.name] = item.value;
  }

  //prompt the mailer in computer
  var body =
    'Hi Baturay, \r\n\r\nI would like to tell you that we found your challenge ' +
    obj.feedback.toLowerCase() +
    '! \r\n I also want to say:\r\n' +
    obj.message +
    '\r\n\r\nHave a nice day!\r\n' +
    obj.name.toUpperCase();
  body = encodeURIComponent(body);
  window.location.href = `mailto:karadumanbaturay@gmail.com&subject=Evaluation%20from%20${obj.name}&body=${body}`;

  //reset the form
  document.getElementById('contact-form').reset();

  //give feedback
  document.getElementById('mail-feedback').style.display = 'block';
  setTimeout(() => {
    document.getElementById('mail-feedback').style.display = 'none';
  }, 8000);
}

/*    ***********************************************   */
/*    ***********************************************   */
/*    ************** SLIDER CHALLENGE ***************   */
/*    ***********************************************   */
/*    ***********************************************   */

//global variables
var elements,
  dots,
  sliderIndex = 0,
  animated = false
  autoSlide = true,
  defaultTime = 2000,
  rewind = false;

var getListElementsOfSlider = function() {
  return document.getElementById('challenge').getElementsByTagName('li');
};

var getDots = function() {
  return document.getElementById('scrolling-dots').getElementsByClassName('dot');
};

//get all elements as global variable
elements = getListElementsOfSlider();

//html dots into html
dots = getDots();

//set event listener for all dots
document.getElementById('scrolling-dots').addEventListener('click', (event)=>{
  if(event.srcElement.classList.contains('dot')) {
    if(event.srcElement.classList.contains('active')) return;

    //get id of clicked child
    //since it has id like dot-3, we will split it in two with '-'
    //then get the second element of the array as integer
    var clickedDotIndex = parseInt(event.srcElement.attributes.id.value.split('-')[1]);
    changeSlide(clickedDotIndex);
  }
});

var nextSlide = function(next) {
  next ? changeSlide(sliderIndex + 1) : changeSlide(sliderIndex - 1);
};

var changeSlide = function(activeIndex) {
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

setInterval(() => {
  if(autoSlide) {
    if(!rewind) {
      nextSlide(true);
    } else {
      nextSlide(false);
    }
  }
}, defaultTime)

var toggleSlider = function() {
  autoSlide = !autoSlide;
}

var toggleRewind = function() {
  rewind = !rewind;
}

var defaultSlider = function() {
  autoSlide = true;
  rewind = false;
  defaultTime = 2000;
}

var setDefaultTime = function() {
  var value = parseInt(document.getElementById('default-time').value);
  console.log(value)
  if(value === 0) {
    return;
  }
  defaultTime = value*1000;
}